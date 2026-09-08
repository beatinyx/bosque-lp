import { IconPin } from "./Icons";
import { Img } from "./Img";
import { LeadForm } from "./LeadForm";
import { ProductLogo } from "./ProductLogo";

/** DOBRA 1 — Produto. */
export function HeroSection() {
  return (
    <>
      {/*
        Selo de lançamento abrindo a página, antes do vídeo.

        Era o sobretítulo do lockup do hero, sobre a cena clara da piscina —
        onde só se lia por causa da sombra do texto e ficava abaixo de 4,5:1 de
        contraste. Numa faixa de areia sólida ele vira o primeiro elemento da
        página, sem disputar com o vídeo, e o texto sobre o bege alcança
        contraste de sobra.

        Faixa fina de propósito: é sobretítulo do produto, não manchete — a
        marca continua sendo a abertura visual, logo abaixo.
      */}
      <div className="bg-brand-sand text-brand">
        <p className="lp-container py-2.5 text-center text-[0.7rem] font-bold tracking-[0.22em] uppercase">
          Lançamento na Messejana
        </p>
      </div>

      <header id="inicio" className="relative isolate overflow-hidden bg-brand text-white">
        {/*
          Folhas de monstera ao vento, sangrando na dobra inteira. É o mesmo
          desenho do grafismo da marca, agora filmado — a folha que aparece em
          marca d'água na dobra de localização.

          Mesmo esquema da dobra de condições: `poster` é o primeiro frame do
          próprio vídeo, então o enquadramento não salta quando o autoplay é
          bloqueado (iOS em baixo consumo) nem enquanto o arquivo carrega. Sem
          áudio: `muted` é o que libera o autoplay, e o arquivo veio com faixa
          AAC, removida na recodificação.

          Enquadramento centrado, sem `object-position` deslocado: a folha
          principal está no meio do quadro e é ela que precisa sobreviver ao
          corte. No mobile, em que a dobra é muito mais alta que larga e sobra só
          a coluna do meio, é justamente ela que fica.
        */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-monstera-poster.webp"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center motion-reduce:hidden"
        >
          <source src="/video/hero-monstera.mp4" type="video/mp4" />
        </video>
        {/* Mesmo frame do vídeo para quem pediu menos movimento no sistema. */}
        <Img
          src="/images/hero-monstera-poster.webp"
          alt=""
          className="pointer-events-none absolute inset-0 -z-10 hidden size-full object-cover object-center motion-reduce:block"
          loading="eager"
          fetchPriority="high"
        />
        {/*
          Véu em duas camadas, e as duas leves de propósito.

          Os valores vêm da época do vídeo de piscina, que era uma cena de dia e
          o ponto mais claro da página: o véu tinha de ser fraco para não apagar
          a água, e a leitura do texto ficava por conta das sombras de cada
          bloco. Naquele arranjo nenhum texto da dobra alcançava 4,5:1 — era uma
          troca assumida.

          Com a cena de monstera, que é escura, a conta virou a favor. Medido
          sobre o vídeo já com os dois véus aplicados: atrás da tagline a mediana
          é 12,6:1 e o percentil 95 é 6,7:1; atrás do h1, 16:1 e 8,7:1. Só
          respingos de luz isolados nas folhas descem abaixo de 4,5:1, e é aí que
          a sombra do texto trabalha. Ou seja: o véu leve continua certo, e agora
          sem contrapartida de contraste — não há motivo para escurecer, e
          escurecer já foi tentado e recusado antes por apagar o vídeo.

          O escurecimento é preto, não verde: a lavagem de `brand` deixava a dobra
          monocromática. O preto preserva as cores, e a camada de marca entra por
          último só como tom.
        */}
        <div className="absolute inset-0 -z-10 bg-black/30 lg:bg-linear-to-r lg:from-black/26 lg:via-black/30 lg:via-50% lg:to-black/36" />
        <div className="absolute inset-0 -z-10 bg-brand/22" />

        <div className="lp-container flex flex-col gap-10 py-14 lg:min-h-[84vh] lg:justify-center lg:gap-14 lg:py-20">
          {/*
            A marca abre a dobra sozinha, centralizada acima das duas colunas. O
            sobretítulo de lançamento que vinha aqui subiu para a faixa bege no
            topo da página; sem ele, o traço de divisória perdeu a função (separava
            a frase do logo) e saiu junto.
          */}
          <ProductLogo variant="light" className="h-auto w-[clamp(215px,27vw,320px)] self-center" />

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
    </>
  );
}
