import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vista Costeira";

export const Route = createFileRoute("/obrigado/vista-costeira")({
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
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400&display=swap",
      },
    ],
  }),
  component: ObrigadoVistaCosteira,
});

function ObrigadoVistaCosteira() {
  return (
    <ThankYou
      theme="theme-vista-costeira"
      /* O logo do Figma já é a versão negativa, a mesma do hero da LP. */
      logo={
        <img
          src="/images/vista-costeira/logo-vista-costeira.png"
          alt="Vista Costeira — Cumbuco"
          className="h-auto w-[240px] object-contain sm:w-[300px] lg:w-[362px]"
          loading="eager"
        />
      }
      fachada={{
        desktop: "/images/vista-costeira/fachada.webp",
        mobile: "/images/vista-costeira/fachada-mobile.webp",
        alt: "Perspectiva da fachada do Vista Costeira",
      }}
      back="/vista-costeira"
      cta="bg-brand-surf"
      footer="forest"
    />
  );
}
