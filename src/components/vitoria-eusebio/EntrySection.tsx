import { IconArrowRight, IconCheck } from "./Icons";
import { Img } from "./Img";

const CONDITIONS = [
  "Use o seu FGTS na entrada.",
  "Financiamento facilitado pela Caixa Econômica.",
  "Parcelas que cabem no seu planejamento familiar.",
];

/** DOBRA 4 — Entrada facilitada. */
export function EntrySection() {
  return (
    <section
      id="condicoes"
      className="relative isolate overflow-hidden bg-brand-sand py-16 lg:py-20"
    >
      {/* Grafismo topográfico da marca, como marca d'água */}
      <img
        src="/images/vitoria-eusebio/grafismo-eusebio.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-28 -z-10 w-[520px] max-w-none opacity-[0.07] select-none sm:w-[820px] lg:-left-40 lg:w-[1150px]"
      />

      <div className="lp-container grid items-center gap-12 lg:grid-cols-2">
        <Img
          src="/images/vitoria-eusebio/eusebio-casal.webp"
          alt="Casal feliz com as chaves do apartamento"
          label="eusebio-casal.webp"
          className="h-[320px] w-full rounded-[0_40px_0_40px] object-cover shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:h-[460px]"
        />

        <div className="flex flex-col items-start max-lg:items-center max-lg:text-center">
          <span className="text-[0.7rem] font-bold tracking-[0.22em] text-brand-red uppercase">
            Entrada facilitada
          </span>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-normal text-brand">
            Seu apê com <strong className="font-extrabold">condições que cabem</strong> no seu
            momento
          </h2>

          <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-[1.75] text-brand-sage">
            O Vitória Eusébio está no programa Minha Casa, Minha Vida: subsídios do governo,
            financiamento pela Caixa Econômica Federal e parcelas ajustadas à renda da sua família.
            Um residencial planejado, com lazer completo, para você sair do aluguel com segurança.
          </p>

          <ul className="mt-7 w-full space-y-3.5 rounded-[0_40px_0_40px] bg-brand px-6 py-6 text-left text-brand-sand shadow-[0_18px_44px_rgba(0,0,0,0.16)]">
            {CONDITIONS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-orange">
                  <IconCheck className="size-3.5 text-white" />
                </span>
                <span className="text-[0.92rem] leading-snug font-semibold">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#inicio"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-blue px-7 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
          >
            Quero verificar meu perfil
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
