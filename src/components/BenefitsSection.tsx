import { motion } from "framer-motion";
import { Headphones, BarChart3, Puzzle, Server, Clock, Globe } from "lucide-react";

const benefits = [
  { icon: Headphones, title: "Suporte 24/7", desc: "Equipa de especialistas disponível a qualquer hora para resolver os seus desafios." },
  { icon: BarChart3, title: "Análises Avançadas", desc: "Dashboards em tempo real com insights acionáveis sobre toda a sua infraestrutura." },
  { icon: Puzzle, title: "Integração Perfeita", desc: "Compatível com as principais ferramentas e plataformas empresariais do mercado." },
  { icon: Server, title: "Alta Disponibilidade", desc: "SLA de 99.99% com redundância multi-região e recuperação automática." },
  { icon: Clock, title: "Deploy Instantâneo", desc: "Provisione ambientes completos em segundos com automação inteligente." },
  { icon: Globe, title: "Rede Global", desc: "Pontos de presença em mais de 30 países para máxima proximidade dos utilizadores." },
];

const BenefitsSection = () => (
  <section id="beneficios" className="py-24 relative">
    <div className="absolute inset-0 gradient-hero" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Benefícios</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
          Porquê Escolher a <span className="text-gradient">Internettools</span>?
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4 p-5 rounded-xl glass hover:glow-border transition-all duration-300"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <b.icon size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
