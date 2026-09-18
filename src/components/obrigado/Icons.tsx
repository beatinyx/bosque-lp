import type { SVGProps } from "react";

/**
 * Os dois ícones que a página de obrigado usa — a seta do botão de volta e o
 * WhatsApp do rodapé da Victa.
 *
 * São cópias dos mesmos desenhos que vivem em `src/components/<produto>/Icons.tsx`.
 * A duplicação é de propósito: esta pasta é compartilhada pelas cinco páginas de
 * obrigado, e importar o arquivo de um produto específico deixaria as outras
 * quatro dependendo dele.
 */
type IconProps = SVGProps<SVGSVGElement>;

export const IconArrowLeft = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 12H6M11 6l-6 6 6 6" />
  </svg>
);

export const IconWhatsApp = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.3.9.9-4.2-.3-.4A9.9 9.9 0 0 1 6 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10Zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
  </svg>
);
