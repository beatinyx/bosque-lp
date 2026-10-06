import { createFileRoute } from "@tanstack/react-router";

import { ConditionsSection } from "../components/viver-bosque/ConditionsSection";
import { Footer } from "../components/viver-bosque/Footer";
import { HeroSection } from "../components/viver-bosque/HeroSection";
import { LeisureSection } from "../components/viver-bosque/LeisureSection";
import { LocationSection } from "../components/viver-bosque/LocationSection";
import { VictaSection } from "../components/viver-bosque/VictaSection";

const TITLE = "Victa Viver Bosque | Apartamentos no Cambeba";
const DESCRIPTION =
  "Apartamentos de 2 quartos em condomínio fechado no Cambeba, a poucos passos da Av. Frei Cirilo. Lazer completo e condições do Minha Casa, Minha Vida.";

export const Route = createFileRoute("/viver-bosque")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/viver-bosque" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/viver-bosque" },
      /*
       * As fontes são carregadas pela rota, não pelo __root: cada LP tem a sua
       * dupla e não faz sentido baixar as quatro famílias em toda visita.
       *
       * Fraunces é a serifada do folder. Articulat CF é licenciada e não está
       * no Google Fonts — Figtree entra como fallback mais próximo (ver a
       * pilha de `--font-viver-bosque-sans` em styles.css).
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Figtree:ital,wght@0,300..800;1,300..800&display=swap",
      },
    ],
  }),
  component: ViverBosque,
});

/*
 * `theme-viver-bosque` é o que liga a paleta e a tipografia deste produto: a
 * classe redefine os tokens `brand-*` e `font-*` para os valores do folder do
 * Viver Bosque, e tudo que está dentro dela resolve `bg-brand`, `text-brand-lime`
 * etc. no verde da marca. Sem a classe, os componentes caem nos valores padrão
 * declarados no `@theme`. Ver styles.css.
 */
function ViverBosque() {
  return (
    <div className="theme-viver-bosque min-h-screen bg-brand-sand text-brand">
      <HeroSection />
      <LocationSection />
      <LeisureSection />
      <ConditionsSection />
      <VictaSection />
      <Footer />
    </div>
  );
}
