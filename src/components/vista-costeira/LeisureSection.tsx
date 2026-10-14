import { Carousel, type Slide } from "./Carousel";
import { Cta } from "./Cta";

/** Renders do carrossel, na ordem do Figma. */
const SLIDES: Slide[] = [
  { file: "piscina.webp", label: "Piscina" },
  { file: "academia.webp", label: "Academia" },
  { file: "quadra.webp", label: "Quadra" },
  { file: "bicicletario.webp", label: "Bicicletário" },
  { file: "beach-tennis.webp", label: "Beach tennis" },
  { file: "redario.webp", label: "Redário" },
  { file: "espaco-kitesurf.webp", label: "Espaço kitesurf" },
  { file: "churrasqueira.webp", label: "Churrasqueira" },
];

/** Vídeo de apresentação do produto — o mesmo embed do Figma publicado. */
const YOUTUBE_ID = "rtLTba_ngV0";

/**
 * DOBRA 4 — Lazer e vídeo.
 *
 * Fundo petróleo com duas ondas em azul mais claro (uma atrás do carrossel,
 * outra atrás do vídeo). Abaixo do carrossel, o quadro pêssego com os oito
 * itens de lazer — um SVG do Figma, com ícones e texto em curvas, em duas
 * versões (desktop e mobile); o `alt` repete os itens.
 */
export function LeisureSection() {
  return (
    <section className="relative isolate overflow-clip bg-brand pt-[75px] pb-[75px] text-white lg:pt-[84px] lg:pb-[115px]">
      <img
        src="/images/vista-costeira/onda-azul.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[422px] left-[calc(50%-310px)] -z-10 h-[385px] w-[1091px] max-w-none lg:top-[278px] lg:left-[calc(50%-1386px)] lg:h-[538px] lg:w-[2158px]"
      />
      <img
        src="/images/vista-costeira/onda-azul.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[1034px] left-[calc(50%-545px)] -z-10 h-[385px] w-[1091px] max-w-none lg:top-[1244px] lg:left-[calc(50%-872px)] lg:h-[601px] lg:w-[2410px]"
      />

      <div className="lp-container text-center">
        <h2 className="mx-auto max-w-[270px] text-2xl leading-[1.2] font-normal lg:max-w-[436px] lg:text-4xl">
          O seu resort particular <strong className="font-bold">todos os dias</strong>
        </h2>
        <p className="mx-auto mt-3 max-w-[324px] text-sm leading-[1.25] lg:mt-4 lg:max-w-[464px] lg:text-base">
          Um projeto moderno com lazer completo para toda a família se divertir sem sair de casa.
        </p>

        <div className="mt-8 lg:mt-[44px]">
          <Carousel slides={SLIDES} />
        </div>

        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/vista-costeira/lista-lazer.svg" />
          <img
            src="/images/vista-costeira/lista-lazer-mobile.svg"
            alt="Lazer: piscina, espaço kitesurf, salão de festas, pet care, coworking, car wash, bicicletário e playground"
            loading="lazy"
            className="mx-auto mt-11 block h-auto w-full max-w-[326px] lg:mt-[58px] lg:max-w-[548px]"
          />
        </picture>

        <Cta className="mt-8 lg:mt-11">Quero comprar meu apê</Cta>

        <p className="mx-auto mt-[72px] max-w-[308px] text-sm leading-[1.25] lg:mt-[62px] lg:max-w-[534px] lg:text-base">
          Assista à apresentação do <strong className="font-bold">Vista Costeira</strong> e conheça
          os detalhes do seu novo{" "}
          <strong className="font-bold">apartamento 2 quartos no Cumbuco.</strong>
        </p>

        <div className="mx-auto mt-10 aspect-video w-full max-w-[1089px] overflow-hidden lg:mt-[37px]">
          <iframe
            title="Apresentação do Vista Costeira"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block size-full border-0"
          />
        </div>

        <Cta className="mt-11 lg:mt-[58px]">Quero falar com um corretor</Cta>
      </div>
    </section>
  );
}
