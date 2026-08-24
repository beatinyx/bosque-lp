import { IconArrowRight, IconPin } from "./Icons";

const ADDRESS = "Rua Nicolau Coelho, 200 - Messejana, Fortaleza - CE";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
/** Embed sem chave de API; o link abre o mesmo endereço no Google Maps. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&hl=pt-BR&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/** DOBRA 2 — Localização. */
export function LocationSection() {
  return (
    <section
      id="localizacao"
      className="relative isolate overflow-hidden bg-brand-sand py-16 lg:py-20"
    >
      {/*
        Grafismo da folha de monstera como marca d'água. O PNG de origem já vem
        com alpha baixo (~16%), então não precisa de opacidade extra aqui.
      */}
      <img
        src="/images/grafismo-folha.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-28 -z-10 w-[26rem] max-w-none rotate-12 select-none sm:-right-40 sm:w-[38rem] lg:-top-56 lg:-right-52 lg:w-[48rem]"
      />

      <div className="lp-container">
        <div className="mx-auto max-w-[46rem] text-center">
          <span className="text-[0.7rem] font-bold tracking-[0.22em] text-brand-moss uppercase">
            Localização
          </span>
          <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-light text-balance text-brand">
            Localização <span className="emphasis">estratégica</span> no melhor da Messejana
          </h2>
        </div>

        {/* Mapa interativo do endereço da obra. O embed do Google não pede chave de API. */}
        <div className="chamfer chamfer-lg mt-12 overflow-hidden bg-white shadow-[0_18px_44px_rgba(15,47,25,0.16)]">
          <iframe
            title={`Mapa de localização do Victa Viver Bosque — ${ADDRESS}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[22rem] w-full border-0 sm:h-[30rem]"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <p className="flex items-start gap-2 text-[0.88rem] leading-snug font-semibold text-brand">
            <IconPin className="mt-px size-4 shrink-0 text-brand-moss" />
            {ADDRESS}
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-extrabold text-brand-moss underline-offset-4 hover:underline"
          >
            Ver no Google Maps
            <IconArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="mx-auto mt-12 max-w-[62rem] text-center text-[0.95rem] leading-[1.8] text-brand-sage">
          O <strong className="font-bold text-brand">Victa Viver Bosque</strong> é um novo
          empreendimento com condomínio fechado na Messejana que conecta a conveniência da cidade
          com um entorno que traz mais leveza à rotina. Perto de comércios, serviços, restaurantes e
          dos principais pontos da região, você vive a apenas{" "}
          <strong className="font-bold text-brand">1 km da Lagoa de Messejana</strong> e próximo ao{" "}
          <strong className="font-bold text-brand">Grand Shopping</strong>, garantindo toda a
          praticidade para o seu dia a dia.
        </p>

        <div className="mt-11 text-center">
          <a
            href="#cadastro"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-clay px-8 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(15,47,25,0.2)] transition hover:brightness-105"
          >
            Quero morar na Messejana
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
