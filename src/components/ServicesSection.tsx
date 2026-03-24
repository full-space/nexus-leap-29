import { motion } from "framer-motion";
import { Shield, TrendingUp, Zap, DollarSign, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    label: "CORE ENGINE",
    title: "Escalabilidade",
    desc: "Escale recursos instantaneamente conforme a procura do seu negócio, sem interrupções. Canvases que expandem infinitamente.",
    featured: true,
  },
  {
    icon: Shield,
    label: "",
    title: "Segurança",
    desc: "Proteção de dados de nível empresarial com encriptação ponta-a-ponta e conformidade total.",
    featured: false,
  },
  {
    icon: DollarSign,
    label: "",
    title: "Eficiência de Custos",
    desc: "Pague apenas pelo que utiliza com modelos de preços flexíveis e transparentes.",
    featured: false,
  },
  {
    icon: Zap,
    label: "",
    title: "Desempenho",
    desc: "Infraestrutura global de alta velocidade com latência ultra-baixa em todos os continentes.",
    featured: false,
  },
];

const ServicesSection = () => (
  <section id="servicos" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">02 — Serviços</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Estrutura para o{" "}
          <span className="text-gradient">Não-Estruturado.</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-lg">
          Um conjunto de ferramentas desenhadas para capturar oportunidades antes que desapareçam.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Featured card - spans 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 rounded-2xl border border-border/40 bg-card/50 p-8 relative overflow-hidden min-h-[280px] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[hsl(var(--glow-primary)/0.05)] rounded-full blur-[80px]" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary">CORE ENGINE</span>
              <ArrowUpRight size={16} className="text-muted-foreground" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-3">{services[0].title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{services[0].desc}</p>
          </div>
        </motion.div>

        {/* Other cards */}
        {services.slice(1).map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="rounded-2xl border border-border/40 bg-card/50 p-7 hover:border-[hsl(var(--glow-primary)/0.2)] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <s.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
