import { CtaLink, Eyebrow, Heading, SHELL } from "./ui";

const NEARBY = [
  { time: "1", place: "Chico Cumbuco" },
  { time: "1", place: "Super Cumbuco Atacarejo" },
  { time: "4", place: "Tabuba / Tabúzios" },
];

/**
 * DOBRA 3 — Localização.
 *
 * Card com o fundo de água em movimento do KV v2. À esquerda a manchete, a lista
 * de distâncias e o CTA; à direita o mapa ilustrado.
 *
 * O mapa é o mesmo do KV (`Book Pré · 07`): `mapa.webp` é o recorte exato do
 * mapa ilustrado que aparece naquele quadro de 1920×1080, e o contorno do
 * terreno e o pin com o logo vão por cima em HTML, nas mesmas posições do
 * Figma convertidas em porcentagem — por isso a camada interna é sempre 16:9.
 * No celular a janela fica 4:3 e a camada passa a 133% de largura, deslocada
 * para manter o pin no centro.
 */
export function MapSection() {
  return (
    <section className="pb-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div
          data-reveal
          data-motion
          className="vibe-frame vibe-frame-flip relative isolate overflow-hidden bg-brand-petrol px-6 py-12 text-brand-linen sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        >
          {/*
            Fundo de água: as quatro variações do quadro "KV v2 · 01b ·
            Gradiente em movimento" empilhadas, que se revezam em fade lento
            enquanto o conjunto deriva — ver `.vibe-sea` em styles.css.
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

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow tone="light">Localização</Eyebrow>
              <Heading tone="light" lead="A 100 metros" accent="da praia" />
              <p className="mt-6 text-[1rem] leading-[1.6] text-brand-linen/70">
                Av. dos Coqueiros, Cumbuco — Caucaia/CE
              </p>

              <ul className="mt-10 divide-y divide-white/12 border-y border-white/12">
                {NEARBY.map(({ time, place }) => (
                  <li key={place} className="group flex items-baseline gap-5 py-5">
                    <span className="w-[5.5rem] shrink-0 text-[2.4rem] leading-none font-extralight tracking-[-0.03em] text-brand-sand transition-colors duration-300 group-hover:text-brand-citrus">
                      {time}
                      <span className="ml-1 text-[0.9rem] font-normal tracking-normal text-brand-sand/70 transition-colors duration-300 group-hover:text-brand-citrus/80">
                        min
                      </span>
                    </span>
                    <span className="text-[1.02rem] text-brand-linen/90 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-brand-citrus">
                      {place}
                    </span>
                  </li>
                ))}
              </ul>

              <CtaLink className="mt-10">Quero morar no Cumbuco</CtaLink>
            </div>

            <figure className="lg:col-span-7">
              <div className="vibe-frame vibe-frame-sm relative aspect-[4/3] overflow-hidden bg-brand-lagoon shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)] sm:aspect-[16/9]">
                <div className="absolute inset-y-0 left-[-21.53%] w-[133.33%] sm:left-0 sm:w-full">
                  <img
                    src="/images/vibe-cumbuco/mapa.webp"
                    alt="Mapa ilustrado do Cumbuco com o terreno do Vibe Cumbuco a 100 metros da praia"
                    width={2000}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />

                  {/* Contorno do terreno — Figma: 263×412 em (870, 541), girado 12,61°. */}
                  <div
                    aria-hidden="true"
                    className="absolute top-[50.11%] left-[45.31%] h-[38.12%] w-[13.72%]"
                  >
                    <div className="absolute top-[3.79%] left-[14.93%] h-[92.43%] w-[70.15%] rotate-[12.61deg]">
                      <img
                        src="/images/vibe-cumbuco/terreno-mapa.svg"
                        alt=""
                        className="absolute top-[-0.79%] left-[-1.62%] block h-[101.58%] w-[103.24%] max-w-none"
                      />
                    </div>
                  </div>

                  {/* Pin com o logo — Figma: 150×192 em (955, 444). */}
                  <div
                    aria-hidden="true"
                    className="absolute top-[41.11%] left-[49.74%] h-[17.78%] w-[7.81%] drop-shadow-[0_10px_11px_rgba(0,0,0,0.3)]"
                  >
                    <img
                      src="/images/vibe-cumbuco/pin-mapa.svg"
                      alt=""
                      className="absolute inset-0 size-full"
                    />
                    <img
                      src="/images/vibe-cumbuco/logo-vibe-areia.svg"
                      alt=""
                      className="absolute top-[24.48%] left-[15.33%] w-[69.33%]"
                    />
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-right text-[0.72rem] text-brand-linen/55">
                Mapa ilustrativo, fora de escala.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
