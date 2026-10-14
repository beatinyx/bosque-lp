import { createFileRoute } from "@tanstack/react-router";

import { BeachSection } from "../components/vista-costeira/BeachSection";
import { Footer } from "../components/vista-costeira/Footer";
import { HeroSection } from "../components/vista-costeira/HeroSection";
import { LeisureSection } from "../components/vista-costeira/LeisureSection";
import { VictaSection } from "../components/vista-costeira/VictaSection";

const TITLE = "Vista Costeira | Apartamentos de 2 quartos no Cumbuco";
const DESCRIPTION =
  "Apartamentos de 2 quartos com suíte e varanda no Cumbuco, a 1 minuto do mar, com lazer completo: piscina, espaço kitesurf, beach tennis, academia e redário.";

export const Route = createFileRoute("/vista-costeira")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vista-costeira" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vista-costeira" },
      /* Montserrat na página inteira; Poppins só nas etiquetas do carrossel. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400&display=swap",
      },
    ],
  }),
  component: VistaCosteira,
});

/*
 * `theme-vista-costeira` redefine os tokens `brand-*` para a cartela deste
 * produto — petróleo (#005676), areia (#e6bb94) e o roxo do botão
 * institucional — ver o bloco de temas em styles.css. A ordem das dobras é a
 * do Figma: hero, praia e localização, lazer e vídeo, institucional.
 */
function VistaCosteira() {
  return (
    <div className="theme-vista-costeira min-h-screen bg-white text-brand-ink">
      <HeroSection />
      <BeachSection />
      <LeisureSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
