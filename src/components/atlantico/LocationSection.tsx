import { useEffect, useState } from "react";

import { IconClose } from "./Icons";
import { Img } from "./Img";

/**
 * Os três itens do bloco de localização. Os ícones são SVGs do próprio
 * design (traço branco), cada um com a largura que tem no Figma — a coluna do
 * ícone tem 42px para que o texto comece alinhado nos três.
 */
const ITEMS = [
  { icon: "icone-mar.svg", size: "h-[33px] w-[42px]", text: "Condomínio com\nvista para o Mar" },
  { icon: "icone-pin.svg", size: "h-[34px] w-[23px]", text: "5 minutos do Shopping RioMar" },
  {
    icon: "icone-comercio.svg",
    size: "h-[34px] w-[39px]",
    text: "Padarias, mercados e academias ao seu alcance",
  },
];

/** DOBRA 2 — Localização. */
export function LocationSection() {
  const [mapOpen, setMapOpen] = useState(false);

  /* Lightbox do mapa: Esc fecha e a página não rola por baixo. */
  useEffect(() => {
    if (!mapOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMapOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mapOpen]);

  return (
    <section
      id="localizacao"
      className="bg-brand bg-cover bg-center py-16 text-white lg:py-[120px]"
      style={{ backgroundImage: "url(/images/atlantico/textura-azul.webp)" }}
    >
      <div className="lp-container">
        <div className="mx-auto grid max-w-[1054px] items-start gap-10 lg:grid-cols-[289px_1fr] lg:gap-[64px]">
          <div className="mx-auto w-full max-w-[289px]">
            <Img
              src="/images/atlantico/titulo-localizacao.png"
              alt="Transforme a Praia do Futuro no cenário dos seus dias"
              label="titulo-localizacao.png"
              className="mx-auto h-auto w-[270px] object-contain"
            />

            <ul className="mt-6 flex flex-col gap-5">
              {ITEMS.map(({ icon, size, text }) => (
                <li key={icon} className="flex items-center gap-[8px]">
                  <span className="grid w-[42px] shrink-0 place-items-center">
                    <img src={`/images/atlantico/${icon}`} alt="" className={size} />
                  </span>
                  <span className="max-w-[239px] text-[0.95rem] leading-[1.45] whitespace-pre-line">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setMapOpen(true)}
            aria-label="Ampliar o mapa ilustrado da Praia do Futuro"
            className="group block w-full cursor-zoom-in overflow-hidden"
          >
            <Img
              src="/images/atlantico/mapa.webp"
              alt="Mapa ilustrado da Praia do Futuro com a localização do Atlântico"
              label="mapa.webp"
              className="h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-105"
            />
          </button>
        </div>
      </div>

      {mapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mapa ilustrado da Praia do Futuro"
          onClick={() => setMapOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 sm:p-8"
        >
          <img
            src="/images/atlantico/mapa.webp"
            alt="Mapa ilustrado da Praia do Futuro com a localização do Atlântico"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-full cursor-default object-contain"
          />

          <button
            type="button"
            onClick={() => setMapOpen(false)}
            aria-label="Fechar"
            className="absolute top-4 right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
          >
            <IconClose className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
