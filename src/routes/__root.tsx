import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

/*
 * Cada LP tem seu próprio container do GTM — nada de disparar o de um produto
 * na página de outro. A chave é o pathname da rota (ver src/routes/*.tsx).
 */
const GTM_IDS_BY_PATH: Record<string, string> = {
  "/viver-bosque": "GTM-TJGXKG68",
  "/vitoria-eusebio": "GTM-5TL3HWG6",
  "/viver-hype": "GTM-T23TPK72",
  "/viver-essencial": "GTM-T7HBWC47",
  "/vitoria-jasmim": "GTM-M7HJDQRK",
  "/vitoria-iris": "GTM-M7HJDQRK",
  "/atlantico": "GTM-NCH7568J",
  "/vista-costeira": "GTM-NP9LS9B7",
  "/vista-coqueiral": "GTM-5DV6MQBG",
  // O mesmo container do Vista Costeira, os dois no Cumbuco (pedido em 2026-11-23).
  "/vibe-cumbuco": "GTM-NP9LS9B7",
};

/*
 * Prefixo das páginas de obrigado (`/obrigado/viver-bosque` e as outras quatro).
 * Cada uma carrega o container da LP correspondente, e é lá que a conversão é
 * medida — ver src/components/obrigado/ThankYou.tsx.
 */
const OBRIGADO_PREFIX = "/obrigado";

function useGtmId() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  /*
   * A página de obrigado herda o container da própria LP, tirando o prefixo em
   * vez de repetir os cinco IDs no mapa: repetidos, um dia um par sairia do
   * lugar e a conversão passaria a cair no container do produto errado, sem
   * nada quebrar na tela.
   */
  const lpPath = pathname.startsWith(`${OBRIGADO_PREFIX}/`)
    ? pathname.slice(OBRIGADO_PREFIX.length)
    : pathname;

  return GTM_IDS_BY_PATH[lpPath];
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    /*
     * Head do shell: só o que vale para as duas LPs. Título, descrição, Open
     * Graph, canonical e as fontes de cada produto vêm da rota (ver
     * src/routes/viver-bosque.tsx e src/routes/vitoria-eusebio.tsx) — o que
     * está aqui é o fallback de quem cai no shell sem rota de produto.
     */
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VICTA" },
      { name: "author", content: "VICTA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      /* As famílias em si são pedidas pela rota; o preconnect vale para as duas. */
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const gtmId = useGtmId();

  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        {gtmId && (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
