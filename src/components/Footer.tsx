const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="it-footer" className="border-t border-border/30 py-8 px-5 text-center text-[13px] text-muted-foreground">
      <div className="links mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px]">
        <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
        <span className="text-muted-foreground/40">|</span>
        <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
        <span className="text-muted-foreground/40">|</span>
        <a href="#" className="hover:text-foreground transition-colors">Política de Cookies</a>
        <span className="text-muted-foreground/40">|</span>
        <a href="#" className="hover:text-foreground transition-colors">LGPD</a>
        <span className="text-muted-foreground/40">|</span>
        <a href="#" className="hover:text-foreground transition-colors">PUA</a>
      </div>

      <small className="block mt-1 text-muted-foreground/70">
        © {year} Internettools – Todos os direitos reservados
      </small>
      <small className="block mt-1 text-muted-foreground/70">
        Av. Paulista, 171, 4º andar – Bela Vista – São Paulo – SP – 01311-904
      </small>
      <small className="block mt-1 text-muted-foreground/70">
        CNPJ 23.360.326/0001-25
      </small>
    </footer>
  );
};

export default Footer;
