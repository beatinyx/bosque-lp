import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "../components/vista-coqueiral/Footer";
import { HeroSection } from "../components/vista-coqueiral/HeroSection";
import { InvestSection } from "../components/vista-coqueiral/InvestSection";
import { LeisureSection } from "../components/vista-coqueiral/LeisureSection";
import { VictaSection } from "../components/vista-coqueiral/VictaSection";

const TITLE = "Vista Coqueiral | Apartamentos pé na areia no Cumbuco";
const DESCRIPTION =
  "Apartamentos de 2 quartos com suíte e varanda pé na areia na Praia do Cumbuco, com lazer completo de condomínio clube: piscina, beach tennis, espaço kitesurf e redário.";

export const Route = createFileRoute("/vista-coqueiral")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vista-coqueiral" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vista-coqueiral" },
      /* Montserrat na página; Poppins nos botões e nas etiquetas do carrossel. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;700&display=swap",
      },
    ],
  }),
  component: VistaCoqueiral,
});

/*
 * `theme-vista-coqueiral` redefine os tokens `brand-*` para a cartela deste
 * produto — verde-coqueiro (#2c6045) e o roxo do botão institucional — ver o
 * bloco de temas em styles.css. A ordem das dobras é a do Figma
 * (/vista-coqueiral-lancamento): hero, investimento e localização, lazer,
 * institucional.
 */
function VistaCoqueiral() {
  return (
    <div className="theme-vista-coqueiral min-h-screen bg-white text-brand">
      <HeroSection />
      <InvestSection />
      <LeisureSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
