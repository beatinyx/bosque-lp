import { createFileRoute } from "@tanstack/react-router";

import { EntrySection } from "../components/vitoria-eusebio/EntrySection";
import { Footer } from "../components/vitoria-eusebio/Footer";
import { HeroSection } from "../components/vitoria-eusebio/HeroSection";
import { LeisureSection } from "../components/vitoria-eusebio/LeisureSection";
import { LocationSection } from "../components/vitoria-eusebio/LocationSection";
import { VictaSection } from "../components/vitoria-eusebio/VictaSection";

const TITLE = "Vitória Eusébio | VICTA";
const DESCRIPTION =
  "Apartamentos de 2 quartos com opção de jardim privativo no Eusébio. Condomínio fechado, lazer completo e entrada facilitada pelo Minha Casa, Minha Vida.";

export const Route = createFileRoute("/vitoria-eusebio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vitoria-eusebio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vitoria-eusebio" },
      /* Fontes desta LP — ver a nota em viver-bosque.tsx. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: VitoriaEusebio,
});

/*
 * `theme-vitoria-eusebio` redefine os tokens `brand-*` e `font-*` para a
 * paleta deste produto — ver a nota equivalente em viver-bosque.tsx e o bloco
 * de temas em styles.css.
 */
function VitoriaEusebio() {
  return (
    <div className="theme-vitoria-eusebio min-h-screen bg-brand-sand text-brand">
      <HeroSection />
      <LocationSection />
      <LeisureSection />
      <EntrySection />
      <VictaSection />
      <Footer />
    </div>
  );
}
