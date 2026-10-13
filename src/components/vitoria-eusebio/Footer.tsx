import { IconWhatsApp } from "./Icons";
import { Img } from "./Img";

/** Rodapé padrão da Victa. */
export function Footer() {
  return (
    <footer
      className="pt-[30px] pb-[34px] text-[#dfe9cf]"
      style={{ background: "linear-gradient(180deg, #1f7a3a 0%, #17632f 100%)" }}
    >
      <div className="lp-container mb-[22px] flex flex-wrap items-center justify-center gap-4 sm:gap-[26px]">
        <Img
          src="/images/victa/logo-victa-verde-claro.png"
          alt="VICTA"
          label="VICTA"
          className="h-[30px] w-auto"
        />
        <span className="text-[0.9rem] font-medium">victa.eng.br</span>
        <a
          className="inline-flex items-center gap-2 rounded-[20px] bg-white/14 px-4 py-2 text-[0.9rem] font-semibold"
          href="https://wa.me/558535123512"
          target="_blank"
          rel="noreferrer"
        >
          <IconWhatsApp className="size-5" />
          (85) 3512-3512
        </a>
      </div>

      <div className="lp-container">
        <p className="mx-auto max-w-[780px] text-center text-[0.62rem] leading-[1.6] text-[rgba(223,233,207,0.8)]">
          * A partir de R$ 215.250,00 referente à Unidade 104 Torre 09, com área privativa
          construída de 40,02 m². Preço de tabela do mês de outubro de 2026. A vendedora reserva-se
          o direito de alterar o preço sem aviso prévio. O memorial de incorporação está registrado
          na matrícula nº 2.391 do Cartório do 2° Ofício de Notas e Registro de Imóveis da Comarca
          de Eusébio/CE, nos termos da Lei 4.591/64., conforme R.13/2.391. As imagens são meramente
          ilustrativas, devendo ser considerado detalhamento no memorial descritivo.
        </p>
      </div>
    </footer>
  );
}
