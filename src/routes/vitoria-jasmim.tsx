import { createFileRoute } from "@tanstack/react-router";

import { ConditionsSection } from "../components/vitoria-jasmim/ConditionsSection";
import { Footer } from "../components/vitoria-jasmim/Footer";
import { HeroSection } from "../components/vitoria-jasmim/HeroSection";
import { LeisureSection } from "../components/vitoria-jasmim/LeisureSection";
import { LocationSection } from "../components/vitoria-jasmim/LocationSection";
import { VictaSection } from "../components/vitoria-jasmim/VictaSection";

const TITLE = "Vitória Jasmim | Apartamentos de 2 quartos na Messejana";
const DESCRIPTION =
  "Apartamentos de 2 quartos com opção de jardim privativo no coração da Messejana, em Fortaleza, com lazer completo de condomínio clube e condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/vitoria-jasmim")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vitoria-jasmim" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/vitoria-jasmim" },
      /*
       * Fontes desta LP — ver a nota em viver-bosque.tsx. Montserrat cobre a
       * página inteira (com itálico, que o design usa nos destaques) e
       * Montserrat Alternates entra só nos números da dobra institucional.
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Montserrat+Alternates:wght@700&display=swap",
      },
    ],
  }),
  component: VitoriaJasmim,
});

/*
 * `theme-vitoria-jasmim` redefine os tokens `brand-*` para a cartela deste
 * produto — roxo (#64328a) como cor principal, verde-claro (#ebf4e6) nas
 * dobras claras — e a família de texto. Ver o bloco de temas em styles.css.
 *
 * A rota da URL é `/vitoria-jasmim`, com "m" no fim, mesmo o arquivo do Figma
 * usando `/vitoria-jasmin`: a grafia do produto é Jasmim. O formulário do RD
 * é o único lugar onde o "n" continua, porque é o id cadastrado lá.
 */
function VitoriaJasmim() {
  return (
    <div className="theme-vitoria-jasmim min-h-screen bg-brand-sand text-brand">
      <HeroSection />
      <LocationSection />
      <LeisureSection />
      <ConditionsSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
