/**
 * UTMs da visita, para os campos ocultos dos formulários das LPs.
 *
 * O nome do arquivo é do tempo dos embeds do RD Station, que traziam campos
 * `cf_utm_*` e não os preenchiam pela URL. Hoje todos os formulários são
 * próprios e vão para o Marketing Cloud, e cada LeadForm escreve estas UTMs
 * nos seus `<input type="hidden">`.
 *
 * Lê os `utm_*` da URL na chegada e guarda o conjunto inteiro no
 * localStorage. Inteiro, e não chave a chave: gravando uma a uma, a visita
 * por uma campanha nova herdava o `utm_content` e o `utm_term` da anterior.
 * Sem UTM na URL vale o conjunto guardado — quem clicou no anúncio de manhã e
 * voltou à noite digitando o endereço continua atribuído ao anúncio.
 */

const UTM_PREFIX = "utm_";
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
