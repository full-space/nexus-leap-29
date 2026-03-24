import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-2xl border border-border/40 bg-card/50 p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[hsl(var(--glow-primary)/0.06)] rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
                DESBLOQUEIE O<br />
                <span className="text-gradient">SEU POTENCIAL.</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Junte-se a centenas de empresas que já confiam na Internettools. Estruture o seu futuro digital.
              </p>

              {/* Logos */}
              <div className="flex flex-wrap gap-4">
                {["TechNova", "LogiPrime", "DataFlow", "NexGen"].map((l) => (
                  <span key={l} className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground/40 uppercase">{l}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl border border-border/40 bg-card/50 p-8"
          >
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle size={40} className="mx-auto text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">Mensagem Enviada!</h3>
                <p className="text-xs text-muted-foreground">Entraremos em contacto brevemente.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Nome</label>
                    <Input required placeholder="O seu nome" className="bg-muted/30 border-border/40 h-11 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Email</label>
                    <Input required type="email" placeholder="email@empresa.com" className="bg-muted/30 border-border/40 h-11 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Empresa</label>
                  <Input placeholder="Nome da empresa" className="bg-muted/30 border-border/40 h-11 text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Mensagem</label>
                  <Textarea required placeholder="Como podemos ajudar?" rows={4} className="bg-muted/30 border-border/40 text-sm" />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-full gradient-cta text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Enviar Mensagem
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
