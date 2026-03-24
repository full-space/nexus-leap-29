import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Empresas" },
  { value: "4.5h", label: "Poupança Diária" },
  { value: "99.99%", label: "Uptime" },
  { value: "24/7", label: "Suporte" },
];

const StatsSection = () => (
  <section className="py-16 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border/40 bg-card/30 p-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-gradient">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
