import { CtaLink, Eyebrow, Heading, SHELL } from "./ui";

/**
 * Legenda dos números desenhados em `mapa.webp` (lista entregue em
 * 2026-11-23, a mesma do mapa da Vista Costeira). O recorte do mapa mostra do
 * 1 ao 23; do 24 ao 27 ficam fora dele, mas entram na lista mesmo assim.
 */
const POINTS = [
  "Petshop e Rações",
  "Panificadora",
  "Escola Luzia Correia Sales",
  "Mercadinho Macário",
  "Super Cumbuco Atacarejo",
  "Oficina 23 KiteSurf",
  "Barraca Ronco do Mar",
  "Farmácia Life Tabuba",
  "Chico do Caranguejo",
  "Win Restaurante e Pousada",
  "Posto Combustível",
  "Caixa 24 Horas",
  "Escola Maria Zenóbia",
  "Escola Internacional Sunshine",
  "Academia Gym Cumbuco",
  "Hotel Almai Cumbuco",
  "CKC Kite Center",
  "Select Kiteschool",
  "Kitesurf Adventure Cumbuco",
  "Farmácia Bahia",
  "link Kate School",
  "Kitcabana Kitesurf e Wingfoil School",
  "Kariri Beach",
  "Wai Wai Cumbuco",
  "VG Sun",
  "Vila Galé",
  "Mira Beach Club",
];

/**
 * DOBRA 3 — Localização.
 *
 * Card com o fundo de água em movimento do KV v2, tudo empilhado: a manchete
 * e o endereço, o mapa ilustrado na largura toda, a legenda dos 27 pontos
 * numerados do mapa (em colunas) e o CTA.
 *
 * O mapa é o do KV (`Book Pré · 07`, mapa-fonte de 3600×2482 guardado em
 * `assets-originais/vibe-cumbuco/mapa/`). O quadro usa o recorte
 * (1067, 997, 2533×1425); `mapa.webp` é um recorte um pouco mais alto,
 * (1070, 860, 2530×1562), para o 21 e o 23 não ficarem cortados na borda de
 * cima. Mais para a esquerda o mapa-fonte traz a legenda impressa na imagem,
 * por isso o 24 ao 27 ficam de fora. O contorno do terreno e o pin com o logo
 * vão por cima em HTML, nas posições do Figma levadas para o novo recorte em
 * porcentagem — a camada interna tem sempre a proporção do recorte. No
 * celular a janela fica 4:3 e a camada passa a 121,48% de largura, deslocada
 * para manter o pin no centro.
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

            <figure className="mt-10 lg:mt-12">
              <div className="vibe-frame vibe-frame-sm relative aspect-[4/3] overflow-hidden bg-brand-lagoon shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)] sm:aspect-[2530/1562]">
                <div className="absolute inset-y-0 left-[-15.1%] w-[121.48%] sm:left-0 sm:w-full">
                  <img
                    src="/images/vibe-cumbuco/mapa.webp"
                    alt="Mapa ilustrado do Cumbuco com o terreno do Vibe Cumbuco a poucos metros do mar"
                    width={2000}
                    height={1234}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />

                  {/* Contorno do terreno — Figma: 263×412 em (870, 541) do quadro, girado 12,61°. */}
                  <div
                    aria-hidden="true"
                    className="absolute top-[54.46%] left-[45.25%] h-[34.8%] w-[13.72%]"
                  >
                    <div className="absolute top-[3.79%] left-[14.93%] h-[92.43%] w-[70.15%] rotate-[12.61deg]">
                      <img
                        src="/images/vibe-cumbuco/terreno-mapa.svg"
                        alt=""
                        className="absolute top-[-0.79%] left-[-1.62%] block h-[101.58%] w-[103.24%] max-w-none"
                      />
                    </div>
                  </div>

                  {/* Pin com o logo — Figma: 150×192 em (955, 444) do quadro. */}
                  <div
                    aria-hidden="true"
                    className="absolute top-[46.27%] left-[49.68%] h-[16.22%] w-[7.82%] drop-shadow-[0_10px_11px_rgba(0,0,0,0.3)]"
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

            {/*
              Legenda: o número no mesmo círculo azul-marinho dos marcadores do
              mapa, para bater o olho e achar o ponto. As colunas correm de
              cima para baixo (1–9, 10–18, 19–27 no desktop).
            */}
            <ol className="mt-10 gap-x-10 sm:columns-2 lg:mt-12 lg:columns-3">
              {POINTS.map((place, i) => (
                <li
                  key={place}
                  className="group flex break-inside-avoid items-center gap-3 border-b border-white/10 py-2.5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#124a6e] text-[0.78rem] font-semibold text-white tabular-nums ring-1 ring-white/25 transition-colors duration-300 group-hover:bg-brand-citrus group-hover:text-brand">
                    {i + 1}
                  </span>
                  <span className="text-[0.98rem] leading-snug text-brand-linen/90 transition-colors duration-300 group-hover:text-brand-citrus">
                    {place}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex justify-center lg:mt-12">
              <CtaLink>Quero morar no Cumbuco</CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
