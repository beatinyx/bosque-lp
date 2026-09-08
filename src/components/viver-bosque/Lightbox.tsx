import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { IconArrowLeft, IconArrowRight, IconClose } from "./Icons";

export type Slide = {
  /** Nome do arquivo em /public/images, com extensão. */
  file: string;
  label: string;
};

/**
 * Foto ampliada em tela cheia.
 *
 * Serve tanto ao carrossel quanto a uma imagem solta: com um item só, os
 * controles de navegação e o contador não são montados, e sobram a foto e o
 * botão de fechar.
 *
 * Quem chama controla o índice — assim o carrossel consegue sincronizar a
 * trilha com a imagem em que o lightbox parou.
 */
export function Lightbox({
  slides,
  index,
  onIndexChange,
  onClose,
}: {
  slides: Slide[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = slides.length;
  const current = slides[index];

  /*
   * O diálogo é montado no `body`, não onde foi declarado.
   *
   * As seções que abrem lightbox têm `isolate`, e isso cria contexto de
   * empilhamento: um `z-50` lá dentro só vale dentro da seção, e a seção
   * seguinte passaria por cima do lightbox. Pelo portal ele sobe para a raiz e
   * o `z-50` volta a valer contra a página toda.
   *
   * O `mounted` existe porque isto roda com SSR e `document` não existe no
   * servidor. Como o lightbox só abre por clique, não renderizar no primeiro
   * passe não custa nada.
   */
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

  /* Setas do lightbox: círculo vazado em bege, no mesmo desenho das setas do
     carrossel. Aqui o fundo já é escuro e o traço se lê sozinho — o disco cheio
     em terracota disputava atenção com o CTA da página. */
  const navButton =
    "pointer-events-auto grid size-12 cursor-pointer place-items-center rounded-full border border-brand-sand/70 text-brand-sand transition hover:border-brand-sand hover:bg-brand-sand/15";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/88 p-4 sm:p-8"
    >
      <img
        src={`/images/viver-bosque/${current.file}`}
        alt={current.label}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[80vh] max-w-full cursor-default object-contain"
      />

      {total > 1 ? (
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex items-center gap-4 text-white"
        >
          <button
            type="button"
            onClick={() => onIndexChange((index - 1 + total) % total)}
            aria-label="Imagem anterior"
            className={navButton}
          >
            <IconArrowLeft className="size-5" />
          </button>

          <p className="min-w-[10rem] text-center text-[0.72rem] font-bold tracking-[0.14em] uppercase">
            {current.label}
            <span className="mt-1 block text-[0.68rem] font-medium tracking-normal text-white/55 normal-case">
              {index + 1} de {total}
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
      ) : (
        <p className="text-center text-[0.72rem] font-bold tracking-[0.14em] text-white uppercase">
          {current.label}
        </p>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
      >
        <IconClose className="size-5" />
      </button>
    </div>,
    document.body,
  );
}
