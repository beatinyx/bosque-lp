import { Img } from "./Img";

/** As quatro faixas de renda do Minha Casa, Minha Vida, como estão no Figma. */
const INCOME_RANGES = [
  "Faixa 1 - para renda de até R$2.850",
  "Faixa 2 - de R$2.850,01 até R$4.700",
  "Faixa 3 - de R$4.700,01 até R$8.600",
  "Faixa 4 - para rendas de R$8.600,01 até R$12.000",
];

/**
 * DOBRA 6 — Condições do Minha Casa, Minha Vida.
 *
 * Foto do casal na sala à esquerda, com o selo do programa encostado na
 * quina, e o texto à direita. A moldura das faixas é só um filete branco com
 * os cantos superior direito e inferior esquerdo arredondados em 30px.
 */
export function ConditionsSection() {
  return (
    <section id="condicoes" className="py-12 text-white md:py-14">
      <div className="lp-container grid items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* No mobile a foto vem depois do texto, como no breakpoint de 375 do Figma. */}
        <div className="relative max-md:order-last">
          <Img
            src="/images/viver-essencial/casal-sala.webp"
            alt="Casal na sala do apartamento"
            label="casal-sala.webp"
            /* Proporção fixa: sem ela a imagem colapsa quando a grade vira uma coluna só. */
            className="aspect-4/3 w-full rounded-[4px] object-cover"
          />
          <Img
            src="/images/viver-essencial/selo-mcmv.png"
            alt="Empreendimento do programa Minha Casa, Minha Vida"
            label="selo-mcmv.png"
            className="absolute top-8 -left-4 size-[96px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] md:-left-8 md:size-[124px]"
          />
        </div>

        <div>
          <h2 className="text-[clamp(1.5rem,4.6vw,2rem)] leading-[1.4] font-light">
            Seu apê com condições que cabem no <strong className="font-bold">seu momento</strong>
          </h2>

          <p className="mt-5 text-[clamp(0.875rem,3.6vw,1rem)] leading-[1.5]">
            O Minha Casa, Minha Vida é um programa do Governo Federal que amplia o acesso à moradia
            própria. Consulte as faixas de renda para entender em qual categoria você se enquadra e
            quais benefícios pode utilizar. Em caso de dúvida, nossa equipe está pronta para
            orientar você em cada etapa do processo.
          </p>

          <ul className="mt-6 rounded-[0_30px_0_30px] border-2 border-white px-5 py-4 text-[clamp(0.75rem,3vw,0.94rem)] leading-[1.6] font-bold">
            {INCOME_RANGES.map((range) => (
              <li key={range}>{range}</li>
            ))}
          </ul>

          <div className="mt-7">
            <a
              href="#inicio"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold px-7 py-3 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
            >
              Descubra meu perfil
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
