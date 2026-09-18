import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";
import { ProductLogo } from "../../components/viver-essencial/ProductLogo";

const TITLE = "Obrigado | Viver Essencial";

export const Route = createFileRoute("/obrigado/viver-essencial")({
  head: () => ({
    meta: [
      { title: TITLE },
      /* Ver a nota sobre `noindex` em obrigado/viver-bosque.tsx. */
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      /*
       * As duas famílias, como na LP e na mesma URL (ver a nota em
       * obrigado/viver-bosque.tsx): Poppins no produto — é o `--font-sans` do
       * tema — e Montserrat no rodapé da Victa, via `font-montserrat`.
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: ObrigadoViverEssencial,
});

function ObrigadoViverEssencial() {
  return (
    <ThankYou
      theme="theme-viver-essencial"
      /* O lockup do Essencial é montado em markup, não é um arquivo — ver
         components/viver-essencial/ProductLogo.tsx. */
      logo={<ProductLogo className="w-[250px] md:w-[300px]" />}
      fachada={{
        desktop: "/images/viver-essencial/fachada.webp",
        mobile: "/images/viver-essencial/fachada-mobile.webp",
        alt: "Perspectiva da fachada do Viver Essencial",
        position: "object-[70%_center]",
      }}
      back="/viver-essencial"
      cta="bg-brand-gold"
      footer="forest"
      footerClassName="font-montserrat"
    />
  );
}
