import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapPacket {
  fromIdx: number; toIdx: number; progress: number; speed: number; color: string;
}

interface Ring {
  x: number; y: number; radius: number; maxRadius: number; opacity: number; speed: number;
}

// Datacenter locations in normalized coords (0-1 range, Mercator-ish)
const DC_LOCATIONS = [
  { name: "São Paulo", nx: 0.35, ny: 0.72, label: "GRU" },
  { name: "Virginia", nx: 0.28, ny: 0.38, label: "IAD" },
  { name: "Frankfurt", nx: 0.52, ny: 0.30, label: "FRA" },
  { name: "London", nx: 0.48, ny: 0.28, label: "LHR" },
  { name: "Singapore", nx: 0.78, ny: 0.58, label: "SIN" },
  { name: "Tokyo", nx: 0.87, ny: 0.37, label: "NRT" },
  { name: "Sydney", nx: 0.88, ny: 0.78, label: "SYD" },
  { name: "Mumbai", nx: 0.70, ny: 0.50, label: "BOM" },
  { name: "Dubai", nx: 0.62, ny: 0.45, label: "DXB" },
  { name: "Oregon", nx: 0.15, ny: 0.34, label: "PDX" },
  { name: "Santiago", nx: 0.30, ny: 0.80, label: "SCL" },
  { name: "Joburg", nx: 0.56, ny: 0.76, label: "JNB" },
];

// Simplified world map continent outlines (normalized 0-1)
const CONTINENTS: number[][][] = [
  // North America
  [[0.05,0.25],[0.12,0.18],[0.18,0.15],[0.25,0.18],[0.30,0.22],[0.33,0.30],[0.30,0.38],[0.28,0.42],[0.25,0.48],[0.20,0.50],[0.15,0.48],[0.10,0.42],[0.08,0.38],[0.05,0.32]],
  // South America
  [[0.28,0.52],[0.32,0.55],[0.35,0.60],[0.37,0.65],[0.36,0.72],[0.34,0.78],[0.32,0.82],[0.30,0.85],[0.27,0.82],[0.26,0.76],[0.25,0.70],[0.24,0.64],[0.25,0.58]],
  // Europe
  [[0.46,0.18],[0.50,0.16],[0.55,0.18],[0.58,0.22],[0.56,0.28],[0.54,0.32],[0.52,0.35],[0.48,0.34],[0.46,0.30],[0.44,0.26],[0.45,0.22]],
  // Africa
  [[0.48,0.38],[0.52,0.40],[0.56,0.42],[0.58,0.48],[0.60,0.55],[0.58,0.62],[0.56,0.70],[0.54,0.76],[0.52,0.78],[0.50,0.75],[0.48,0.68],[0.46,0.60],[0.44,0.52],[0.45,0.45]],
  // Asia
  [[0.58,0.18],[0.65,0.15],[0.72,0.18],[0.78,0.20],[0.85,0.25],[0.90,0.30],[0.88,0.35],[0.85,0.40],[0.80,0.42],[0.75,0.45],[0.70,0.48],[0.65,0.50],[0.62,0.45],[0.60,0.38],[0.58,0.32],[0.56,0.25]],
  // Australia
  [[0.82,0.68],[0.86,0.66],[0.90,0.68],[0.92,0.72],[0.90,0.78],[0.88,0.80],[0.84,0.80],[0.82,0.76],[0.80,0.72]],
];

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

    // Map area (centered, with padding)
    const getMapBounds = () => {
      const w = canvas.width;
      const h = canvas.height;
      const pad = 0.08;
      return {
        x: w * pad,
        y: h * pad,
        w: w * (1 - pad * 2),
        h: h * (1 - pad * 2),
      };
    };

    const toScreen = (nx: number, ny: number) => {
      const b = getMapBounds();
      return { x: b.x + nx * b.w, y: b.y + ny * b.h };
    };

    // Data packets
    const packets: MapPacket[] = [];
    const packetColors = [
      "rgba(80,180,255,", "rgba(120,220,180,", "rgba(180,140,255,", "rgba(255,180,80,"
    ];

    const spawnPacket = () => {
      const from = Math.floor(Math.random() * DC_LOCATIONS.length);
      let to = Math.floor(Math.random() * DC_LOCATIONS.length);
      if (to === from) to = (to + 1) % DC_LOCATIONS.length;
      packets.push({
        fromIdx: from, toIdx: to,
        progress: 0,
        speed: 0.004 + Math.random() * 0.006,
        color: packetColors[Math.floor(Math.random() * packetColors.length)],
      });
    };

    // Broadcast rings
    const rings: Ring[] = [];
    const spawnRing = () => {
      const dc = DC_LOCATIONS[Math.floor(Math.random() * DC_LOCATIONS.length)];
      const s = toScreen(dc.nx, dc.ny);
      rings.push({
        x: s.x, y: s.y, radius: 4, maxRadius: 40 + Math.random() * 30,
        opacity: 0.3, speed: 0.3 + Math.random() * 0.2,
      });
    };

    // Ambient particles
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number; p: number; ps: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: 0.5 + Math.random() * 1, o: 0.15 + Math.random() * 0.25,
        p: Math.random() * Math.PI * 2, ps: 0.005 + Math.random() * 0.015,
      });
    }

    let frame = 0;

    const drawArc = (
      from: { x: number; y: number },
      to: { x: number; y: number },
      progress: number,
      color: string,
      lineWidth: number
    ) => {
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Arc bulge perpendicular to line
      const bulge = dist * 0.25;
      const cx = mx - (dy / dist) * bulge;
      const cy = my + (dx / dist) * bulge;

      // Draw arc up to progress
      const steps = 40;
      const end = Math.floor(steps * progress);
      const trailStart = Math.max(0, end - 8);

      for (let i = trailStart; i < end; i++) {
        const t1 = i / steps;
        const t2 = (i + 1) / steps;
        const x1 = (1 - t1) * (1 - t1) * from.x + 2 * (1 - t1) * t1 * cx + t1 * t1 * to.x;
        const y1 = (1 - t1) * (1 - t1) * from.y + 2 * (1 - t1) * t1 * cy + t1 * t1 * to.y;
        const x2 = (1 - t2) * (1 - t2) * from.x + 2 * (1 - t2) * t2 * cx + t2 * t2 * to.x;
        const y2 = (1 - t2) * (1 - t2) * from.y + 2 * (1 - t2) * t2 * cy + t2 * t2 * to.y;
        const alpha = ((i - trailStart) / (end - trailStart)) * 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color + `${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // Packet head
      if (end > 0) {
        const t = progress;
        const hx = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cx + t * t * to.x;
        const hy = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cy + t * t * to.y;
        ctx.beginPath();
        ctx.arc(hx, hy, 3, 0, Math.PI * 2);
        ctx.fillStyle = color + "0.9)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hx, hy, 7, 0, Math.PI * 2);
        ctx.fillStyle = color + "0.15)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 12 === 0) spawnPacket();
      if (frame % 70 === 0) spawnRing();

      // --- Draw continent outlines ---
      for (const cont of CONTINENTS) {
        ctx.beginPath();
        for (let i = 0; i < cont.length; i++) {
          const s = toScreen(cont[i][0], cont[i][1]);
          if (i === 0) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(60,90,140,0.04)";
        ctx.fill();
        ctx.strokeStyle = "rgba(80,120,180,0.08)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // --- Draw static routes (faint arcs between all DCs) ---
      for (let i = 0; i < DC_LOCATIONS.length; i++) {
        for (let j = i + 1; j < DC_LOCATIONS.length; j++) {
          const a = toScreen(DC_LOCATIONS[i].nx, DC_LOCATIONS[i].ny);
          const b = toScreen(DC_LOCATIONS[j].nx, DC_LOCATIONS[j].ny);
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < canvas.width * 0.45) {
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            const bulge = dist * 0.2;
            const cx = mx - (dy / dist) * bulge;
            const cy = my + (dx / dist) * bulge;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(cx, cy, b.x, b.y);
            ctx.strokeStyle = "rgba(80,130,200,0.04)";
            ctx.lineWidth = 0.5;
            ctx.setLineDash([3, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // --- Draw DC locations ---
      for (const dc of DC_LOCATIONS) {
        const s = toScreen(dc.nx, dc.ny);
        const pulse = 0.7 + 0.3 * Math.sin(frame * 0.02 + dc.nx * 10);

        // Outer glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,160,255,${0.05 * pulse})`;
        ctx.fill();

        // Mid ring
        ctx.beginPath();
        ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,180,255,${0.2 * pulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,210,255,${0.8 * pulse})`;
        ctx.fill();

        // Label
        ctx.font = "9px 'Inter', sans-serif";
        ctx.fillStyle = `rgba(150,190,240,${0.5 * pulse})`;
        ctx.textAlign = "center";
        ctx.fillText(dc.label, s.x, s.y - 12);
      }

      // --- Draw & update packets along curved arcs ---
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) { packets.splice(i, 1); continue; }
        const from = toScreen(DC_LOCATIONS[p.fromIdx].nx, DC_LOCATIONS[p.fromIdx].ny);
        const to = toScreen(DC_LOCATIONS[p.toIdx].nx, DC_LOCATIONS[p.toIdx].ny);
        drawArc(from, to, p.progress, p.color, 1.5);
      }

      // --- Broadcast rings ---
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += r.speed;
        r.opacity *= 0.988;
        if (r.radius > r.maxRadius || r.opacity < 0.01) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,180,255,${r.opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // --- Ambient particles ---
      for (const pt of particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.p += pt.ps;
        if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;
        const po = pt.o * (0.5 + 0.5 * Math.sin(pt.p));
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${po})`;
        ctx.fill();
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
