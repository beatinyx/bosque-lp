import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Hype Condomínio Clube";

export const Route = createFileRoute("/obrigado/viver-hype")({
  head: () => ({
    meta: [
      { title: TITLE },
      /* Ver a nota sobre `noindex` em obrigado/viver-bosque.tsx. */
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      /* O mesmo par da LP, na mesma URL — ver a nota em obrigado/viver-bosque.tsx. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: ObrigadoViverHype,
});

function ObrigadoViverHype() {
  return (
    <ThankYou
      theme="theme-viver-hype"
      logo={
        <img
          src="/images/viver-hype/logo-hype-branco.svg"
          alt="Viver Hype Condomínio Clube"
          className="h-auto w-[clamp(170px,20vw,240px)]"
        />
      }
      /* Mesmo enquadramento do hero: o prédio está à direita do quadro, e sem o
         deslocamento o recorte central pega o céu. */
      fachada={{
        desktop: "/images/viver-hype/fachada.webp",
        mobile: "/images/viver-hype/fachada-mobile.webp",
        alt: "Fachada do Hype Condomínio Clube, na Praia do Futuro",
        position: "object-[62%_center]",
      }}
      back="/viver-hype"
      cta="bg-brand-orchid"
      footer="gradient"
    />
  );
}
