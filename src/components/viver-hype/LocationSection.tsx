import { IconPin } from "./Icons";

const ADDRESS = "Av. Pintor Antônio Bandeira, 4770 - Praia do Futuro II, Fortaleza - CE";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
/** Embed sem chave de API; o link abre o mesmo endereço no Google Maps. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&hl=pt-BR&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/**
 * Selos do entorno. O texto é o do design: a parte em negrito é o que abre
 * cada selo, e o resto segue em peso normal.
 *
 * Os tempos aqui são os aprovados na peça (5 min do RioMar). O portfólio da
 * SQUAD registra 10 min para o mesmo trajeto — a divergência está anotada no
 * README para o cliente decidir qual vale.
 */
const NEARBY = [
  { strong: "5 min", rest: "do Shopping RioMar Fortaleza" },
  { strong: "5 min", rest: "do Batalhão de Choque (segurança para sua família)" },
  { strong: "Próximo às melhores", rest: "barracas de praia e polos gastronômicos" },
];

/** DOBRA 3 — Localização. */
export function LocationSection() {
  return (
    <section id="localizacao" className="px-4 pb-16 sm:px-6 lg:pb-24">
      {/*
        A dobra clara é um bloco chanfrado dentro do degradê, não uma faixa de
        ponta a ponta: no design o verde para antes das bordas da página e o
        mar aparece dos dois lados.
      */}
      <div className="chamfer-diag mx-auto max-w-[1180px] bg-brand-grass px-6 py-14 sm:px-10 lg:py-16">
        <h2 className="mx-auto max-w-[26ch] text-center text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.35] font-normal tracking-[0.02em] text-brand uppercase">
          More no <strong className="font-extrabold">novo eixo</strong> de valorização de Fortaleza
        </h2>

        <iframe
          title={`Mapa de localização do Hype Condomínio Clube — ${ADDRESS}`}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="mt-10 h-[300px] w-full border-0 sm:h-[420px]"
        />

        <p className="mx-auto mt-8 max-w-[76ch] text-center text-[0.82rem] leading-[1.8] text-brand/85">
          A Praia do Futuro vive um momento único de crescimento e investimentos. Morar aqui é
          garantir qualidade de vida com o pé na areia e, ao mesmo tempo, estar cercado por uma
          infraestrutura completa de serviços, lazer e segurança.
        </p>

        <ul className="mt-7 flex flex-wrap justify-center gap-3">
          {NEARBY.map((item) => (
            <li
              key={item.rest}
              className="inline-flex items-center gap-2 rounded-[6px] bg-brand-deepsea px-4 py-2.5 text-[0.62rem] tracking-[0.06em] text-brand-shell uppercase"
            >
              <IconPin className="size-3.5 shrink-0 text-brand-grass" />
              <span>
                <strong className="font-extrabold">{item.strong}</strong> {item.rest}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.08em] text-brand underline decoration-brand/40 underline-offset-4 uppercase transition hover:decoration-brand"
          >
            <IconPin className="size-4" />
            {ADDRESS}
          </a>
        </p>
      </div>
    </section>
  );
}
