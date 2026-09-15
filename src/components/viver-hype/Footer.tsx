import { IconArrowRight, IconWhatsApp } from "./Icons";
import { Img } from "./Img";

/* Ver a nota em ConditionsSection.tsx. */
const CTA_HREF = "#inicio";

/**
 * Rodapé do Viver Hype.
 *
 * Diferente das outras duas LPs, o design põe um segundo CTA ("Fale com a
 * gente") logo antes do rodapé, ainda sobre a dobra clara do institucional.
 *
 * O texto legal é o do Figma, transcrito na íntegra — inclusive o valor de
 * referência e a matrícula. O original tem um espaço solto antes do ponto em
 * "abril de 2026 ." e um ponto extra em "Lei 4.591/64.,"; ambos foram
 * normalizados aqui, e nada além disso mudou.
 */
export function Footer() {
  return (
    <>
      <div className="bg-victa-mist pb-[60px] text-center">
        <a
          href={CTA_HREF}
          className="group inline-flex items-center gap-3 rounded-full bg-brand-orchid px-8 py-4 text-[0.78rem] font-extrabold tracking-[0.1em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.2)] transition hover:brightness-110"
        >
          Fale com a gente
          <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
        </a>
      </div>

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
            * A partir de R$ 266.403,00 referente à Unidade 210 Torre 02, com área privativa
            construída de 38,52 m². Preço de tabela do mês de setembro de 2026. A vendedora
            reserva-se o direito de alterar o preço sem aviso prévio. O memorial de incorporação
            está registrado na matrícula nº 6.842 do Cartório de Registro de Imóveis da 5º Zona de
            Fortaleza/CE, nos termos da Lei 4.591/64., conforme R.77/6.842. As imagens são
            meramente ilustrativas, devendo ser considerado detalhamento no memorial descritivo.
          </p>
        </div>
      </footer>
    </>
  );
}
