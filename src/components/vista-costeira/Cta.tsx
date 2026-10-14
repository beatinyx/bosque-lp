import type { ReactNode } from "react";

/**
 * Botão verde dos CTAs do Vista Costeira — pílula com a sombra dura do
 * design (4px/4px, 25% de preto). No Figma todos rolam para o hero, onde fica
 * o formulário, e aqui fazem o mesmo.
 */
export function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#inicio"
      className={`inline-flex items-center justify-center rounded-full bg-brand-surf px-[25px] py-2.5 text-center text-sm leading-[1.3] font-bold text-white whitespace-nowrap uppercase shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition hover:brightness-105 sm:text-[1.25rem] ${className}`}
    >
      {children}
    </a>
  );
}
