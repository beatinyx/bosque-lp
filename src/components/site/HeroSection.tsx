import { IconPin } from "./Icons";
import { Img } from "./Img";
import { LeadForm } from "./LeadForm";
import { ProductLogo } from "./ProductLogo";

/** DOBRA 1 — Produto. */
export function HeroSection() {
  return (
    <header id="inicio" className="relative isolate overflow-hidden bg-brand text-white">
      {/*
        Cena de piscina em movimento, sangrando na dobra inteira — mesmo esquema
        da dobra de condições: `poster` é um frame do próprio vídeo, então o
        enquadramento não salta quando o autoplay é bloqueado (iOS em baixo
        consumo) nem enquanto o arquivo carrega. Sem áudio: `muted` é o que
        libera o autoplay, e o arquivo foi recodificado sem faixa de som.
      */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-piscina-poster.webp"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-[50%_42%] motion-reduce:hidden"
      >
        <source src="/video/hero-piscina.mp4" type="video/mp4" />
      </video>
      {/* Mesmo frame do vídeo para quem pediu menos movimento no sistema. */}
      <Img
        src="/images/hero-piscina-poster.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full object-cover object-[50%_42%] motion-reduce:block"
        loading="eager"
        fetchPriority="high"
      />
      {/*
        Véu em duas camadas, e as duas leves de propósito.

        A cena é de dia, e é o ponto mais claro da página. Um véu forte o
        bastante para o texto se ler só com ele apagava a água e o verde — a
        dobra ficava uma mancha escura com letras em cima. A decisão foi manter
        o vídeo claro: o véu só assenta a imagem, e a leitura do texto fica por
        conta das sombras de cada bloco.

        A contrapartida está assumida: nenhum texto desta dobra alcança 4,5:1 de
        contraste. Sombra ajuda na leitura real, mas não entra no cálculo da
        WCAG. Não "conserte" escurecendo o véu sem antes conversar — já foi
        tentado, e foi recusado por apagar o vídeo.

        O escurecimento é preto, não verde: a lavagem de `brand` deixava a dobra
        monocromática. O preto preserva as cores, e a camada de marca entra por
        último só como tom.
      */}
      <div className="absolute inset-0 -z-10 bg-black/30 lg:bg-linear-to-r lg:from-black/26 lg:via-black/30 lg:via-50% lg:to-black/36" />
      <div className="absolute inset-0 -z-10 bg-brand/22" />

      <div className="lp-container flex flex-col gap-10 py-14 lg:min-h-[84vh] lg:justify-center lg:gap-14 lg:py-20">
        {/*
          Selo de lançamento + marca formam um só lockup, e ele abre a dobra
          centralizado, acima das duas colunas. A frase era uma faixa âmbar
          atravessando a página; aqui ela volta ao papel de sobretítulo, na mesma
          tipografia dos olhos das outras dobras. O `w-fit` faz o bloco medir o
          mais largo entre a frase e o logo, e é essa largura que o traço de
          divisória acompanha — no lugar do contraste de fundo que a faixa fazia.
        */}
        <div className="flex w-fit flex-col items-center gap-4 self-center">
          {/*
            Sem mancha de fundo aqui: em texto solto ela aparecia como borrão.
            A legibilidade fica por conta da sombra do próprio texto — uma bem
            fechada, que segura o traço contra a fachada clara, mais uma aberta
            que dá o descolamento. Sombra não entra no cálculo de contraste da
            WCAG, então sobre os pontos mais claros da cena este sobretítulo
            fica abaixo de 4,5:1. É o preço de deixar o fundo claro.
          */}
          {/* Sem a folha dos outros olhos: aqui ela vinha logo acima do logo,
              que já é um desenho, e as duas marcas competiam. */}
          <span className="text-[0.7rem] font-bold tracking-[0.22em] whitespace-nowrap text-brand-sand uppercase [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.7)]">
            Lançamento na Messejana
          </span>
          <span
            aria-hidden="true"
            className="h-px w-full bg-linear-to-r from-transparent via-brand-sand/45 to-transparent"
          />
          <ProductLogo variant="light" className="mt-1 h-auto w-[clamp(215px,27vw,320px)]" />
        </div>

        {/*
          Formulário à esquerda, texto à direita — abaixo do lockup. No mobile a
          ordem é outra: o texto vem primeiro e o formulário fecha a dobra, que é
          a leitura natural de uma coluna só (argumento antes do cadastro). Daí o
          `order` valer apenas no desktop.
        */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col items-start gap-8 max-lg:items-center max-lg:text-center lg:order-2">
            {/*
              Tagline da campanha, toda em Fraunces, abrindo o bloco: é ela que
              carrega o conceito, e por isso vem maior e primeiro. Aqui a
              hierarquia não vem da troca de família como no resto da página —
              vem do eixo: o corpo da frase em itálico e leve, e a palavra
              enfática em romano e mais pesada. Daí o `not-italic` nos
              `.emphasis`, que de outro modo herdariam o itálico do parágrafo.
            */}
            <p className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.14] font-light text-brand-lime italic [font-variation-settings:'SOFT'_0,'WONK'_0] [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_20px_rgba(15,47,25,0.75)]">
              Entre o <span className="emphasis font-semibold not-italic">verde e a cidade,</span>
              <br />
              um lugar para <span className="emphasis font-semibold not-italic">você</span>
            </p>

            {/*
              A manchete é a referência de endereço, dentro de uma moldura de
              traço bege com o pin da dobra de localização — apoio da tagline,
              logo abaixo dela.

              `inline-flex` para o pin e o texto ficarem na mesma linha, e a
              moldura ser uma só — num `span` inline comum a borda quebraria
              junto com a linha e sobrariam pontas abertas no meio da frase.
              O pin alinha pelo topo (não pelo centro) porque no mobile a frase
              quebra em três linhas, e centrado ele desceria para o meio do
              bloco em vez de acompanhar a primeira linha.

              A largura máxima aperta no mobile: como a caixa é `inline-flex`,
              ela cresce até o limite do h1, e na largura cheia do container
              ficava larga demais.

              Cantos retos são o padrão do `border` — não há `rounded-*` aqui
              nem herdado, então nada a desligar.
            */}
            <h1 className="max-w-[22ch] text-[clamp(1.15rem,2.1vw,1.6rem)] leading-[1.25] font-light text-white sm:max-w-[28ch] lg:max-w-[34ch] [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_28px_rgba(0,0,0,0.6)]">
              <span className="emphasis inline-flex items-start gap-2.5 border border-brand-sand px-3.5 py-2 font-normal">
                <IconPin
                  aria-hidden="true"
                  className="mt-[0.18em] size-[1.05em] shrink-0 text-brand-sand"
                />
                <span>A poucos passos da Avenida Frei Cirilo</span>
              </span>
            </h1>
          </div>

          <LeadForm />
        </div>
      </div>
    </header>
  );
}
