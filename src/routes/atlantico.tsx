import { createFileRoute } from "@tanstack/react-router";

import { ConditionsSection } from "../components/atlantico/ConditionsSection";
import { Footer } from "../components/atlantico/Footer";
import { HeroSection } from "../components/atlantico/HeroSection";
import { LeisureSection } from "../components/atlantico/LeisureSection";
import { LocationSection } from "../components/atlantico/LocationSection";
import { LoungeSection } from "../components/atlantico/LoungeSection";
import { VictaSection } from "../components/atlantico/VictaSection";

const TITLE = "Atlântico Condomínio Clube | Apartamentos na Praia do Futuro";
const DESCRIPTION =
  "Apartamentos de 2 quartos com suíte e varanda na Praia do Futuro, em Fortaleza, a 5 minutos do Shopping RioMar, com lazer de condomínio clube e sinal a partir de R$ 999.";

export const Route = createFileRoute("/atlantico")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/atlantico" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/atlantico" },
      /* Montserrat na página inteira, com o peso 600 dos valores das condições. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Montserrat+Alternates:wght@700&display=swap",
      },
    ],
  }),
  component: Atlantico,
});

/*
 * `theme-atlantico` redefine os tokens `brand-*` para a cartela deste produto
 * — azul (#4061a6), verde-água, sálvia e cacau — ver o bloco de temas em
 * styles.css. A ordem das dobras é a do Figma: hero, localização, lounge, lazer,
 * condições, institucional.
 */
function Atlantico() {
  return (
    <div className="theme-atlantico min-h-screen bg-brand text-white">
      <HeroSection />
      <LocationSection />
      <LoungeSection />
      <LeisureSection />
      <ConditionsSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
