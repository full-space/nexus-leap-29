import { useRef, useEffect } from "react";

// Simplified world map outline as path segments (normalized 0-1 coordinates)
const WORLD_PATHS: [number, number][][] = [
  // North America
  [[0.05,0.25],[0.08,0.20],[0.12,0.18],[0.18,0.17],[0.22,0.19],[0.24,0.22],[0.22,0.28],[0.20,0.32],[0.18,0.38],[0.15,0.42],[0.12,0.45],[0.10,0.48],[0.08,0.44],[0.06,0.38],[0.05,0.32]],
  // South America
  [[0.18,0.52],[0.20,0.50],[0.22,0.52],[0.24,0.56],[0.25,0.62],[0.24,0.68],[0.22,0.74],[0.20,0.78],[0.19,0.82],[0.18,0.76],[0.17,0.70],[0.16,0.64],[0.17,0.58]],
  // Europe
  [[0.42,0.18],[0.44,0.16],[0.47,0.15],[0.50,0.17],[0.52,0.20],[0.50,0.24],[0.48,0.26],[0.46,0.28],[0.44,0.26],[0.42,0.22]],
  // Africa
  [[0.44,0.32],[0.46,0.30],[0.50,0.32],[0.52,0.38],[0.54,0.44],[0.53,0.52],[0.52,0.58],[0.50,0.64],[0.48,0.68],[0.46,0.64],[0.44,0.58],[0.43,0.50],[0.42,0.44],[0.43,0.38]],
  // Asia
  [[0.55,0.15],[0.60,0.13],[0.65,0.14],[0.70,0.16],[0.75,0.18],[0.80,0.20],[0.82,0.24],[0.80,0.28],[0.78,0.32],[0.75,0.34],[0.72,0.36],[0.68,0.38],[0.65,0.36],[0.62,0.32],[0.58,0.28],[0.55,0.24],[0.54,0.20]],
  // Southeast Asia / Indonesia
  [[0.72,0.42],[0.75,0.44],[0.78,0.46],[0.80,0.48],[0.82,0.50],[0.84,0.48],[0.86,0.46]],
  // Australia
  [[0.80,0.58],[0.82,0.56],[0.86,0.55],[0.90,0.57],[0.92,0.60],[0.90,0.64],[0.88,0.68],[0.85,0.70],[0.82,0.68],[0.80,0.64]],
];

// Datacenter locations (normalized 0-1)
interface DC { x: number; y: number; label: string; size: number }
const DATACENTERS: DC[] = [
  { x: 0.12, y: 0.28, label: "IAD", size: 5 },   // Virginia
  { x: 0.08, y: 0.22, label: "SEA", size: 3.5 },  // Seattle
  { x: 0.18, y: 0.20, label: "YYZ", size: 3.5 },  // Toronto
  { x: 0.22, y: 0.58, label: "GRU", size: 5 },    // São Paulo
  { x: 0.18, y: 0.50, label: "BOG", size: 3 },    // Bogotá
  { x: 0.46, y: 0.22, label: "FRA", size: 5 },    // Frankfurt
  { x: 0.44, y: 0.18, label: "LHR", size: 4 },    // London
  { x: 0.50, y: 0.20, label: "CDG", size: 3.5 },  // Paris
  { x: 0.48, y: 0.40, label: "JNB", size: 3.5 },  // Johannesburg
  { x: 0.60, y: 0.24, label: "BOM", size: 4 },    // Mumbai
  { x: 0.68, y: 0.22, label: "SIN", size: 5 },    // Singapore
  { x: 0.75, y: 0.20, label: "HKG", size: 4 },    // Hong Kong
  { x: 0.80, y: 0.18, label: "NRT", size: 5 },    // Tokyo
  { x: 0.86, y: 0.60, label: "SYD", size: 4 },    // Sydney
  { x: 0.15, y: 0.35, label: "MIA", size: 3 },    // Miami
  { x: 0.06, y: 0.30, label: "LAX", size: 4 },    // Los Angeles
];

// Connections between datacenters (index pairs)
const CONNECTIONS: [number, number][] = [
  [0,1],[0,2],[0,3],[0,6],[0,5],[0,15],[0,14],
  [1,15],[2,6],[3,4],[3,14],
  [5,6],[5,7],[5,9],[6,7],
  [7,8],[8,9],
  [9,10],[10,11],[10,13],
  [11,12],[12,13],
  [5,12],[6,9],[3,8],
  [14,3],[14,4],[15,1],
  [10,12],[9,11],
];

interface Beam {
  connIdx: number;
  progress: number;
  speed: number;
  forward: boolean;
}

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

    // Beams
    const beams: Beam[] = [];
    let frame = 0;

    const spawnBeam = () => {
      if (beams.length > 12) return;
      const connIdx = Math.floor(Math.random() * CONNECTIONS.length);
      beams.push({
        connIdx,
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
        forward: Math.random() > 0.5,
      });
    };

    // Pulse state for DCs
    const dcPulse = DATACENTERS.map(() => Math.random() * Math.PI * 2);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Spawn beams periodically
      if (frame % 25 === 0) spawnBeam();

      // --- Draw world map outlines ---
      ctx.save();
      for (const path of WORLD_PATHS) {
        ctx.beginPath();
        for (let i = 0; i < path.length; i++) {
          const px = path[i][0] * W;
          const py = path[i][1] * H;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(60,100,180,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "rgba(40,70,140,0.03)";
        ctx.fill();
      }
      ctx.restore();

      // --- Draw connections (thin lines) ---
      for (let ci = 0; ci < CONNECTIONS.length; ci++) {
        const [a, b] = CONNECTIONS[ci];
        const ax = DATACENTERS[a].x * W, ay = DATACENTERS[a].y * H;
        const bx = DATACENTERS[b].x * W, by = DATACENTERS[b].y * H;

        // Curved line (quadratic bezier)
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2 - Math.abs(bx - ax) * 0.08;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.strokeStyle = "rgba(60,120,200,0.06)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // --- Draw beams (light pulses along connections) ---
      for (let i = beams.length - 1; i >= 0; i--) {
        const beam = beams[i];
        beam.progress += beam.speed;
        if (beam.progress >= 1) { beams.splice(i, 1); continue; }

        const [aIdx, bIdx] = CONNECTIONS[beam.connIdx];
        const fromDC = beam.forward ? DATACENTERS[aIdx] : DATACENTERS[bIdx];
        const toDC = beam.forward ? DATACENTERS[bIdx] : DATACENTERS[aIdx];

        const ax = fromDC.x * W, ay = fromDC.y * H;
        const bx = toDC.x * W, by = toDC.y * H;
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2 - Math.abs(bx - ax) * 0.08;

        // Quadratic bezier point at t
        const t = beam.progress;
        const px = (1-t)*(1-t)*ax + 2*(1-t)*t*mx + t*t*bx;
        const py = (1-t)*(1-t)*ay + 2*(1-t)*t*my + t*t*by;

        // Trail
        const trailLen = 0.12;
        const t2 = Math.max(0, t - trailLen);
        const tx = (1-t2)*(1-t2)*ax + 2*(1-t2)*t2*mx + t2*t2*bx;
        const ty = (1-t2)*(1-t2)*ay + 2*(1-t2)*t2*my + t2*t2*by;

        // Draw trail segment
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, "rgba(60,140,255,0)");
        grad.addColorStop(0.5, "rgba(80,160,255,0.15)");
        grad.addColorStop(1, "rgba(100,180,255,0.4)");

        ctx.beginPath();
        // Approximate trail with line for simplicity
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,180,255,0.6)";
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80,150,255,0.08)";
        ctx.fill();
      }

      // --- Draw datacenter nodes ---
      for (let i = 0; i < DATACENTERS.length; i++) {
        const dc = DATACENTERS[i];
        dcPulse[i] += 0.02;
        const px = dc.x * W;
        const py = dc.y * H;
        const pulse = 0.7 + 0.3 * Math.sin(dcPulse[i]);
        const sz = dc.size * pulse;

        // Outer glow
        ctx.beginPath();
        ctx.arc(px, py, sz * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60,130,255,${0.03 * pulse})`;
        ctx.fill();

        // Mid ring
        ctx.beginPath();
        ctx.arc(px, py, sz * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,150,255,${0.06 * pulse})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,170,255,${0.5 * pulse})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(px, py, sz * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,210,255,${0.8 * pulse})`;
        ctx.fill();

        // Label
        ctx.fillStyle = `rgba(140,180,220,${0.25 * pulse})`;
        ctx.font = "9px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(dc.label, px, py - sz * 2 - 4);
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
