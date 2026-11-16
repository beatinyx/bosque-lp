import type { PointerEvent } from "react";

import { CtaLink, Eyebrow, Heading, IconCalendar, IconWallet, SHELL } from "./ui";

/** Leva a posição do cursor para o brilho do vidro (`--mx`/`--my` em `.vibe-glass`). */
function followPointer(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

const PERKS = [
  { icon: IconWallet, text: "Use o seu FGTS na entrada." },
  { icon: IconCalendar, text: "Parcelas que se ajustam ao seu planejamento." },
];

/**
 * DOBRA 6 — Condições comerciais (Minha Casa, Minha Vida).
 *
 * Card petróleo fechado, o par escuro da dobra do mapa: texto e as duas
 * facilidades em ladrilhos translúcidos (como o "Комплексное меблирование" da
 * referência), que viram vidro no hover (`.vibe-glass`), de um lado, a portaria com o letreiro do outro. O living do KV
 * não serve aqui: é área comum do condomínio, não o interior do apartamento.
 */
export function ConditionsSection() {
  return (
    <section className="pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div
          data-reveal
          className="vibe-frame grid overflow-hidden bg-brand text-brand-linen lg:grid-cols-12"
        >
          <div className="px-6 py-12 sm:px-10 sm:py-16 lg:col-span-7 lg:px-14 lg:py-20">
            <Eyebrow tone="light">Minha Casa, Minha Vida</Eyebrow>
            <Heading tone="light" lead="As condições que faltavam" accent="para o seu novo apê" />

            <p className="mt-8 max-w-[50ch] text-[1.02rem] leading-[1.65] text-pretty text-brand-linen/75">
              Com o financiamento facilitado pela Caixa Econômica Federal, garantir a sua unidade no
              Vibe Cumbuco ficou simples e acessível. Cuidamos das condições para você focar no que
              realmente importa: o seu novo lar.
            </p>

            {/* Largura limitada e o box do FGTS (texto curto) mais estreito que o das parcelas. */}
            <ul className="mt-10 grid gap-3 sm:grid-cols-[minmax(0,15.25rem)_minmax(0,20rem)]">
              {PERKS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  onPointerMove={followPointer}
                  className="vibe-glass flex items-center gap-4 rounded-2xl bg-brand-mar p-5 sm:flex-col sm:items-start sm:gap-6"
                >
                  <Icon className="size-9 shrink-0 text-brand-sand" aria-hidden="true" />
                  <span className="text-[1.25rem] leading-snug text-brand-linen">{text}</span>
                </li>
              ))}
            </ul>

            <CtaLink className="mt-10">Quero simular meu financiamento</CtaLink>
          </div>

          {/*
            Véu em petróleo: no desktop a foto se funde ao texto da esquerda
            para a direita; no celular, onde ela fica embaixo do texto, o mesmo
            degradê corre de cima para baixo, sem emenda reta entre os dois.
          */}
          <div className="group relative min-h-[420px] overflow-hidden lg:col-span-5 lg:min-h-[300px]">
            {/*
              Portaria com o letreiro sobre os cobogós verdes (render entregue
              em 2026-11-16). No celular a faixa é baixa e larga, então o
              recorte desce até o letreiro (72% da altura); no desktop a coluna
              é alta e cabe quase o render inteiro.
            */}
            <img
              src="/images/vibe-cumbuco/portaria.webp"
              alt="Portaria do Vibe Cumbuco com o letreiro sobre cobogós verdes ao anoitecer"
              width={1400}
              height={1556}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[48%_72%] lg:object-[45%_center] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-brand via-brand/10 to-transparent lg:bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
