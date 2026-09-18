import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vitória Eusébio";

export const Route = createFileRoute("/obrigado/vitoria-eusebio")({
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
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: ObrigadoVitoriaEusebio,
});

function ObrigadoVitoriaEusebio() {
  return (
    <ThankYou
      theme="theme-vitoria-eusebio"
      logo={
        <img
          src="/images/vitoria-eusebio/logo-eusebio-branco.png"
          alt="Vitória Eusébio"
          className="h-32 w-auto object-contain sm:h-40"
          loading="eager"
        />
      }
      /* O Eusébio é o único produto sem versão vertical da fachada — o recorte
         central da horizontal é o que sobra no mobile, e é onde está o prédio. */
      fachada={{
        desktop: "/images/vitoria-eusebio/fachada.webp",
        alt: "Perspectiva da fachada do Vitória Eusébio",
      }}
      back="/vitoria-eusebio"
      cta="bg-brand-blue"
      footer="gradient"
    />
  );
}
