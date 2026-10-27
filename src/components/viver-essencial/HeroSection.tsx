import { IconPool } from "./Icons";
import { Img } from "./Img";
import { LeadForm } from "./LeadForm";
import { ProductLogo } from "./ProductLogo";

/**
 * DOBRA 1 — Produto.
 *
 * No Figma a fachada ocupa a dobra inteira e o degradê da marca (teal #49b7a6
 * → azul #1a5996) entra por cima, do lado esquerdo, como um véu que vai
 * ficando transparente até soltar o prédio à direita. A coluna do formulário
 * tem 454px e fica encostada nesse lado; o selo do Minha Casa, Minha Vida fica
 * solto no canto superior direito.
 *
 * No mobile o véu cobre a foto inteira — é assim que o breakpoint de 375 do
 * arquivo trata a mesma dobra — e o selo desce para a altura do formulário.
 */
export function HeroSection() {
  return (
    <header
      id="inicio"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#49b7a6,#1a5996)] text-white"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/viver-essencial/fachada.webp" />
        <img
          src="/images/viver-essencial/fachada-mobile.webp"
          alt="Perspectiva da fachada do Viver Essencial"
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/*
        Véu da marca. No desktop ele é horizontal e morre antes do prédio; no
        mobile cobre tudo, senão o texto branco fica em cima do céu claro.
      */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(73,183,166,0.86),rgba(26,89,150,0.86))] md:bg-[linear-gradient(102deg,#49b7a6_0%,#2f86ac_18%,rgba(26,89,150,0.72)_32%,rgba(26,89,150,0)_52%)]" />

      <div className="lp-container py-12 md:py-16">
        <div className="w-full max-w-[454px] max-md:mx-auto">
          <ProductLogo className="mx-auto w-[250px] md:w-[323px]" />

          <h1 className="mt-7 text-center text-[clamp(1.5rem,4.6vw,1.875rem)] leading-[1.3] font-light">
            <strong className="font-bold">Saia do aluguel</strong> de uma vez por todas
          </h1>

          {/* Filete branco de 92px que o design põe entre a manchete e a linha de apoio */}
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-[92px] bg-white" />

          <p className="mt-4 text-center text-[clamp(1rem,3.6vw,1.25rem)] leading-[1.3]">
            Preencha o formulário e garanta seu apartamento no Pici
          </p>

          <div className="mt-6">
            <LeadForm />
          </div>

          {/*
            Fecho da dobra: o selo de tipologia (imagem do arquivo, porque é um
            lettering desenhado) e o lockup "lazer completo", que aqui virou
            markup — no Figma ele é um PNG de texto branco.
          */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {/*
              O selo do programa muda de lugar entre os dois breakpoints do
              arquivo: no desktop ele fica solto no canto superior direito da
              dobra, e no mobile entra na fila dos selos, à esquerda do de
              tipologia. É o mesmo elemento, só sai do fluxo no `md`.
            */}
            <Img
              src="/images/viver-essencial/selo-mcmv.png"
              alt="Empreendimento do programa Minha Casa, Minha Vida"
              label="selo-mcmv.png"
              className="size-[88px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] max-md:order-first md:absolute md:top-10 md:right-10 md:z-10 md:size-[124px]"
              loading="eager"
            />

            <Img
              src="/images/viver-essencial/selo-2-quartos.png"
              alt="2 quartos, com opção de jardim privativo, em condomínio fechado"
              label="selo-2-quartos.png"
              className="h-auto w-[206px] object-contain"
              loading="eager"
            />

            {/* Na mesma altura do selo de tipologia ao lado, como no arquivo. */}
            <p className="flex items-center gap-4 text-[1.25rem] leading-[1.1] font-light tracking-[0.02em] uppercase">
              <IconPool className="size-14 shrink-0" aria-hidden="true" />
              <span>
                Lazer
                <br />
                completo
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
