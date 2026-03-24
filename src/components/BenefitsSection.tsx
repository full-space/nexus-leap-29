import { motion } from "framer-motion";
import { Headphones, BarChart3, Puzzle, Server, Clock, Globe, Monitor } from "lucide-react";

const benefits = [
  { icon: Headphones, title: "Suporte 24/7", desc: "Equipa de especialistas disponível a qualquer hora." },
  { icon: BarChart3, title: "Análises Avançadas", desc: "Dashboards em tempo real com insights acionáveis." },
  { icon: Puzzle, title: "Integração Perfeita", desc: "Compatível com as principais plataformas do mercado." },
  { icon: Server, title: "Alta Disponibilidade", desc: "SLA de 99.99% com redundância multi-região." },
  { icon: Clock, title: "Deploy Instantâneo", desc: "Provisione ambientes completos em segundos." },
  { icon: Globe, title: "Rede Global", desc: "Presença em mais de 30 países." },
];

const BenefitsSection = () => (
  <section id="beneficios" className="py-24 relative">
    <div className="container mx-auto px-4">
      {/* System UI style header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">03 — System UI</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Construído para o{" "}
          <br />
          <span className="text-gradient">Deep Work State</span>
        </h2>
      </motion.div>

      {/* Dashboard mock + benefits grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 rounded-2xl border border-border/40 bg-card/30 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(40_80%_50%/0.6)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(120_40%_45%/0.6)]" />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center">
                <Monitor size={16} className="text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-xs font-medium text-primary tracking-wider uppercase">PAINEL ATIVO</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Projeto: Infraestrutura Cloud</p>
                <p className="text-[10px] text-muted-foreground">Velocidade: Alta • Todos os sistemas operacionais</p>
              </div>
            </div>

            {/* Mini stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Uptime", value: "99.99%" },
                { label: "Latência", value: "12ms" },
                { label: "Requests/s", value: "48.2k" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/30 bg-muted/30 p-4 text-center">
                  <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits list */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-xl border border-border/30 bg-card/30 p-4 hover:border-[hsl(var(--glow-primary)/0.15)] transition-colors"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <b.icon size={16} className="text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold">{b.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
