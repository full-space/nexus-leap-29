const Footer = () => (
  <footer className="border-t border-border/30 py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-display font-bold text-lg tracking-tight mb-4">INTERNETTOOLS.</p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Cloud computing enterprise para equipes modernas que precisam de performance e confiabilidade.
          </p>
        </div>

        {/* Produto */}
        <div>
          <p className="text-xs font-display font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Produto
          </p>
          <ul className="space-y-2.5">
            {["Recursos", "Preços", "Changelog", "Documentação"].map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <p className="text-xs font-display font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Empresa
          </p>
          <ul className="space-y-2.5">
            {["Sobre", "Blog", "Carreiras", "Contato"].map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Internettools Cloud Computing. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          {["Privacidade", "Termos"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
