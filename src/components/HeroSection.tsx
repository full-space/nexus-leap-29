import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create dots
    const dots: { x: number; y: number; vx: number; vy: number; r: number; opacity: number; pulse: number; pulseSpeed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.pulse += dot.pulseSpeed;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        const pulsedOpacity = dot.opacity * (0.6 + 0.4 * Math.sin(dot.pulse));
        const pulsedR = dot.r * (0.8 + 0.2 * Math.sin(dot.pulse));
        // Glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, pulsedR * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,180,255,${pulsedOpacity * 0.08})`;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, pulsedR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${pulsedOpacity})`;
        ctx.fill();
      }
      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = 0.08 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(140,180,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,140,255,0.06)_0%,rgba(60,100,220,0.03)_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(100,60,255,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(60,180,255,0.04)_0%,transparent_50%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-exo font-bold tracking-tight leading-none">
              CLOUD
            </span>
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-serif-display italic tracking-tight leading-none text-muted-foreground">
              Infrastructure
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-serif-display italic tracking-tight leading-none text-muted-foreground">
              for
            </span>
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-exo font-bold tracking-tight leading-none whitespace-nowrap">
              MODERN TEAMS
            </span>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 text-xs text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Internettools AI — Agora Disponível
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Escale sua{" "}
          <span className="font-serif-display italic text-foreground text-2xl md:text-3xl">
            infraestrutura
          </span>{" "}
          instantaneamente.
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-medium"
          asChild
        >
          <a href="#cta">
            Começar Gratuitamente
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
