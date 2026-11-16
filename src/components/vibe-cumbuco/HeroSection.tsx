import { LeadForm } from "./LeadForm";
import { SHELL } from "./ui";

/**
 * DOBRA 1 — KV, tagline e formulário.
 *
 * A fachada de dia (render entregue em 2026-11-16, `fachada-hero.webp`) corre
 * de ponta a ponta. O prédio fica na metade direita do render, e o lado
 * direito do hero fica livre para ele: tudo o que é texto e o formulário
 * empilham numa coluna à esquerda, sobre o céu.
 *
 * A foto cobre o hero inteiro nos dois tamanhos. Desktop: a coluna (logo,
 * tagline e o card do formulário logo abaixo) fica centralizada na altura.
 * Celular: a coluna começa no topo e o formulário cobre a foto, que fica de
 * fundo (no recorte da torre, `fachada-hero-mobile.webp`).
 */
export function HeroSection() {
  return (
    <section className="relative">
      {/* Faixa de aviso no topo da página, no Marinho da cartela do KV. */}
      <p className="bg-brand-navy px-4 py-2.5 text-center text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase sm:text-[0.72rem]">
        Lançamento em Cumbuco
      </p>

      <div className="relative isolate overflow-hidden lg:flex lg:min-h-[min(100svh,960px)] lg:flex-col">
        <div
          className={`${SHELL} pt-10 pb-16 sm:pt-14 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-16`}
        >
          <div className="text-white">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="/images/vibe-cumbuco/fachada-hero-mobile.webp"
                />
                <img
                  src="/images/vibe-cumbuco/fachada-hero.webp"
                  alt=""
                  width={2000}
                  height={1241}
                  className="size-full object-cover object-[75%_center] lg:object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>

              {/*
                Véus em petróleo fechado, não em preto, para a foto manter o
                tom do KV. Desktop: da esquerda para a direita, segurando a
                coluna de texto e deixando o prédio limpo. Celular: mais
                fechado em cima, atrás do logo e da tagline, e embaixo, onde o
                hero encontra o box de destaques.
              */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand/70 via-brand/25 to-brand/70 lg:bg-gradient-to-r lg:from-brand/80 lg:via-brand/35 lg:via-45% lg:to-transparent lg:to-70%" />
            </div>

            <div className="@container lg:max-w-[560px]">
              <img
                src="/images/vibe-cumbuco/logo-vibe-branco.svg"
                alt="Vibe Cumbuco"
                width={544}
                height={239}
                className="mb-8 block h-auto w-[clamp(150px,15vw,220px)] max-lg:mx-auto"
              />

              {/*
                Tagline do quadro "Book · 09 · Tagline" do KV (node 656:120):
                "Leve sua rotina" em texto, a 84px, e "para ver o mar" no
                vetor da Repaiso exportado do Figma (o "P" e o resto da linha
                juntos em `tagline-para-ver-o-mar.svg`, na posição relativa do
                quadro). Todas as medidas são as do quadro divididas por 84,
                então valem em `em`: o vetor começa 2.036em à direita e
                0.631em abaixo do topo do texto, e tem 8.363em de largura. O
                conjunto mede 10.4em, e o tamanho de fonte sai da largura da
                coluna (`cqi`): no celular ocupa ~83% da coluna; do `sm` para
                cima fica em ~67% dela, e no desktop em ~85% da coluna de 560px (46px).
              */}
              <h1 className="text-[min(8cqi,4.5rem)] leading-none max-lg:mx-auto max-lg:w-fit font-extralight tracking-[-0.04em] text-[#faf5eb] [text-shadow:0_2px_30px_rgba(15,68,70,0.35)] sm:text-[min(6.4cqi,3.25rem)] lg:text-[min(8.2cqi,3.25rem)]">
                Leve sua rotina <span className="sr-only">para ver o mar</span>
                <img
                  src="/images/vibe-cumbuco/tagline-para-ver-o-mar.svg"
                  alt=""
                  aria-hidden="true"
                  width={702}
                  height={191}
                  className="-mt-[0.369em] ml-[2.036em] block h-auto w-[8.363em] max-w-none [filter:drop-shadow(0_2px_30px_rgba(15,68,70,0.35))]"
                />
              </h1>
              {/* Os diferenciais ficam no box logo abaixo do hero (HighlightsBar.tsx). */}
            </div>
          </div>

          {/*
            Card de linho do formulário, logo abaixo da tagline, sobre a foto
            nos dois tamanhos (no celular ela segue de fundo atrás dele).
          */}
          <div
            id="cadastro"
            className="vibe-frame vibe-frame-sm relative z-10 mt-8 scroll-mt-6 bg-brand-linen p-6 text-brand shadow-[0_30px_80px_-20px_rgba(15,68,70,0.45)] sm:p-8 lg:mt-10 lg:w-[460px] lg:bg-brand-linen/95 lg:p-9 lg:backdrop-blur-md"
          >
            <h2 className="mb-6 text-center text-[clamp(1.15rem,1.6vw,1.3rem)] leading-[1.25] font-light tracking-[-0.01em] text-balance">
              Garanta sua oportunidade no{" "}
              <strong className="font-medium text-brand-petrol">endereço mais desejado</strong> do
              Cumbuco
            </h2>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
