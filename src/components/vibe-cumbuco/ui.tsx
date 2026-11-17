import type { ReactNode, SVGProps } from "react";

/**
 * Peças repetidas pelas dobras do Vibe Cumbuco: a largura da página, a
 * manchete em duas vozes do KV, o sobretítulo e o botão.
 */

/** Largura da página. Mais larga que o `.lp-container` das outras LPs: aqui as
 *  fotos correm em cards emoldurados quase de ponta a ponta. */
export const SHELL = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

/**
 * Manchete das seções: a frase em sans fina e o fecho em negrito, na mesma
 * linha de leitura e na cor de destaque do fundo — "Um ativo sólido no
 * litoral que mais cresce **e valoriza**". A manuscrita ficou só na tagline
 * do hero.
 */
export function Heading({
  as: Tag = "h2",
  lead,
  accent,
  tone = "dark",
  size = "lg",
  className = "",
}: {
  as?: "h1" | "h2";
  lead: ReactNode;
  accent: ReactNode;
  tone?: "dark" | "light";
  /** `md` para manchete que divide o espaço com uma foto, como na dobra 2. */
  size?: "lg" | "md";
  className?: string;
}) {
  const accentColor = tone === "dark" ? "text-brand-petrol" : "text-brand-sand";
  const fontSize =
    size === "lg" ? "text-[clamp(2rem,4.4vw,3.6rem)]" : "text-[clamp(1.75rem,3.2vw,2.85rem)]";
  return (
    <Tag
      className={`${fontSize} leading-[1.08] font-light tracking-[-0.02em] text-balance ${className}`}
    >
      {lead} <strong className={`font-semibold ${accentColor}`}>{accent}</strong>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-brand-petrol" : "text-brand-sand/80";
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.24em] uppercase ${color}`}
    >
      {children}
    </p>
  );
}

/**
 * Classes do CTA laranja (`brand-orange`, #d98c34 no tema), divididas entre a
 * pílula e o círculo da seta para o botão de envio do formulário usar as
 * mesmas. Texto branco e seta em petróleo dentro de um círculo creme.
 */
export const CTA_CLASS =
  "bg-brand-orange text-white transition-colors duration-300 hover:bg-brand-orange-deep focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:outline-none";
export const CTA_DOT_CLASS =
  "grid size-10 shrink-0 place-items-center rounded-full bg-brand-linen text-brand-petrol transition-transform duration-300 group-hover:translate-x-0.5";

/**
 * Botão-pílula com a seta num círculo, como os das referências. Todos os CTAs
 * da página levam ao formulário da dobra 1 (`#cadastro`).
 */
export function CtaLink({
  children,
  href = "#cadastro",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-6 text-[0.95rem] font-semibold ${CTA_CLASS} ${className}`}
    >
      {children}
      <span aria-hidden="true" className={CTA_DOT_CLASS}>
        <IconArrowRight className="size-[18px]" />
      </span>
    </a>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const IconArrowRight = (props: IconProps) => (
  <svg {...stroke} strokeWidth={1.8} {...props}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (props: IconProps) => (
  <svg {...stroke} strokeWidth={1.8} {...props}>
    <path d="M19 12H6M11 6l-6 6 6 6" />
  </svg>
);

export const IconClose = (props: IconProps) => (
  <svg {...stroke} strokeWidth={1.8} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

/** FGTS — carteira. */
export const IconWallet = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
    <path d="M4 7.5v10A2.5 2.5 0 0 0 6.5 20H20V8H6.5A2.5 2.5 0 0 1 4 7.5Z" />
    <circle cx="16" cy="14" r="1.2" />
  </svg>
);

/** Financiamento pela Caixa — fachada de banco. */
export const IconBank = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="m3 9 9-5 9 5" />
    <path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7" />
    <path d="M3 20h18" />
  </svg>
);

/** Parcelas — calendário. */
export const IconCalendar = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h2M14 14h2M8 17h2" />
  </svg>
);

export const IconBed = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M3 18v2M21 18v2" />
    <path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10" />
  </svg>
);

export const IconCar = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M5 16.5V12l2-5h10l2 5v4.5" />
    <path d="M4 12h16v4.5H4z" />
    <path d="M6 16.5V19M18 16.5V19" />
    <circle cx="7.5" cy="14.2" r=".6" fill="currentColor" />
    <circle cx="16.5" cy="14.2" r=".6" fill="currentColor" />
  </svg>
);

/** Perto do mar — três ondas. */
export const IconWaves = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M2.5 8c1.6 0 1.6-1.5 3.2-1.5S7.3 8 8.9 8s1.6-1.5 3.1-1.5S13.6 8 15.2 8s1.6-1.5 3.1-1.5S19.9 8 21.5 8" />
    <path d="M2.5 13c1.6 0 1.6-1.5 3.2-1.5S7.3 13 8.9 13s1.6-1.5 3.1-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.1-1.5 1.6 1.5 3.2 1.5" />
    <path d="M2.5 18c1.6 0 1.6-1.5 3.2-1.5S7.3 18 8.9 18s1.6-1.5 3.1-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.1-1.5 1.6 1.5 3.2 1.5" />
  </svg>
);

/** Locação por temporada — sol. */
export const IconSun = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

/* O mesmo desenho do rodapé das outras LPs (vista-costeira/Icons.tsx). */
export const IconWhatsApp = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.3.9.9-4.2-.3-.4A9.9 9.9 0 0 1 6 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10Zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
  </svg>
);
