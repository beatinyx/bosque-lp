import { useEffect, useRef } from "react";

import { bindRdUtmFields } from "../../lib/rd-utm";

/*
 * Formulário do Vibe Cumbuco no RD Station, criado em 2026-11-26 — até então
 * esta LP enviava para o Marketing Cloud. Mesmo token das outras LPs; o
 * redirect para /obrigado/vibe-cumbuco está configurado no painel do RD.
 */
const RD_FORM_ID = "vibe-cumbuco-124d60f2a7f6d22d1225";
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

/**
 * Formulário de captação da dobra 1 — embed do RD Station.
 *
 * Os campos e o botão vêm prontos do RD; o desenho do card de linho (campos
 * claros, botão-pílula laranja) é aplicado por cima em `.theme-vibe-cumbuco
 * .rd-form-card`, no styles.css.
 */
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

  return (
    <div className="rd-form-card">
      <div role="main" id={RD_FORM_ID} ref={formRef} />
    </div>
  );
}
