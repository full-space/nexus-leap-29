import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-32 px-6" id="cta">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-exo font-bold tracking-tight mb-6">
        Pronto para{" "}
        <span className="font-serif-display italic font-normal text-muted-foreground">
          escalar?
        </span>
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
        Comece gratuitamente e escale conforme sua demanda. Sem contratos longos, sem surpresas.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 font-medium"
        >
          Começar Gratuitamente
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-full px-8 font-medium border-border/60 text-foreground hover:bg-muted"
        >
          Falar com Vendas
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
