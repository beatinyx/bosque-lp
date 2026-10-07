import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Atlântico";

export const Route = createFileRoute("/obrigado/atlantico")({
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
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Montserrat+Alternates:wght@700&display=swap",
      },
    ],
  }),
  component: ObrigadoAtlantico,
});

function ObrigadoAtlantico() {
  return (
    <ThankYou
      theme="theme-atlantico"
      logo={
        /*
         * O logo do Atlântico só existe na versão verde-água, feita para o
         * cabeçalho azul da LP. A dobra de obrigado é escura, então ele vira
         * branco chapado com o filtro — o mesmo recurso do Vitória Íris.
         */
        <img
          src="/images/atlantico/logo-atlantico.png"
          alt="Atlântico Condomínio Clube"
          className="h-auto w-[220px] object-contain brightness-0 invert sm:w-[260px] lg:w-[300px]"
          loading="eager"
        />
      }
      fachada={{
        desktop: "/images/atlantico/fachada.webp",
        mobile: "/images/atlantico/fachada-mobile.webp",
        alt: "Perspectiva da fachada do Atlântico Condomínio Clube",
      }}
      back="/atlantico"
      cta="bg-brand-gold"
      footer="forest"
    />
  );
}
