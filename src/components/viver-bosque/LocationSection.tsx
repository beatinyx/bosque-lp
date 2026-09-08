import { useState } from "react";

import { IconArrowRight, IconCar, IconLeaf, IconPin } from "./Icons";
import { Img } from "./Img";
import { Lightbox, type Slide } from "./Lightbox";

const ADDRESS = "Rua Nicolau Coelho, 200 - Messejana, Fortaleza - CE";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/** O mapa também abre no lightbox: é uma ilustração densa demais para caber
    legível na largura do mobile. */
const MAP = [
  {
    file: "mapa-messejana.webp",
    label: "Mapa ilustrado da Messejana",
  },
];

/**
 * Tempos de carro até os pontos do entorno, abaixo do texto.
 *
 * Vieram do cliente nesta ordem — do mais perto ao mais longe — e substituem as
 * duas caixas antigas ("1 km da Lagoa da Messejana" e "próximo ao Grand
 * Shopping"). Mesma função, situar o comprador; a diferença é a unidade, que
 * passou a ser minuto de carro. A Lagoa saiu com elas: não estava na lista
 * entregue.
 *
 * Com o mapa limpo (sem os números do folder), esta lista é o único lugar da
 * página que nomeia o entorno — é ela que carrega o argumento da dobra.
 */
const NEARBY = [
  { time: "1 min", place: "da Creche Irmã Zeferina Maria" },
  { time: "3 min", place: "do Detran Messejana" },
  { time: "3 min", place: "do Grand Shopping" },
  { time: "4 min", place: "da Academia Top Up 24h" },
  { time: "4 min", place: "da Padaria MM" },
  { time: "5 min", place: "do Mega Atacadista" },
  { time: "5 min", place: "do Terminal Messejana" },
  { time: "5 min", place: "das Casas Freitas" },
  { time: "5 min", place: "do Hospital do Coração" },
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
  /* Duas peças abrem no lightbox nesta dobra — a fachada e o mapa —, então o
     estado guarda qual delas está aberta em vez de um booleano só. */
  const [zoomed, setZoomed] = useState<Slide[] | null>(null);

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
        src="/images/viver-bosque/grafismo-folha.webp"
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
            onClick={() => setZoomed(FACADE)}
            aria-label="Ampliar imagem: perspectiva da fachada"
            className="chamfer chamfer-lg cursor-lupa block w-full overflow-hidden shadow-[0_18px_44px_rgba(15,47,25,0.16)]"
          >
            <Img
              src="/images/viver-bosque/fachada-vertical.webp"
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
              pontos da região, com praticidade para o dia a dia.
            </p>

            {/*
              Os pontos do entorno em minutos de carro: é o que o comprador de
              fato procura para se situar, e o argumento desta dobra.

              Eram duas caixas de moldura; com nove itens, nove molduras viravam
              uma parede de traço ao lado da fachada. Aqui cada ponto é uma linha
              separada por fio, no peso de informação — sem preenchimento nem
              sombra, para não competir com o CTA.

              Uma coluna só, mesmo sobrando largura: os nomes são longos ("da
              Creche Irmã Zeferina Maria"), e em duas colunas quase todos
              quebravam em duas linhas dentro de metade do grid.

              O tempo vai em `strong` porque é o dado — a frase inteira é a
              legenda dele.
            */}
            <ul className="mt-7 w-full divide-y divide-brand-moss/20 border-y border-brand-moss/20">
              {NEARBY.map(({ time, place }) => (
                <li
                  key={place}
                  /* #689F78 não está na paleta do folder — veio pedido direto,
                     como acento só deste hover. Por isso vai literal aqui em
                     vez de virar token `brand-*`. */
                  /* `group` porque o tempo em `strong` tem cor própria
                     (`text-brand`) e não herda o hover da linha — sem isso a
                     frase inteira acendia e só o "3 min" ficava para trás. */
                  className="group flex items-center gap-3 py-2.5 text-[0.85rem] leading-snug text-brand-sage transition-colors hover:text-[#689F78]"
                >
                  <IconCar className="size-4 shrink-0 text-brand-moss" aria-hidden="true" />
                  <span>
                    A{" "}
                    <strong className="font-bold text-brand transition-colors group-hover:text-[#689F78]">
                      {time}
                    </strong>{" "}
                    {place}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          Mapa ilustrado do folder no lugar do embed do Google.

          O embed mostrava o endereço certo, mas era um mapa genérico: nada nele
          dizia o que existe em volta, que é o argumento desta dobra. A
          ilustração oficial traz o pin do empreendimento e as vias com nome — e
          é, de longe, a peça mais bonita do material impresso.

          A versão usada é a limpa, sem os 25 pontos numerados do folder: a
          entrega veio assim, e o entorno é contado pela lista de tempos de carro
          acima. Se um dia o mapa numerado voltar, a legenda dos números precisa
          voltar com ele — o original está em
          `assets-originais/mapa-messejana-numerado-layers.png`.

          O que se perde é a interação (arrastar, dar zoom, medir rota). Isso
          fica com o link "Ver no Google Maps" logo abaixo, que passou a ser a
          única porta para o mapa real — não remova.

          A imagem inteira aparece (`w-full` sem `object-cover`): recortar uma
          ilustração com nomes de rua tira justamente a informação. Como no
          mobile ela fica pequena demais para ler, o clique abre no lightbox, no
          mesmo desenho da fachada.
        */}
        <div className="mt-14">
          <button
            type="button"
            onClick={() => setZoomed(MAP)}
            aria-label="Ampliar mapa ilustrado da Messejana"
            className="chamfer chamfer-lg cursor-lupa block w-full overflow-hidden bg-white shadow-[0_18px_44px_rgba(15,47,25,0.16)]"
          >
            <Img
              src="/images/viver-bosque/mapa-messejana.webp"
              alt={`Mapa ilustrado da Messejana com a localização do Victa Viver Bosque em ${ADDRESS}`}
              label="mapa-messejana.webp"
              className="block w-full"
            />
          </button>
        </div>

        {/*
          Endereço, link do Maps e CTA fecham a dobra, abaixo do mapa: são o
          dado exato e o passo seguinte. Com a ilustração no lugar do embed, o
          link do Maps é o único caminho para o mapa navegável — por isso ele
          segue aqui, colado ao endereço. Centralizados porque o mapa ocupa a
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
            slides={zoomed}
            index={0}
            onIndexChange={() => undefined}
            onClose={() => setZoomed(null)}
          />
        )}
      </div>
    </section>
  );
}
