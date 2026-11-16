import { IconBed, IconCar, IconWaves, SHELL } from "./ui";

const HIGHLIGHTS = [
  { icon: IconBed, title: "2 quartos", detail: "com varanda" },
  { icon: IconCar, title: "100% de vagas", detail: "garantidas" },
  { icon: IconWaves, title: "Poucos metros", detail: "do mar do Cumbuco" },
];

/**
 * Box de destaques entre o hero e a dobra do Cumbuco: os três diferenciais
 * que antes eram tags embaixo da tagline, numa faixa só, com ícone e
 * divisórias, como a barra de números da referência (Arcova).
 *
 * Fundo "Mar" (#2b8c88) da cartela do KV, ícones em "Areia" e texto em linho
 * para ler bem sobre o teal. O box sobe 32px sobre o pé da foto do
 * hero nos dois tamanhos (o hero tem 64px de respiro embaixo do formulário).
 * No celular os três itens empilham.
 */
export function HighlightsBar() {
  return (
    <div className={`${SHELL} relative z-10 -mt-8`}>
      <ul
        data-reveal
        className="grid divide-y rounded-[20px_0_20px_0] divide-brand-dune/25 bg-brand-mar px-6 text-brand-linen shadow-[0_24px_60px_-24px_rgba(15,68,70,0.55)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-0 sm:py-7"
      >
        {HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
          <li key={title} className="flex items-center gap-4 py-5 sm:justify-center sm:px-6 sm:py-1">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-brand-dune/45">
              <Icon className="size-6 text-brand-dune" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <strong className="block text-[1.2rem] font-semibold tracking-[-0.01em]">
                {title}
              </strong>
              <span className="text-[0.92rem] text-brand-linen/85">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
