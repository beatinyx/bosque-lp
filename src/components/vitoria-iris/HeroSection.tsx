import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Produto.
 *
 * No design a fachada sangra na dobra inteira, sem véu, e o logo fica no topo
 * sobre o céu do render. No desktop o casal com o selo de tipologia fica à
 * esquerda e o card do formulário à direita; no mobile o card sobe para logo
 * abaixo do logo e o casal desce para depois do formulário — é essa a ordem
 * das duas versões do arquivo.
 *
 * O card tem duas partes: a manchete em verde (com o canto superior esquerdo
 * arredondado) e o formulário num bloco azul.
 */
export function HeroSection() {
  return (
    <header id="inicio" className="relative isolate overflow-hidden bg-brand-cream">
      {/* Faixa de lançamento, colada no topo da página */}
      <div className="relative z-10 bg-brand-jade py-3.5 text-center text-white">
        <span className="text-[0.85rem] tracking-[0.04em] uppercase sm:text-[1.1rem]">
          Lançamento na Messejana
        </span>
      </div>

      <picture>
        <source media="(min-width: 768px)" srcSet="/images/vitoria-iris/fachada.webp" />
        <img
          src="/images/vitoria-iris/fachada-mobile.webp"
          alt="Perspectiva da fachada do Vitória Íris"
          className="absolute inset-0 -z-10 size-full object-cover object-[38%_center] md:object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="lp-container pt-6 pb-16 lg:pt-8 lg:pb-20">
        <Img
          src="/images/vitoria-iris/logo-iris.png"
          alt="Vitória Íris"
          label="logo-iris.png"
          className="mx-auto h-auto w-[200px] object-contain lg:w-[250px]"
          loading="eager"
        />

        <div className="mt-8 flex flex-col items-center gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-center lg:gap-[52px]">
          {/* Casal + selo: depois do card no mobile, à esquerda dele no desktop */}
          <Img
            src="/images/vitoria-iris/casal-selo.webp"
            alt="Casal se abraçando. 2 quartos, opções de jardim privativo e lazer completo"
            label="casal-selo.webp"
            className="h-auto w-[294px] shrink-0 object-contain max-lg:order-last lg:w-[418px]"
            loading="eager"
          />

          <div className="w-full max-w-[420px] rounded-tl-[28px] bg-brand-sky shadow-[0_24px_60px_rgba(0,0,0,0.22)] lg:w-[482px] lg:max-w-none">
            <div className="px-6 pt-6 pb-1 text-center text-white lg:px-8">
              <h1 className="text-[clamp(1.4rem,3.4vw,1.5rem)] leading-[1.3] font-normal">
                Saia do aluguel e comece uma nova história
              </h1>
              <p className="mt-2 text-[0.95rem] leading-[1.3]">
                Dê o primeiro passo para morar no que é seu, com condições que cabem no seu bolso.
              </p>
            </div>

            <div className="px-5 pt-2 pb-6 lg:px-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
