import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { IconArrowLeft, IconArrowRight, IconClose } from "./ui";

export type LightboxSlide = {
  src: string;
  name: string;
  alt: string;
};

/**
 * Foto do lazer ampliada em tela cheia, com setas, contador, Esc e as setas do
 * teclado. Mesma receita do lightbox do Viver Bosque
 * (src/components/viver-bosque/Lightbox.tsx), na cartela do Vibe: véu em
 * petróleo fechado em vez de preto e os controles em linho.
 *
 * Montado no `body` por portal, para o `z-50` valer contra a página toda e não
 * só dentro da seção; o `mounted` evita tocar em `document` no SSR. Quem chama
 * controla o índice.
 */
export function Lightbox({
  slides,
  index,
  onIndexChange,
  onClose,
}: {
  slides: LightboxSlide[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = slides.length;
  const current = slides[index];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /** Setas do teclado e Esc, além do scroll da página travado enquanto abre. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (total < 2) return;
      if (event.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, total, onIndexChange, onClose]);

  if (!current || !mounted) return null;

  const navButton =
    "grid size-12 cursor-pointer place-items-center rounded-full border border-brand-linen/50 text-brand-linen transition hover:border-brand-linen hover:bg-brand-linen/10";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.name}
      onClick={onClose}
      className="theme-vibe-cumbuco fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-brand/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        onClick={(event) => event.stopPropagation()}
        className="vibe-frame vibe-frame-sm max-h-[78vh] max-w-full cursor-default object-contain"
      />

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center gap-5 text-brand-linen"
      >
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + total) % total)}
          aria-label="Imagem anterior"
          className={navButton}
        >
          <IconArrowLeft className="size-5" />
        </button>

        <p className="min-w-[11rem] text-center text-[1.05rem] font-light">
          {current.name}
          <span className="mt-1 block text-[0.72rem] font-medium tracking-[0.18em] text-brand-linen/55">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </p>

        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % total)}
          aria-label="Próxima imagem"
          className={navButton}
        >
          <IconArrowRight className="size-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-brand-linen/12 text-brand-linen transition hover:bg-brand-linen/20 sm:top-6 sm:right-6"
      >
        <IconClose className="size-5" />
      </button>
    </div>,
    document.body,
  );
}
