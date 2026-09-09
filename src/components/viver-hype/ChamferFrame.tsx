import type { ReactNode } from "react";

/**
 * Moldura do Viver Hype: a foto com o chanfro da marca e um contorno fino
 * deslocado por trás dela.
 *
 * No design o contorno não abraça a imagem — ele sai para cima e para a
 * direita, e a foto fica solta para baixo e para a esquerda. Por isso são dois
 * elementos irmãos em vez de um `border` na própria imagem: o contorno é um
 * anel absoluto (ver `.chamfer-outline` em styles.css) e recebe a mesma
 * medida de chanfro da foto para as diagonais ficarem paralelas.
 */
export function ChamferFrame({
  children,
  className = "",
  /** Deslocamento do contorno, em px. */
  offset = 14,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="chamfer-outline pointer-events-none absolute inset-0 text-brand-grass"
        style={{ transform: `translate(${offset}px, -${offset}px)` }}
      />
      <div className="chamfer-diag relative">{children}</div>
    </div>
  );
}
