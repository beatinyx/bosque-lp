import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vista Coqueiral";

export const Route = createFileRoute("/obrigado/vista-coqueiral")({
  head: () => ({
    meta: [
      { title: TITLE },
      /* Ver a nota sobre `noindex` em obrigado/viver-bosque.tsx. */
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      /* A mesma fonte da LP, na mesma URL — ver a nota em obrigado/viver-bosque.tsx. */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;700&display=swap",
      },
    ],
  }),
  component: ObrigadoVistaCoqueiral,
});

function ObrigadoVistaCoqueiral() {
  return (
    <ThankYou
      theme="theme-vista-coqueiral"
      /* O logo do Figma já é a versão negativa, a mesma do hero da LP. */
      logo={
        <img
          src="/images/vista-coqueiral/logo-vista-coqueiral.png"
          alt="Vista Coqueiral — Cumbuco"
          className="h-auto w-[220px] object-contain sm:w-[250px] lg:w-[270px]"
          loading="eager"
        />
      }
      fachada={{
        desktop: "/images/vista-coqueiral/fachada.webp",
        mobile: "/images/vista-coqueiral/fachada-mobile.webp",
        alt: "Perspectiva do Vista Coqueiral de frente para a Praia do Cumbuco",
      }}
      back="/vista-coqueiral"
      cta="bg-brand-caramel"
      footer="forest"
    />
  );
}
