import { useEffect, type RefObject } from "react";

/**
 * Reveal para cima dos boxes da página: cada elemento com `data-reveal` dentro
 * de `rootRef` começa transparente e 48px abaixo, e sobe para o lugar quando
 * entra na tela. O atraso de cada um vem de `--reveal-delay` (ver
 * `[data-reveal]` em styles.css).
 *
 * O estado escondido só existe depois que este efeito roda e marca a raiz com
 * `data-reveal-root="ready"`: sem JavaScript, ou antes da hidratação, tudo
 * aparece normalmente. O que já está na tela (ou acima dela) nesse momento é
 * marcado como revelado antes, para não piscar.
 *
 * Usa atributos `data-*` e não classes de propósito: o React não controla
 * esses atributos, então um re-render dos componentes não desfaz o estado.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const fold = window.innerHeight * 0.92;

    for (const element of elements) {
      if (element.getBoundingClientRect().top < fold) element.dataset["revealed"] = "";
    }
    root.dataset["revealRoot"] = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset["revealed"] = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    for (const element of elements) {
      if (!("revealed" in element.dataset)) observer.observe(element);
    }

    /*
     * Blocos com animação contínua (`data-motion`: o fundo de água do mapa e a
     * faixa de ondas) só animam enquanto estão na tela — fora dela o CSS pausa
     * as animações, e o celular não gasta quadro com o que ninguém está vendo.
     */
    const motion = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) target.dataset["inview"] = "";
          else delete target.dataset["inview"];
        }
      },
      { rootMargin: "100px 0px" },
    );
    for (const element of root.querySelectorAll<HTMLElement>("[data-motion]")) {
      motion.observe(element);
    }

    return () => {
      observer.disconnect();
      motion.disconnect();
    };
  }, [rootRef]);
}
