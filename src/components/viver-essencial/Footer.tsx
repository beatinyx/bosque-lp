import { IconWhatsApp } from "./Icons";
import { Img } from "./Img";

/**
 * Rodapé da Victa na cartela do Viver Essencial: mesmo bloco do Vitória
 * Jasmim — verde-escuro liso, endereço do site em lima e o telefone dentro de
 * uma pastilha lima — em Montserrat, como no arquivo.
 *
 * O texto legal é o do próprio empreendimento, copiado do Figma publicado:
 * valor, unidade, mês da tabela e matrícula já são os oficiais.
 */
export function Footer() {
  return (
    <footer className="font-montserrat bg-victa-forest pt-[30px] pb-[34px] text-white">
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
          * A partir de R$ 261.500,00 referente à Unidade 603 Torre 02, com área privativa
          construída de 35,58 m². Preço de tabela do mês de junho de 2026. A vendedora reserva-se o
          direito de alterar o preço sem aviso prévio. O memorial de incorporação está registrado na
          matrícula nº 110.484 do Cartório de Registro de Imóveis da 3ª Zona de Fortaleza/CE, nos
          termos da Lei 4.591/64, conforme R.3/110.484. As imagens são meramente ilustrativas,
          devendo ser considerado detalhamento no memorial descritivo.
        </p>
      </div>
    </footer>
  );
}
