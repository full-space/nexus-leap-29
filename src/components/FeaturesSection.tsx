import { useRef, type ReactNode, type MouseEvent } from "react";
import { ChartColumn, Globe, Shield, Clock, Code } from "lucide-react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card rounded-2xl p-8 relative overflow-hidden group ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const features = [
  {
    icon: ChartColumn,
    title: "Analytics em Tempo Real",
    description:
      "Monitore a performance das suas aplicações em tempo real com dados granulares, alertas customizados e logs detalhados.",
    tags: ["Métricas", "Logs", "Tracing"],
    large: true,
  },
  {
    icon: Globe,
    title: "Edge Global",
    description:
      "Distribua sua lógica em locais edge pelo mundo com um clique. Reduza latência e melhore a experiência do usuário.",
    tags: ["CDN", "Serverless", "Edge"],
    large: true,
  },
  {
    icon: Shield,
    title: "Segurança Enterprise",
    description:
      "Conformidade SOC2 Type II, SSO e capacidades avançadas de RBAC para sua organização.",
    large: false,
  },
  {
    icon: Clock,
    title: "99.99% Uptime",
    description:
      "Disponibilidade garantida com infraestrutura redundante e failover automático.",
    large: false,
  },
  {
    icon: Code,
    title: "API Robusta",
    description:
      "Acesso programático completo para controlar seus recursos e automatizar workflows.",
    large: false,
  },
];

const FeaturesSection = () => (
  <section className="py-32 px-6" id="recursos">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-2xl mb-20">
        <span className="text-xs font-display font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
          Plataforma
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
          Capacidades{" "}
          <span className="font-serif-display italic font-normal text-muted-foreground">
            Poderosas
          </span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Tudo que você precisa para construir, implantar e escalar suas aplicações com confiança e facilidade.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features
          .filter((f) => f.large)
          .map((f) => (
            <SpotlightCard key={f.title} className="lg:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-display tracking-[0.15em] uppercase text-muted-foreground">
                  {f.tags?.[0]}
                </span>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                </div>
              </div>

              <div className="h-32 mb-6 rounded-xl bg-gradient-to-br from-muted/50 to-transparent flex items-center justify-center">
                <f.icon className="h-10 w-10 text-muted-foreground/40" />
              </div>

              <h3 className="text-xl font-display font-semibold mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.description}</p>

              {f.tags && (
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-panel rounded-full px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          ))}

        {/* Small cards column */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {features
            .filter((f) => !f.large)
            .map((f) => (
              <SpotlightCard key={f.title}>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <f.icon className="h-5 w-5 text-muted-foreground/60" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
