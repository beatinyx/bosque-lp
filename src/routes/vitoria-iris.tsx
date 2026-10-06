import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "../components/vitoria-iris/Footer";
import { HeroSection } from "../components/vitoria-iris/HeroSection";
import { LeisureSection } from "../components/vitoria-iris/LeisureSection";
import { LocationSection } from "../components/vitoria-iris/LocationSection";
import { PlaceSection } from "../components/vitoria-iris/PlaceSection";
import { VictaSection } from "../components/vitoria-iris/VictaSection";

const TITLE = "Vitória Íris | Apartamentos de 2 quartos na Messejana";
const DESCRIPTION =
  "Apartamentos de 2 quartos com opção de jardim privativo no Parque Vitória Messejana, em Fortaleza, com lazer completo e condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/vitoria-iris")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vitoria-iris" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vitoria-iris" },
      /* Montserrat nas dobras todas; Montserrat Alternates só nos números. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Montserrat+Alternates:wght@700&display=swap",
      },
    ],
  }),
  component: VitoriaIris,
});

/*
 * `theme-vitoria-iris` redefine os tokens `brand-*` para a cartela deste
 * produto — ver o bloco de temas em styles.css. A ordem das dobras é a do
 * Figma: hero, lugar, localização, lazer, institucional.
 */
function VitoriaIris() {
  return (
    <div className="theme-vitoria-iris min-h-screen bg-brand-cream text-white">
      <HeroSection />
      <PlaceSection />
      <LocationSection />
      <LeisureSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
