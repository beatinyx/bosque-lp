import { CtaLink, Eyebrow, Heading, IconCar, IconWalk, SHELL } from "./ui";

const ADDRESS = "Av. dos Coqueiros, 4170 - Praia de Cumbuco, Caucaia - CE";

/*
 * Google Maps pelo endereço do terreno (o mesmo do link entregue em
 * 2026-11-24, que cai em -3.624455, -38.7483431), no formato de embed sem
 * chave de API que as outras LPs já usam.
 */
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&hl=pt-BR&output=embed`;

/*
 * Distâncias do entorno, de carro ou a pé (lista entregue em 2026-11-24, que
 * substituiu os 27 pontos numerados do mapa ilustrado).
 */
const NEARBY = [
  { mode: "car", time: 5, place: "Praia de Icaraí" },
  { mode: "car", time: 8, place: "Praia do Cumbuco" },
  { mode: "walk", time: 4, place: "Mercadinhos" },
  { mode: "walk", time: 5, place: "Escola Luzia Correia Sales" },
  { mode: "walk", time: 4, place: "Posto de Saúde da Tabuba" },
  { mode: "car", time: 15, place: "Iandê Shopping" },
] as const;

const MODE = {
  car: { Icon: IconCar, label: "de carro" },
  walk: { Icon: IconWalk, label: "a pé" },
};

/**
 * DOBRA 3 — Localização.
 *
 * Card com o fundo de água em movimento do KV v2, tudo empilhado: a manchete
 * e o endereço, o Google Maps na largura toda, a lista de distâncias do
 * entorno (em colunas) e o CTA.
 *
 * Até 2026-11-24 o mapa era o ilustrado do KV (`mapa.webp`, com pin e
 * contorno do terreno em HTML); o mapa-fonte segue em
 * `assets-originais/vibe-cumbuco/mapa/`.
 */
export function MapSection() {
  return (
    <section className="pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div
          data-reveal
          data-motion
          className="vibe-frame vibe-frame-flip relative isolate overflow-clip bg-brand-petrol px-6 py-12 text-brand-linen sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        >
          {/*
            Fundo de água: as quatro variações do quadro "KV v2 · 01b ·
            Gradiente em movimento" empilhadas, que se revezam em fade lento
            enquanto o conjunto deriva — ver `.vibe-sea` em styles.css.

            A deriva amplia as camadas além do card, e com `overflow-hidden`
            o card virava uma caixa rolável: um `scrollIntoView` ou foco num
            item da legenda rolava o conteúdo por dentro e escondia o topo
            (eyebrow e respiro). `overflow-clip` corta igual, mas não rola.
          */}
          <div aria-hidden="true" className="vibe-sea absolute inset-0 -z-10">
            {[1, 2, 3, 4].map((n) => (
              <img
                key={n}
                src={`/images/vibe-cumbuco/fundo-mar-${n}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                className={`vibe-sea-layer vibe-sea-${n}`}
              />
            ))}
          </div>

          <div>
            <div>
              <Eyebrow tone="light">Localização</Eyebrow>
              <Heading tone="light" lead="A poucos metros" accent="do mar" />
              <p className="mt-6 text-[1rem] leading-[1.6] text-brand-linen/70">
                Av. dos Coqueiros, Cumbuco - CE
              </p>
            </div>

            <div className="vibe-frame vibe-frame-sm mt-10 overflow-hidden bg-brand-lagoon shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)] lg:mt-12">
              <iframe
                title={`Mapa de localização do Vibe Cumbuco — ${ADDRESS}`}
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[340px] w-full border-0 sm:h-[440px] lg:h-[520px]"
              />
            </div>

            {/* As colunas correm de cima para baixo: 3 + 3 a partir do tablet. */}
            <ul className="mt-10 gap-x-12 sm:columns-2 lg:mt-12">
              {NEARBY.map(({ mode, time, place }) => {
                const { Icon, label } = MODE[mode];
                return (
                  <li
                    key={place}
                    className="group flex break-inside-avoid items-center gap-4 border-b border-white/10 py-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-sand/40 text-brand-sand transition-colors duration-300 group-hover:border-brand-citrus group-hover:text-brand-citrus">
                      <Icon className="size-6" aria-hidden="true" />
                      <span className="sr-only">{label}</span>
                    </span>
                    <span className="text-[1.05rem] leading-snug text-brand-linen/90">
                      <strong className="font-semibold text-brand-linen transition-colors duration-300 group-hover:text-brand-citrus">
                        {time} min
                      </strong>{" "}
                      - {place}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex justify-center lg:mt-12">
              <CtaLink>Quero morar no Cumbuco</CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
