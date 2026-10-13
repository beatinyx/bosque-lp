import { IconWhatsApp } from "./Icons";
import { Img } from "./Img";

/**
 * Rodapé da Victa na cartela do Atlântico: fundo verde-escuro liso
 * (#00512a) em vez do degradê das outras LPs, endereço do site em lima e o
 * telefone dentro de uma pastilha lima.
 *
 * O texto legal é o do próprio empreendimento, copiado do arquivo publicado —
 * valor, unidade, mês da tabela e matrícula já são os oficiais.
 */
export function Footer() {
  return (
    <footer className="bg-victa-forest pt-[30px] pb-[34px] text-white">
      <div className="lp-container mb-[22px] flex flex-wrap items-center justify-center gap-4 sm:gap-[26px]">
        <Img
          src="/images/victa/logo-victa-verde-claro.png"
          alt="VICTA"
          label="VICTA"
          className="h-[30px] w-auto"
        />
        <span className="text-[0.95rem] font-bold text-victa-lime">victa.eng.br</span>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-victa-lime px-5 py-2.5 text-[0.95rem] font-bold text-white"
          href="https://wa.me/558535123512"
          target="_blank"
          rel="noreferrer"
        >
          <IconWhatsApp className="size-5" />
          (85) 3512-3512
        </a>
      </div>

      <div className="lp-container">
        <p className="mx-auto max-w-[780px] text-center text-[0.62rem] leading-[1.6] text-white/85 md:text-left">
          * A partir de R$ 391.073,15 referente à Unidade 107 Torre 02, com área privativa
          construída de 48,95 m². Preço de tabela do mês de outubro de 2026. A vendedora reserva-se o
          direito de alterar o preço sem aviso prévio. O memorial de incorporação está registrado na
          matrícula nº 22.015 do Cartório de Registro de Imóveis da 5ª Zona da Comarca de
          Fortaleza/CE, nos termos da Lei 4.591/64., conforme R.06/22.015. As imagens são meramente
          ilustrativas, devendo ser considerado detalhamento no memorial descritivo.
        </p>
      </div>
    </footer>
  );
}
