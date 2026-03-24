import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Background image */}
    <img
      src={heroBg}
      alt=""
      width={1920}
      height={1080}
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    {/* Grid */}
    <div className="absolute inset-0 grid-pattern opacity-20" />

    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase glass glow-border mb-8 text-primary">
          Cloud Computing de Nova Geração
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
          Desbloqueie o Potencial do Seu Negócio com{" "}
          <span className="text-gradient">Internettools Cloud</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Infraestrutura escalável, segura e de alto desempenho para impulsionar a transformação digital da sua empresa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-base px-8 py-6">
            Falar com Vendas
            <ArrowRight size={18} />
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
            Saber Mais
          </Button>
        </div>
      </motion.div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
