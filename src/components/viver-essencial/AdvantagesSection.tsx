import type { ComponentType, SVGProps } from "react";

import { IconCard, IconCoins, IconHandCoins, IconPiggy, IconWallet } from "./Icons";
import { Img } from "./Img";

/**
 * As seis vantagens do componente "pici condicoes" do Figma, na ordem dele.
 *
 * Cada pastilha tem uma linha de apoio pequena e um destaque grande; o que
 * muda de uma para a outra é onde o destaque cai — em `FGTS` ele fica no meio,
 * com apoio em cima e embaixo, e em `Financiamento facilitado` o apoio vem
 * depois. `above`/`below` reproduzem isso sem precisar de seis componentes.
 */
const ADVANTAGES: Array<{
  above?: string;
  highlight: string;
  below?: string;
  /** Destaque em caixa grande (números e siglas) ou em corpo negrito. */
  display?: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { above: "Subsídio de até", highlight: "R$ 55.000", display: true, Icon: IconCoins },
  { above: "Use o seu", highlight: "FGTS", below: "na entrada", display: true, Icon: IconWallet },
  { above: "Entrada parcelada em até", highlight: "72X", display: true, Icon: IconCard },
  { highlight: "Financiamento facilitado", below: "pela Caixa Econômica", Icon: IconHandCoins },
  { above: "ITBI e Registro", highlight: "GRÁTIS", display: true, Icon: IconCoins },
  { above: "Parcelas que cabem no seu", highlight: "planejamento familiar", Icon: IconPiggy },
];

/** DOBRA 2 — Facilidades de compra. */
export function AdvantagesSection() {
  return (
    <section id="facilidades" className="bg-brand py-14 text-white md:py-16">
      {/* `items-stretch` (padrão) para a foto ir do topo da manchete à base das pastilhas. */}
      <div className="lp-container grid gap-10 max-lg:items-center lg:grid-cols-[1fr_0.72fr] lg:gap-12">
        <div>
          <h2 className="text-[clamp(1.5rem,4.6vw,2rem)] leading-[1.3] font-light">
            <strong className="font-bold">Facilidade</strong> para garantir o seu apê
          </h2>

          <p className="mt-4 max-w-[540px] text-[clamp(0.875rem,3.6vw,1rem)] leading-[1.5]">
            Realizar o sonho de ter o seu apartamento no Pici é muito mais fácil com um{" "}
            <strong className="font-bold">planejamento que cabe no seu bolso.</strong>
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ADVANTAGES.map(({ above, highlight, below, display, Icon }) => (
              <li
                key={highlight}
                className="font-montserrat relative flex flex-col justify-center gap-0.5 rounded-[4px] bg-brand-blue px-3.5 py-4 pr-11"
              >
                <Icon className="absolute top-3.5 right-3 size-7 opacity-90" aria-hidden="true" />
                {above && <span className="text-[0.72rem] leading-[1.3]">{above}</span>}
                <strong
                  className={
                    display
                      ? "text-[clamp(1.3rem,5vw,1.6rem)] leading-[1.1] font-bold"
                      : "text-[0.95rem] leading-[1.2] font-bold"
                  }
                >
                  {highlight}
                </strong>
                {below && <span className="text-[0.72rem] leading-[1.3]">{below}</span>}
              </li>
            ))}
          </ul>
        </div>

        <Img
          src="/images/viver-essencial/casal-sofa.webp"
          alt="Casal sentado no sofá da sala do apartamento"
          label="casal-sofa.webp"
          /*
           * Proporção fixa só na coluna única, onde a imagem colapsaria sem
           * altura; nas duas colunas ela estica com a linha da grade.
           */
          className="aspect-3/2 w-full rounded-[4px] object-cover max-lg:order-first lg:aspect-auto lg:h-full"
        />
      </div>
    </section>
  );
}
