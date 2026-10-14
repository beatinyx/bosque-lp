import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Produto.
 *
 * Faixa pêssego de lançamento no topo e, abaixo dela, a fachada em tela
 * cheia com o logo centralizado. No desktop o box translúcido do formulário
 * fica à direita e o selo de tipologia encosta na base à esquerda; no mobile
 * os três empilham, com o selo logo abaixo do box.
 *
 * No Figma não há véu sobre a foto. O box usa o azul do texto (#1d5774) a
 * 80%, com o arredondamento de 60px em cantos opostos (superior direito e
 * inferior esquerdo).
 */
export function HeroSection() {
  return (
    <header id="inicio" className="text-white">
      <div className="bg-brand-peach py-3.5 text-center lg:py-[19px]">
        <p className="text-base leading-tight uppercase lg:text-2xl">Lançamento no Cumbuco</p>
      </div>

      <div className="relative isolate overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/vista-costeira/fachada.webp" />
          <img
            src="/images/vista-costeira/fachada-mobile.webp"
            alt="Perspectiva da fachada do Vista Costeira"
            className="absolute inset-0 -z-10 size-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className="lp-container pt-8 pb-20 lg:pt-[45px] lg:pb-[176px]">
          <Img
            src="/images/vista-costeira/logo-vista-costeira.png"
            alt="Vista Costeira — Cumbuco"
            label="logo-vista-costeira.png"
            className="mx-auto h-auto w-[291px] object-contain lg:w-[362px]"
            loading="eager"
          />

          <div className="mt-10 grid items-end gap-8 lg:mt-[101px] lg:grid-cols-[1fr_433px]">
            <div className="rd-form-card mx-auto w-full max-w-[433px] rounded-tr-[60px] rounded-bl-[60px] bg-brand-ink/80 px-4 pt-6 pb-6 lg:order-2 lg:px-6 lg:pt-9">
              <h1 className="text-center text-2xl leading-normal font-normal lg:text-[2rem]">
                O <strong className="font-bold">mar.</strong> Seu novo{" "}
                <strong className="font-bold">lar.</strong>
              </h1>
              <p className="mt-1 text-center text-sm leading-normal lg:text-base">
                Saia do aluguel e more <strong className="font-bold">próximo à praia!</strong>
              </p>

              <div className="mt-4">
                <LeadForm />
              </div>
            </div>

            <Img
              src="/images/vista-costeira/selo-2-quartos.png"
              alt="2 quartos com suíte e varanda. Lazer completo"
              label="selo-2-quartos.png"
              className="mx-auto h-auto w-[352px] object-contain lg:order-1 lg:mx-0"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
