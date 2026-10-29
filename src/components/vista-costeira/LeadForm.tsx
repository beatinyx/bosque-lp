import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { resolveUtmParams, type UtmParams } from "../../lib/rd-utm";

/**
 * CloudPage do Marketing Cloud que recebe o envio, grava o lead na DE
 * `leads_costeira` e redireciona para /obrigado/vista-costeira (ou de volta
 * para cá com `?cadastro=erro`). O código dela está versionado em
 * marketing-cloud/vista-costeira-lead.html — esta URL tem de ser a mesma em
 * que ele foi publicado.
 */
const MC_LEAD_ENDPOINT = "https://cloud.victacomunica.com.br/vista-costeira-lead";

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

const LABEL_CLASS = "mb-1.5 block text-base text-white";

/* Pílulas brancas com o texto no azul do box — o desenho do embed do RD. */
const INPUT_CLASS =
  "h-9 w-full rounded-full border-0 bg-white px-4 text-[1.05rem] text-brand-ink placeholder:text-brand-ink/55 focus:ring-2 focus:ring-brand-surf focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand-sand";

const ERROR_CLASS = "mt-1 text-sm font-semibold text-white";

/**
 * Formulário de captação do hero, enviado para o Marketing Cloud.
 *
 * É um POST de formulário comum, sem fetch: a CloudPage grava e responde com o
 * redirect para a página de obrigado, cujo pageview é a conversão no GTM (ver
 * README, "Medição e conversão"). Sem CORS, sem iframe e sem script de
 * terceiro no hero. Mesma receita do form do Viver Bosque
 * (src/components/viver-bosque/LeadForm.tsx), com o desenho do embed que
 * ficava no box translúcido do hero: pílulas brancas e a pílula verde dos CTAs.
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
    <div id="cadastro" className="scroll-mt-6">
      <form
        action={MC_LEAD_ENDPOINT}
        method="post"
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 text-left"
      >
        {serverError && (
          <p
            role="alert"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-brand-ink"
          >
            Não conseguimos concluir o seu cadastro. Confira os dados e tente de novo.
          </p>
        )}

        <div>
          <label htmlFor="lead-nome" className={LABEL_CLASS}>
            Nome*
          </label>
          <input
            id="lead-nome"
            name="Nome"
            type="text"
            autoComplete="name"
            maxLength={50}
            required
            placeholder="Nome *"
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
            Email*
          </label>
          <input
            id="lead-email"
            name="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="Email *"
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
            Telefone*
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
          className="mt-4 h-12 w-full rounded-full bg-brand-surf px-3 text-[clamp(0.8rem,3.6vw,1.05rem)] font-bold whitespace-nowrap text-white uppercase shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? "Enviando…" : "Quero simular"}
        </button>

        <p className="mt-1 text-sm leading-snug text-white">
          Prometemos não utilizar suas informações de contato para enviar qualquer tipo de SPAM.
        </p>
      </form>
    </div>
  );
}
