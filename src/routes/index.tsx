import { createFileRoute } from "@tanstack/react-router";

import { ConditionsSection } from "../components/site/ConditionsSection";
import { Footer } from "../components/site/Footer";
import { HeroSection } from "../components/site/HeroSection";
import { LeisureSection } from "../components/site/LeisureSection";
import { LocationSection } from "../components/site/LocationSection";
import { VictaSection } from "../components/site/VictaSection";

const TITLE = "Victa Viver Bosque | Apartamentos na Messejana";
const DESCRIPTION =
  "Apartamentos de 2 quartos em condomínio fechado na Messejana, a poucos passos da Av. Frei Cirilo. Lazer completo e condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <LocationSection />
      <LeisureSection />
      <ConditionsSection />
      <VictaSection />
      <Footer />
    </>
  );
}
