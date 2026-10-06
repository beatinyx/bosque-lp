import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";

const TITLE = "Obrigado | Vitória Íris";

export const Route = createFileRoute("/obrigado/vitoria-iris")({
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
  component: ObrigadoVitoriaIris,
});

function ObrigadoVitoriaIris() {
  return (
    <ThankYou
      theme="theme-vitoria-iris"
      logo={
        /*
         * O logo do Íris só existe na versão colorida (cinza e azul), feita para
         * o céu claro do hero. A dobra de obrigado é escura, então ele vira
         * branco chapado com o filtro — mesmo recurso do lockup negativo das
         * outras LPs, sem precisar de um arquivo novo.
         */
        <img
          src="/images/vitoria-iris/logo-iris.png"
          alt="Vitória Íris"
          className="h-auto w-[200px] object-contain brightness-0 invert sm:w-[240px] lg:w-[280px]"
          loading="eager"
        />
      }
      fachada={{
        desktop: "/images/vitoria-iris/fachada.webp",
        mobile: "/images/vitoria-iris/fachada-mobile.webp",
        alt: "Perspectiva da fachada do Vitória Íris",
      }}
      back="/vitoria-iris"
      cta="bg-brand-leaf"
      footer="forest"
    />
  );
}
