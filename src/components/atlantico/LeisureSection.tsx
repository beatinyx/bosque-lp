import { Carousel } from "./Carousel";
import { IconArrowRight } from "./Icons";
import { Img } from "./Img";

/**
 * As perspectivas do carrossel, na ordem do arquivo: o Figma mostrava só cinco,
 * e as demais entraram depois, direto das imagens do empreendimento. O lounge
 * externo não repete aqui porque já tem a dobra própria logo acima.
 */
const SLIDES = [
  { file: "piscina.webp", label: "Piscina" },
  { file: "salao-de-festas.webp", label: "Salão de festas" },
  { file: "churrasqueiras.webp", label: "Churrasqueiras" },
  { file: "academia.webp", label: "Academia" },
  { file: "coworking.webp", label: "Coworking" },
  { file: "pet-place.webp", label: "Pet place" },
  { file: "playground.webp", label: "Playground" },
  { file: "living.webp", label: "Estar externo" },
  { file: "redario.webp", label: "Redário" },
];

/**
 * DOBRA 4 — Lazer.
 *
 * Fundo creme (o PNG de textura do design), a manchete como imagem (a palavra
 * "querer ficar" está em lettering), a piscina em destaque, a lista de itens e
 * os quatro renders. A lista é um SVG achatado no Figma, com texto em curvas —
 * em duas versões, uma larga para o desktop e uma em duas colunas para o
 * mobile —, por isso o `alt` repete os oito itens.
 */
export function LeisureSection() {
  return (
    <section
      id="lazer"
      className="bg-[#f7ece5] bg-cover bg-center py-12 lg:pt-[68px] lg:pb-[86px]"
      style={{ backgroundImage: "url(/images/atlantico/textura-creme.webp)" }}
    >
      <div className="lp-container">
        <Img
          src="/images/atlantico/titulo-querer-ficar.png"
          alt="Um condomínio clube que te convida a querer ficar"
          label="titulo-querer-ficar.png"
          className="mx-auto h-auto w-[280px] object-contain lg:w-[337px]"
        />

        <div className="mx-auto mt-8 max-w-[1038px] lg:mt-[29px]">
          <Carousel slides={SLIDES} />

          <div className="flex justify-center py-8 lg:py-[49px]">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/images/atlantico/lista-lazer.svg"
                width="907"
                height="87"
              />
              <img
                src="/images/atlantico/lista-lazer-mobile.svg"
                alt="Piscina, salão de festas, coworking, lounge externo, playground, pet place, estar externo e bicicletário"
                width="287"
                height="131"
                className="h-auto w-[287px] lg:w-[907px]"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="text-center">
            <a
              href="#inicio"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-3.5 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
            >
              Quero morar no Atlântico
              <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
