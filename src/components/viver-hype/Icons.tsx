import type { SVGProps } from "react";

/**
 * Ícones em traço, desenhados no mesmo viewBox 24x24 para alinharem entre si
 * nas listas de lazer e de localização.
 */
type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const IconArrowRight = (props: IconProps) => (
  <svg {...stroke} strokeWidth={2.2} {...props}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (props: IconProps) => (
  <svg {...stroke} strokeWidth={2.2} {...props}>
    <path d="M19 12H6M11 6l-6 6 6 6" />
  </svg>
);

export const IconClose = (props: IconProps) => (
  <svg {...stroke} strokeWidth={2.2} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (props: IconProps) => (
  <svg {...stroke} strokeWidth={2.4} {...props}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const IconPin = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.4 2" />
  </svg>
);

export const IconWhatsApp = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.3.9.9-4.2-.3-.4A9.9 9.9 0 0 1 6 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10Zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
  </svg>
);

/* --------------------------------------------------------- localização -- */

export const IconCart = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M2.5 3.5h2.4l2.2 10.6a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.2l1.6-6.4H6" />
    <circle cx="9.5" cy="19.5" r="1.5" />
    <circle cx="17.5" cy="19.5" r="1.5" />
  </svg>
);

export const IconBag = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M4 7.5h16l-1.2 12a1.8 1.8 0 0 1-1.8 1.6H7a1.8 1.8 0 0 1-1.8-1.6L4 7.5Z" />
    <path d="M8.5 10V6.8a3.5 3.5 0 0 1 7 0V10" />
  </svg>
);

export const IconRoad = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M7.5 3 4.5 21M16.5 3l3 18" />
    <path d="M12 3.5v3M12 10.5v3M12 17.5v3" />
  </svg>
);

export const IconHealth = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <rect x="3.5" y="6" width="17" height="14.5" rx="2" />
    <path d="M12 10v6.5M8.75 13.25h6.5" />
    <path d="M8.5 6V3.5h7V6" />
  </svg>
);

/* ---------------------------------------------------------------- lazer -- */

export const IconPool = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M2 15.5c1.5 0 1.5 1.3 3 1.3s1.5-1.3 3-1.3 1.5 1.3 3 1.3 1.5-1.3 3-1.3 1.5 1.3 3 1.3 1.5-1.3 3-1.3" />
    <path d="M2 19.6c1.5 0 1.5 1.3 3 1.3s1.5-1.3 3-1.3 1.5 1.3 3 1.3 1.5-1.3 3-1.3 1.5 1.3 3 1.3 1.5-1.3 3-1.3" />
    <path d="M7.5 14V5.5A2.5 2.5 0 0 1 10 3M16.5 14V5.5A2.5 2.5 0 0 1 19 3" />
    <path d="M7.5 8.5h9" />
  </svg>
);

export const IconParty = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M3.5 20.5 9 9l6 6-11.5 5.5Z" />
    <path d="m6.2 15 2.8 2.8" />
    <path d="M14 3v2M19.4 4.6 18 6M21 10h-2M17.6 12.4 16.2 11" />
    <circle cx="19.5" cy="14.5" r="1" />
  </svg>
);

export const IconGrill = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M3 9h18l-2 6.2A5 5 0 0 1 14.3 18H9.7A5 5 0 0 1 5 15.2L3 9Z" />
    <path d="m8 18-1.6 4M16 18l1.6 4" />
    <path d="M9.5 6c0-1.2 1.2-1.2 1.2-2.5M14 6c0-1.2 1.2-1.2 1.2-2.5" />
  </svg>
);

export const IconCourt = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="1.6" />
    <path d="M12 5v14" />
    <circle cx="12" cy="12" r="2.8" />
    <path d="M2.5 8.6h3.2v6.8H2.5M21.5 8.6h-3.2v6.8h3.2" />
  </svg>
);

export const IconPlayground = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M4.5 20.5V11M8.5 20.5V11" />
    <path d="M4.5 14h4M4.5 17.2h4" />
    <path d="M8.5 11c3.8.6 6 4.4 7.6 9.5" />
    <path d="M15 20.5h5" />
    <path d="M6.5 11V8.6" />
    <circle cx="6.5" cy="6.6" r="1.6" />
  </svg>
);

export const IconPaw = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <circle cx="6.4" cy="10" r="1.9" />
    <circle cx="10.4" cy="6.6" r="2" />
    <circle cx="15" cy="7.2" r="2" />
    <circle cx="18.4" cy="11.4" r="1.8" />
    <path d="M12.2 12.4c-2.9 0-5.4 2.4-5.4 4.7 0 1.6 1.2 2.6 2.8 2.6.9 0 1.7-.4 2.6-.4s1.7.4 2.6.4c1.6 0 2.8-1 2.8-2.6 0-2.3-2.5-4.7-5.4-4.7Z" />
  </svg>
);

export const IconDumbbell = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M3.5 9.5v5M6.8 7v10M17.2 7v10M20.5 9.5v5M6.8 12h10.4" />
  </svg>
);

export const IconPicnic = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M2.8 9h18.4l-1.7 9.4a2 2 0 0 1-2 1.6H6.5a2 2 0 0 1-2-1.6L2.8 9Z" />
    <path d="M8 9a4 4 0 0 1 8 0" />
    <path d="M3.6 13.4h16.8" />
  </svg>
);

export const IconHammock = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M4 3.5v17M20 3.5v17" />
    <path d="M4 9.5c4.6 8 11.4 8 16 0" />
    <path d="M7.2 11.6v2.6M12 14.2v2.6M16.8 11.6v2.6" />
  </svg>
);

export const IconPouf = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <ellipse cx="12" cy="10.4" rx="8" ry="3.4" />
    <path d="M4 10.4v4.2c0 1.9 3.6 3.4 8 3.4s8-1.5 8-3.4v-4.2" />
    <path d="M12 13.8v4.2" />
  </svg>
);

/** Rooftop — no design a dobra de lazer usa um sol para o terraço. */
export const IconSun = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.6v2.4M12 19v2.4M2.6 12h2.4M19 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7" />
  </svg>
);

/*
 * Ícones da faixa de condições. O conjunto herdado das outras LPs não tem
 * nada de financiamento, então estes três foram desenhados aqui no mesmo
 * viewBox: cartão (FGTS), casa na mão (financiamento) e cédulas (parcelas).
 */
export const IconCard = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="2.2" />
    <path d="M2.6 10h18.8M6 14.4h4" />
  </svg>
);

export const IconHandHouse = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path d="M7.5 9.6 12 6l4.5 3.6v4.3h-9z" />
    <path d="M3 17.2c1.5-.9 3-.6 4.2.2 1 .7 2 1 3.3 1h4.6c1.6 0 2.9-.7 3.9-1.9" />
  </svg>
);

export const IconCoins = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <rect x="2.6" y="7" width="14" height="8.4" rx="1.6" />
    <circle cx="9.6" cy="11.2" r="1.9" />
    <path d="M19.4 9.4v6.2c0 1-1.2 1.8-2.8 1.8H7.4" />
  </svg>
);
