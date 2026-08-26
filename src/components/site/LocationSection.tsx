import { useState } from "react";

import { IconArrowRight, IconLeaf, IconPin } from "./Icons";
import { Img } from "./Img";
import { Lightbox } from "./Lightbox";

const ADDRESS = "Rua Nicolau Coelho, 200 - Messejana, Fortaleza - CE";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
/** Embed sem chave de API; o link abre o mesmo endereço no Google Maps. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&hl=pt-BR&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/** Pontos de referência do entorno, destacados em caixas abaixo do texto. */
const NEARBY = [
  { distance: "1 km", place: "da Lagoa da Messejana" },
  { distance: "Próximo", place: "ao Grand Shopping Messejana" },
];

/** A fachada abre no lightbox; o mesmo componente do carrossel, com um item só. */
const FACADE = [
  {
    file: "fachada-vertical.webp",
    label: "Perspectiva da fachada",
  },
];

/** DOBRA 2 — Localização. */
export function LocationSection() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <section
      id="localizacao"
      className="relative isolate overflow-hidden bg-brand-sand py-16 lg:py-20"
    >
      {/*
        Grafismo da folha de monstera como marca d'água. O PNG de origem já vem
        com alpha baixo (~16%), então não precisa de opacidade extra aqui.

        Ancorado no topo, à esquerda. É o lado da foto da fachada, que é opaca —
        então o que aparece é a folha na calha lateral, fora do `lp-container`,
        sem chegar perto da coluna de texto, que fica à direita.

        Espelhado na horizontal (`-scale-x-100`) para o talo apontar para o
        canto: no desenho original ele cresce da direita para a esquerda.

        O tamanho é bem menor que o original de 48rem — naquela medida a caixa
        da folha ficava com 987×1267 depois da rotação, mais alta que a seção
        inteira, e cobria tudo.
      */}
      <img
        src="/images/grafismo-folha.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-24 -z-10 w-[18rem] max-w-none -scale-x-100 rotate-12 select-none sm:-left-32 sm:w-[24rem] lg:-top-24 lg:-left-40 lg:w-[30rem]"
      />

      <div className="lp-container">
        {/*
          Fachada à esquerda, discurso à direita. O `items-stretch` do grid é o
          que faz a foto acompanhar a altura da coluna de texto no desktop, em
          vez de as duas terminarem em alturas diferentes; o `min-h` cobre o
          caso oposto, de um texto curto demais deixar a foto achatada.
        */}
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label="Ampliar imagem: perspectiva da fachada"
            className="chamfer chamfer-lg cursor-lupa block w-full overflow-hidden shadow-[0_18px_44px_rgba(15,47,25,0.16)]"
          >
            <Img
              src="/images/fachada-vertical.webp"
              alt="Perspectiva da fachada do Victa Viver Bosque ao pôr do sol"
              label="fachada-vertical.webp"
              className="h-[300px] w-full object-cover sm:h-[420px] lg:h-full lg:min-h-[440px]"
            />
          </button>

          {/* `justify-center` alinha o texto pelo meio da foto, que é bem mais
              alta que ele — encostado no topo o bloco ficava desequilibrado. */}
          <div className="flex flex-col items-start justify-center">
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] text-brand-moss uppercase">
              <IconLeaf className="size-3.5 shrink-0" aria-hidden="true" />
              Localização
            </span>
            <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-light text-balance text-brand">
              More no <span className="emphasis">melhor da Messejana</span>
            </h2>

            <p className="mt-6 text-[0.95rem] leading-[1.8] text-brand-sage">
              O <strong className="font-bold text-brand">Viver Bosque</strong> coloca você no ponto
              mais prático da região. Perto de comércios, serviços, restaurantes e dos principais
              pontos da região, com praticidade para o dia a dia. Além de um entorno que traz mais
              leveza à rotina.
            </p>

            {/*
              Os dois pontos de referência do entorno, destacados do parágrafo:
              é o que o comprador de fato procura para se situar. Moldura de
              traço, sem preenchimento nem sombra, para não competirem com o
              CTA — o peso aqui é de informação, não de ação.
            */}
            <ul className="mt-7 grid w-full gap-3 sm:grid-cols-2">
              {NEARBY.map(({ distance, place }) => (
                <li
                  key={place}
                  /* #689F78 não está na paleta do folder — veio pedido direto,
                     como acento só deste hover. Por isso vai literal aqui em
                     vez de virar token `brand-*`. */
                  className="flex items-start gap-3 border border-brand-moss/35 px-5 py-4 text-brand-sage transition-colors hover:border-[#689F78]"
                >
                  <IconPin className="mt-0.5 size-4 shrink-0 text-brand-moss" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.95rem] leading-tight font-bold text-brand">
                      {distance}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug">{place}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mapa interativo do endereço da obra. O embed do Google não pede chave de API. */}
        <div className="chamfer chamfer-lg mt-14 overflow-hidden bg-white shadow-[0_18px_44px_rgba(15,47,25,0.16)]">
          <iframe
            title={`Mapa de localização do Victa Viver Bosque — ${ADDRESS}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[22rem] w-full border-0 sm:h-[30rem]"
          />
        </div>

        {/*
          Endereço, link do Maps e CTA fecham a dobra, abaixo do mapa: são a
          legenda dele e o passo seguinte. Centralizados porque o mapa ocupa a
          largura toda — alinhados à esquerda ficariam soltos sob uma peça que
          não tem coluna.
        */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <p className="flex items-start gap-2 text-[0.88rem] leading-snug font-semibold text-brand">
            <IconPin className="mt-px size-4 shrink-0 text-brand-moss" />
            {ADDRESS}
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-extrabold text-brand-moss underline-offset-4 hover:underline"
          >
            Ver no Google Maps
            <IconArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-11 text-center">
          <a
            href="#cadastro"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-clay px-8 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(15,47,25,0.2)] transition hover:brightness-105"
          >
            Quero morar na Messejana
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>

        {zoomed && (
          <Lightbox
            slides={FACADE}
            index={0}
            onIndexChange={() => undefined}
            onClose={() => setZoomed(false)}
          />
        )}
      </div>
    </section>
  );
}
