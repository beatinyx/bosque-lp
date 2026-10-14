import { Cta } from "./Cta";
import { Img } from "./Img";

/** Endereço da obra, do embed do próprio Figma Sites. */
const ADDRESS = "Avenida Central da Tabuba, 4169 - Quadra 0159 - Tabuba - Caucaia, CE";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=12&hl=pt-BR&output=embed`;

/** Pastilhas de entorno, na ordem do Figma: o tempo em negrito, o lugar não. */
const NEARBY = ["do mar", "do Chico do Caranguejo", "do Supermercado Super Cumbuco Atacarejo"];

/**
 * DOBRAS 2 e 3 — Praia e localização, sobre o mesmo fundo areia.
 *
 * No Figma as duas ficam num bloco só (#e6bb94), com a onda branca a 10%
 * atravessando a página entre elas. No desktop alternam lado: a foto do
 * Cumbuco à esquerda e o texto à direita; depois o texto à esquerda e o mapa
 * à direita. No mobile tudo centraliza e a foto desce para baixo do texto.
 */
export function BeachSection() {
  return (
    <section className="relative isolate overflow-clip bg-brand-sand py-10 text-brand-ink lg:py-[106px]">
      <img
        src="/images/vista-costeira/onda-areia.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[122px] left-1/2 -z-10 h-[385px] w-[1091px] max-w-none -translate-x-1/2 lg:top-[406px] lg:w-[1544px]"
      />

      <div className="lp-container flex flex-col gap-12 lg:gap-24">
        <div className="grid items-center gap-x-[69px] gap-y-5 lg:grid-cols-[600px_1fr]">
          <div className="max-lg:text-center lg:order-2">
            <h2 className="mx-auto max-w-[420px] text-2xl leading-[1.2] font-normal lg:mx-0 lg:text-[2rem]">
              O privilégio de morar em um{" "}
              <strong className="font-bold">apartamento à beira mar</strong> no Cumbuco
            </h2>
            <p className="mx-auto mt-5 max-w-[421px] text-sm leading-[1.25] lg:mx-0 lg:text-base">
              Morar na praia é ter a liberdade de acordar com o barulho do mar e o vento no rosto.
              Uma das praias mais famosas do mundo pelo kitesurf, unindo a tranquilidade de um
              refúgio litorâneo com a infraestrutura que você precisa para o dia a dia. Aqui, o fim
              de tarde na praia não é um evento de fim de semana, é a sua nova rotina.
            </p>
            <Cta className="mt-6 max-lg:hidden">Quero viver no Cumbuco</Cta>
          </div>

          <Img
            src="/images/vista-costeira/praia-cumbuco.webp"
            alt="Praia do Cumbuco com kitesurfistas no mar"
            label="praia-cumbuco.webp"
            className="aspect-[324/307] w-full object-cover lg:order-1 lg:aspect-3/2"
          />

          <div className="text-center lg:hidden">
            <Cta className="mt-2">Quero viver no Cumbuco</Cta>
          </div>
        </div>

        <div className="grid items-center gap-x-[46px] gap-y-5 lg:grid-cols-[1fr_600px]">
          <div className="max-lg:text-center">
            <h2 className="mx-auto max-w-[216px] text-2xl leading-[1.2] font-normal lg:mx-0 lg:max-w-[340px] lg:text-[2rem]">
              Conveniência e <strong className="font-bold">o mar aos seus pés</strong>
            </h2>
            <p className="mx-auto mt-5 max-w-[464px] text-base leading-[1.25] max-lg:max-w-[284px] lg:mx-0">
              Este lançamento imobiliário foi planejado para você não precisar tirar o carro da
              garagem para nada. Encontre o melhor apartamento à venda no Cumbuco.
            </p>

            <ul className="mt-5 flex flex-col items-center gap-4 lg:items-start lg:gap-3">
              {NEARBY.map((place) => (
                <li
                  key={place}
                  className="cursor-default rounded-full border-2 border-brand-foam px-[18px] py-2 text-sm leading-[1.25] transition-[background-color,translate,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-foam hover:shadow-[0_8px_18px_-6px_rgba(27,87,116,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:text-base lg:whitespace-nowrap"
                >
                  <strong className="font-bold">1 min</strong> {place}
                </li>
              ))}
            </ul>
          </div>

          <iframe
            title={`Mapa de localização do Vista Costeira — ${ADDRESS}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[366px] w-full border-0 lg:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
