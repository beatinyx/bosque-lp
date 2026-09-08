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
        {/* Texto legal transcrito do folder oficial do Victa Viver Bosque. */}
        <p className="mx-auto max-w-[820px] text-center text-[0.62rem] leading-[1.6] text-[rgba(223,233,207,0.8)]">
          A partir de R$ 255.900 referente à Unidade 203 Torre 01, com área privativa construída de
          38,52 m². Preço de tabela do mês de junho de 2026. A vendedora reserva-se o direito de
          alterar o preço sem aviso prévio. O memorial de incorporação está registrado na matrícula
          nº 6842 do cartório do 5º Ofício de Registro de Imóveis de Fortaleza/CE, conforme
          R.77/6842. As imagens são meramente ilustrativas, devendo ser considerado detalhamento no
          memorial descritivo.
        </p>
      </div>
    </footer>
  );
}
