import { ArrowUpRight } from "lucide-react";

const useCases = [
  {
    label: "E-commerce",
    title: "Plataforma de Alta Performance",
    description:
      "Infraestrutura escalável que suporta picos de tráfego em eventos como Black Friday sem downtime.",
    metric: "3x mais rápido",
  },
  {
    label: "FinTech",
    title: "Processamento em Tempo Real",
    description:
      "Pipeline de dados em tempo real para processamento de transações financeiras com latência mínima.",
    metric: "< 50ms latência",
  },
  {
    label: "SaaS",
    title: "Multi-tenant Escalável",
    description:
      "Arquitetura cloud-native para aplicações SaaS com isolamento de dados e escalabilidade automática.",
    metric: "99.99% uptime",
  },
];

const UseCasesSection = () => (
  <section className="py-32 px-6" id="solucoes">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="text-xs font-display font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
          Casos de Uso
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
          Construído para{" "}
          <span className="font-serif-display italic font-normal text-muted-foreground">
            Escalar
          </span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Conheça como empresas usam a Internettools para escalar suas operações com segurança e performance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {useCases.map((uc) => (
          <div
            key={uc.label}
            className="spotlight-card rounded-2xl p-8 group cursor-pointer transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="glass-panel rounded-full px-3 py-1 text-xs text-muted-foreground">
                {uc.label}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
            </div>
            <div className="mb-6">
              <span className="text-2xl font-display font-bold text-foreground">{uc.metric}</span>
            </div>
            <h3 className="text-lg font-display font-semibold mb-3">{uc.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
