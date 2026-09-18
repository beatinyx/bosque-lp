import { createFileRoute } from "@tanstack/react-router";

import { ThankYou } from "../../components/obrigado/ThankYou";
import { ProductLogo } from "../../components/viver-bosque/ProductLogo";

const TITLE = "Obrigado | Victa Viver Bosque";

export const Route = createFileRoute("/obrigado/viver-bosque")({
  head: () => ({
    meta: [
      { title: TITLE },
      /*
       * `noindex` em todas as cinco páginas de obrigado: indexada, ela recebe
       * visita orgânica de quem nunca preencheu o formulário, e cada uma dessas
       * visitas conta uma conversão que não existiu.
       *
       * A regra fica no `<meta>`, e não em um `Disallow` no robots.txt: bloquear
       * o rastreamento impediria o Google de ler justamente esta linha, e a URL
       * poderia continuar aparecendo na busca sem nunca ser lida.
       */
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      /*
       * O mesmo par da LP, na mesma URL de propósito: quem chega aqui vem de
       * lá, então o CSS e os arquivos de fonte já estão no cache do navegador —
       * uma lista reduzida seria outra URL e um download novo.
       *
       * Fraunces não é opcional nesta LP: `.theme-viver-bosque` põe h1–h6 na
       * serifada (ver styles.css), e sem ela a mensagem cai no Georgia.
       */
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Figtree:ital,wght@0,300..800;1,300..800&display=swap",
      },
    ],
  }),
  component: ObrigadoViverBosque,
});

function ObrigadoViverBosque() {
  return (
    <ThankYou
      theme="theme-viver-bosque"
      logo={<ProductLogo variant="light" className="h-auto w-[clamp(200px,24vw,290px)]" />}
      fachada={{
        desktop: "/images/viver-bosque/fachada.webp",
        mobile: "/images/viver-bosque/fachada-vertical.webp",
        alt: "Perspectiva da fachada do Victa Viver Bosque",
      }}
      back="/viver-bosque"
      cta="bg-brand-clay"
      footer="gradient"
    />
  );
}
