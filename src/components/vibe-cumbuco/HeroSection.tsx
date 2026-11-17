import { LeadForm } from "./LeadForm";
import { SHELL } from "./ui";

/**
 * DOBRA 1 — KV, tagline e formulário.
 *
 * O vídeo do kitesurf (`hero-kitesurf.mp4`, entregue em 2026-11-17; original
 * em `assets-originais/vibe-cumbuco/video/`, aqui sem áudio e recomprimido)
 * corre de ponta a ponta, em loop. A atleta fica na metade direita, e o lado
 * direito do hero fica livre para ela: tudo o que é texto e o formulário
 * empilham numa coluna à esquerda, sobre o céu. (Até 2026-11-17 o hero era a
 * fachada, que foi para a dobra 2.)
 *
 * O vídeo cobre o hero inteiro nos dois tamanhos. Desktop: a coluna (logo,
 * tagline e o card do formulário logo abaixo) fica centralizada na altura.
 * Celular: a coluna começa no topo e o formulário cobre o vídeo, que fica de
 * fundo.
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
              {/*
                A atleta fica um pouco à direita do centro do quadro. No
                desktop o vídeo é ancorado à esquerda (`object-[20%_center]`),
                o que empurra ela para a direita, longe da coluna de texto; no
                celular sobra a coluna do meio, que é onde ela está.
              */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/vibe-cumbuco/hero-kitesurf-poster.webp"
                className="size-full object-cover object-center motion-reduce:hidden lg:object-[20%_center]"
              >
                <source src="/video/vibe-cumbuco/hero-kitesurf.mp4" type="video/mp4" />
              </video>
              {/* Mesmo frame do vídeo para quem pediu menos movimento no sistema. */}
              <img
                src="/images/vibe-cumbuco/hero-kitesurf-poster.webp"
                alt=""
                width={1920}
                height={1080}
                className="hidden size-full object-cover object-center motion-reduce:block lg:object-[20%_center]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {/*
                Véus em petróleo fechado, não em preto, para a foto manter o
                tom do KV. Desktop: da esquerda para a direita, segurando a
                coluna de texto e deixando a atleta limpa. Celular: mais
                fechado em cima, atrás do logo e da tagline, e embaixo, onde o
                hero encontra o box de destaques.
              */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand/85 via-brand/45 to-brand/75 lg:bg-gradient-to-r lg:from-brand/90 lg:via-brand/65 lg:via-45% lg:to-transparent lg:to-75%" />
            </div>

            <div className="@container lg:max-w-[560px]">
              <img
                src="/images/vibe-cumbuco/logo-vibe-branco.svg"
                alt="Vibe Cumbuco"
                width={544}
                height={239}
                className="mb-8 block h-auto w-[clamp(150px,15vw,220px)] [filter:drop-shadow(0_2px_18px_rgba(8,40,42,0.55))] max-lg:mx-auto"
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
              <h1 className="text-[min(8cqi,4.5rem)] leading-none max-lg:mx-auto max-lg:w-fit font-extralight tracking-[-0.04em] text-[#faf5eb] [text-shadow:0_2px_24px_rgba(8,40,42,0.6)] sm:text-[min(6.4cqi,3.25rem)] lg:text-[min(8.2cqi,3.25rem)]">
                Leve sua rotina <span className="sr-only">para ver o mar</span>
                <img
                  src="/images/vibe-cumbuco/tagline-para-ver-o-mar.svg"
                  alt=""
                  aria-hidden="true"
                  width={702}
                  height={191}
                  className="-mt-[0.369em] ml-[2.036em] block h-auto w-[8.363em] max-w-none [filter:drop-shadow(0_2px_18px_rgba(8,40,42,0.6))]"
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
              More no{" "}
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
