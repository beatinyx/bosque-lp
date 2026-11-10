import { useCallback, useEffect, useRef, useState } from "react";

import { Lightbox } from "./Lightbox";
import { Eyebrow, Heading, IconArrowLeft, IconArrowRight, SHELL } from "./ui";

type Item = {
  src: string;
  name: string;
  alt: string;
  /** Enquadramento do recorte, para os renders panorâmicos. */
  position?: string;
};

/*
 * O rooftop fica fora do carrossel, grande, ao lado da manchete que fala
 * dele. O render oficial se chama "Lounge"; o nome aqui segue o briefing.
 */
const FEATURED: Item = {
  src: "/images/vibe-cumbuco/rooftop.webp",
  name: "Rooftop com vista para o mar",
  alt: "Rooftop com mesa, lounge, churrasqueira e vista para o mar do Cumbuco",
  position: "object-[40%_center]",
};

/*
 * Perspectivas oficiais (ver public/images/vibe-cumbuco/README.md), na ordem
 * do book do KV, com a piscina na frente.
 */
const ITEMS: Item[] = [
  {
    src: "/images/vibe-cumbuco/piscina.webp",
    name: "Piscina",
    alt: "Piscina com deck de madeira, espreguiçadeiras e guarda-sóis",
  },
  {
    src: "/images/vibe-cumbuco/living.webp",
    name: "Living",
    alt: "Living do condomínio com mesas, sofá e copa",
  },
  {
    src: "/images/vibe-cumbuco/living-jogos.webp",
    name: "Living com jogos",
    alt: "Living do condomínio com pebolim, mesas e copa",
  },
  {
    src: "/images/vibe-cumbuco/salao-de-festas.webp",
    name: "Salão de festas",
    alt: "Salão de festas com mesas, cadeiras e copa",
  },
  {
    src: "/images/vibe-cumbuco/academia.webp",
    name: "Academia",
    alt: "Academia com esteiras, estação de musculação e halteres",
    position: "object-[35%_center]",
  },
  {
    src: "/images/vibe-cumbuco/coworking.webp",
    name: "Coworking",
    alt: "Coworking com estações de trabalho e sala de reunião envidraçada",
  },
  {
    src: "/images/vibe-cumbuco/brinquedoteca.webp",
    name: "Brinquedoteca",
    alt: "Brinquedoteca com piscina de bolinhas, casinha e escorregador",
    position: "object-[55%_center]",
  },
];

/* O lightbox percorre tudo: o rooftop primeiro, depois a trilha. */
const SLIDES: Item[] = [FEATURED, ...ITEMS];

/**
 * DOBRA 4 — Lazer.
 *
 * Sobretítulo "Lazer completo", a manchete do rooftop e, ao lado dela, o
 * próprio rooftop em destaque. Embaixo, as demais áreas (a piscina primeiro)
 * numa trilha horizontal com rolagem por arrasto/toque e as setas no pé, à
 * direita da nota de imagens ilustrativas. Cada foto (o destaque inclusive)
 * abre no lightbox (Lightbox.tsx), que navega pela galeria inteira.
 */
export function LeisureSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  }

  const arrow =
    "grid size-12 place-items-center rounded-full border border-brand/20 text-brand transition hover:bg-brand hover:text-brand-linen disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div data-reveal className="lg:col-span-5">
            <Eyebrow>Lazer completo</Eyebrow>
            <Heading
              lead="O privilégio de ter um Rooftop"
              accent="com vista para o mar"
              className="max-w-[16ch]"
            />
          </div>

          <figure
            data-reveal
            className="vibe-frame relative overflow-hidden bg-brand-sand [--reveal-delay:150ms] lg:col-span-7"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              aria-label={`Ampliar foto: ${FEATURED.name}`}
              className="group block w-full cursor-lupa-vibe focus-visible:outline-none"
            >
              <img
                src={FEATURED.src}
                alt={FEATURED.alt}
                width={1600}
                height={1066}
                loading="lazy"
                decoding="async"
                className={`aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[2/1] ${FEATURED.position ?? "object-center"}`}
              />
            </button>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand/70 to-transparent"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-right text-white sm:p-7">
              <span className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-tight font-light">
                {FEATURED.name}
              </span>
            </figcaption>
          </figure>
        </div>

        <div
          ref={trackRef}
          data-reveal
          onScroll={updateEdges}
          className="no-scrollbar mt-[clamp(2rem,5vw,3.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto sm:gap-5"
          aria-label="Galeria das áreas de lazer"
          role="region"
        >
          {ITEMS.map((item, i) => (
            <figure
              key={item.name}
              className="vibe-frame vibe-frame-sm relative h-[clamp(380px,44vw,540px)] w-[86%] shrink-0 snap-start overflow-hidden bg-brand-sand sm:w-[72%] lg:w-[58%]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i + 1)}
                aria-label={`Ampliar foto: ${item.name}`}
                className="group block size-full cursor-lupa-vibe focus-visible:outline-none"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={`size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.position ?? "object-center"}`}
                />
              </button>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand/70 to-transparent"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-right text-white sm:p-7">
                <span className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-tight font-light">
                  {item.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-6">
          <p className="text-[0.72rem] text-brand/50">Imagens meramente ilustrativas.</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Ver anteriores"
              onClick={() => scroll(-1)}
              disabled={edges.start}
              className={arrow}
            >
              <IconArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Ver próximos"
              onClick={() => scroll(1)}
              disabled={edges.end}
              className={arrow}
            >
              <IconArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          slides={SLIDES}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
