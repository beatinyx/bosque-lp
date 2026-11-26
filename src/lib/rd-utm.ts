/**
 * UTMs → campos personalizados do formulário do RD Station.
 *
 * Os cinco formulários do RD trazem seis campos de texto `cf_utm_*`
 * (utm_source, utm_medium, utm_campaign, utm_term, utm_content e
 * utm_placement) que o CSS esconde. O script do RD (`rdstation-forms.min.js`)
 * não preenche campo nenhum a partir da URL: a única origem que ele lê é o
 * cookie `__trf.src`, gravado pelo código de monitoramento, e só para o campo
 * oculto `traffic_source`, no momento do envio. Sem este módulo os `cf_utm_*`
 * vão vazios para o RD — foi assim que Bosque, Eusébio e Hype ficaram sem UTM.
 *
 * O que ele faz:
 *
 * 1. Lê os `utm_*` da URL na chegada e guarda o conjunto inteiro no
 *    localStorage. Inteiro, e não chave a chave: gravando uma a uma, a visita
 *    por uma campanha nova herdava o `utm_content` e o `utm_term` da anterior.
 *    Sem UTM na URL vale o conjunto guardado — quem clicou no anúncio de manhã
 *    e voltou à noite digitando o endereço continua atribuído ao anúncio.
 *
 * 2. Escreve os valores nos `cf_utm_*` assim que o RD injeta o formulário (o
 *    `createForm()` é assíncrono, daí o MutationObserver) e de novo no
 *    `submit`, em fase de captura, antes do handler do RD serializar os
 *    campos: o RD tem um autofill próprio (cookie `_form_fields`) que pode
 *    repor os valores de uma conversão anterior depois que já preenchemos.
 */

const UTM_PREFIX = "utm_";
const RD_FIELD_PREFIX = "cf_utm_";
const STORAGE_KEY = "victa:utm";

/**
 * Chaves que as LPs do Jasmim e do Essencial gravavam soltas no localStorage
 * antes deste módulo. Ficam como leitura de compatibilidade para quem chegou
 * por um anúncio antes do deploy e converte depois.
 */
const LEGACY_STORAGE_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_placement",
];

export type UtmParams = Record<string, string>;

/** Só os parâmetros `utm_*` de uma query string, com chave em minúsculas. */
export function utmParamsFromSearch(search: string): UtmParams {
  const utm: UtmParams = {};
  for (const [rawKey, rawValue] of new URLSearchParams(search)) {
    const key = rawKey.trim().toLowerCase();
    const value = rawValue.trim();
    if (key.startsWith(UTM_PREFIX) && value !== "") utm[key] = value;
  }
  return utm;
}

function isUtmParams(value: unknown): value is UtmParams {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.entries(value).every(
      ([key, item]) => key.startsWith(UTM_PREFIX) && typeof item === "string",
    )
  );
}

function readStoredUtmParams(): UtmParams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw);
      if (isUtmParams(parsed)) return parsed;
    }

    const legacy: UtmParams = {};
    for (const key of LEGACY_STORAGE_KEYS) {
      const value = localStorage.getItem(key);
      if (value) legacy[key] = value;
    }
    return legacy;
  } catch {
    return {};
  }
}

function storeUtmParams(utm: UtmParams) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // Sem storage (modo privado, cota estourada) o preenchimento segue só
    // pela URL desta visita.
  }
}

/**
 * UTMs desta visita: as da URL, se houver alguma (e aí o conjunto guardado é
 * substituído), ou as guardadas de uma visita anterior.
 */
export function resolveUtmParams(search: string = window.location.search): UtmParams {
  const fromUrl = utmParamsFromSearch(search);
  if (Object.keys(fromUrl).length > 0) {
    storeUtmParams(fromUrl);
    return fromUrl;
  }
  return readStoredUtmParams();
}

/**
 * Escreve as UTMs nos inputs `cf_utm_*` que o RD injetou em `container` e
 * esconde a linha de cada um. O RD manda todo input com `name` e `value` no
 * envio, visível ou não, então basta o valor estar no DOM.
 */
export function applyUtmParams(container: ParentNode, utm: UtmParams) {
  const inputs = container.querySelectorAll<HTMLInputElement>(`input[name^="${RD_FIELD_PREFIX}"]`);

  for (const input of inputs) {
    // `cf_utm_source` → `utm_source`
    const value = utm[input.name.slice("cf_".length)];
    if (value !== undefined && input.value !== value) input.value = value;

    // Reforço do `:has()` de styles.css para navegadores sem suporte.
    const row = input.closest<HTMLElement>(".bricks-form__field") ?? input;
    row.style.setProperty("display", "none", "important");
  }
}

/**
 * Liga o preenchimento das UTMs ao container onde o RD vai montar o
 * formulário. Chamar no efeito do LeadForm, antes do `createForm()`; devolve a
 * função de limpeza.
 */
export function bindRdUtmFields(container: HTMLElement): () => void {
  const utm = resolveUtmParams();
  const apply = () => applyUtmParams(container, utm);

  apply();

  const observer = new MutationObserver(apply);
  observer.observe(container, { childList: true, subtree: true });
  container.addEventListener("submit", apply, true);

  return () => {
    observer.disconnect();
    container.removeEventListener("submit", apply, true);
  };
}
