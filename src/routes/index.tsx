import { createFileRoute, redirect } from "@tanstack/react-router";

/*
 * A raiz do domínio não tem página própria: este repositório hospeda as
 * landing pages de produto (/viver-bosque, /vitoria-eusebio e /viver-hype), e
 * quem chega no domínio puro deve cair no site institucional da Victa.
 *
 * O redirecionamento acontece no `beforeLoad`, ou seja, antes de renderizar
 * qualquer coisa — no SSR ele vira uma resposta HTTP de redirect, sem passar
 * por uma tela em branco. `href` absoluto marca o destino como externo, então
 * o router faz navegação de documento inteiro em vez de trocar de rota.
 *
 * 302 (temporário) de propósito: 301 fica gravado no cache do navegador e é
 * difícil de reverter se um dia a raiz virar página própria.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "https://www.victa.eng.br/", statusCode: 302 });
  },
});
