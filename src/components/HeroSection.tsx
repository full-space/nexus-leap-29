import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; opacity: number; pulse: number; pulseSpeed: number;
  isHub: boolean;
}

interface Packet {
  fromIdx: number; toIdx: number; progress: number; speed: number; color: string;
}

interface Ring {
  x: number; y: number; radius: number; maxRadius: number; opacity: number; speed: number;
}

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const W = () => canvas.width;
    const H = () => canvas.height;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Infrastructure Nodes (servers/CDN POPs) ---
    const nodes: Node[] = [];
    const hubCount = 6;
    for (let i = 0; i < hubCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 4 + Math.random() * 3,
        opacity: 0.7 + Math.random() * 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.01,
        isHub: true,
      });
    }
    for (let i = 0; i < 140; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 0.8 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.02,
        isHub: false,
      });
    }

    // --- Data Packets flowing between nodes ---
    const packets: Packet[] = [];
    const packetColors = [
      "rgba(80,180,255,", "rgba(120,220,180,", "rgba(180,140,255,", "rgba(255,180,80,"
    ];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * hubCount);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      packets.push({
        fromIdx: from,
        toIdx: to,
        progress: 0,
        speed: 0.003 + Math.random() * 0.008,
        color: packetColors[Math.floor(Math.random() * packetColors.length)],
      });
    };

    // --- CDN Broadcast Rings ---
    const rings: Ring[] = [];
    const spawnRing = () => {
      const hub = nodes[Math.floor(Math.random() * hubCount)];
      rings.push({
        x: hub.x, y: hub.y,
        radius: hub.r,
        maxRadius: 80 + Math.random() * 120,
        opacity: 0.25,
        speed: 0.4 + Math.random() * 0.3,
      });
    };

    let frameCount = 0;

    const drawHexagon = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      frameCount++;

      // Spawn packets & rings
      if (frameCount % 8 === 0) spawnPacket();
      if (frameCount % 90 === 0) spawnRing();

      // --- Update & draw nodes ---
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
        const po = n.opacity * (0.6 + 0.4 * Math.sin(n.pulse));

        if (n.isHub) {
          // Hub: hexagon (server icon) with glow
          const sz = n.r * (0.9 + 0.1 * Math.sin(n.pulse));
          ctx.save();
          // Outer glow
          drawHexagon(n.x, n.y, sz * 4);
          ctx.fillStyle = `rgba(80,140,255,${po * 0.06})`;
          ctx.fill();
          // Mid glow
          drawHexagon(n.x, n.y, sz * 2.2);
          ctx.fillStyle = `rgba(100,160,255,${po * 0.12})`;
          ctx.fill();
          // Core hexagon
          drawHexagon(n.x, n.y, sz);
          ctx.strokeStyle = `rgba(140,200,255,${po * 0.7})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = `rgba(100,160,255,${po * 0.15})`;
          ctx.fill();
          ctx.restore();
        } else {
          // Regular node: dot with glow
          const pr = n.r * (0.8 + 0.2 * Math.sin(n.pulse));
          ctx.beginPath();
          ctx.arc(n.x, n.y, pr * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140,180,255,${po * 0.06})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${po})`;
          ctx.fill();
        }
      }

      // --- Draw network connections ---
      for (let i = 0; i < hubCount; i++) {
        for (let j = i + 1; j < hubCount; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 500) {
            const alpha = 0.06 * (1 - dist / 500);
            ctx.beginPath();
            ctx.setLineDash([4, 6]);
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(100,160,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
      // Hub to nearby edge nodes
      for (let i = 0; i < hubCount; i++) {
        for (let j = hubCount; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 0.05 * (1 - dist / 130);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(140,180,255,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // --- Draw & update data packets ---
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) { packets.splice(i, 1); continue; }
        const from = nodes[p.fromIdx], to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;
        // Trail
        const trailLen = 0.08;
        const tp = Math.max(0, p.progress - trailLen);
        const tx = from.x + (to.x - from.x) * tp;
        const ty = from.y + (to.y - from.y) * tp;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, p.color + "0)");
        grad.addColorStop(1, p.color + "0.6)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Packet head glow
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.8)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.15)";
        ctx.fill();
      }

      // --- Draw CDN broadcast rings ---
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += r.speed;
        r.opacity *= 0.99;
        if (r.radius > r.maxRadius || r.opacity < 0.01) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,180,255,${r.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,120,255,0.07)_0%,rgba(40,80,200,0.03)_35%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(100,60,255,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(60,200,255,0.04)_0%,transparent_45%)]" />

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
