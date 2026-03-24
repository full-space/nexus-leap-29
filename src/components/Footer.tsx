import { Cloud } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-8">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <a href="#" className="flex items-center gap-2 font-display font-semibold text-sm tracking-tight text-foreground">
        <div className="w-6 h-6 rounded-md gradient-cta flex items-center justify-center">
          <Cloud className="text-primary-foreground" size={13} />
        </div>
        Internettools
      </a>
      <p className="text-[10px] text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} Internettools Cloud Computing. Todos os direitos reservados.
      </p>
      <div className="flex gap-6">
        {["Privacidade", "Termos"].map((l) => (
          <a key={l} href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase">{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
