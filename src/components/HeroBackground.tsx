import { useRef, useEffect } from "react";

// Datacenter positions (normalized 0-1) spread across canvas like a global network
interface DC { x: number; y: number; size: number; label: string }
const DATACENTERS: DC[] = [
  { x: 0.08, y: 0.30, label: "LAX", size: 4 },
  { x: 0.14, y: 0.22, label: "SEA", size: 3 },
  { x: 0.18, y: 0.35, label: "IAD", size: 5 },
  { x: 0.22, y: 0.18, label: "YYZ", size: 3.5 },
  { x: 0.15, y: 0.50, label: "MIA", size: 3 },
  { x: 0.25, y: 0.65, label: "GRU", size: 5 },
  { x: 0.42, y: 0.25, label: "LHR", size: 4 },
  { x: 0.47, y: 0.22, label: "FRA", size: 5 },
  { x: 0.50, y: 0.30, label: "CDG", size: 3.5 },
  { x: 0.46, y: 0.55, label: "JNB", size: 3.5 },
  { x: 0.55, y: 0.18, label: "WAW", size: 3 },
  { x: 0.62, y: 0.32, label: "BOM", size: 4 },
  { x: 0.70, y: 0.28, label: "SIN", size: 5 },
  { x: 0.78, y: 0.22, label: "HKG", size: 4 },
  { x: 0.85, y: 0.18, label: "NRT", size: 5 },
  { x: 0.88, y: 0.55, label: "SYD", size: 4 },
  { x: 0.35, y: 0.15, label: "ICN", size: 3 },
  { x: 0.58, y: 0.45, label: "DXB", size: 3.5 },
];

// Connections
const CONNECTIONS: [number, number][] = [
  [0,1],[0,2],[0,4],[1,3],[2,3],[2,4],[2,6],[4,5],
  [5,9],[6,7],[6,8],[7,8],[7,10],[8,9],[9,17],
  [10,7],[11,12],[11,17],[12,13],[13,14],[14,15],
  [12,15],[0,14],[2,7],[5,6],[6,11],[3,16],[16,7],
  [13,12],[17,9],[17,12],
];

interface Beam {
  connIdx: number;
  progress: number;
  speed: number;
  forward: boolean;
  hue: number;
}

// Quadratic bezier helper
const qBez = (a: number, cp: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * cp + t * t * b;

const HeroBackground = () => {
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

    const beams: Beam[] = [];
    let frame = 0;
    const pulses = DATACENTERS.map(() => Math.random() * Math.PI * 2);

    // Scattered subtle particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Spawn beams
      if (frame % 18 === 0 && beams.length < 15) {
        beams.push({
          connIdx: Math.floor(Math.random() * CONNECTIONS.length),
          progress: 0,
          speed: 0.002 + Math.random() * 0.004,
          forward: Math.random() > 0.5,
          hue: 200 + Math.random() * 30,
        });
      }

      // --- Ambient particles ---
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const alpha = 0.12 + 0.08 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,160,220,${alpha})`;
        ctx.fill();
      }

      // --- Draw connections ---
      for (let ci = 0; ci < CONNECTIONS.length; ci++) {
        const [aI, bI] = CONNECTIONS[ci];
        const a = DATACENTERS[aI], b = DATACENTERS[bI];
        const ax = a.x * W, ay = a.y * H;
        const bx = b.x * W, by = b.y * H;
        const cpx = (ax + bx) / 2;
        const cpy = (ay + by) / 2 - Math.abs(bx - ax) * 0.12;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cpx, cpy, bx, by);
        ctx.strokeStyle = "rgba(50,100,170,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // --- Draw beams ---
      for (let i = beams.length - 1; i >= 0; i--) {
        const beam = beams[i];
        beam.progress += beam.speed;
        if (beam.progress >= 1) { beams.splice(i, 1); continue; }

        const [aI, bI] = CONNECTIONS[beam.connIdx];
        const from = beam.forward ? DATACENTERS[aI] : DATACENTERS[bI];
        const to = beam.forward ? DATACENTERS[bI] : DATACENTERS[aI];

        const ax = from.x * W, ay = from.y * H;
        const bx = to.x * W, by = to.y * H;
        const cpx = (ax + bx) / 2;
        const cpy = (ay + by) / 2 - Math.abs(bx - ax) * 0.12;

        const t = beam.progress;
        const px = qBez(ax, cpx, bx, t);
        const py = qBez(ay, cpy, by, t);

        // Trail (multiple points for smooth curve segment)
        const trailSteps = 6;
        const trailLen = 0.10;
        ctx.beginPath();
        for (let s = 0; s <= trailSteps; s++) {
          const st = Math.max(0, t - trailLen + (trailLen / trailSteps) * s);
          const sx = qBez(ax, cpx, bx, st);
          const sy = qBez(ay, cpy, by, st);
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        const grad = ctx.createLinearGradient(
          qBez(ax, cpx, bx, Math.max(0, t - trailLen)),
          qBez(ay, cpy, by, Math.max(0, t - trailLen)),
          px, py
        );
        grad.addColorStop(0, `hsla(${beam.hue},70%,65%,0)`);
        grad.addColorStop(1, `hsla(${beam.hue},70%,65%,0.35)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${beam.hue},70%,70%,0.7)`;
        ctx.fill();

        // Soft glow
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${beam.hue},60%,60%,0.06)`;
        ctx.fill();
      }

      // --- Draw datacenter nodes ---
      for (let i = 0; i < DATACENTERS.length; i++) {
        const dc = DATACENTERS[i];
        pulses[i] += 0.018;
        const px = dc.x * W;
        const py = dc.y * H;
        const p = 0.7 + 0.3 * Math.sin(pulses[i]);
        const sz = dc.size * p;

        // Outer glow
        ctx.beginPath();
        ctx.arc(px, py, sz * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50,120,200,${0.025 * p})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,150,230,${0.45 * p})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(px, py, sz * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,200,255,${0.7 * p})`;
        ctx.fill();

        // Label
        ctx.fillStyle = `rgba(120,170,220,${0.2 * p})`;
        ctx.font = "8px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(dc.label, px, py - sz * 2.5 - 2);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default HeroBackground;
