import { Eyebrow, Heading, SHELL } from "./ui";

/**
 * DOBRA 2 — Cumbuco.
 *
 * Um box só, com a fachada (`fachada-hero.webp`) ocupando tudo e o texto por
 * cima, no céu da metade esquerda; o prédio fica na metade direita. Até
 * 2026-11-17 esta dobra era a foto do kitesurf, que foi para o hero.
 *
 * O céu da fachada é azul fechado, então o texto é claro (tom `light`) e um
 * véu no azul do céu, da esquerda para a direita, segura a leitura sem
 * cobrir o prédio. No desktop o texto fica no alto do box, sobre o céu, para
 * sair de cima da ala baixa do prédio.
 *
 * No celular a foto não comporta texto ao lado do prédio: o texto sobe para o
 * topo do box, sobre um fundo na cor do céu da foto (#1e4f8a, amostrado da
 * borda de cima de `fachada-hero-mobile.webp`), e a foto vem embaixo, com a
 * borda de cima esfumada nessa mesma cor para os dois virarem um céu contínuo.
 */
export function CumbucoSection() {
  return (
    <section className="py-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div
          data-reveal
          className="vibe-frame relative isolate flex flex-col overflow-hidden bg-[#1e4f8a] lg:block lg:aspect-[16/9]"
        >
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="/images/vibe-cumbuco/fachada-hero-mobile.webp"
            />
            <img
              src="/images/vibe-cumbuco/fachada-hero.webp"
              alt="Fachada do Vibe Cumbuco ao entardecer"
              width={2000}
              height={1241}
              loading="lazy"
              decoding="async"
              className="block aspect-[1000/1128] w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_18%)] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto lg:h-full lg:object-[center_70%] lg:[mask-image:none]"
            />
          </picture>

          <div
            aria-hidden="true"
            className="absolute inset-0 -z-[5] hidden bg-gradient-to-r from-[#0b2547]/90 via-[#0b2547]/75 via-45% to-transparent to-70% lg:block"
          />

          <div className="order-first px-6 pt-12 pb-2 text-white sm:px-10 sm:pt-16 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-start lg:p-0 lg:pt-[7%] lg:pl-[6%] lg:[text-shadow:0_1px_18px_rgba(8,28,56,0.55)]">
            <Eyebrow tone="light">Cumbuco</Eyebrow>
            <Heading
              size="md"
              tone="light"
              lead={
                <>
                  Entre no clima.
                  <br />
                </>
              }
              accent="Viva a vibe do Cumbuco"
            />
            <p className="mt-6 max-w-[44ch] text-[1rem] leading-[1.65] text-white">
              Invista no Cumbuco, a meca mundial do kitesurf, onde praias, dunas e uma atmosfera
              única fazem do litoral cearense um destino reconhecido internacionalmente. Se você
              busca o que fazer em Cumbuco ou procura um apartamento no Cumbuco para morar ou
              rentabilizar, o endereço une a tranquilidade de uma vila à beira-mar com
              infraestrutura completa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
