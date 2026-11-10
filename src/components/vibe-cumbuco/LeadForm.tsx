import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { resolveUtmParams, type UtmParams } from "../../lib/rd-utm";
import { CTA_CLASS, CTA_DOT_CLASS, IconArrowRight } from "./ui";

/**
 * CloudPage do Marketing Cloud que recebe o envio, grava o lead na DE
 * `leads_vibe` e redireciona para /obrigado/vibe-cumbuco (ou de volta para cá
 * com `?cadastro=erro`). O código dela está versionado em
 * marketing-cloud/vibe-cumbuco-lead.html — esta URL tem de ser a mesma em que
 * ele for publicado.
 */
const MC_LEAD_ENDPOINT = "https://cloud.victacomunica.com.br/vibe-cumbuco-lead";

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_placement",
] as const;

type FieldName = "Nome" | "Email" | "Telefone";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `85999998888` → `(85) 99999-8888`, montando a máscara enquanto se digita. */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  // Fixo tem 8 dígitos depois do DDD (4-4), celular tem 9 (5-4).
  const split = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

function validate(form: HTMLFormElement): FieldErrors {
  const data = new FormData(form);
  const value = (name: FieldName) => String(data.get(name) ?? "").trim();
  const errors: FieldErrors = {};

  if (value("Nome") === "") errors.Nome = "Conte pra gente o seu nome.";
  if (!EMAIL_PATTERN.test(value("Email"))) errors.Email = "Confira o e-mail — falta algo nele.";
  const phoneDigits = value("Telefone").replace(/\D/g, "").length;
  if (phoneDigits < 10) errors.Telefone = "Informe o telefone com DDD.";

  return errors;
}

const LABEL_CLASS = "mb-1.5 block text-[0.72rem] font-medium tracking-[0.08em] text-brand/70";

/* Campo claro sobre o card de linho, com o petróleo no foco e no erro. */
const INPUT_CLASS =
  "h-12 w-full rounded-xl border border-brand/15 bg-white/80 px-4 text-[0.98rem] text-brand transition placeholder:text-brand/40 focus:border-brand-petrol focus:bg-white focus:ring-2 focus:ring-brand-petrol/20 focus:outline-none aria-[invalid=true]:border-[#b4462b] aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#b4462b]/15";

const ERROR_CLASS = "mt-1.5 text-[0.8rem] font-medium text-[#b4462b]";

/**
 * Formulário de captação da dobra 1, enviado para o Marketing Cloud.
 *
 * É um POST de formulário comum, sem fetch: a CloudPage grava e responde com o
 * redirect para a página de obrigado, cujo pageview é a conversão no GTM (ver
 * README, "Medição e conversão"). Mesma receita do form do Viver Bosque
 * (src/components/viver-bosque/LeadForm.tsx) e das outras LPs.
 */
export function LeadForm() {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [utm, setUtm] = useState<UtmParams>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    // Só no cliente: lê as UTMs da URL ou as guardadas de uma visita anterior.
    setUtm(resolveUtmParams());

    // A CloudPage devolve para cá com `?cadastro=erro` quando não consegue gravar.
    const url = new URL(window.location.href);
    if (url.searchParams.get("cadastro") === "erro") {
      setServerError(true);
      url.searchParams.delete("cadastro");
      window.history.replaceState(window.history.state, "", url);
    }

    // Quem volta da página de obrigado pelo botão "voltar" recebe a página do
    // bfcache, com o botão ainda em "Enviando…".
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setSubmitting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid || submitting) {
      event.preventDefault();
      if (firstInvalid) form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Sem preventDefault: o navegador segue com o POST para a CloudPage.
    setServerError(false);
    setSubmitting(true);
  }

  function clearError(name: FieldName) {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
    clearError("Telefone");
  }

  return (
    <form
      action={MC_LEAD_ENDPOINT}
      method="post"
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-3.5"
    >
      {serverError && (
        <p
          role="alert"
          className="rounded-xl bg-[#b4462b]/10 px-4 py-3 text-sm font-medium text-[#8a3520]"
        >
          Não conseguimos concluir o seu cadastro. Confira os dados e tente de novo.
        </p>
      )}

      <div>
        <label htmlFor="lead-nome" className={LABEL_CLASS}>
          Nome
        </label>
        <input
          id="lead-nome"
          name="Nome"
          type="text"
          autoComplete="name"
          maxLength={50}
          required
          placeholder="Seu nome"
          aria-invalid={errors.Nome ? true : undefined}
          aria-describedby={errors.Nome ? "lead-nome-erro" : undefined}
          onChange={() => clearError("Nome")}
          className={INPUT_CLASS}
        />
        {errors.Nome && (
          <p id="lead-nome-erro" className={ERROR_CLASS}>
            {errors.Nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-email" className={LABEL_CLASS}>
          E-mail
        </label>
        <input
          id="lead-email"
          name="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="voce@email.com"
          aria-invalid={errors.Email ? true : undefined}
          aria-describedby={errors.Email ? "lead-email-erro" : undefined}
          onChange={() => clearError("Email")}
          className={INPUT_CLASS}
        />
        {errors.Email && (
          <p id="lead-email-erro" className={ERROR_CLASS}>
            {errors.Email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-telefone" className={LABEL_CLASS}>
          Telefone
        </label>
        <input
          id="lead-telefone"
          name="Telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          placeholder="(85) 99999-9999"
          value={phone}
          onChange={handlePhoneChange}
          aria-invalid={errors.Telefone ? true : undefined}
          aria-describedby={errors.Telefone ? "lead-telefone-erro" : undefined}
          className={INPUT_CLASS}
        />
        {errors.Telefone && (
          <p id="lead-telefone-erro" className={ERROR_CLASS}>
            {errors.Telefone}
          </p>
        )}
      </div>

      {UTM_FIELDS.map((name) => (
        <input key={name} type="hidden" name={name} value={utm[name] ?? ""} />
      ))}

      {/*
        Campo-armadilha contra robô: fora da tela, fora do Tab e sem
        autocomplete, então só quem preenche tudo às cegas escreve aqui. A
        CloudPage descarta o envio que chega com ele preenchido.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Não preencha este campo</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`group mt-2 flex h-14 w-full items-center justify-between rounded-full py-2 pr-2 pl-7 text-[1rem] font-semibold disabled:cursor-wait disabled:opacity-80 ${CTA_CLASS}`}
      >
        {submitting ? "Enviando…" : "Cadastre-se agora"}
        <span aria-hidden="true" className={CTA_DOT_CLASS}>
          <IconArrowRight className="size-[18px]" />
        </span>
      </button>

      <p className="text-[0.75rem] leading-snug text-brand/55">
        Ao enviar, você concorda em ser contatado por nossos canais de comunicação.
      </p>
    </form>
  );
}
