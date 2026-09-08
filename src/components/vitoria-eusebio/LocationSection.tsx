import type { ComponentType, SVGProps } from "react";

import {
  IconArrowRight,
  IconBag,
  IconCart,
  IconDumbbell,
  IconHealth,
  IconPin,
  IconRoad,
} from "./Icons";

const ADDRESS = "R. José Bento, 1625 - Guaribas, Eusébio - CE, 61770-210";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
/** Embed sem chave de API; o link abre o mesmo endereço no Google Maps. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&hl=pt-BR&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const NEARBY: Array<{
  time: string;
  place: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { time: "5 min", place: "Academia Top Fitness", Icon: IconDumbbell },
  { time: "10 min", place: "Supermercado Guará", Icon: IconCart },
  { time: "10 min", place: "Av. Eusébio de Queiroz", Icon: IconRoad },
  { time: "10 min", place: "Cometa Supermercados", Icon: IconCart },
  { time: "20 min", place: "Shopping Eusébio", Icon: IconBag },
  { time: "20 min", place: "Hospital Municipal", Icon: IconHealth },
];

/** DOBRA 2 — Localização. */
export function LocationSection() {
  return (
    <section
      id="localizacao"
      className="relative isolate overflow-hidden bg-brand-sand py-16 lg:py-20"
    >
      {/* Grafismo topográfico da marca, como marca d'água */}
      <img
        src="/images/vitoria-eusebio/grafismo-eusebio.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-28 -z-10 w-[520px] max-w-none opacity-[0.07] select-none sm:w-[820px] lg:-right-40 lg:w-[1150px]"
      />

      <div className="lp-container">
        <div className="mx-auto max-w-[46rem] text-center">
          <span className="text-[0.7rem] font-bold tracking-[0.22em] text-brand-red uppercase">
            Localização
          </span>
          <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-normal text-brand">
            Compre seu apê no Eusébio perto de{" "}
            <strong className="font-extrabold">tudo o que você precisa</strong>
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.75] text-brand-sage">
            More na região que mais se valoriza na Região Metropolitana. O Vitória Eusébio coloca
            você a poucos minutos de supermercados, serviços e das principais vias de acesso,
            garantindo praticidade e valorização imediata do seu patrimônio.
          </p>
        </div>

        <iframe
          title={`Mapa de localização do Vitória Eusébio — ${ADDRESS}`}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="mt-12 h-[320px] w-full rounded-[0_40px_0_40px] border-0 shadow-[0_18px_44px_rgba(0,0,0,0.16)] sm:h-[440px]"
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <p className="flex items-start gap-2 text-[0.88rem] leading-snug font-semibold text-brand">
            <IconPin className="mt-px size-4 shrink-0 text-brand-red" />
            {ADDRESS}
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-extrabold text-brand-red underline-offset-4 hover:underline"
          >
            Ver no Google Maps
            <IconArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {NEARBY.map(({ time, place, Icon }) => (
            <li
              key={place}
              className="group flex flex-col items-center gap-2.5 rounded-2xl bg-brand px-3 py-5 text-center text-brand-sand transition duration-200 hover:-translate-y-1 hover:bg-brand-sage hover:shadow-[0_14px_30px_rgba(4,76,54,0.28)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-white/12 text-brand-orange transition duration-200 group-hover:bg-brand-orange group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <span className="text-lg leading-none font-extrabold">{time}</span>
              <span className="text-[0.72rem] leading-snug text-white/75">{place}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="#inicio"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-blue px-8 py-4 text-[0.82rem] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition hover:brightness-105"
          >
            Quero conhecer tudo que tem perto
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
