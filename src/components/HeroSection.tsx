import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/HeroBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,60,140,0.08)_0%,rgba(20,40,100,0.04)_35%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(50,30,120,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(30,100,180,0.04)_0%,transparent_45%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-exo font-bold tracking-tight leading-none">
              CLOUD
            </span>
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-serif-display italic tracking-tight leading-none text-muted-foreground">
              Infrastructure
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-serif-display italic tracking-tight leading-none text-muted-foreground">
              for
            </span>
            <span className="text-[clamp(2.5rem,8vw,7rem)] font-exo font-bold tracking-tight leading-none whitespace-nowrap">
              MODERN TEAMS
            </span>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 text-xs text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Internettools AI — Agora Disponível
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Escale sua{" "}
          <span className="font-serif-display italic text-foreground text-2xl md:text-3xl">
            infraestrutura
          </span>{" "}
          instantaneamente.
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-medium"
          asChild
        >
          <a href="#cta">
            Começar Gratuitamente
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
