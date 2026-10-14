import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { IconArrowLeft, IconArrowRight } from "./Icons";

export type Slide = {
  /** Nome do arquivo em /public/images/vista-coqueiral, com extensão. */
  file: string;
  label: string;
};

const src = (file: string) => `/images/vista-coqueiral/${file}`;

/*
 * Geometria do desktop, em px, tirada do Figma (frame de 1920): o render
 * ativo tem 915×610 e os vizinhos 409×273, com 55px entre eles. Todos os
 * cards têm o tamanho do ativo e encolhem por `scale` — é isso que deixa o
 * ativo "virar" vizinho (e vice-versa) numa transição só, em vez de trocar
 * de imagem no lugar.
 */
const CARD_W = 915;
const GAP = 55;
const SIDE_W = 409;
const SIDE_SCALE = SIDE_W / CARD_W;
/** Distância do centro do ativo ao centro do primeiro vizinho. */
const FIRST_STEP = CARD_W / 2 + GAP + SIDE_W / 2;

/** Curva de saída longa: arranca rápido e assenta devagar. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Arraste mínimo, em px, para o gesto valer como troca de slide. */
const SWIPE_THRESHOLD = 50;

/**
 * Carrossel das perspectivas de lazer, nos dois desenhos do Figma.
 *
 * Desktop: o render ativo grande no centro, com os vizinhos menores vazando
 * pelas bordas, e setas em círculo teal dentro dele. Na troca o trilho inteiro anda — o ativo encolhe para a
 * lateral enquanto o vizinho cresce para o centro, com a foto de dentro
 * assentando de um leve zoom e a etiqueta entrando depois que o card chega.
 * Clicar num vizinho avança até ele.
 *
 * Mobile: um card só (326×402), com as setas em círculo teal nas laterais. Os renders deslizam lado a lado com parallax (a foto
 * anda mais devagar que o card) e o card segue o dedo no arraste.
 *
 * No Figma o desktop para nas pontas e o mobile dá a volta; aqui os dois dão
 * a volta, para o vizinho da esquerda nunca ficar vazio.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const total = slides.length;

  if (!total) return null;

  const go = (offset: number) => setIndex((i) => (((i + offset) % total) + total) % total);

  /**
   * Distância circular do slide `i` ao ativo, em [-total/2, total/2): o
   * vizinho da esquerda do primeiro é o último, e não o oitavo à direita.
   */
  const offsetOf = (i: number) => {
    const half = Math.floor(total / 2);
    return ((((i - index + half) % total) + total) % total) - half;
  };

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    // As setas cuidam de si; o arraste é só no render.
    if ((event.target as HTMLElement).closest("button")) return;
    dragStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent) {
    if (dragStart.current === null) return;
    setDrag(event.clientX - dragStart.current);
  }

  function endDrag() {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (Math.abs(drag) > SWIPE_THRESHOLD) go(drag < 0 ? 1 : -1);
    setDrag(0);
    setDragging(false);
  }

  const current = slides[index]!;

  return (
    <div aria-roledescription="carrossel" aria-label="Perspectivas de lazer">
      {/* Desktop */}
      <div className="relative left-1/2 hidden h-[610px] w-screen -translate-x-1/2 lg:block">
        {slides.map((slide, i) => {
          const d = offsetOf(i);
          const distance = Math.abs(d);
          const x = d === 0 ? 0 : Math.sign(d) * (FIRST_STEP + (distance - 1) * (SIDE_W + GAP));
          const active = d === 0;

          const style: CSSProperties = {
            transform: `translate(-50%, -50%) translateX(${x}px) scale(${active ? 1 : SIDE_SCALE})`,
            transitionTimingFunction: EASE,
            zIndex: 10 - distance,
            // A partir do terceiro vizinho o card some: é por ali que ele
            // atravessa a tela quando dá a volta no trilho.
            opacity: distance >= 3 ? 0 : 1,
          };

          return (
            <button
              key={slide.file}
              type="button"
              onClick={() => go(d)}
              disabled={active}
              tabIndex={distance === 1 ? 0 : -1}
              aria-hidden={distance >= 2 ? true : undefined}
              aria-label={active ? undefined : `Ver a imagem: ${slide.label}`}
              style={style}
              className={`absolute top-1/2 left-1/2 block aspect-3/2 w-[915px] overflow-clip shadow-[0_4px_17px_rgba(0,0,0,0.25)] transition-[transform,opacity] duration-[900ms] motion-reduce:transition-none ${active ? "cursor-default" : "cursor-pointer"}`}
            >
              <img
                src={src(slide.file)}
                alt={active ? slide.label : ""}
                draggable={false}
                loading="lazy"
                decoding="async"
                style={{ transitionTimingFunction: EASE }}
                className={`size-full object-cover transition-[scale,filter] duration-[1400ms] select-none motion-reduce:transition-none ${active ? "scale-100 brightness-100" : "scale-110 brightness-[0.8] hover:brightness-95"}`}
              />
              <Label text={slide.label} visible={active} variant="desktop" />
            </button>
          );
        })}

        {/* Setas: ficam sobre o render ativo, que não sai do lugar. */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 aspect-3/2 w-[915px] -translate-x-1/2 -translate-y-1/2">
          <ArrowButton direction={-1} onClick={() => go(-1)} variant="desktop" />
          <ArrowButton direction={1} onClick={() => go(1)} variant="desktop" />
        </div>
      </div>

      {/* Mobile */}
      <div
        className="relative mx-auto aspect-[326/402] w-full max-w-[400px] touch-pan-y overflow-clip bg-brand select-none lg:hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {slides.map((slide, i) => {
          const d = offsetOf(i);
          const active = d === 0;
          const motion = dragging ? "none" : undefined;

          return (
            <div
              key={slide.file}
              aria-hidden={active ? undefined : true}
              style={{
                transform: `translateX(calc(${d * 100}% + ${drag}px))`,
                transitionTimingFunction: EASE,
                transitionProperty: motion,
                // Só o ativo e os dois vizinhos aparecem; o resto troca de
                // ponta invisível.
                opacity: Math.abs(d) > 1 ? 0 : 1,
              }}
              className="absolute inset-0 overflow-clip transition-[transform,opacity] duration-700 motion-reduce:transition-none"
            >
              <img
                src={src(slide.file)}
                alt={active ? slide.label : ""}
                draggable={false}
                loading="lazy"
                decoding="async"
                style={{
                  // Parallax: a foto anda na metade da velocidade do card.
                  transform: `translateX(calc(${d * -50}% + ${drag * -0.5}px)) scale(${active ? 1 : 1.12})`,
                  transitionTimingFunction: EASE,
                  transitionProperty: motion,
                }}
                className="size-full object-cover transition-transform duration-700 motion-reduce:transition-none"
              />
              <Label text={slide.label} visible={active && !dragging} variant="mobile" />
            </div>
          );
        })}

        <ArrowButton direction={-1} onClick={() => go(-1)} variant="mobile" />
        <ArrowButton direction={1} onClick={() => go(1)} variant="mobile" />
      </div>

      <p className="sr-only" aria-live="polite">
        {current.label}, {index + 1} de {total}
      </p>
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
  variant,
}: {
  direction: 1 | -1;
  onClick: () => void;
  /** Círculo teal: 37px dentro do render no desktop, 52px nas laterais do card no mobile. */
  variant: "desktop" | "mobile";
}) {
  const Icon = direction === 1 ? IconArrowRight : IconArrowLeft;
  const right = direction === 1;
  const look =
    variant === "desktop"
      ? `size-[37px] ${right ? "right-5" : "left-5"}`
      : `z-10 size-[52px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] ${right ? "right-[11px]" : "left-[11px]"}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={right ? "Próxima imagem" : "Imagem anterior"}
      className={`pointer-events-auto absolute top-1/2 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-brand-teal text-white transition hover:brightness-110 active:scale-90 ${look}`}
    >
      <Icon className={variant === "desktop" ? "size-4" : "size-6"} />
    </button>
  );
}

/**
 * Etiqueta verde do design, no canto inferior esquerdo do render — Poppins 14
 * no desktop, Montserrat 12 no mobile, como no arquivo. Entra deslizando
 * depois que o card assenta, e sai na hora quando ele deixa o centro.
 */
function Label({
  text,
  visible,
  variant,
}: {
  text: string;
  visible: boolean;
  variant: "desktop" | "mobile";
}) {
  const look =
    variant === "desktop"
      ? "bottom-4 left-3.5 px-[11px] text-sm leading-[21px]"
      : "bottom-5 left-[25px] px-[13px] py-[9px] text-xs leading-[15px]";

  return (
    <span
      aria-hidden="true"
      className={`absolute bg-brand text-white uppercase transition-[opacity,translate] motion-reduce:transition-none ${visible ? "translate-x-0 opacity-100 delay-300 duration-500" : "-translate-x-3 opacity-0 duration-150"} ${look}`}
      style={variant === "desktop" ? { fontFamily: '"Poppins", var(--font-sans)' } : undefined}
    >
      {text}
    </span>
  );
}
