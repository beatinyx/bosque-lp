import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vibe Cumbuco";

export const Route = createFileRoute("/obrigado/vibe-cumbuco")({
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
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600&family=Sacramento&family=Montserrat:wght@400;700&display=swap",
      },
    ],
  }),
  component: ObrigadoVibeCumbuco,
});

function ObrigadoVibeCumbuco() {
  return (
    <ThankYou
      theme="theme-vibe-cumbuco"
      logo={
        <img
          src="/images/vibe-cumbuco/logo-vibe-branco.svg"
          alt="Vibe Cumbuco"
          className="h-auto w-[clamp(150px,16vw,200px)]"
        />
      }
      fachada={{
        desktop: "/images/vibe-cumbuco/fachada.webp",
        mobile: "/images/vibe-cumbuco/fachada-mobile.webp",
        alt: "Fachada do Vibe Cumbuco ao entardecer",
        position: "object-[60%_center]",
      }}
      back="/vibe-cumbuco"
      cta="bg-brand-petrol"
      footer="forest"
      /* O rodapé da LP é em Montserrat, como o das outras; aqui também. */
      footerClassName="font-montserrat"
    />
  );
}
