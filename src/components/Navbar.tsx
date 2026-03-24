import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Recursos", href: "#recursos" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Cases", href: "#depoimentos" },
    { label: "Empresa", href: "#" },
    { label: "Preços", href: "#" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 flex items-center justify-between h-14">
        <a href="#" className="font-display font-bold text-sm tracking-tight text-foreground">
          INTERNETTOOLS.
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="hidden md:inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 text-xs font-medium text-foreground hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          Fale Conosco
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-panel rounded-2xl mt-2 px-6 py-4 space-y-1 max-w-7xl mx-auto">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="block py-2.5 text-sm text-foreground font-medium"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
