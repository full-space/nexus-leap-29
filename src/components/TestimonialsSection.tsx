const testimonials = [
  {
    name: "Carlos M.",
    role: "CTO, TechBR",
    text: "A migração para a Internettools reduziu nossos custos em 40% e melhorou drasticamente a performance.",
  },
  {
    name: "Ana L.",
    role: "VP Engineering, Finova",
    text: "Uptime impecável e suporte técnico excepcional. A melhor decisão que tomamos.",
  },
  {
    name: "Roberto S.",
    role: "DevOps Lead, ScaleUp",
    text: "Deploy global em minutos. A infraestrutura edge da Internettools é game-changer.",
  },
  {
    name: "Marina P.",
    role: "CEO, DataFlow",
    text: "Segurança enterprise sem complexidade. Implementamos compliance SOC2 em semanas.",
  },
  {
    name: "João V.",
    role: "SRE, CloudFirst",
    text: "API robusta e documentação excelente. Automatizamos 90% dos nossos workflows.",
  },
  {
    name: "Luísa F.",
    role: "Founder, AppScale",
    text: "De startup a scale-up sem trocar de provider. A Internettools cresceu conosco.",
  },
];

const TestimonialCard = ({ name, role, text }: (typeof testimonials)[0]) => (
  <div className="spotlight-card rounded-2xl p-6 mx-3 min-w-[320px] max-w-[380px] flex-shrink-0">
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{text}"</p>
    <div>
      <p className="text-sm font-display font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  // Duplicate for seamless marquee
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-32 overflow-hidden" id="depoimentos">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="text-xs font-display font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Confiança de quem{" "}
            <span className="font-serif-display italic font-normal text-muted-foreground">
              escala
            </span>
          </h2>
        </div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {items.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee" style={{ animationDirection: "reverse", animationDuration: "50s" }}>
          {items.map((t, i) => (
            <TestimonialCard key={`row2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
