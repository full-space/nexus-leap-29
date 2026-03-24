import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Rodrigues",
    role: "CTO, TechNova",
    text: "A migração para a Internettools Cloud reduziu os nossos custos de infraestrutura em 40% e melhorou drasticamente o desempenho.",
  },
  {
    name: "Carlos Mendes",
    role: "Diretor de TI, LogiPrime",
    text: "O suporte 24/7 é incomparável. Sempre que precisámos de ajuda, a equipa respondeu em minutos.",
  },
  {
    name: "Sofia Almeida",
    role: "CEO, DataFlow",
    text: "A escalabilidade automática permitiu-nos lidar com picos de 10x sem qualquer degradação.",
  },
];

const logos = ["TechNova", "LogiPrime", "DataFlow", "NexGen", "CloudBridge"];

const TestimonialsSection = () => (
  <section id="testemunhos" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">04 — Testemunhos</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Confiança dos Nossos <span className="text-gradient">Clientes</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border/40 bg-card/50 p-6 flex flex-col"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>
            <div>
              <p className="font-display text-sm font-semibold">{t.name}</p>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo strip */}
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {logos.map((l) => (
          <span key={l} className="text-sm font-display font-medium tracking-wider text-muted-foreground/40 uppercase">{l}</span>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
