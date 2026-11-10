import type { PointerEvent } from "react";

import { CtaLink, Eyebrow, Heading, IconBank, IconCalendar, IconWallet, SHELL } from "./ui";

/** Leva a posição do cursor para o brilho do vidro (`--mx`/`--my` em `.vibe-glass`). */
function followPointer(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

const PERKS = [
  { icon: IconWallet, text: "Use o seu FGTS na entrada." },
  { icon: IconBank, text: "Financiamento facilitado pela Caixa Econômica Federal." },
  { icon: IconCalendar, text: "Parcelas que se ajustam ao seu planejamento." },
];

/**
 * DOBRA 6 — Condições comerciais (Minha Casa, Minha Vida).
 *
 * Card petróleo fechado, o par escuro da dobra do mapa: texto e as três
 * facilidades em ladrilhos translúcidos (como o "Комплексное меблирование" da
 * referência), que viram vidro no hover (`.vibe-glass`), de um lado, a torre com as varandas do outro. O living do KV
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

            <p className="mt-8 max-w-[50ch] text-[1.02rem] leading-[1.65] text-brand-linen/75">
              O Vibe Cumbuco faz parte do programa Minha Casa, Minha Vida, facilitando o acesso com
              renda familiar a partir de{" "}
              <strong className="font-semibold whitespace-nowrap text-brand-sand">
                R$ 9.000,00
              </strong>
              .
            </p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {PERKS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  onPointerMove={followPointer}
                  className="vibe-glass flex gap-4 rounded-2xl p-5 sm:flex-col sm:gap-6"
                >
                  <Icon className="size-7 shrink-0 text-brand-sand" aria-hidden="true" />
                  <span className="text-[0.92rem] leading-snug text-brand-linen/90">{text}</span>
                </li>
              ))}
            </ul>

            <CtaLink className="mt-10">Quero simular meu financiamento</CtaLink>
          </div>

          <div className="group relative min-h-[300px] overflow-hidden lg:col-span-5">
            <img
              src="/images/vibe-cumbuco/fachada.webp"
              alt="Torre do Vibe Cumbuco com as varandas iluminadas ao entardecer"
              width={2000}
              height={1334}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[68%_center] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-brand/40 to-transparent lg:bg-gradient-to-r lg:from-brand lg:via-brand/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
