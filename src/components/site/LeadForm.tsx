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
 * O formulário fica solto sobre a foto do hero, sem card: por isso os textos
 * são claros e os inputs, areia. Os campos e o botão vêm prontos do RD; os
 * ajustes ficam em `.rd-form-card` no styles.css (esconde os campos de UTM,
 * aplica a paleta da marca nos rótulos e nos inputs e troca o botão pelo CTA
 * terracota).
 */
/**
 * Div que já foi entregue ao RD. Vive fora do componente de propósito: o
 * `createForm()` do RD monta o formulário de forma assíncrona, então contar os
 * filhos da div não fecha a corrida — dois efeitos disparados perto um do outro
 * (HMR no dev, remount, StrictMode) veem a div ainda vazia e mandam montar duas
 * vezes, e o formulário aparece duplicado. A trava é marcada antes da chamada.
 *
 * A trava guarda o elemento, não um booleano: se a div for de fato recriada num
 * remount, o nó é outro e o formulário volta a ser montado.
 */
let initializedNode: HTMLElement | null = null;

export function LeadForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    function createForm() {
      const node = formRef.current;
      if (cancelled || !window.RDStationForms || !node) return;
      if (initializedNode === node || node.childElementCount > 0) return;
      initializedNode = node;
      new window.RDStationForms(RD_FORM_ID, RD_TOKEN).createForm();
    }

    // O script é único na página: se já está lá, só aguardamos o load dele.
    let script = document.querySelector<HTMLScriptElement>(`script[src="${RD_SCRIPT_SRC}"]`);

    if (window.RDStationForms) {
      createForm();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.src = RD_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", createForm);
    }

    return () => {
      cancelled = true;
      // Remove do script em que o listener foi realmente registrado.
      script?.removeEventListener("load", createForm);
    };
  }, []);

  return (
    <div
      id="cadastro"
      className="rd-form-card w-full max-w-[460px] justify-self-center lg:order-1 lg:justify-self-start"
    >
      {/*
        Centralizado para casar com o formulário: o embed do RD vem dentro de um
        wrapper com 20px de padding nas duas laterais, então o conteúdo dele já
        está centrado nesta div — é o eixo central, não a borda esquerda, que os
        dois têm em comum.
      */}
      <h2 className="text-center text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.2] text-white [text-shadow:0_2px_18px_rgba(15,47,25,0.75)]">
        O endereço certo para{" "}
        <span className="emphasis whitespace-nowrap text-brand-lime">sair do aluguel</span>
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
