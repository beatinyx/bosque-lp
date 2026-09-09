import type { ComponentType, SVGProps } from "react";

import { ChamferFrame } from "./ChamferFrame";
import { IconArrowRight, IconCard, IconCoins, IconHandHouse } from "./Icons";
import { Img } from "./Img";

/*
 * Os CTAs rolam até o formulário do hero, e não mais para a campanha em
 * cloud.victacomunica.com.br/hype: com o embed do RD na própria página,
 * mandar o visitante para fora seria vazar a conversão.
 */
const CTA_HREF = "#inicio";

/**
 * Faixa laranja: três condições do Minha Casa, Minha Vida. O negrito é o que
 * o design destaca em cada item.
 */
const CONDITIONS: Array<{
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  lead: string;
  strong: string;
  tail: string;
}> = [
  { Icon: IconCard, lead: "Use o seu", strong: "FGTS", tail: "na entrada." },
  {
    Icon: IconHandHouse,
    lead: "",
    strong: "Financiamento facilitado",
    tail: "pela Caixa Econômica.",
  },
  { Icon: IconCoins, lead: "Parcelas que cabem no seu", strong: "planejamento familiar", tail: "" },
];

/** DOBRA 5 — Condições. */
export function ConditionsSection() {
  return (
    <section id="condicoes" className="pb-20 lg:pb-28">
      <div className="lp-container">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
          <div>
            <h2 className="max-w-[28ch] text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.35] font-normal tracking-[0.02em] text-white uppercase">
              As condições que você buscava para o apê que{" "}
              <strong className="font-extrabold">você sempre quis</strong>
            </h2>

            <p className="mt-5 max-w-[52ch] text-[0.82rem] leading-[1.8] text-brand-shell/90">
              O novo Victa, apartamento à venda na Praia do Futuro, se enquadra no programa Minha
              Casa, Minha Vida. Isso significa que famílias com renda a partir de R$4.000 podem
              acessar taxas de juros reduzidas e facilidades de financiamento que tornam essa
              mudança de vida possível.
            </p>

            {/*
              Faixa das condições. Fica dentro da coluna de texto, logo abaixo
              do parágrafo: assim ela nasce e termina na mesma largura do
              texto, em vez de flutuar embaixo das duas colunas — que era o
              que a deixava solta, longe do bloco a que pertence.

              O degradê é inline, como no card do hero, e usa o mesmo ângulo
              (168deg) para os dois lerem como a mesma peça de material.
            */}
            <ul
              className="chamfer-diag mt-8 grid gap-x-5 gap-y-6 px-7 py-7 text-white sm:grid-cols-3 sm:px-8"
              style={{ background: "linear-gradient(168deg, #c68555 0%, #c1431d 100%)" }}
            >
              {CONDITIONS.map(({ Icon, lead, strong, tail }) => (
                <li
                  key={strong}
                  className="flex flex-col gap-2 sm:not-last:border-r sm:not-last:border-white/25 sm:not-last:pr-5"
                >
                  <Icon className="size-6 text-white/85" />
                  <p className="text-[0.78rem] leading-snug">
                    {lead && <span className="block">{lead}</span>}
                    <strong className="text-[0.95rem] font-extrabold">{strong}</strong>
                    {tail && <span className="block">{tail}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* A foto do casal na piscina não veio do Figma — ver README. */}
          <ChamferFrame className="max-lg:order-first">
            <Img
              src="/images/viver-hype/casal-piscina.webp"
              alt="Casal na piscina do Hype Condomínio Clube"
              label="casal-piscina.webp"
              className="aspect-[4/3] w-full object-cover"
            />
          </ChamferFrame>
        </div>

        <p className="mt-12 text-center">
          <a
            href={CTA_HREF}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-orchid px-8 py-4 text-[0.78rem] font-extrabold tracking-[0.1em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition hover:brightness-110"
          >
            Quero verificar meu perfil
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </p>
      </div>
    </section>
  );
}
