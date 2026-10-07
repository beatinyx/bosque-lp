import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Produto.
 *
 * Três camadas, de cima para baixo: o cabeçalho azul liso com o logo, a faixa
 * de água com a chamada da praia (o PNG de textura do próprio design) e a
 * fachada a 50% sobre o azul, onde ficam a manchete, o formulário e o casal.
 *
 * No desktop a manchete e o formulário ocupam a coluna da esquerda e o casal
 * com o selo de tipologia a da direita. No mobile tudo empilha; o Figma encosta
 * o selo no fim do formulário (31px de sobreposição), mas aqui ele ganhou um
 * respiro de 32px, porque colado ao box lia como erro. No desktop o selo
 * sobrepõe o topo do casal em 74px, como no design.
 */
export function HeroSection() {
  return (
    <header id="inicio" className="bg-brand text-white">
      <div className="pt-[31px] pb-4 text-center">
        <Img
          src="/images/atlantico/logo-atlantico.png"
          alt="Atlântico Condomínio Clube"
          label="logo-atlantico.png"
          className="mx-auto h-auto w-[240px] object-contain sm:w-[281px]"
          loading="eager"
        />
      </div>

      <div
        className="bg-cover bg-center py-[13px] text-center"
        style={{ backgroundImage: "url(/images/atlantico/textura-agua.webp)" }}
      >
        <p className="text-[0.8rem] tracking-[0.02em] uppercase sm:text-[1.25rem]">
          Apartamentos na Praia do Futuro
        </p>
      </div>

      <div className="relative isolate overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/atlantico/fachada.webp" />
          <img
            src="/images/atlantico/fachada-mobile.webp"
            alt="Perspectiva da fachada do Atlântico Condomínio Clube"
            className="absolute inset-0 -z-10 size-full object-cover opacity-50"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className="lp-container pt-10 pb-16 lg:pt-14 lg:pb-[113px]">
          <div className="grid items-start justify-center gap-6 lg:grid-cols-[454px_495px] lg:gap-x-[140px]">
            <div>
              <h1 className="text-center text-[clamp(1.5rem,3.4vw,2rem)] leading-[1.3] font-normal">
                Um pedaço do seu futuro <strong className="font-bold">amanhece agora</strong>
              </h1>

              <div className="rd-form-card mx-auto mt-7 w-full max-w-[375px] rounded-[20px] bg-brand px-4 py-5">
                <LeadForm />
              </div>
            </div>

            {/* Selo e casal: no mobile o selo encosta no fim do formulário */}
            <div className="relative mx-auto mt-2 w-full max-w-[420px] lg:mt-0 lg:max-w-none">
              <Img
                src="/images/atlantico/selo-2-quartos.png"
                alt="2 quartos com suíte e varanda"
                label="selo-2-quartos.png"
                className="relative z-10 mx-auto h-auto w-[300px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] lg:w-[367px]"
                loading="eager"
              />
              <Img
                src="/images/atlantico/casal-plantas.webp"
                alt="Casal sorrindo. Plantas de 48,62m² a 100,02m²"
                label="casal-plantas.webp"
                className="mx-auto -mt-9 h-auto w-[330px] object-contain lg:-mt-[74px] lg:w-[406px]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
