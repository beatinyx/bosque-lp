import type { ComponentType, SVGProps } from "react";

import { IconArrowRight, IconBank, IconKey, IconLeaf, IconWallet } from "./Icons";
import { Img } from "./Img";

const CONDITIONS: Array<{
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { title: "Use o seu FGTS na entrada", Icon: IconWallet },
  { title: "Financiamento facilitado pela Caixa Econômica", Icon: IconBank },
  { title: "Parcelas que cabem no seu planejamento familiar", Icon: IconKey },
];

/** DOBRA 4 — Condições. */
export function ConditionsSection() {
  return (
    <section id="condicoes" className="relative isolate overflow-hidden bg-brand py-16 lg:py-20">
      {/*
        Vídeo de folhagem como fundo da dobra.

        `poster` cobre o intervalo até o primeiro frame chegar e é o que aparece
        quando o autoplay é bloqueado (iOS em modo de baixo consumo, por
        exemplo), então a dobra nunca fica sem imagem. Sem áudio: `muted` é o que
        libera o autoplay nos navegadores, e o arquivo já foi codificado sem
        faixa de som.
      */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/folhas-poster.webp"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
      >
        <source src="/video/folhas.mp4" type="video/mp4" />
      </video>
      {/* Mesmo enquadramento do vídeo para quem pediu menos movimento no sistema. */}
      <Img
        src="/images/folhas-poster.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full object-cover motion-reduce:block"
      />

      {/*
        Véu: preto para dar contraste ao texto sem lavar o verde da folhagem,
        mais um tom de `brand` por cima para amarrar com o resto da página.
      */}
      <div className="absolute inset-0 -z-10 bg-black/62" />
      <div className="absolute inset-0 -z-10 bg-brand/48" />

      <div className="lp-container grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <Img
          src="/images/sala-de-estar.webp"
          alt="Sala de estar integrada à cozinha do apartamento"
          label="sala-de-estar.webp"
          className="chamfer chamfer-lg h-[320px] w-full object-cover shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:h-[480px]"
        />

        <div className="flex flex-col items-start text-brand-sand max-lg:items-center max-lg:text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] text-brand-amber uppercase">
            <IconLeaf className="size-3.5 shrink-0" aria-hidden="true" />
            Condições
          </span>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-light text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            As condições que faltavam para o <span className="emphasis">seu novo apê</span>
          </h2>

          <p className="mt-5 max-w-[56ch] text-[0.95rem] leading-[1.8] text-brand-sand/85">
            O Viver Bosque faz parte do programa Minha Casa, Minha Vida (com facilidades para a{" "}
            <strong className="font-bold text-white">Faixa 3</strong>). Com renda familiar a partir
            de <strong className="font-bold text-white">R$ 4.200,00</strong>, você acessa taxas de
            juros reduzidas no financiamento de apartamento em Fortaleza e transforma o valor do
            aluguel na parcela da sua própria conquista.
          </p>

          {/*
            Cada condição no seu próprio quadro de contorno fino, sem canto
            arredondado e sem preenchimento — o vídeo aparece através deles. O
            `backdrop-blur` é o que garante a leitura do texto sem precisar de
            fundo opaco: ele desfoca a folhagem em movimento atrás de cada box.
          */}
          <ul className="mt-8 flex w-full flex-col gap-3 text-left">
            {CONDITIONS.map(({ title, Icon }) => (
              <li
                key={title}
                className="flex items-center gap-4 border border-brand-cream/35 px-5 py-4 backdrop-blur-[2px] transition-colors duration-200 hover:border-brand-moss hover:bg-brand-moss sm:px-6"
              >
                <Icon className="size-6 shrink-0 text-brand-cream" />
                <span className="text-[0.95rem] leading-snug font-semibold">{title}</span>
              </li>
            ))}
          </ul>

          <a
            href="#cadastro"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-brand-clay px-7 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition hover:brightness-105"
          >
            Quero simular meu financiamento
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
