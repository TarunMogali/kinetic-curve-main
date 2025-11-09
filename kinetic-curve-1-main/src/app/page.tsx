import { KineticCurveCanvas } from "@/components/kinetic-curve-canvas";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline tracking-tight">
            Kinetic Curve
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            An interactive cubic Bézier curve simulation with spring physics.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Move your mouse over the canvas to interact with the control points.
          </p>
        </header>

        <Card className="overflow-hidden shadow-2xl bg-card">
          <CardContent className="p-0">
            <KineticCurveCanvas />
          </CardContent>
        </Card>

        <footer className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Built from scratch with Next.js, React, and TypeScript. No
            external physics or Bézier libraries used.
          </p>
        </footer>
      </div>
    </main>
  );
}
