import { useState } from "react";
import { Menu, X, Cloud } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "SERVIÇOS", href: "#servicos" },
    { label: "BENEFÍCIOS", href: "#beneficios" },
    { label: "TESTEMUNHOS", href: "#testemunhos" },
    { label: "CONTACTO", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2.5 text-foreground font-display font-semibold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center">
            <Cloud className="text-primary-foreground" size={18} />
          </div>
          <span>Internettools</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contacto" className="text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            CONTACTO
          </a>
          <a
            href="#contacto"
            className="h-9 px-5 rounded-full gradient-cta text-primary-foreground text-xs font-semibold tracking-wider inline-flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            COMEÇAR
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 px-4 pb-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-xs font-medium tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="block mt-2 h-10 rounded-full gradient-cta text-primary-foreground text-xs font-semibold tracking-wider flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            COMEÇAR
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
