import { motion } from "framer-motion";
import { Shield, TrendingUp, Zap, DollarSign } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Escalabilidade",
    desc: "Escale recursos instantaneamente conforme a procura do seu negócio, sem interrupções.",
  },
  {
    icon: Shield,
    title: "Segurança",
    desc: "Proteção de dados de nível empresarial com encriptação ponta-a-ponta e conformidade total.",
  },
  {
    icon: DollarSign,
    title: "Eficiência de Custos",
    desc: "Pague apenas pelo que utiliza com modelos de preços flexíveis e transparentes.",
  },
  {
    icon: Zap,
    title: "Desempenho",
    desc: "Infraestrutura global de alta velocidade com latência ultra-baixa em todos os continentes.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Serviços</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
          Visão Geral dos <span className="text-gradient">Serviços</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Soluções cloud completas desenhadas para empresas de todas as dimensões.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 hover:glow-border transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-lg gradient-cta flex items-center justify-center mb-5">
              <s.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
