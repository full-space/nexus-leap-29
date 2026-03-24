const Footer = () => (
  <footer
    id="it-footer"
    className="text-center text-[13px] text-[#ccc] transition-colors duration-300"
    style={{ padding: '35px 20px 25px 20px' }}
  >
    <div className="links mb-[15px] text-[13px]">
      <a href="#" className="mx-2 text-inherit no-underline hover:opacity-90 transition-opacity duration-200">Política de Privacidade</a> |
      <a href="#" className="mx-2 text-inherit no-underline hover:opacity-90 transition-opacity duration-200">Termos de Uso</a> |
      <a href="#" className="mx-2 text-inherit no-underline hover:opacity-90 transition-opacity duration-200">Política de Cookies</a> |
      <a href="#" className="mx-2 text-inherit no-underline hover:opacity-90 transition-opacity duration-200">LGPD</a> |
      <a href="#" className="mx-2 text-inherit no-underline hover:opacity-90 transition-opacity duration-200">PUA</a>
    </div>

    <small className="block mt-[5px] text-[#aaa]">
      © {new Date().getFullYear()} Internettools – Todos os direitos reservados
      <br />
      Av. Paulista, 171, 4º andar – Bela Vista – São Paulo – SP – 01311-904
    </small>
    <small className="block mt-[5px] text-[#aaa] cnpj">
      CNPJ 23.360.326/0001-25
    </small>
  </footer>
);

export default Footer;
