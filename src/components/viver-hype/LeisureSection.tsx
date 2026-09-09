import type { ComponentType, SVGProps } from "react";

import { Carousel, type Slide } from "./Carousel";
import {
  IconCourt,
  IconDumbbell,
  IconGrill,
  IconHammock,
  IconParty,
  IconPaw,
  IconPlayground,
  IconPool,
  IconSun,
} from "./Icons";

/** Perspectivas do carrossel, na ordem do design. */
const GALLERY: Slide[] = [
  { label: "Piscina", file: "piscina.webp" },
  { label: "Academia", file: "academia.webp" },
  { label: "Rooftop", file: "rooftop.webp" },
  { label: "Salão de festas", file: "salao-de-festas.webp" },
  { label: "Churrasqueira", file: "churrasqueira.webp" },
  { label: "Quadra", file: "quadra.webp" },
  { label: "Playground", file: "playground.webp" },
];

/**
 * Lista completa de lazer, em três colunas como no design.
 *
 * A ordem é a de leitura por coluna do Figma — Piscina / Salão de festas /
 * Academia na primeira, e assim por diante — e o `grid` abaixo preenche por
 * coluna (`grid-flow-col`) para manter esse agrupamento.
 */
const AMENITIES: Array<{ label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { label: "Piscina", Icon: IconPool },
  { label: "Salão de festas", Icon: IconParty },
  { label: "Academia", Icon: IconDumbbell },
  { label: "Churrasqueiras", Icon: IconGrill },
  { label: "Playground", Icon: IconPlayground },
  { label: "Quadra", Icon: IconCourt },
  { label: "Pet place", Icon: IconPaw },
  { label: "Redário", Icon: IconHammock },
  { label: "Rooftop", Icon: IconSun },
];

/** DOBRA 4 — Lazer. */
export function LeisureSection() {
  return (
    <section id="lazer" className="pb-20 lg:pb-28">
      <div className="lp-container">
        <h2 className="mx-auto max-w-[34ch] text-center text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.35] font-normal tracking-[0.02em] text-white uppercase">
          O <strong className="font-extrabold">equilíbrio perfeito</strong> entre o lazer de um
          clube e o conforto de casa
        </h2>

        <div className="mx-auto mt-8 max-w-[68ch] space-y-4 text-[0.82rem] leading-[1.8] text-brand-shell/90">
          <p>
            Esse lançamento da Victa veio para oferecer conforto, modernidade e uma localização
            privilegiada para quem busca um apartamento na Praia do Futuro com o melhor da
            beira-mar.
          </p>
          <p>
            Com um Rooftop projetado para os seus momentos de lazer, o empreendimento eleva o padrão
            da categoria ao integrar o bem-estar à brisa do mar.
          </p>
          <p>
            Com plantas de até 58,66m² e condomínio fechado, o projeto foi planejado para quem não
            abre mão da segurança e deseja um ambiente que valoriza cada m².
          </p>
        </div>
      </div>

      {/*
        O carrossel precisa do `lp-container`: a trilha sangra até a borda
        direita da tela por conta própria (ver Carousel.tsx), e é o container
        que dá a margem da esquerda e alinha o primeiro slide com o texto da
        dobra. Sem ele a trilha começava encostada na borda da página.
      */}
      <div className="lp-container mt-12">
        <Carousel slides={GALLERY} />
      </div>

      {/*
        Card da lista de lazer. Fica recuado do carrossel e chanfrado só na
        diagonal da marca; as três colunas viram uma no mobile.

        De `sm` para cima o card veste as colunas (`w-fit`) em vez de esticar
        até o container: no Figma ele é bem mais estreito que a dobra, e é a
        largura do próprio conteúdo que dá esse recorte. No mobile a coluna é
        única e o card volta a ocupar a linha toda, senão ficaria um bloco
        estreito e torto no meio da tela.
      */}
      <div className="lp-container mt-14">
        <ul className="chamfer-diag grid gap-x-10 gap-y-4 bg-brand-deepsea px-8 py-9 text-brand-shell sm:mx-auto sm:w-fit sm:grid-flow-col sm:grid-rows-3 sm:px-12 lg:px-16">
          {AMENITIES.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="size-[18px] shrink-0 text-brand-grass" />
              <span className="text-[0.9rem] leading-none font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
