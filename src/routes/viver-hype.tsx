import { createFileRoute } from "@tanstack/react-router";

import { ConditionsSection } from "../components/viver-hype/ConditionsSection";
import { Footer } from "../components/viver-hype/Footer";
import { HeroSection } from "../components/viver-hype/HeroSection";
import { LeisureSection } from "../components/viver-hype/LeisureSection";
import { LocationSection } from "../components/viver-hype/LocationSection";
import { SeaSection } from "../components/viver-hype/SeaSection";
import { VictaSection } from "../components/viver-hype/VictaSection";

const TITLE = "Hype Condomínio Clube | Apartamentos na Praia do Futuro";
const DESCRIPTION =
  "Apartamentos de 2 quartos a 400 metros do mar, na Praia do Futuro, com rooftop e lazer completo de condomínio clube. Condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/viver-hype")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/viver-hype" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/viver-hype" },
      /* Fontes desta LP — ver a nota em viver-bosque.tsx. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: ViverHype,
});

/*
 * `theme-viver-hype` redefine os tokens `brand-*` e a família de texto para a
 * paleta deste produto — ver a nota equivalente em viver-bosque.tsx e o bloco
 * de temas em styles.css.
 *
 * Aqui o wrapper não pinta uma cor plana: as dobras 1 a 5 vivem dentro de um
 * degradê de mar contínuo (`.sea-flow`), e o institucional e o rodapé ficam
 * fora dele, porque têm fundo próprio.
 */
function ViverHype() {
  return (
    <div className="theme-viver-hype min-h-screen bg-brand-deepsea text-brand-shell">
      <HeroSection />

      <div className="sea-flow">
        <SeaSection />
        <LocationSection />
        <LeisureSection />
        <ConditionsSection />
      </div>

      <VictaSection />
      <Footer />
    </div>
  );
}
