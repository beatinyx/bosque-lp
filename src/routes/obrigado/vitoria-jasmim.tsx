import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vitória Jasmim";

export const Route = createFileRoute("/obrigado/vitoria-jasmim")({
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
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Montserrat+Alternates:wght@700&display=swap",
      },
    ],
  }),
  component: ObrigadoVitoriaJasmim,
});

function ObrigadoVitoriaJasmim() {
  return (
    <ThankYou
      theme="theme-vitoria-jasmim"
      logo={
        <img
          src="/images/vitoria-jasmim/logo-jasmim-branco.png"
          alt="Vitória Jasmim"
          className="h-auto w-[220px] object-contain sm:w-[280px] lg:w-[320px]"
          loading="eager"
        />
      }
      fachada={{
        desktop: "/images/vitoria-jasmim/fachada.webp",
        mobile: "/images/vitoria-jasmim/fachada-mobile.webp",
        alt: "Perspectiva da fachada do Vitória Jasmim",
      }}
      back="/vitoria-jasmim"
      cta="bg-brand-gold"
      footer="forest"
    />
  );
}
