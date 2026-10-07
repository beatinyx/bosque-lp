import { useCallback, useEffect, useRef, useState } from "react";

import { IconArrowLeft, IconArrowRight, IconClose } from "./Icons";
import { Img } from "./Img";

export type Slide = {
  /** Nome do arquivo em /public/images, com extensão. */
  file: string;
  label: string;
  /** Enquadramento do recorte, ex.: `object-[50%_30%]`. Padrão: centro. */
  position?: string;
};

/**
 * Carrossel de perspectivas: um slide grande por vez, com o próximo aparecendo
 * na borda. Clicar em um slide abre o lightbox.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);

    // O fim é quando o último slide real encosta à esquerda — não quando a
    // trilha chega ao scroll máximo, que inclui o espaçador do final.
    const lastSlide = track.querySelector<HTMLElement>("[data-last-slide]");
    if (!lastSlide) return;
    setAtEnd(lastSlide.getBoundingClientRect().left - track.getBoundingClientRect().left <= 1);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const total = slides.length;

  /** Navegação do lightbox: setas do teclado e Esc, além do scroll travado. */
  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % total));
      if (event.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total));
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, total]);

  if (!total) return null;

  /** Rola a trilha em um card na direção informada (-1 anterior, 1 próximo). */
  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector("li");
    const step = slide ? slide.getBoundingClientRect().width + 16 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  const navButton =
    "pointer-events-auto grid size-12 cursor-pointer place-items-center rounded-full bg-brand text-white shadow-[0_10px_26px_rgba(0,0,0,0.35)] transition hover:brightness-105";
  const current = openIndex === null ? null : slides[openIndex];

  return (
    /*
     * A raiz mantém a largura do container (é a âncora das setas, que ficam
     * alinhadas com o resto do conteúdo). Só a trilha vaza até a borda direita
     * da tela — o `overflow-x: hidden` do body corta o que passa disso.
     */
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="no-scrollbar mr-[calc(-100vw+100%)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {slides.map((slide, index) => (
          <li
            key={slide.file}
            data-last-slide={index === total - 1 ? "" : undefined}
            className="flex-none basis-[82%] snap-start sm:basis-[72%] lg:basis-[64%]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar imagem: ${slide.label}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-white/8"
            >
              <Img
                src={`/images/atlantico/${slide.file}`}
                alt={slide.label}
                label={slide.file}
                className={`aspect-3/2 w-full object-cover transition duration-500 group-hover:scale-[1.02] ${slide.position ?? ""}`}
              />
              {/* Etiqueta sálvia do design, no canto inferior esquerdo. */}
              <span className="absolute bottom-3 left-3 bg-brand-sage px-3 py-2 text-[0.62rem] leading-none tracking-wide text-white uppercase italic sm:bottom-8 sm:left-7 sm:px-3.5 sm:py-3.5 sm:text-[0.95rem]">
                {slide.label}
              </span>
            </button>
          </li>
        ))}

        {/*
          Espaçador com a largura que sobra ao lado de um slide. Sem ele a
          trilha para de rolar cedo demais e o último slide fica cortado na
          borda, em vez de encostar à esquerda como todos os outros.
        */}
        <li aria-hidden="true" className="flex-none basis-[18%] sm:basis-[28%] lg:basis-[36%]" />
      </ul>

      {total > 1 && (
        <div className="pointer-events-none absolute right-0 -bottom-6 z-10 flex gap-2.5">
          {!atStart && (
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Imagem anterior"
              className={navButton}
            >
              <IconArrowLeft className="size-5" />
            </button>
          )}
          {!atEnd && (
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Próxima imagem"
              className={navButton}
            >
              <IconArrowRight className="size-5" />
            </button>
          )}
        </div>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/88 p-4 sm:p-8"
        >
          <img
            src={`/images/atlantico/${current.file}`}
            alt={current.label}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-full cursor-default object-contain"
          />

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-4 text-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total))}
              aria-label="Imagem anterior"
              className={navButton}
            >
              <IconArrowLeft className="size-5" />
            </button>

            <p className="min-w-[10rem] text-center text-[0.72rem] font-bold tracking-[0.14em] uppercase">
              {current.label}
              <span className="mt-1 block text-[0.68rem] font-medium tracking-normal text-white/55 normal-case">
                {openIndex! + 1} de {total}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % total))}
              aria-label="Próxima imagem"
              className={navButton}
            >
              <IconArrowRight className="size-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fechar"
            className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
          >
            <IconClose className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
