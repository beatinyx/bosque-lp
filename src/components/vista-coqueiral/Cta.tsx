import type { ReactNode } from "react";

/**
 * Botão caramelo dos CTAs do Vista Coqueiral — pílula em Poppins Bold, que
 * escurece no hover como o componente "botao COQ" do Figma. No Figma todos
 * rolam para o hero, onde fica o formulário, e aqui fazem o mesmo.
 */
export function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#inicio"
      className={`inline-flex items-center justify-center rounded-full bg-brand-caramel px-[22px] py-[11px] text-center text-lg leading-[30px] font-bold whitespace-nowrap text-white uppercase transition-colors duration-300 hover:bg-brand-caramel-deep sm:text-xl ${className}`}
      style={{ fontFamily: '"Poppins", var(--font-sans)' }}
    >
      {children}
    </a>
  );
}
