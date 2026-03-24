import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Grid pattern */}
    <div className="absolute inset-0 grid-pattern opacity-30" />
    {/* Radial glow */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[hsl(var(--glow-primary)/0.08)] blur-[120px]" />

    <div className="relative z-10 container mx-auto px-4 py-20">
      {/* Bento hero grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        {/* Main hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 rounded-2xl border border-border/40 bg-card/50 p-8 sm:p-12 flex flex-col justify-between min-h-[420px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--glow-primary)/0.06)] rounded-full blur-[80px]" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              Cloud Computing de Nova Geração
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              <span className="text-muted-foreground">DESBLOQUEIE O</span>
              <br />
              <span className="text-gradient">POTENCIAL DO</span>
              <br />
              <span className="text-foreground">SEU NEGÓCIO/</span>
            </h1>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Infraestrutura escalável, segura e de alto desempenho para impulsionar a transformação digital da sua empresa.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="#contacto"
              className="h-11 px-7 rounded-full gradient-cta text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Falar com Vendas
              <ArrowRight size={16} />
            </a>
            <a
              href="#servicos"
              className="h-11 px-7 rounded-full border border-border/60 text-foreground text-sm font-medium inline-flex items-center justify-center hover:bg-card transition-colors"
            >
              Saber Mais
            </a>
          </div>
        </motion.div>

        {/* Right column - stacked cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-border/40 bg-card/50 p-7 flex-1 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-primary" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">Eficiência</span>
            </div>
            <p className="font-display text-5xl font-bold text-gradient mb-1">99.99%</p>
            <p className="text-xs text-muted-foreground">Uptime garantido com SLA</p>
          </motion.div>

          {/* Vision card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-border/40 bg-card/50 p-7 flex-1 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[hsl(var(--glow-secondary)/0.06)] rounded-full blur-[60px]" />
            <div className="relative z-10">
              <h3 className="font-display text-xl font-semibold leading-tight mb-3">
                <span className="text-muted-foreground">DESIGN</span><br />
                <span className="text-foreground">YOUR OWN</span><br />
                <span className="text-gradient">CLOUD</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Soluções personalizadas que crescem com as necessidades da sua infraestrutura.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
