"use client";

import React, { useRef, useEffect, useCallback } from "react";
import type { Point, ControlPoint } from "@/lib/types";
import { V, cubicBezier, cubicBezierDerivative } from "@/lib/vector";

// --- Constants ---
const SPRING_K = 0.05;
const DAMPING = 0.85;
const TANGENT_LENGTH = 40;
const NUM_TANGENTS = 10;
const CURVE_SAMPLES = 100;

// --- Main Component ---
export function KineticCurveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const p0 = useRef<Point>({ x: 0, y: 0 });
  const p3 = useRef<Point>({ x: 0, y: 0 });
  const p1 = useRef<ControlPoint>({ pos: { x: 0, y: 0 }, vel: { x: 0, y: 0 } });
  const p2 = useRef<ControlPoint>({ pos: { x: 0, y: 0 }, vel: { x: 0, y: 0 } });
  const mouse = useRef<Point>({ x: 0, y: 0 });

  const themeColors = useRef({
    bg: "#09090b",
    primary: "#a23cff",
    accent: "#ff4dff",
    foreground: "#fcfcfd",
  });

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const { bg, primary, accent } = themeColors.current;

    // 1. Draw Bézier Curve
    ctx.beginPath();
    ctx.moveTo(p0.current.x, p0.current.y);
    ctx.strokeStyle = primary;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (let i = 1; i <= CURVE_SAMPLES; i++) {
      const t = i / CURVE_SAMPLES;
      const point = cubicBezier(
        p0.current,
        p1.current.pos,
        p2.current.pos,
        p3.current,
        t
      );
      ctx.lineTo(point.x, point.y);
    }
    ctx.stroke();

    // 2. Draw Tangents
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    for (let i = 0; i <= NUM_TANGENTS; i++) {
      const t = i / NUM_TANGENTS;
      const pointOnCurve = cubicBezier(
        p0.current,
        p1.current.pos,
        p2.current.pos,
        p3.current,
        t
      );
      const derivative = cubicBezierDerivative(
        p0.current,
        p1.current.pos,
        p2.current.pos,
        p3.current,
        t
      );
      const tangent = V.scale(V.normalize(derivative), TANGENT_LENGTH);

      ctx.beginPath();
      ctx.moveTo(pointOnCurve.x, pointOnCurve.y);
      ctx.lineTo(pointOnCurve.x + tangent.x, pointOnCurve.y + tangent.y);
      ctx.stroke();
    }

    // 3. Draw Control Points
    const pointsToDraw = [p0.current, p1.current.pos, p2.current.pos, p3.current];
    pointsToDraw.forEach((point, i) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = i === 1 || i === 2 ? accent : primary;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.strokeStyle = bg;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const center = { x: canvas.width / dpr / 2, y: canvas.height / dpr / 2 };

    // Physics update for P1 (attracts to mouse)
    const force1 = V.scale(V.subtract(mouse.current, p1.current.pos), SPRING_K);
    const velWithDamping1 = V.scale(p1.current.vel, DAMPING);
    p1.current.vel = V.add(velWithDamping1, force1);
    p1.current.pos = V.add(p1.current.pos, p1.current.vel);

    // Physics update for P2 (attracts to mirrored mouse position)
    const mouseFromCenter = V.subtract(mouse.current, center);
    const p2Target = V.subtract(center, mouseFromCenter);
    const force2 = V.scale(V.subtract(p2Target, p2.current.pos), SPRING_K);
    const velWithDamping2 = V.scale(p2.current.vel, DAMPING);
    p2.current.vel = V.add(velWithDamping2, force2);
    p2.current.pos = V.add(p2.current.pos, p2.current.vel);

    draw(ctx);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const computedStyle = getComputedStyle(document.documentElement);
    const getColor = (name: string) => `hsl(${computedStyle.getPropertyValue(name).trim()})`;
    const isDark = document.documentElement.classList.contains("dark");

    themeColors.current = {
      bg: getColor(isDark ? '--background' : '--card'),
      primary: getColor('--primary'),
      accent: getColor('--accent'),
      foreground: getColor('--foreground'),
    };
    
    const dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();

    function resizeCanvas() {
        rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        ctx?.scale(dpr, dpr);

        const margin = 50;
        p0.current = { x: margin, y: rect.height / 2 };
        p3.current = { x: rect.width - margin, y: rect.height / 2 };
        
        if (!p1.current.pos.x) { // Initialize only once
          const initialP1Pos = { x: rect.width / 3, y: rect.height / 3 };
          const center = {x: rect.width / 2, y: rect.height / 2 };
          const mouseFromCenter = V.subtract(initialP1Pos, center);
          const initialP2Pos = V.subtract(center, mouseFromCenter);

          p1.current = { pos: initialP1Pos, vel: { x: 0, y: 0 } };
          p2.current = { pos: initialP2Pos, vel: { x: 0, y: 0 } };
          mouse.current = { x: rect.width / 2, y: rect.height / 2 };
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        e.preventDefault();
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px] sm:h-[600px] cursor-crosshair touch-none"
    />
  );
}
