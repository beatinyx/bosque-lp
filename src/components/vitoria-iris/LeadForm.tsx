import { useEffect, useRef } from "react";

import { bindRdUtmFields } from "../../lib/rd-utm";

/*
 * Formulário oficial do Vitória Íris no RD Station.
 *
 * O id saiu do próprio Figma Sites publicado (o code layer do hero chama
 * `new RDStationForms("vitoria-iris-bfbb1b5b19b7c5e74b84", "UA-169812363-1")`),
 * então é o mesmo formulário que já recebe os leads da página do Figma.
 */
const RD_FORM_ID = "vitoria-iris-bfbb1b5b19b7c5e74b84";
const RD_TOKEN = "UA-169812363-1";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (formId: string, token: string) => { createForm: () => void };
  }
}

/**
 * Carrega o script do RD uma única vez por página — mesma receita das outras
 * LPs (ver src/components/viver-hype/LeadForm.tsx).
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

export function LeadForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const container = formRef.current;
    if (!container) return;

    // Preenche os `cf_utm_*` quando o RD injetar o formulário — ver src/lib/rd-utm.ts.
    const unbindUtm = bindRdUtmFields(container);

    loadRdScript()
      .then(() => {
        if (cancelled || !window.RDStationForms) return;

        /* Marca no nó e ANTES da chamada — ver a nota em viver-hype/LeadForm. */
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
      unbindUtm();
    };
  }, []);

  return <div role="main" id={RD_FORM_ID} ref={formRef} />;
}
