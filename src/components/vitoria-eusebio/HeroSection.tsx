import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/** DOBRA 1 — Produto. */
export function HeroSection() {
  return (
    <header id="inicio" className="relative isolate overflow-hidden bg-brand text-white">
      {/* Humanização do casal + fachada do produto */}
      <Img
        src="/images/vitoria-eusebio/fachada.webp"
        alt="Perspectiva da fachada do Vitória Eusébio"
        label="fachada.webp"
        className="absolute inset-0 -z-10 size-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Escurecimento uniforme, só para dar leitura ao texto sobre a foto */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Faixa de lançamento no topo do hero */}
      <div className="bg-brand-red py-3 text-center">
        <span className="text-[0.72rem] font-bold tracking-[0.22em] text-white uppercase sm:text-[0.8rem]">
          Lançamento no Eusébio
        </span>
      </div>

      <div className="lp-container grid items-center gap-10 py-16 lg:min-h-[86vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div className="flex flex-col items-start gap-6 max-lg:items-center max-lg:text-center">
          {/* Logo do produto */}
          <Img
            src="/images/vitoria-eusebio/logo-eusebio-branco.png"
            alt="Vitória Eusébio"
            label="logo-eusebio-branco.png"
            className="h-36 w-auto object-contain sm:h-44"
            loading="eager"
          />

          <h1 className="text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.05] font-normal tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            Saia do aluguel e <strong className="font-extrabold">garanta seu apê</strong>
          </h1>

          {/* Tipologia */}
          <Img
            src="/images/vitoria-eusebio/tipologia_eusebio_2.png"
            alt="2 quartos com opção de jardim privativo. Condomínio fechado | Lazer completo."
            label="tipologia_eusebio_2.png"
            className="h-auto w-full max-w-[300px] object-contain"
            loading="eager"
          />
        </div>

        <LeadForm />
      </div>
    </header>
  );
}
