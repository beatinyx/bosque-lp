import type { ComponentType, SVGProps } from "react";

import { Carousel } from "./Carousel";
import {
  IconCourt,
  IconDumbbell,
  IconGrill,
  IconHammock,
  IconParty,
  IconPaw,
  IconPicnic,
  IconPlayground,
  IconPool,
  IconPouf,
} from "./Icons";

/**
 * Fonte única das áreas de lazer: alimenta o carrossel de perspectivas e a
 * lista de ícones. O `file` é o nome esperado em /public/images (sem extensão).
 */
const AMENITIES: Array<{
  label: string;
  file: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { label: "Piscina", file: "piscina.webp", Icon: IconPool },
  { label: "Salão de festas", file: "salao-de-festas.webp", Icon: IconParty },
  { label: "Churrasqueira", file: "churrasqueira.webp", Icon: IconGrill },
  { label: "Quadra", file: "quadra.webp", Icon: IconCourt },
  { label: "Playground", file: "playground.webp", Icon: IconPlayground },
  { label: "Pet place", file: "pet-place.webp", Icon: IconPaw },
  { label: "Área fitness", file: "espaco-fitness.webp", Icon: IconDumbbell },
  { label: "Espaço picnic", file: "espaco-picnic.webp", Icon: IconPicnic },
  { label: "Redário", file: "redario.webp", Icon: IconHammock },
  { label: "Espaço puff", file: "espaco-puff.webp", Icon: IconPouf },
];

/** DOBRA 3 — Áreas de lazer. */
export function LeisureSection() {
  return (
    /*
     * Color block: o bloco verde do topo e o fundo laranja da seção se encontram
     * numa virada seca, e o carrossel é puxado para cima para montar em cima
     * dessa virada. A margem negativa do carrossel define quanto dele fica sobre
     * o verde; a sobra do padding do bloco verde é o respiro entre o título e o
     * carrossel (pb-44 - mt-24 = 80px; sm: pb-56 - mt-32 = 96px).
     */
    <section id="lazer" className="bg-brand-orange">
      <div className="bg-brand pt-16 pb-44 text-brand-sand sm:pb-56 lg:pt-20">
        <div className="lp-container text-center">
          <span className="text-[0.7rem] font-bold tracking-[0.22em] text-brand-orange uppercase">
            Áreas de lazer
          </span>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-normal">
            Lazer completo para <strong className="font-extrabold">toda a família</strong>
          </h2>
        </div>
      </div>

      <div className="lp-container -mt-24 pb-16 sm:-mt-32 lg:pb-20">
        <Carousel slides={AMENITIES.map(({ file, label }) => ({ file, label }))} />

        <div className="mt-10 rounded-[0_40px_0_40px] bg-brand px-6 py-7 text-brand-sand sm:px-8">
          {/*
            Colunas dimensionadas pelo conteúdo + space-between: com colunas de
            largura igual, a última (rótulos curtos) deixava uma sobra visível na
            direita. Assim a lista encosta nas duas bordas do box.
          */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-[repeat(3,auto)] sm:justify-between lg:grid-cols-[repeat(5,auto)]">
            {AMENITIES.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-orange text-white">
                  <Icon className="size-4" />
                </span>
                <span className="text-[0.85rem] leading-snug font-semibold">{label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-white/15 pt-6 text-center text-[0.92rem] leading-[1.7]">
            São <strong className="font-extrabold">40,02 m² de área privativa</strong> bem
            distribuídos entre 2 quartos, sala, cozinha, banheiro e área de serviço.
          </p>
        </div>
      </div>
    </section>
  );
}
