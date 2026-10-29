import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { resolveUtmParams, type UtmParams } from "../../lib/rd-utm";

/**
 * CloudPage do Marketing Cloud que recebe o envio, grava o lead na DE
 * `leads_hype` e redireciona para /obrigado/viver-hype (ou de volta
 * para cá com `?cadastro=erro`). O código dela está versionado em
 * marketing-cloud/viver-hype-lead.html — esta URL tem de ser a mesma em
 * que ele foi publicado.
 */
const MC_LEAD_ENDPOINT = "https://cloud.victacomunica.com.br/viver-hype-lead";

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

const LABEL_CLASS = "mb-1 block text-[0.68rem] font-bold tracking-[0.14em] text-white uppercase";

/* Campos creme com o texto no teal escuro — o desenho do embed do RD. */
const INPUT_CLASS =
  "h-9 w-full rounded-md border border-brand-deepsea/18 bg-brand-shell px-3 text-[0.95rem] text-brand-deepsea placeholder:text-brand-deepsea/55 focus:ring-2 focus:ring-brand-deepsea focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-white";

const ERROR_CLASS = "mt-1 text-sm font-semibold text-white";

/**
 * Formulário de captação da dobra 1, enviado para o Marketing Cloud.
 *
 * É um POST de formulário comum, sem fetch: a CloudPage grava e responde com o
 * redirect para a página de obrigado, cujo pageview é a conversão no GTM (ver
 * README, "Medição e conversão"). Sem CORS, sem iframe e sem script de
 * terceiro no hero. Mesma receita do form do Viver Bosque
 * (src/components/viver-bosque/LeadForm.tsx).
 *
 * O design do Figma não tem formulário na página: ele entrou depois e mora
 * dentro do card laranja do hero (HeroSection.tsx), na área que o design
 * deixa vazia. Este componente traz só o formulário; o card é de lá.
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
        className="flex flex-col gap-2.5"
      >
        {serverError && (
          <p
            role="alert"
            className="rounded-md bg-brand-shell px-4 py-2 text-sm font-semibold text-brand-deepsea"
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

        {/*
          Botão no teal escuro da paleta: o card que o contém é o laranja da
          manchete, então um botão coral desapareceria dentro dele. O `clamp` e
          o `nowrap` seguram "CADASTRE-SE AGORA" numa linha nos telefones
          estreitos.
        */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-[18px] h-12 w-full rounded-full bg-brand-deepsea px-3 text-[clamp(0.8rem,3.8vw,1.05rem)] font-extrabold tracking-[0.06em] whitespace-nowrap text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition-[filter] hover:brightness-125 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? "Enviando…" : "Cadastre-se agora"}
        </button>

        <p className="mt-2 text-sm leading-snug text-brand-shell/78">
          Ao enviar, você concorda em ser contatado por nossos canais de comunicação.
        </p>
      </form>
    </div>
  );
}
