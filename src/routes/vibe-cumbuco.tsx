import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { ConditionsSection } from "../components/vibe-cumbuco/ConditionsSection";
import { CumbucoSection } from "../components/vibe-cumbuco/CumbucoSection";
import { Footer } from "../components/vibe-cumbuco/Footer";
import { HeroSection } from "../components/vibe-cumbuco/HeroSection";
import { InvestorSection } from "../components/vibe-cumbuco/InvestorSection";
import { LeisureSection } from "../components/vibe-cumbuco/LeisureSection";
import { MapSection } from "../components/vibe-cumbuco/MapSection";
import { useReveal } from "../components/vibe-cumbuco/useReveal";
import { VictaSection } from "../components/vibe-cumbuco/VictaSection";
import { WaveBand } from "../components/vibe-cumbuco/WaveBand";

const TITLE = "Vibe Cumbuco | Lançamento a 100 metros da praia";
const DESCRIPTION =
  "Lançamento Victa no Cumbuco: apartamentos de 2 quartos com varanda a 100 metros da praia, rooftop com vista para o mar e condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/vibe-cumbuco")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vibe-cumbuco" },
      { property: "og:image", content: "/images/vibe-cumbuco/fachada.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vibe-cumbuco" },
      /*
       * Fontes desta LP — ver a nota em viver-bosque.tsx. Figtree está no
       * lugar da Articulat CF do KV, e Sacramento no da Repaiso (ver
       * `--font-script` em styles.css). Montserrat só no institucional e no
       * rodapé, que são os mesmos das outras LPs.
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600&family=Sacramento&family=Montserrat:wght@400;700&display=swap",
      },
    ],
  }),
  component: VibeCumbuco,
});

/*
 * `theme-vibe-cumbuco` redefine `brand` e `brand-sand` e a família de texto
 * para a cartela do KV — ver o bloco de temas em styles.css. O fundo é o linho
 * (`brand-linen`), e as dobras escuras são cards emoldurados sobre ele, não
 * faixas de ponta a ponta. Os boxes marcados com `data-reveal` sobem ao
 * entrar na tela (useReveal.ts).
 */
function VibeCumbuco() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <div className="theme-vibe-cumbuco min-h-screen bg-brand-linen text-brand">
      <main ref={mainRef}>
        <HeroSection />
        <CumbucoSection />
        <MapSection />
        <LeisureSection />
        <WaveBand />
        <InvestorSection />
        <ConditionsSection />
        <VictaSection />
      </main>
      <Footer />
    </div>
  );
}
