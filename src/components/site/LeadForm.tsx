import { useEffect, useRef } from "react";

const RD_FORM_ID = "bosque-6026d4e5f95b4ee9aa59";
const RD_TOKEN = "UA-169812363-1";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (formId: string, token: string) => { createForm: () => void };
  }
}

/**
 * Formulário de captação da dobra 1 — embed do RD Station.
 *
 * Os campos e o botão vêm prontos do RD; os ajustes para caber no card ficam em
 * `.rd-form-card` no styles.css (esconde os campos de UTM, aplica a paleta da
 * marca nos rótulos e nos inputs e troca o botão pelo CTA terracota).
 */
export function LeadForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    function createForm() {
      if (cancelled || !window.RDStationForms || !formRef.current) return;
      // Evita duplicar o formulário em re-render / StrictMode
      if (formRef.current.childElementCount > 0) return;
      new window.RDStationForms(RD_FORM_ID, RD_TOKEN).createForm();
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RD_SCRIPT_SRC}"]`);

    if (window.RDStationForms) {
      createForm();
    } else if (existing) {
      existing.addEventListener("load", createForm);
    } else {
      const script = document.createElement("script");
      script.src = RD_SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", createForm);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      existing?.removeEventListener("load", createForm);
    };
  }, []);

  return (
    <div
      id="cadastro"
      className="rd-form-card chamfer chamfer-lg w-full max-w-[460px] justify-self-center bg-brand-sand p-7 shadow-[0_24px_60px_rgba(0,0,0,0.34)] sm:p-9 lg:justify-self-end"
    >
      <h2 className="text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.2] text-brand">
        O endereço certo para <span className="emphasis whitespace-nowrap">sair do aluguel</span>
      </h2>

      {/*
        A linha "Ao enviar, você concorda em ser contatado…" do briefing já vem
        dentro do embed, configurada no painel do RD — por isso ela não é
        repetida aqui.
      */}
      <div role="main" id={RD_FORM_ID} ref={formRef} className="mt-6" />
    </div>
  );
}
