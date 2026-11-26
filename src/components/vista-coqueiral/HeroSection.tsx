import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Produto.
 *
 * Faixa verde de lançamento no topo e, abaixo dela, a perspectiva do prédio
 * de frente para o mar com um véu preto a 40%. No desktop a coluna do produto
 * (logo, manchete, formulário e a faixa "2 Quartos | Lazer completo") fica
 * sobre o mar, à direita; no mobile ela centraliza.
 *
 * No Figma o formulário não tem card: quem pinta o verde atrás dele é o
 * próprio embed do RD. Aqui o card é nosso (ver o tema em styles.css), para o
 * fundo não depender do painel do RD.
 */
export function HeroSection() {
  return (
    <header id="inicio" className="text-white">
      <div className="bg-brand py-[7px] text-center lg:py-[13px]">
        <p className="text-base leading-tight uppercase lg:text-2xl">Lançamento</p>
      </div>

      <div className="relative isolate overflow-clip">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/vista-coqueiral/fachada.webp" />
          <img
            src="/images/vista-coqueiral/fachada-mobile.webp"
            alt="Perspectiva do Vista Coqueiral de frente para a Praia do Cumbuco"
            className="absolute inset-0 -z-20 size-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/40" />

        <div className="lp-container pt-[41px] pb-[54px] lg:pt-[45px] lg:pb-[60px]">
          <div className="mx-auto flex max-w-[582px] flex-col items-center text-center lg:mr-[-53px] lg:ml-auto">
            <Img
              src="/images/vista-coqueiral/logo-vista-coqueiral.png"
              alt="Vista Coqueiral — Cumbuco"
              label="logo-vista-coqueiral.png"
              className="h-auto w-[208px] object-contain lg:w-[270px]"
              loading="eager"
            />

            <h1 className="mt-[18px] max-w-[321px] text-xl leading-[1.2] font-normal lg:mt-5 lg:max-w-[470px] lg:text-[1.875rem]">
              Viva em um apartamento pé na areia na{" "}
              <strong className="font-semibold">Praia do Cumbuco</strong>
            </h1>
            <p className="mt-2 text-sm leading-tight lg:mt-1.5 lg:text-xl">
              Invista no m² que mais cresce na região!
            </p>

            <div className="rd-form-card mt-6 w-full max-w-[377px] bg-brand/90 px-4 py-5 lg:mt-[31px]">
              <LeadForm />
            </div>

            <Img
              src="/images/vista-coqueiral/selo-2-quartos.webp"
              alt="2 Quartos com suíte e varanda. Lazer completo de um condomínio clube"
              label="selo-2-quartos.webp"
              className="mt-6 h-auto w-full max-w-[349px] lg:max-w-[581px]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
