import { useEffect, useRef } from "react";

const RD_FORM_ID = "hype-73927ee2be76598111e4";
const RD_TOKEN = "UA-169812363-1";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (formId: string, token: string) => { createForm: () => void };
  }
}

/**
 * Carrega o script do RD uma única vez por página.
 *
 * A promessa fica no módulo de propósito: se o efeito rodar de novo — hot
 * reload, remontagem da rota —, ele reaproveita a mesma promessa em vez de
 * pendurar um segundo listener de `load` no script, que era o caminho por onde
 * o `createForm` acabava sendo chamado duas vezes.
 */
let scriptPromise: Promise<void> | null = null;

function loadRdScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (window.RDStationForms) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RD_SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("RD Station: script não carregou")), {
      once: true,
    });

    if (!existing) {
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return scriptPromise;
}

/**
 * Formulário de captação da dobra 1 — embed do RD Station.
 *
 * O design do Figma não tem formulário na página: ele fecha as duas dobras de
 * CTA com um botão que sai para a campanha. O formulário entrou depois e mora
 * dentro do card laranja do hero, na área que o design deixa vazia.
 *
 * Este componente é só o ponto de montagem — quem tem a classe
 * `.rd-form-card` é o card laranja em HeroSection.tsx, e é de lá que o CSS em
 * styles.css alcança os campos que o RD injeta.
 */
export function LeadForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const container = formRef.current;
    if (!container) return;

    loadRdScript()
      .then(() => {
        if (cancelled || !window.RDStationForms) return;

        /*
         * A marca vai no próprio nó e ANTES da chamada. O `createForm` do RD é
         * assíncrono: ele busca a definição do formulário e só depois injeta o
         * markup, então conferir "o container está vazio?" não protege de
         * nada — dois disparos em sequência passariam os dois pelo teste e a
         * página terminava com dois formulários, um embaixo do outro.
         */
        if (container.dataset["rdMounted"] === "1") return;
        container.dataset["rdMounted"] = "1";
        container.replaceChildren();
        new window.RDStationForms(RD_FORM_ID, RD_TOKEN).createForm();
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <div role="main" id={RD_FORM_ID} ref={formRef} />;
}
