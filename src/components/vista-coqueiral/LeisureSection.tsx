import { Carousel, type Slide } from "./Carousel";
import { Cta } from "./Cta";

/** Renders do carrossel, na ordem do desktop do Figma. */
const SLIDES: Slide[] = [
  { file: "piscina.webp", label: "Piscina" },
  { file: "academia.webp", label: "Academia" },
  { file: "beach-tennis.webp", label: "Beach tennis" },
  { file: "salao-de-festas.webp", label: "Salão de festas" },
  { file: "playground.webp", label: "Playground" },
  { file: "pet-place.webp", label: "Pet place" },
  { file: "espaco-kitesurf.webp", label: "Espaço kitesurf" },
  { file: "churrasqueira.webp", label: "Churrasqueira" },
  { file: "redario.webp", label: "Redário" },
  { file: "picnic.webp", label: "Picnic" },
];

/** Itens do quadro teal, nas duas colunas do Figma. Ícones em /icones. */
const AMENITIES: [string, string][][] = [
  [
    ["piscina", "Piscina"],
    ["beach-tennis", "Beach Tennis"],
    ["espaco-kitesurf", "Espaço Kitesurf"],
    ["salao-de-festas", "Salão de festas"],
    ["academia", "Academia"],
    ["playground", "Playground"],
  ],
  [
    ["pet-place", "Pet Place | Pet Care"],
    ["churrasqueiras", "Churrasqueiras"],
    ["coworking", "Coworking"],
    ["picnic", "Picnic"],
    ["redario", "Redário"],
  ],
];

const LEAF = "/images/vista-coqueiral/folha-coqueiro.webp";

/**
 * DOBRA 3 — Lazer.
 *
 * Fundo verde-claro com uma faixa verde-coqueiro de 488px no topo, de modo que
 * o carrossel fica metade sobre cada cor. Duas folhas de coqueiro (PNG com
 * alpha do Figma) espiam pelas bordas, atrás do conteúdo: no desktop uma no
 * alto à esquerda, girada 195°, e outra embaixo à direita; no mobile só a de
 * baixo. Abaixo do carrossel, o quadro teal com os onze itens de lazer.
 */
export function LeisureSection() {
  return (
    <section className="relative isolate overflow-clip bg-brand-sprout pt-[74px] pb-[86px] text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[488px] bg-brand" />
      <img
        src={LEAF}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[25px] left-[calc(50%-944px)] -z-10 hidden size-[739px] max-w-none rotate-[195deg] lg:block"
      />
      <img
        src={LEAF}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[902px] left-[calc(50%-29px)] -z-10 size-[385px] max-w-none lg:top-[756px] lg:left-[calc(50%+239px)] lg:size-[739px]"
      />

      <div className="lp-container text-center">
        <h2 className="mx-auto max-w-[302px] text-2xl leading-[1.2] font-normal lg:max-w-[543px] lg:text-[2rem]">
          O lazer completo de um clube particular,{" "}
          <strong className="font-bold">de frente para o mar</strong>
        </h2>

        <div className="mt-[29px] lg:mt-[31px]">
          <Carousel slides={SLIDES} />
        </div>

        <div className="mx-auto mt-[29px] flex w-full max-w-[322px] flex-col gap-1.5 rounded-tr-[40px] bg-brand-teal px-[33px] py-8 text-left lg:mt-[54px] lg:w-auto lg:max-w-none lg:flex-row lg:justify-center lg:gap-[25px] lg:px-[74px] lg:inline-flex">
          {AMENITIES.map((column, i) => (
            <ul key={i} className="flex flex-col gap-[3px] lg:justify-center">
              {column.map(([icon, label]) => (
                <li key={icon} className="flex items-center gap-[18px] text-xl leading-[1.2]">
                  <img
                    src={`/images/vista-coqueiral/icones/${icon}.svg`}
                    alt=""
                    aria-hidden="true"
                    className="size-[30px] flex-none"
                  />
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div>
          <Cta className="mt-[29px] lg:mt-[31px]">Quero conhecer</Cta>
        </div>
      </div>
    </section>
  );
}
