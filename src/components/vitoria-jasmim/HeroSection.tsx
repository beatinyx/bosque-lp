import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Produto.
 *
 * No design a fachada ocupa a dobra inteira, com um véu preto de 30% por
 * cima; o card do formulário fica à direita, em roxo, com os cantos superior
 * direito e inferior esquerdo arredondados em 60px (o `0 60px 0 60px` do
 * Figma). O selo de tipologia fica à esquerda do card no desktop e abaixo dele
 * no mobile — é essa a ordem das duas versões do arquivo.
 */
export function HeroSection() {
  return (
    <header id="inicio" className="relative isolate overflow-hidden bg-brand text-white">
      {/* Faixa de lançamento, colada no topo da página */}
      <div className="relative z-10 bg-brand-olive py-3 text-center">
        <span className="text-[0.72rem] font-medium tracking-[0.18em] text-white uppercase sm:text-[0.85rem]">
          Lançamento na Messejana
        </span>
      </div>

      <Img
        src="/images/vitoria-jasmim/fachada.webp"
        alt="Perspectiva da fachada do Vitória Jasmim"
        label="fachada.webp"
        className="absolute inset-0 -z-10 size-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Véu do design: preto a 30%, só para dar leitura ao card e ao logo */}
      <div className="absolute inset-0 -z-10 bg-black/30" />

      <div className="lp-container pt-10 pb-14 lg:pt-12 lg:pb-16">
        <Img
          src="/images/vitoria-jasmim/logo-jasmim-branco.png"
          alt="Vitória Jasmim"
          label="logo-jasmim-branco.png"
          className="mx-auto h-auto w-[220px] object-contain sm:w-[280px] lg:w-[330px]"
          loading="eager"
        />

        <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_auto] lg:gap-12">
          {/* Selo de tipologia — desce para depois do card no mobile */}
          <Img
            src="/images/vitoria-jasmim/selo-2-quartos.png"
            alt="2 quartos, opções de jardim privativo e lazer completo"
            label="selo-2-quartos.png"
            className="h-auto w-full max-w-[320px] object-contain max-lg:order-last max-lg:mx-auto"
            loading="eager"
          />

          <div className="rd-form-card w-full rounded-[0_60px_0_60px] bg-brand px-6 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:px-9 lg:w-[522px]">
            <h1 className="text-center text-[clamp(1.5rem,3.4vw,2rem)] leading-[1.3] font-normal">
              Onde os <strong className="font-bold">sonhos</strong>
              <br />
              ganham endereço
            </h1>

            {/* Filete branco de 92px que o design coloca entre a manchete e a linha de apoio */}
            <span aria-hidden="true" className="mx-auto mt-4 block h-0.5 w-[92px] bg-white" />

            <p className="mt-4 text-center text-[0.95rem] leading-[1.35]">
              O primeiro passo para a casa própria começa aqui
            </p>

            <div className="mt-5">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
