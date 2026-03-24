import { Cloud } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-10">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <a href="#" className="flex items-center gap-2 text-foreground font-bold tracking-wide">
        <Cloud className="text-primary" size={22} />
        Internettools
      </a>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Internettools Cloud Computing. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
