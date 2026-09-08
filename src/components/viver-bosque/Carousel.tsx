import { useCallback, useRef, useState } from "react";

import { IconArrowLeft, IconArrowRight } from "./Icons";
import { Img } from "./Img";
import { Lightbox, type Slide } from "./Lightbox";

export type { Slide };

/** Arrasto mínimo, em px, para contar como troca de imagem em vez de clique. */
const SWIPE_THRESHOLD = 45;

/**
 * Carrossel de perspectivas.
 *
 * A imagem atual fica no centro, em tamanho cheio, e as vizinhas aparecem dos
 * dois lados em escala reduzida, sangrando pelas bordas da tela — é o corte na
 * borda que dá a sensação de fila contínua. Para isso o componente precisa ser
 * montado fora do `lp-container`, com a largura da página inteira; as larguras
 * abaixo são porcentagens dela.
 *
 * COMO A ANIMAÇÃO FUNCIONA
 *
 * Todas as imagens ficam montadas o tempo todo, numa fila, e a troca muda só a
 * LARGURA de cada uma conforme a distância até a atual: a do centro tem a
 * largura cheia, as vizinhas a reduzida, e as demais ficam com largura zero.
 * Quem está na lateral cresce até o centro enquanto a do centro encolhe para o
 * lado, e o deslocamento sai de graça — é o próprio layout do flex reposicionando
 * os vizinhos conforme as larguras animam.
 *
 * Isso é o oposto de trocar o conteúdo com fade: nada desmonta, nada pisca, e a
 * fila inteira desliza junto. A contrapartida é animar `width`, que passa pelo
 * layout a cada quadro em vez de rodar na GPU. Nesta escala (poucos elementos,
 * uma seção) sai fluido; numa lista grande não seria a escolha.
 *
 * Os espaçadores das pontas seguem a mesma regra e existem pelo mesmo motivo de
 * antes: sem eles a imagem atual sairia do meio da tela na primeira e na última.
 *
 * Quatro formas de navegar: as setas sobre a imagem, um clique na imagem
 * lateral, o arrasto no toque e as setas do teclado dentro do lightbox. Clicar
 * na imagem central abre o lightbox.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = slides.length;

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((i) => Math.min(total - 1, Math.max(0, i + direction)));
    },
    [total],
  );

  /*
   * Arrasto: a trilha antiga rolava sozinha porque era `overflow-x: auto`, e
   * este layout não rola. Sem isto o toque perderia a navegação por gesto.
   * `swiped` impede que o mesmo gesto conte como clique e abra o lightbox.
   */
  const dragStartX = useRef<number | null>(null);
  const swiped = useRef(false);

  if (!total) return null;

  const atStart = index === 0;
  const atEnd = index === total - 1;

  function onPointerDown(event: React.PointerEvent) {
    dragStartX.current = event.clientX;
    swiped.current = false;
  }

  function onPointerUp(event: React.PointerEvent) {
    const start = dragStartX.current;
    dragStartX.current = null;
    if (start === null) return;

    const dx = event.clientX - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    swiped.current = true;
    go(dx < 0 ? 1 : -1);
  }

  /** Um clique que veio de um arrasto não deve navegar nem abrir o lightbox. */
  function handleClick(action: () => void) {
    return () => {
      if (swiped.current) {
        swiped.current = false;
        return;
      }
      action();
    };
  }

  function closeLightbox() {
    // A trilha acompanha onde o lightbox parou, senão fechar volta para trás.
    if (openIndex !== null) setIndex(openIndex);
    setOpenIndex(null);
  }

  /*
   * Larguras em % da fila. A lateral fica em torno de 46% da central, que é a
   * proporção da referência, e a soma passa de 100% de propósito — é o que faz
   * as laterais serem cortadas pelas bordas. As margens entram na conta da
   * animação junto com a largura, senão o vão entre as imagens saltaria.
   */
  const CENTER = "mx-[1.5%] w-[78%] sm:w-[64%] lg:w-[50%]";
  const PEEK = "mx-[1.5%] w-[36%] sm:w-[30%] lg:w-[23%]";
  const HIDDEN = "mx-0 w-0";

  const sizeFor = (distance: number) => (distance === 0 ? CENTER : distance === 1 ? PEEK : HIDDEN);

  const slot =
    "relative shrink-0 grow-0 overflow-hidden transition-[width,margin] duration-[420ms] ease-out motion-reduce:transition-none";

  /*
   * A FILA TEM ALTURA PRÓPRIA E FIXA, e é isso que impede o efeito sanfona.
   *
   * Cada imagem continua em 3:2, tirando a altura da própria largura — é o que
   * dá o enquadramento certo em qualquer tamanho. Só que, com a largura
   * animando, a altura delas anima junto: a central encolhe de 475 para ~365 no
   * meio do movimento e volta. Se a fila acompanhasse esse pico, a seção
   * inteira subiria e desceria a cada troca.
   *
   * Então a fila não se mede pelo conteúdo: a proporção aqui é calculada sobre
   * a largura da PÁGINA, que não muda durante a animação. Os valores saem de
   * manter a central em 3:2 quando está parada — no desktop ela ocupa 50% da
   * largura, logo a altura é 50% × 2/3 = 1/3 da página, ou seja `3/1`. Mesma
   * conta para os outros breakpoints, com 64% e 78%.
   *
   * Com `items-center`, o que encolhe no meio do caminho apenas sobra espaço
   * transparente em cima e embaixo, dentro de uma caixa que não se mexe.
   */
  const row = "aspect-[1.92/1] sm:aspect-[2.34/1] lg:aspect-[3/1]";

  /* Setas: ficam fora da fila animada, ancoradas nas bordas da imagem central.
     Como a central é centrada e tem largura conhecida, a borda dela está a
     metade dessa largura do meio — daí os `calc` por breakpoint. */
  const arrow =
    "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/70 text-white transition hover:border-brand-moss hover:bg-brand-moss disabled:cursor-default disabled:opacity-0";

  return (
    <div className="relative overflow-hidden">
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStartX.current = null)}
        className={`flex touch-pan-y items-center justify-center select-none ${row}`}
      >
        {/* Espaçador da ponta: só tem largura quando falta a vizinha da esquerda. */}
        <div aria-hidden="true" className={`${slot} ${atStart ? PEEK : HIDDEN}`} />

        {slides.map((slide, i) => {
          const distance = Math.abs(i - index);
          const isCenter = distance === 0;
          const isNeighbour = distance === 1;
          const visible = distance <= 1;

          return (
            <div key={slide.file} className={`${slot} ${sizeFor(distance)}`}>
              <button
                type="button"
                // Fora da janela a imagem tem largura zero: o botão sai da ordem
                // de tabulação para o teclado não parar em nada invisível.
                disabled={!visible}
                onClick={handleClick(() => (isCenter ? setOpenIndex(i) : go(i > index ? 1 : -1)))}
                aria-hidden={!visible}
                aria-label={
                  isCenter
                    ? `Ampliar imagem: ${slide.label}`
                    : `Ver ${i > index ? "próxima" : "anterior"} imagem: ${slide.label}`
                }
                className={`group block w-full ${isCenter ? "cursor-lupa" : "cursor-pointer"} bg-white/8`}
              >
                <Img
                  src={`/images/viver-bosque/${slide.file}`}
                  alt={isCenter ? slide.label : ""}
                  label={slide.file}
                  // A janela carrega adiantado: uma imagem que entra vindo da
                  // largura zero não tem tempo de carregar durante o movimento.
                  loading={distance <= 2 ? "eager" : "lazy"}
                  className="aspect-3/2 w-full object-cover"
                />
                {isCenter && (
                  <span className="absolute bottom-4 left-4 bg-brand-moss px-4 py-2.5 text-[0.62rem] font-bold tracking-[0.14em] text-white uppercase">
                    {slide.label}
                  </span>
                )}
              </button>
              {isNeighbour && <span className="sr-only">{slide.label}</span>}
            </div>
          );
        })}

        {/* Espaçador da outra ponta. */}
        <div aria-hidden="true" className={`${slot} ${atEnd ? PEEK : HIDDEN}`} />
      </div>

      {/*
        As setas ficam montadas nas duas pontas e apenas desaparecem quando não
        há para onde ir (`disabled:opacity-0`). Removê-las do DOM mudaria o foco
        de lugar no meio da navegação por teclado.
      */}
      <button
        type="button"
        disabled={atStart}
        onClick={() => go(-1)}
        aria-label="Imagem anterior"
        className={`${arrow} left-[calc(11%+0.75rem)] sm:left-[calc(18%+1rem)] lg:left-[calc(25%+1rem)]`}
      >
        <IconArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        disabled={atEnd}
        onClick={() => go(1)}
        aria-label="Próxima imagem"
        className={`${arrow} right-[calc(11%+0.75rem)] sm:right-[calc(18%+1rem)] lg:right-[calc(25%+1rem)]`}
      >
        <IconArrowRight className="size-5" />
      </button>

      {openIndex !== null && (
        <Lightbox
          slides={slides}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
