import type { ComponentType, SVGProps } from "react";

import { Carousel } from "./Carousel";
import {
  IconBasket,
  IconBike,
  IconCourt,
  IconDumbbell,
  IconGrill,
  IconHammock,
  IconParty,
  IconPaw,
  IconPlayground,
  IconPool,
} from "./Icons";

/**
 * Fonte única do lazer: o carrossel de perspectivas e a faixa de itens logo
 * abaixo saem daqui. A ordem é a do carrossel do Figma, e os quatro itens sem
 * render (`slide: false`) aparecem só na faixa — no arquivo eles também são
 * apenas texto.
 */
const AMENITIES: Array<{
  label: string;
  /** Rótulo curto da etiqueta do carrossel, quando difere do nome da faixa. */
  slide?: string;
  file?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { label: "Piscinas adulto e infantil", slide: "Piscina", file: "piscina.webp", Icon: IconPool },
  { label: "Salão de festas", file: "salao-de-festas.webp", Icon: IconParty },
  { label: "Churrasqueira", file: "churrasqueira.webp", Icon: IconGrill },
  { label: "Playground", file: "playground.webp", Icon: IconPlayground },
  {
    label: "Fitness externo",
    slide: "Espaço fitness",
    file: "espaco-fitness.webp",
    Icon: IconDumbbell,
  },
  { label: "Quadra", file: "quadra.webp", Icon: IconCourt },
  { label: "Pet place", Icon: IconPaw },
  { label: "Redário", file: "redario.webp", Icon: IconHammock },
  { label: "Horta", Icon: IconBasket },
  { label: "Bicicletário", Icon: IconBike },
];

/*
 * Posição de cada item na faixa de lazer no desktop, na divisão 4/3/3 do
 * arquivo. As células vão escritas uma a uma porque o preenchimento automático
 * da grade não chega nessa divisão — por linha ele quebra 3/3/3/1, e por
 * coluna, 4/4/2 — e porque o Tailwind precisa ver a classe inteira no código.
 * Até `lg` a lista é uma coluna (ou duas), e aí a ordem do array já resolve.
 */
const LG_CELLS = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-1 lg:row-start-4",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-2 lg:row-start-3",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-3 lg:row-start-3",
];

const SLIDES = AMENITIES.filter((item) => item.file).map((item) => ({
  file: item.file as string,
  label: item.slide ?? item.label,
}));

/** DOBRA 3 — Áreas de lazer. */
export function LeisureSection() {
  return (
    <section id="lazer" className="relative isolate overflow-hidden py-14 text-white md:py-16">
      {/* Grafismo do "V" da Victa, no canto superior direito como no arquivo */}
      <img
        src="/images/viver-essencial/grafismo-v.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-[-90px] -z-10 w-[320px] max-w-none opacity-25 select-none md:w-[440px]"
      />

      <div className="lp-container">
        <h2 className="mx-auto max-w-[24rem] text-center text-[clamp(1.5rem,4.6vw,2rem)] leading-[1.3] font-light">
          Um <strong className="font-bold">Condomínio Clube</strong> para chamar de seu
        </h2>

        <div className="mt-8">
          <Carousel slides={SLIDES} />
        </div>

        {/*
          Faixa de itens de lazer. No Figma ela é uma imagem achatada com os dez
          itens; aqui virou markup para escalar no mobile e ser lida por leitor
          de tela. Os cantos são o `0 60px 0 60px` do arquivo.
        */}
        <div className="mt-16 rounded-[0_60px_0_60px] bg-brand-aqua px-7 py-8 lg:px-12">
          {/*
            As colunas têm a largura do próprio texto e a grade inteira fica
            centralizada na faixa — com colunas de `1fr` sobrava um vão à
            direita de cada uma, porque os rótulos são curtos.
          */}
          <ul className="grid justify-center gap-x-10 gap-y-3 sm:grid-cols-[repeat(2,max-content)] lg:grid-cols-[repeat(3,max-content)] lg:gap-x-16">
            {AMENITIES.map(({ label, Icon }, index) => (
              <li key={label} className={`flex items-center gap-3 ${LG_CELLS[index]}`}>
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span className="text-[0.95rem] leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#inicio"
            className="inline-flex items-center justify-center rounded-full bg-brand-gold px-7 py-3 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
          >
            Quero ver a planta
          </a>
        </div>
      </div>
    </section>
  );
}
