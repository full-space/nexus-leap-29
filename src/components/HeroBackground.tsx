import { useRef, useEffect } from "react";

// Simplified continent outlines (normalized 0-1 coordinates)
const CONTINENTS: { points: [number, number][]; }[] = [
  // North America
  { points: [[0.05,0.18],[0.08,0.14],[0.12,0.12],[0.16,0.10],[0.19,0.12],[0.22,0.14],[0.24,0.18],[0.23,0.22],[0.21,0.26],[0.22,0.30],[0.24,0.34],[0.22,0.36],[0.19,0.38],[0.17,0.42],[0.14,0.44],[0.12,0.42],[0.10,0.38],[0.08,0.34],[0.06,0.30],[0.05,0.26],[0.04,0.22]] },
  // South America
  { points: [[0.18,0.46],[0.20,0.44],[0.23,0.46],[0.26,0.50],[0.28,0.54],[0.29,0.58],[0.28,0.64],[0.27,0.70],[0.25,0.76],[0.23,0.80],[0.21,0.82],[0.19,0.78],[0.18,0.74],[0.17,0.68],[0.16,0.62],[0.16,0.56],[0.17,0.50]] },
  // Europe
  { points: [[0.42,0.12],[0.44,0.10],[0.47,0.09],[0.50,0.10],[0.53,0.12],[0.55,0.14],[0.54,0.18],[0.52,0.22],[0.50,0.26],[0.48,0.28],[0.45,0.26],[0.43,0.24],[0.42,0.20],[0.41,0.16]] },
  // Africa
  { points: [[0.42,0.30],[0.44,0.28],[0.47,0.30],[0.50,0.32],[0.52,0.36],[0.54,0.42],[0.55,0.48],[0.54,0.54],[0.52,0.60],[0.50,0.66],[0.48,0.70],[0.46,0.72],[0.44,0.70],[0.42,0.66],[0.40,0.60],[0.38,0.54],[0.37,0.48],[0.38,0.42],[0.39,0.36],[0.41,0.32]] },
  // Asia
  { points: [[0.55,0.10],[0.58,0.08],[0.62,0.07],[0.66,0.08],[0.70,0.10],[0.74,0.12],[0.78,0.10],[0.82,0.12],[0.85,0.14],[0.88,0.16],[0.86,0.20],[0.84,0.24],[0.80,0.28],[0.76,0.30],[0.72,0.32],[0.68,0.34],[0.64,0.36],[0.60,0.34],[0.58,0.30],[0.56,0.26],[0.55,0.22],[0.54,0.18],[0.55,0.14]] },
  // Australia
  { points: [[0.82,0.54],[0.84,0.52],[0.87,0.50],[0.90,0.52],[0.92,0.55],[0.93,0.58],[0.92,0.62],[0.90,0.65],[0.87,0.66],[0.84,0.65],[0.82,0.62],[0.81,0.58]] },
];

// Datacenter positions
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
  { x: 0.24, y: 0.62, label: "SPO", size: 4 },
  { x: 0.22, y: 0.72, label: "POA", size: 3.5 },
  { x: 0.23, y: 0.57, label: "UDI", size: 3 },
  { x: 0.18, y: 0.73, label: "SCL", size: 3.5 },
  { x: 0.17, y: 0.55, label: "BOG", size: 3.5 },
];

const CONNECTIONS: [number, number][] = [
  [0,1],[0,2],[0,4],[1,3],[2,3],[2,4],[2,6],[4,5],
  [5,9],[6,7],[6,8],[7,8],[7,10],[8,9],[9,17],
  [10,7],[11,12],[11,17],[12,13],[13,14],[14,15],
  [12,15],[0,14],[2,7],[5,6],[6,11],[3,16],[16,7],
  [13,12],[17,9],[17,12],
  [5,18],[18,19],[18,20],[18,22],[19,21],[22,4],[20,5],[21,19],
];

interface Beam {
  connIdx: number;
  progress: number;
  speed: number;
  forward: boolean;
  hue: number;
}

const qBez = (a: number, cp: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * cp + t * t * b;

const drawContinents = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
  for (const continent of CONTINENTS) {
    const pts = continent.points;
    if (pts.length < 3) continue;

    // Filled shape — very subtle
    ctx.beginPath();
    ctx.moveTo(pts[0][0] * W, pts[0][1] * H);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx = (prev[0] + curr[0]) / 2 * W;
      const cpy = (prev[1] + curr[1]) / 2 * H;
      ctx.quadraticCurveTo(prev[0] * W, prev[1] * H, cpx, cpy);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(255,140,30,0.03)";
    ctx.fill();

    // Orange outline
    ctx.beginPath();
    ctx.moveTo(pts[0][0] * W, pts[0][1] * H);
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx = (prev[0] + curr[0]) / 2 * W;
      const cpy = (prev[1] + curr[1]) / 2 * H;
      ctx.quadraticCurveTo(prev[0] * W, prev[1] * H, cpx, cpy);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,140,30,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

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

      // Draw continent outlines first (background layer)
      drawContinents(ctx, W, H);

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

      // Ambient particles
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

      // Connections
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

      // Beams
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

        const trailSteps = 6;
        const trailLen = 0.10;
        ctx.beginPath();
        for (let s = 0; s <= trailSteps; s++) {
          const st = Math.max(0, t - trailLen + (trailLen / trailSteps) * s);
          const sx = qBez(ax, cpx, bx, st);
          const sy = qBez(ay, cpy, by, st);
          if (s === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
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

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${beam.hue},70%,70%,0.7)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${beam.hue},60%,60%,0.06)`;
        ctx.fill();
      }

      // Datacenter nodes
      for (let i = 0; i < DATACENTERS.length; i++) {
        const dc = DATACENTERS[i];
        pulses[i] += 0.018;
        const px = dc.x * W;
        const py = dc.y * H;
        const p = 0.7 + 0.3 * Math.sin(pulses[i]);
        const sz = dc.size * p;

        ctx.beginPath();
        ctx.arc(px, py, sz * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50,120,200,${0.025 * p})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, sz * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,140,30,${0.25 * p})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,150,230,${0.45 * p})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, sz * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,200,255,${0.7 * p})`;
        ctx.fill();

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
