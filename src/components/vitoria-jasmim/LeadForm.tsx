import { useEffect, useRef } from "react";

/*
 * Formulário oficial do Vitória Jasmim no RD Station.
 *
 * O id saiu do próprio Figma Sites publicado (o code layer do hero chama
 * `new RDStationForms("vitoria-jasmin-94114a5c148789bc1bee", "UA-169812363-1")`),
 * então é o mesmo formulário que já recebe os leads da página do Figma —
 * grafia `jasmin` sem "m" de propósito, é assim que o formulário está
 * cadastrado no RD.
 */
const RD_FORM_ID = "vitoria-jasmin-94114a5c148789bc1bee";
const RD_TOKEN = "UA-169812363-1";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

/** Campos de UTM que o formulário do RD traz escondidos. */
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_placement",
] as const;

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

/** Guarda as UTMs da URL para sobreviverem à navegação dentro da página. */
function persistUtmParams() {
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) localStorage.setItem(key, value);
  }
}

/**
 * Preenche os campos `cf_utm_*` que o RD injeta e esconde a linha de cada um.
 *
 * O RD monta o formulário de forma assíncrona e ainda re-renderiza campos
 * depois (máscara de telefone, validação), por isso isto roda em intervalo em
 * vez de uma vez só — é o mesmo que o code layer do Figma faz na página
 * publicada. Sem esconder, os seis campos aparecem vazios no meio do
 * formulário.
 */
function applyUtmFields(container: HTMLElement) {
  for (const key of UTM_KEYS) {
    const value = localStorage.getItem(key);
    const fields = container.querySelectorAll<HTMLInputElement>(`input[name="cf_${key}"]`);

    for (const field of fields) {
      if (value) field.value = value;
      const label = field.previousElementSibling;
      if (label instanceof HTMLElement) label.style.display = "none";
      field.parentElement?.style.setProperty("display", "none");
    }
  }
}

export function LeadForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const container = formRef.current;
    if (!container) return;

    persistUtmParams();
    const timer = window.setInterval(() => applyUtmFields(container), 1000);

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
      window.clearInterval(timer);
    };
  }, []);

  return <div role="main" id={RD_FORM_ID} ref={formRef} />;
}
