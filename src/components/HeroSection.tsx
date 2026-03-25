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
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Datacenter nodes — normalized [0-1] positions (rough world-map projection)
    const datacenters = [
      // Americas
      { code: "GRU", label: "São Paulo",       nx: 0.33, ny: 0.72 },
      { code: "JPA", label: "João Pessoa",     nx: 0.38, ny: 0.62 },
      { code: "LIM", label: "Lima",            nx: 0.24, ny: 0.65 },
      { code: "IAD", label: "Virginia",        nx: 0.28, ny: 0.38 },
      { code: "POA", label: "Porto Alegre",    nx: 0.34, ny: 0.78 },
      { code: "BSB", label: "Brasília",        nx: 0.36, ny: 0.68 },
      { code: "EZE", label: "Buenos Aires",    nx: 0.30, ny: 0.82 },
      { code: "UDI", label: "Uberlândia",      nx: 0.35, ny: 0.70 },
      { code: "SCL", label: "Santiago",        nx: 0.26, ny: 0.80 },
      { code: "BOG", label: "Bogotá",          nx: 0.24, ny: 0.56 },
      { code: "MEX", label: "Cd. México",      nx: 0.18, ny: 0.48 },
      { code: "DFW", label: "Texas",           nx: 0.22, ny: 0.42 },
      { code: "MIA", label: "Miami",           nx: 0.26, ny: 0.46 },
      { code: "YYZ", label: "Canadá",          nx: 0.26, ny: 0.32 },
      // Europa
      { code: "LHR", label: "Londres",         nx: 0.48, ny: 0.28 },
      { code: "FRA", label: "Frankfurt",       nx: 0.52, ny: 0.30 },
      { code: "CDG", label: "Paris",           nx: 0.50, ny: 0.30 },
      { code: "AMS", label: "Amsterdã",        nx: 0.50, ny: 0.26 },
      { code: "MAD", label: "Madrid",          nx: 0.47, ny: 0.36 },
      { code: "MXP", label: "Milão",           nx: 0.53, ny: 0.33 },
      { code: "WAW", label: "Varsóvia",        nx: 0.55, ny: 0.27 },
      { code: "ARN", label: "Estocolmo",       nx: 0.54, ny: 0.20 },
      // África
      { code: "JNB", label: "Joanesburgo",     nx: 0.56, ny: 0.78 },
      { code: "CPT", label: "Cidade do Cabo",  nx: 0.53, ny: 0.84 },
      { code: "LOS", label: "Lagos",           nx: 0.49, ny: 0.58 },
      { code: "NBO", label: "Nairóbi",         nx: 0.60, ny: 0.62 },
      { code: "CAI", label: "Cairo",           nx: 0.58, ny: 0.42 },
      // Oriente Médio
      { code: "DXB", label: "Dubai",           nx: 0.65, ny: 0.46 },
      { code: "BAH", label: "Bahrein",         nx: 0.64, ny: 0.44 },
      { code: "TLV", label: "Tel Aviv",        nx: 0.59, ny: 0.40 },
      // Ásia & Oceania
      { code: "BOM", label: "Mumbai",          nx: 0.70, ny: 0.50 },
      { code: "NRT", label: "Tóquio",          nx: 0.85, ny: 0.38 },
      { code: "SIN", label: "Singapura",       nx: 0.78, ny: 0.60 },
      { code: "SYD", label: "Sydney",          nx: 0.88, ny: 0.78 },
    ];

    const links: [number, number][] = [
      // Brasil interno
      [0, 1], [0, 4], [0, 5], [0, 7], [5, 1], [4, 6], [7, 5],
      // América do Sul
      [0, 2], [6, 8], [2, 9], [0, 6],
      // LATAM norte
      [9, 10], [10, 11], [11, 12], [12, 3],
      // América do Norte
      [3, 13], [3, 11], [12, 3],
      // Transatlântico
      [3, 14], [13, 14], [3, 15],
      // Europa interna
      [14, 16], [14, 17], [15, 16], [15, 19], [16, 18], [17, 21],
      [18, 19], [19, 20], [20, 15], [21, 20],
      // Europa → África
      [18, 24], [14, 24], [18, 28],
      // África interna
      [24, 25], [22, 23], [22, 24], [25, 26], [24, 28],
      // Europa → Oriente Médio
      [19, 31], [15, 29], [28, 29], [28, 31],
      // Oriente Médio
      [29, 30], [30, 31],
      // Oriente Médio → Ásia
      [29, 32], [32, 34],
      // Ásia interna
      [32, 33], [33, 34], [34, 35],
      // África → Ásia
      [26, 32], [22, 35],
    ];

    // Light beams traveling along routes
    interface Beam { link: number; t: number; speed: number; forward: boolean }
    const beams: Beam[] = [];
    for (let i = 0; i < 18; i++) {
      beams.push({
        link: Math.floor(Math.random() * links.length),
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
        forward: Math.random() > 0.5,
      });
    }

    // Background particles
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1 + 0.3, o: Math.random() * 0.2 + 0.05,
      });
    }

    let pulse = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pulse += 0.015;

      // Background particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      }

      const getPos = (idx: number) => ({
        x: datacenters[idx].nx * w,
        y: datacenters[idx].ny * h,
      });

      // Draw links (curved)
      for (const [a, b] of links) {
        const pa = getPos(a), pb = getPos(b);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - Math.abs(pa.x - pb.x) * 0.15;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw beams
      for (const beam of beams) {
        beam.t += beam.speed;
        if (beam.t > 1) {
          beam.t = 0;
          beam.link = Math.floor(Math.random() * links.length);
          beam.forward = Math.random() > 0.5;
        }
        const [a, b] = links[beam.link];
        const pa = getPos(beam.forward ? a : b);
        const pb = getPos(beam.forward ? b : a);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - Math.abs(pa.x - pb.x) * 0.15;
        const t = beam.t;
        const x = (1 - t) * (1 - t) * pa.x + 2 * (1 - t) * t * mx + t * t * pb.x;
        const y = (1 - t) * (1 - t) * pa.y + 2 * (1 - t) * t * my + t * t * pb.y;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, "rgba(255,255,255,0.5)");
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      }

      // Draw DC nodes
      for (const dc of datacenters) {
        const x = dc.nx * w, y = dc.ny * h;
        const pulseR = 6 + Math.sin(pulse * 2) * 2;

        // Outer glow ring
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 28);
        outerGlow.addColorStop(0, "rgba(52,211,153,0.12)");
        outerGlow.addColorStop(1, "rgba(52,211,153,0)");
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Pulse ring
        ctx.beginPath();
        ctx.arc(x, y, pulseR + 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52,211,153,${0.15 + Math.sin(pulse * 2) * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(52,211,153,0.9)";
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fill();

        // Label
        ctx.font = "bold 10px Inter, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.textAlign = "center";
        ctx.fillText(dc.code, x, y - 16);

        ctx.font = "9px Inter, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillText(dc.label, x, y - 6);
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
             <span className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight leading-none" style={{ fontFamily: "'Exo 2', sans-serif" }}>
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
             <span className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight leading-none whitespace-nowrap" style={{ fontFamily: "'Exo 2', sans-serif" }}>
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
