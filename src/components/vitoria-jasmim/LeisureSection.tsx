import type { ComponentType, SVGProps } from "react";

import { Carousel } from "./Carousel";
import {
  IconArrowRight,
  IconBike,
  IconCourt,
  IconDumbbell,
  IconField,
  IconGrill,
  IconHammock,
  IconParty,
  IconPaw,
  IconPlayground,
  IconPool,
  IconSofa,
  IconTree,
} from "./Icons";

/**
 * Fonte única das áreas de lazer: alimenta o carrossel de perspectivas e a
 * faixa de ícones logo abaixo. A ordem é a do carrossel do Figma.
 */
const AMENITIES: Array<{
  label: string;
  file: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { label: "Piscina", file: "piscina.webp", Icon: IconPool },
  { label: "Salão de festas", file: "salao-de-festas.webp", Icon: IconParty },
  { label: "Churrasqueira", file: "churrasqueira.webp", Icon: IconGrill },
  { label: "Playground", file: "playground.webp", Icon: IconPlayground },
  { label: "Quadra gramada", file: "quadra-gramada.webp", Icon: IconField },
  { label: "Pet place", file: "pet-place.webp", Icon: IconPaw },
  { label: "Redário", file: "redario.webp", Icon: IconHammock },
  { label: "Espaço fitness", file: "espaco-fitness.webp", Icon: IconDumbbell },
  { label: "Espaço multiuso", file: "espaco-multiuso.webp", Icon: IconSofa },
  { label: "Quadra", file: "quadra.webp", Icon: IconCourt },
  { label: "Praça", file: "praca.webp", Icon: IconTree },
  { label: "Bicicletário", file: "bicicletario.webp", Icon: IconBike },
];

/*
 * O carrossel do design tem dez perspectivas — redário e espaço fitness
 * entram só na faixa de ícones, porque não há render dos dois no arquivo.
 */
const SLIDES = AMENITIES.filter(
  ({ file }) => file !== "redario.webp" && file !== "espaco-fitness.webp",
);

/** DOBRA 3 — Áreas de lazer. */
export function LeisureSection() {
  return (
    <section id="lazer" className="bg-brand py-16 text-white">
      <div className="lp-container">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.3] font-normal">
            Lazer completo <strong className="font-bold italic">para toda a família</strong>
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.35]">
            No Vitória Jasmim, o lazer faz parte da rotina. Foram criados espaços para quem quer se
            movimentar, relaxar, brincar e conviver, tudo dentro de um ambiente seguro e planejado.
          </p>
        </div>

        <div className="mt-10">
          <Carousel slides={SLIDES.map(({ file, label }) => ({ file, label }))} />
        </div>

        {/*
          Faixa de itens de lazer. No Figma ela é uma imagem achatada com os
          onze itens; aqui virou markup para escalar no mobile e ficar legível
          para leitor de tela — as pastilhas roxas sobre o verde-oliva
          reproduzem os medalhões do design.
        */}
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-3.5 rounded-[20px] bg-brand-olive px-6 py-6 sm:grid-cols-3 lg:grid-cols-4 lg:px-10">
          {AMENITIES.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Icon className="size-4" />
              </span>
              <span className="text-[0.85rem] leading-snug">{label}</span>
            </li>
          ))}
          <li className="flex items-center text-[0.85rem] font-bold tracking-wide uppercase">
            E muito mais!
          </li>
        </ul>

        <div className="mt-10 text-center">
          <a
            href="#inicio"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-3.5 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
          >
            Quero garantir o meu lugar
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
