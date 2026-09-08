import { useEffect, useRef } from "react";

const RD_FORM_ID = "eusebio-4044c95a9a0395652ffc";
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
 * O visual dos campos vem do próprio RD Station; os ajustes para o card ficam
 * em `.rd-form-card` no styles.css (esconde os campos de UTM e aplica o CTA
 * azul da marca no botão).
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
    <div className="rd-form-card w-full max-w-[480px] justify-self-center rounded-[0_40px_0_40px] border border-white/12 bg-brand p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8 lg:justify-self-end">
      <h2 className="mb-5 text-center text-xl font-normal text-white sm:text-2xl">
        {/* nowrap mantém "2 quartos no Eusébio" inteiro, sem deixar "Eusébio" órfão */}
        Seu apartamento de <span className="whitespace-nowrap">2 quartos no Eusébio</span>
      </h2>

      <div role="main" id={RD_FORM_ID} ref={formRef} />
    </div>
  );
}
