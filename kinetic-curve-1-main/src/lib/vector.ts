import type { Point } from "@/lib/types";

export const V = {
  add: (p1: Point, p2: Point): Point => ({ x: p1.x + p2.x, y: p1.y + p2.y }),
  subtract: (p1: Point, p2: Point): Point => ({ x: p1.x - p2.x, y: p1.y - p2.y }),
  scale: (p: Point, s: number): Point => ({ x: p.x * s, y: p.y * s }),
  magnitude: (p: Point): number => Math.sqrt(p.x * p.x + p.y * p.y),
  normalize: (p: Point): Point => {
    const mag = V.magnitude(p);
    if (mag === 0) return { x: 0, y: 0 };
    return V.scale(p, 1 / mag);
  },
};

export function cubicBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const oneMinusT = 1 - t;
  const oneMinusT2 = oneMinusT * oneMinusT;
  const oneMinusT3 = oneMinusT2 * oneMinusT;
  const t2 = t * t;
  const t3 = t2 * t;

  const p = V.add(
    V.scale(p0, oneMinusT3),
    V.add(
      V.scale(p1, 3 * oneMinusT2 * t),
      V.add(V.scale(p2, 3 * oneMinusT * t2), V.scale(p3, t3))
    )
  );
  return p;
}

export function cubicBezierDerivative(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const oneMinusT = 1 - t;
  const t2 = t * t;

  const d = V.add(
    V.scale(V.subtract(p1, p0), 3 * oneMinusT * oneMinusT),
    V.add(
      V.scale(V.subtract(p2, p1), 6 * oneMinusT * t),
      V.scale(V.subtract(p3, p2), 3 * t2)
    )
  );
  return d;
}
