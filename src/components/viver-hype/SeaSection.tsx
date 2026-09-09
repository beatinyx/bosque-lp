import { ChamferFrame } from "./ChamferFrame";
import { Img } from "./Img";

/**
 * DOBRA 2 — O mar como vizinho.
 *
 * Foto aérea da Praia do Futuro à esquerda, texto à direita. A aérea é uma
 * foto real, não um render do empreendimento, e não veio do Figma — enquanto
 * `praia-do-futuro-aerea.webp` não existir, entra o placeholder listrado.
 */
export function SeaSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="lp-container grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <ChamferFrame>
          <Img
            src="/images/viver-hype/praia-do-futuro-aerea.webp"
            alt="Vista aérea da Praia do Futuro, em Fortaleza"
            label="praia-do-futuro-aerea.webp"
            className="aspect-[4/3] w-full object-cover"
          />
        </ChamferFrame>

        <div>
          <h2 className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.3] font-normal tracking-[0.02em] text-white uppercase">
            O mar como seu novo vizinho
          </h2>

          <p className="mt-5 max-w-[46ch] text-[0.88rem] leading-[1.8] text-brand-shell/90">
            Viver na Praia do Futuro é unir a leveza do clima litorâneo com toda a conveniência e o
            ritmo que a sua rotina pede. Uma escolha certa para quem busca mais qualidade de vida
            todos os dias.
          </p>
        </div>
      </div>
    </section>
  );
}
