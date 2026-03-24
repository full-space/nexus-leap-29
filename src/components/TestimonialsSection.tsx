import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Rodrigues",
    role: "CTO, TechNova",
    text: "A migração para a Internettools Cloud reduziu os nossos custos de infraestrutura em 40% e melhorou drasticamente o desempenho das nossas aplicações.",
  },
  {
    name: "Carlos Mendes",
    role: "Diretor de TI, LogiPrime",
    text: "O suporte 24/7 é incomparável. Sempre que precisámos de ajuda, a equipa respondeu em minutos com soluções eficazes.",
  },
  {
    name: "Sofia Almeida",
    role: "CEO, DataFlow",
    text: "A escalabilidade automática permitiu-nos lidar com picos de 10x no tráfego sem qualquer degradação de serviço.",
  },
];

const logos = ["TechNova", "LogiPrime", "DataFlow", "NexGen", "CloudBridge", "Synthetix"];

const TestimonialsSection = () => (
  <section id="testemunhos" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Testemunhos</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">
          Confiança dos Nossos <span className="text-gradient">Clientes</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 flex flex-col"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>
            <div>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo strip */}
      <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
        {logos.map((l) => (
          <span key={l} className="text-lg font-bold tracking-wider text-silver">{l}</span>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
