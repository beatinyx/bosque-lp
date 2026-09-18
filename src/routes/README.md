# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File                     | URL                                                     |
| ------------------------ | ------------------------------------------------------- |
| `index.tsx`              | `/`                                                     |
| `about.tsx`              | `/about`                                                |
| `users/index.tsx`        | `/users`                                                |
| `users/$id.tsx`          | `/users/:id` (dynamic — bare `$`, no curly braces)      |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment)                  |
| `files/$.tsx`            | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx`            | layout route (renders children via `<Outlet />`)        |
| `__root.tsx`             | app shell — wraps every page; preserve `<Outlet />`     |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

## Neste repositório

| Arquivo               | URL                | O que é                                                               |
| --------------------- | ------------------ | --------------------------------------------------------------------- |
| `index.tsx`           | `/`                | Redirect 302 para `https://www.victa.eng.br/` — a raiz não tem página |
| `viver-bosque.tsx`    | `/viver-bosque`    | LP do Victa Viver Bosque                                              |
| `vitoria-eusebio.tsx` | `/vitoria-eusebio` | LP do Vitória Eusébio                                                 |
| `viver-hype.tsx`      | `/viver-hype`      | LP do Hype Condomínio Clube                                           |
| `vitoria-jasmim.tsx`  | `/vitoria-jasmim`  | LP do Vitória Jasmim (o Figma chama a página de `/vitoria-jasmin`)    |
| `viver-essencial.tsx` | `/viver-essencial` | LP do Viver Essencial (o Figma chama a página só de `/essencial`)     |

E as cinco páginas de obrigado, uma por produto, em `obrigado/`:

| Arquivo                        | URL                         |
| ------------------------------ | --------------------------- |
| `obrigado/viver-bosque.tsx`    | `/obrigado/viver-bosque`    |
| `obrigado/vitoria-eusebio.tsx` | `/obrigado/vitoria-eusebio` |
| `obrigado/viver-hype.tsx`      | `/obrigado/viver-hype`      |
| `obrigado/vitoria-jasmim.tsx`  | `/obrigado/vitoria-jasmim`  |
| `obrigado/viver-essencial.tsx` | `/obrigado/viver-essencial` |

O prefixo é `obrigado/<produto>` e não `<produto>/obrigado` de propósito: uma
rota filha transformaria `viver-bosque.tsx` em rota-pai, que precisaria de
`<Outlet />` e obrigaria a quebrar a LP em `viver-bosque/index.tsx`. Como
irmãs, as cinco entram sem tocar em nenhuma LP — e `/obrigado` vira uma
condição só no gatilho do GTM. Ver `src/components/obrigado/ThankYou.tsx`.

Cada LP de produto é responsável por três coisas que o `__root.tsx` não tem como
saber: as `meta`/`canonical` da página, o `link` das fontes que ela usa e o
wrapper com a classe `.theme-<produto>`, que define a paleta e a tipografia da
subárvore. Uma rota de produto sem essa classe renderiza com os tokens padrão do
`@theme` — ver `src/styles.css`.
