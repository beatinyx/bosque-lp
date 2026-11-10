import { CtaLink, Eyebrow, Heading, IconBed, IconCar, IconSun, SHELL } from "./ui";

const FACTS = [
  { icon: IconBed, label: "2 quartos com varanda" },
  { icon: IconCar, label: "100% das unidades com vaga de carro" },
  { icon: IconSun, label: "Ideal para locação por temporada" },
];

/**
 * DOBRA 5 — Perfil investidor.
 *
 * Foto à esquerda (o casal de kitesurf em frente à portaria, com o letreiro
 * "vibe" — o recorte 4:3 deixa o letreiro e o casal juntos) e o argumento à
 * direita, fechado por três fatos em linha com divisórias e o CTA.
 */
export function InvestorSection() {
  return (
    <section className="pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={`${SHELL} grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16`}>
        {/*
          No desktop o box estica com a coluna de texto e vai da linha do topo
          do título (2.3rem = sobretítulo + margem) até a linha de baixo dos
          três destaques (6rem = CTA + o espaço acima dele).
        */}
        <div
          data-reveal
          className="vibe-frame relative overflow-hidden bg-brand-sand lg:col-span-6 lg:mt-[2.3rem] lg:mb-24 lg:self-stretch"
        >
          <img
            src="/images/vibe-cumbuco/casal-kitesurf.webp"
            alt="Casal com roupa e pranchas de kitesurf em frente à portaria do Vibe Cumbuco"
            width={1600}
            height={893}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover object-[88%_center] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:object-[80%_center]"
          />
        </div>

        <div data-reveal className="[--reveal-delay:150ms] lg:col-span-6">
          <Eyebrow>Para investir</Eyebrow>
          <Heading lead="Um ativo sólido no litoral que mais cresce" accent="e valoriza" />

          <p className="mt-8 max-w-[52ch] text-[1.02rem] leading-[1.65] text-brand/75">
            Cumbuco atrai milhares de visitantes e entusiastas de esportes náuticos o ano inteiro,
            impulsionado pelo turismo internacional e pelo desenvolvimento econômico do eixo do
            Pecém.
          </p>

          <ul className="mt-10 grid border-y border-brand/12 sm:grid-cols-3 sm:divide-x sm:divide-brand/12 max-sm:divide-y max-sm:divide-brand/12">
            {FACTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-4 py-5 sm:flex-col sm:items-start sm:px-5 sm:first:pl-0"
              >
                <Icon className="size-7 shrink-0 text-brand-petrol" aria-hidden="true" />
                <span className="text-[0.95rem] leading-snug">{label}</span>
              </li>
            ))}
          </ul>

          <CtaLink className="mt-10">Quero saber mais</CtaLink>
        </div>
      </div>
    </section>
  );
}
