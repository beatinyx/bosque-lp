import { createFileRoute } from "@tanstack/react-router";

import { AdvantagesSection } from "../components/viver-essencial/AdvantagesSection";
import { ConditionsSection } from "../components/viver-essencial/ConditionsSection";
import { Footer } from "../components/viver-essencial/Footer";
import { HeroSection } from "../components/viver-essencial/HeroSection";
import { LeisureSection } from "../components/viver-essencial/LeisureSection";
import { LocationSection } from "../components/viver-essencial/LocationSection";
import { NeighborhoodSection } from "../components/viver-essencial/NeighborhoodSection";
import { VictaSection } from "../components/viver-essencial/VictaSection";

const TITLE = "Viver Essencial | Apartamentos de 2 quartos no Pici";
const DESCRIPTION =
  "Apartamentos de 2 quartos com opção de jardim privativo no Pici, em Fortaleza, com lazer de condomínio clube e as condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/viver-essencial")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/viver-essencial" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/viver-essencial" },
      /*
       * Fontes desta LP — ver a nota em viver-bosque.tsx. O arquivo do Figma
       * mistura duas famílias de propósito: Poppins nas dobras do produto e
       * Montserrat na dobra institucional e no rodapé da Victa.
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: ViverEssencial,
});

/*
 * `theme-viver-essencial` redefine os tokens `brand-*` para a cartela deste
 * produto — azul (#1a5a97) como cor principal, teal (#49b7a6) nas faixas e
 * laranja (#f39222) nos CTAs. Ver o bloco de temas em styles.css.
 *
 * A rota é `/viver-essencial`; no arquivo do Figma a página se chama só
 * `/essencial`. O nome do produto é Viver Essencial, e é ele que fica na URL,
 * como nas outras LPs da linha Viver.
 *
 * Da dobra 3 à 6 o Figma tem um degradê único, teal → azul, correndo por trás
 * das quatro — por isso elas ficam dentro do mesmo wrapper, e não com o fundo
 * pintado uma a uma.
 */
function ViverEssencial() {
  return (
    <div className="theme-viver-essencial min-h-screen bg-white text-brand">
      <HeroSection />
      <AdvantagesSection />
      <div className="bg-[linear-gradient(180deg,#49b7a6,#1a5996)]">
        <LeisureSection />
        <NeighborhoodSection />
        <LocationSection />
        <ConditionsSection />
      </div>
      <VictaSection />
      <Footer />
    </div>
  );
}
