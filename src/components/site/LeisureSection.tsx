import type { ComponentType, SVGProps } from "react";

import { Carousel } from "./Carousel";
import {
  IconArrowRight,
  IconBlocks,
  IconCourt,
  IconDumbbell,
  IconGrill,
  IconHammock,
  IconLaptop,
  IconLeaf,
  IconMoon,
  IconParty,
  IconPaw,
  IconPlayground,
  IconPool,
  IconSun,
} from "./Icons";

/**
 * Perspectivas das áreas de lazer — a ordem aqui é a ordem do carrossel.
 * O `file` é o nome do arquivo em /public/images.
 *
 * Só entram aqui os renders oficiais de Messejana. Os outros arquivos em
 * /public/images saíram do folder e alguns são perspectivas reaproveitadas de
 * outros produtos da Victa, então não servem para mostrar este empreendimento.
 */
const GALLERY: Array<{ label: string; file: string }> = [
  { label: "Piscina", file: "piscina.webp" },
  { label: "Churrasqueiras", file: "churrasqueira.webp" },
  { label: "Salão de festas", file: "salao-de-festas.webp" },
  { label: "Academia", file: "academia.webp" },
  { label: "Quadra esportiva", file: "quadra.webp" },
  { label: "Playground", file: "playground.webp" },
  { label: "Pet place", file: "pet-place.webp" },
  { label: "Redário", file: "redario.webp" },
  { label: "Espaço luau", file: "luau.webp" },
  { label: "Yoga e pista de cooper", file: "yoga-cooper.webp" },
  { label: "Espaço de convivência", file: "espaco-jogos.webp" },
];

/**
 * Lazer do memorial, na ordem da legenda do folder.
 *
 * São 12 dos 18 itens do memorial: a última linha da grade saiu a pedido. Os
 * que ficaram de fora — yoga e pista de cooper, horta e piquenique,
 * bicicletário, espaço de jogos, portaria e guarita, living externo — existem
 * no empreendimento, mas não aparecem mais em nenhum lugar da página.
 */
const AMENITIES: Array<{ label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { label: "Piscina adulto e infantil", Icon: IconPool },
  { label: "Solarium", Icon: IconSun },
  { label: "Salão de festas", Icon: IconParty },
  { label: "Churrasqueiras", Icon: IconGrill },
  { label: "Academia", Icon: IconDumbbell },
  { label: "Quadra esportiva", Icon: IconCourt },
  { label: "Playground", Icon: IconPlayground },
  { label: "Brinquedoteca", Icon: IconBlocks },
  { label: "Coworking", Icon: IconLaptop },
  { label: "Pet place", Icon: IconPaw },
  { label: "Redário", Icon: IconHammock },
  { label: "Espaço luau", Icon: IconMoon },
];

/** DOBRA 3 — Áreas de lazer. */
export function LeisureSection() {
  return (
    <section id="lazer" className="relative isolate overflow-hidden bg-brand text-brand-sand">
      {/*
        Grafismo de fundo da dobra: folha de monstera e mancha orgânica, no
        verde da marca. O PNG é opaco e cobre a seção inteira; o `bg-brand`
        acima continua como base para o caso de a proporção não fechar em telas
        muito altas. `object-cover` corta em vez de esticar, e a âncora à
        esquerda mantém a folha visível — é o lado onde ela está desenhada.
      */}
      <img
        src="/images/fundo-bosque.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-left select-none"
      />
      <div className="pt-16 pb-14 lg:pt-20">
        <div className="lp-container text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] text-brand-amber uppercase">
            <IconLeaf className="size-3.5 shrink-0" aria-hidden="true" />
            Lazer
          </span>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-light text-balance">
            Lazer completo para aproveitar, relaxar e{" "}
            <span className="emphasis">estar junto com a família</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[0.95rem] leading-[1.75] text-brand-sand/80">
            Criamos ambientes planejados para todas as idades, unindo diversão, descanso e segurança
            dentro de um condomínio fechado.
          </p>
        </div>
      </div>

      {/*
        O carrossel fica fora do `lp-container` de propósito: as imagens
        laterais precisam sangrar até as bordas da tela. Como filho direto da
        seção ele já nasce com a largura útil da página — usar `100vw` aqui
        deslocaria tudo alguns pixels, porque `vw` conta a barra de rolagem.
      */}
      <Carousel slides={GALLERY} />

      <div className="lp-container pb-16 lg:pb-20">
        {/*
          Lista completa do memorial, no mesmo desenho da LP do Sun In: sem
          card, direto sobre o fundo, separada por um filete, com o ícone num
          círculo vazado e o rótulo em caixa alta.
        */}
        <div className="mt-16 border-t border-brand-sand/20 pt-12">
          {/*
            No desktop são 6 colunas — os 12 itens em 2 linhas exatas. Numa
            faixa dessas o rótulo não cabe ao lado do ícone, então aqui ele vai
            embaixo, centralizado. Descendo os breakpoints o item volta a ficar
            deitado (ícone à esquerda), que é o desenho do Sun In e o que
            aproveita melhor a largura em 2 colunas ou 1.
          */}
          <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-7 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-10">
            {AMENITIES.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center justify-start gap-4 lg:flex-col lg:justify-start lg:gap-3 lg:text-center"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand-sand/30">
                  <Icon className="size-5 text-brand-sand" />
                </span>
                <span className="text-[0.8rem] leading-snug font-semibold tracking-[0.08em] text-brand-sand uppercase lg:text-[0.7rem] lg:tracking-[0.06em]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#cadastro"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-clay px-8 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition hover:brightness-105"
          >
            Quero morar no Viver Bosque
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
