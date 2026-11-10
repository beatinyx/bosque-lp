import { Eyebrow, Heading, SHELL } from "./ui";

/**
 * DOBRA 2 — Cumbuco.
 *
 * Um box só, com a foto do kitesurf ocupando tudo e o texto por cima, no céu
 * limpo da metade esquerda — a composição do quadro "Book Pré · 06 · Breve
 * lançamento" do KV. Texto em petróleo, que é o que lê sobre o céu claro.
 *
 * No celular a foto não comporta texto ao lado da atleta: o texto sobe para o
 * topo do box, sobre um fundo na cor do céu da foto (#c4deea, amostrado da
 * borda de cima do recorte), e a foto vem embaixo, com a borda de cima
 * esfumada nessa mesma cor para os dois virarem um céu contínuo.
 */
export function CumbucoSection() {
  return (
    <section className="py-[clamp(4.5rem,10vw,8.5rem)]">
      <div className={SHELL}>
        <div
          data-reveal
          className="vibe-frame relative isolate flex flex-col overflow-hidden bg-[#c4deea] lg:block lg:aspect-[16/9] lg:bg-[#e5eff1]"
        >
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="/images/vibe-cumbuco/kitesurf-mobile.webp"
            />
            <img
              src="/images/vibe-cumbuco/kitesurf.webp"
              alt="Kitesurfista saltando sobre as ondas no Cumbuco ao entardecer"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="block aspect-[1000/982] w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_18%)] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto lg:h-full lg:[mask-image:none]"
            />
          </picture>

          <div className="order-first px-6 pt-12 pb-2 text-brand sm:px-10 sm:pt-16 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-center lg:p-0 lg:pl-[6%]">
            <Eyebrow>Cumbuco · Caucaia, CE</Eyebrow>
            <Heading
              size="md"
              lead="Onde a natureza dita o ritmo e a praia é parte"
              script="do seu dia a dia"
            />
            <p className="mt-6 max-w-[44ch] text-[1rem] leading-[1.65] text-brand/80">
              Considerado um dos melhores destinos do mundo para a prática de kitesurf e cercado por
              belezas naturais, Cumbuco une a tranquilidade de uma vila à beira-mar com uma
              infraestrutura completa para viver bem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
