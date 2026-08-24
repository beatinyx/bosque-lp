import { Img } from "./Img";

/**
 * Marca do produto — o lockup "VIVER BOSQUE / SOLAR DOS DIOGOS".
 *
 * O arquivo oficial em /public/images é a versão negativa (traço em lima claro,
 * fundo transparente), desenhada para fundo escuro. Ainda não temos a versão
 * positiva: enquanto `logo-viver-bosque.png` não existir, `variant="dark"` cai
 * no lockup tipográfico montado com as fontes da marca (Fraunces + Articulat
 * CF), que serve como reserva sem quebrar a página.
 */
export function ProductLogo({
  variant = "light",
  className = "",
}: {
  /** "light" = logo negativo, para fundo escuro. "dark" = positivo. */
  variant?: "light" | "dark";
  className?: string;
}) {
  const light = variant === "light";
  const file = light ? "logo-viver-bosque-branco.png" : "logo-viver-bosque.png";

  return (
    <Img
      src={`/images/${file}`}
      alt="Viver Bosque — Solar dos Diogos"
      loading="eager"
      className={className}
      fallback={
        <span
          className={`flex flex-col ${className}`}
          role="img"
          aria-label="Viver Bosque — Solar dos Diogos"
        >
          <span
            className={`text-[0.6rem] font-bold tracking-[0.42em] uppercase ${
              light ? "text-brand-lime" : "text-brand-leaf"
            }`}
          >
            Victa
          </span>
          <span
            className={`emphasis mt-1 text-[clamp(2.1rem,5vw,3.1rem)] leading-[0.92] ${
              light ? "text-white" : "text-brand"
            }`}
          >
            Viver
            <br />
            Bosque
          </span>
          <span
            className={`mt-2 text-[0.58rem] font-semibold tracking-[0.2em] uppercase ${
              light ? "text-brand-lime/80" : "text-brand-sage"
            }`}
          >
            Solar dos Diogos
          </span>
        </span>
      }
    />
  );
}
