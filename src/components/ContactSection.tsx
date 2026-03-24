import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 relative">
      <div className="absolute inset-0 gradient-hero" />
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contacto</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Pronto para <span className="text-gradient">Começar</span>?
          </h2>
          <p className="text-muted-foreground mt-4">
            Preencha o formulário e a nossa equipa entrará em contacto em menos de 24 horas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 glow-border"
        >
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mensagem Enviada!</h3>
              <p className="text-muted-foreground text-sm">Entraremos em contacto brevemente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Nome</label>
                  <Input required placeholder="O seu nome" className="bg-muted/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input required type="email" placeholder="email@empresa.com" className="bg-muted/50 border-border/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Empresa</label>
                <Input placeholder="Nome da empresa" className="bg-muted/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Mensagem</label>
                <Textarea required placeholder="Como podemos ajudar?" rows={4} className="bg-muted/50 border-border/50" />
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full text-base">
                Enviar Mensagem
                <Send size={18} />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
