import { IconArrowRight, IconBag, IconPin } from "./Icons";
import { Img } from "./Img";

const ADDRESS = "R. Antero de Quental, 383 - Paupina, Fortaleza - CE, 60810-670";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
/** Embed sem chave de API; o link abre o mesmo endereço no Google Maps. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&hl=pt-BR&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/**
 * Pontos do entorno. Os ícones são os PNGs do próprio design (medalhão roxo
 * com o pictograma vazado), e não os do conjunto em traço das outras LPs.
 *
 * O do shopping é a exceção: no Figma ele é o medalhão vazio com uma sacola
 * vetorial por cima, então aqui o `overlay` desenha o mesmo por cima do PNG.
 */
const NEARBY = [
  { time: "1 min", place: "Escola Gadelha", icon: "icone-escola.png", overlay: false },
  { time: "6 min", place: "Farmácia", icon: "icone-farmacia.png", overlay: false },
  { time: "9 min", place: "Academia", icon: "icone-academia.png", overlay: false },
  { time: "11 min", place: "Supermercados", icon: "icone-supermercado.png", overlay: false },
  { time: "12 min", place: "Shopping Terrazo", icon: "icone-shopping.png", overlay: true },
];

/** DOBRA 2 — Localização. */
export function LocationSection() {
  return (
    <section id="localizacao" className="relative isolate overflow-hidden bg-brand-sand py-16">
      {/* Grafismo do logo em traço, como no canto superior direito do design */}
      <img
        src="/images/vitoria-jasmim/grafismo-jasmim.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 -z-10 w-[420px] max-w-none opacity-[0.12] select-none sm:w-[560px]"
      />

      <div className="lp-container">
        <div className="mx-auto max-w-[46rem] text-center text-brand">
          <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.3] font-normal">
            Seu apartamento no <strong className="font-bold">coração da Messejana</strong>, perto de
            tudo que você precisa
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.35]">
            O bairro Messejana é um dos mais completos de Fortaleza, com fácil acesso a escolas,
            hospitais, supermercados, transporte e lazer.
          </p>
        </div>

        <iframe
          title={`Mapa de localização do Vitória Jasmim — ${ADDRESS}`}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="mx-auto mt-10 block h-[320px] w-full max-w-[817px] rounded-[0_60px_0_60px] border-0 shadow-[0_18px_44px_rgba(0,0,0,0.16)] sm:h-[420px]"
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-brand">
          <p className="flex items-start gap-2 text-[0.88rem] leading-snug font-semibold">
            <IconPin className="mt-px size-4 shrink-0" />
            {ADDRESS}
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-bold underline-offset-4 hover:underline"
          >
            Ver no Google Maps
            <IconArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[818px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {NEARBY.map(({ time, place, icon, overlay }) => (
            <li
              key={place}
              className="flex flex-col items-center justify-center gap-2 rounded-[10px] bg-brand-olive px-3 py-6 text-center text-white"
            >
              <span className="relative grid size-[72px] place-items-center">
                <Img
                  src={`/images/vitoria-jasmim/${icon}`}
                  alt=""
                  label={icon}
                  className="size-[72px] object-contain"
                />
                {overlay && <IconBag className="absolute size-7" />}
              </span>
              <span className="text-[1.35rem] leading-none font-bold italic">{time}</span>
              <span className="text-[0.85rem] leading-snug">{place}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="#inicio"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-3.5 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition hover:brightness-105"
          >
            Quero conhecer tudo que tem perto
            <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
