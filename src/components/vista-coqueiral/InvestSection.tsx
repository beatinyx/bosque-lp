import { Cta } from "./Cta";
import { Img } from "./Img";

/*
 * O mapa do Figma ainda é o placeholder do Figma Sites ("San Francisco City
 * Hall") e nenhuma página do arquivo traz o endereço da obra. Até o endereço
 * oficial chegar, o mapa centraliza na Praia do Cumbuco — trocar aqui.
 */
const MAP_QUERY = "Praia do Cumbuco, Caucaia - CE";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&hl=pt-BR&output=embed`;

/** Pastilhas de entorno, na ordem do Figma: o tempo em negrito, o lugar não. */
const NEARBY: { time: string; place: string }[] = [
  { time: "Pé na areia", place: "(acesso direto pela lateral do condomínio)" },
  { time: "2 min.", place: "de mercados e conveniências locais" },
  { time: "3 min.", place: "do Chico do Caranguejo" },
  { time: "5 min.", place: "Centro de Cumbuco" },
];

/**
 * DOBRA 2 — Investimento e localização, sobre o verde-coqueiro.
 *
 * No desktop a foto da praia encosta na borda esquerda da tela (como no
 * Figma, onde ela começa 24px fora do frame) e o texto fica à direita; depois
 * o texto da localização à esquerda, com as pastilhas de entorno, e o mapa à
 * direita. No mobile tudo centraliza e a foto desce para baixo do texto.
 */
export function InvestSection() {
  return (
    <section className="overflow-clip bg-brand pt-[45px] pb-[25px] text-white lg:pt-[89px] lg:pb-[41px]">
      <div className="lp-container flex flex-col gap-[85px] lg:gap-[140px]">
        <div className="grid items-center gap-y-[30px] lg:grid-cols-[536px_1fr] lg:gap-x-[89px]">
          <div className="max-lg:text-center lg:order-2">
            <h2 className="mx-auto max-w-[294px] text-2xl leading-[1.2] font-normal lg:mx-0 lg:max-w-[402px] lg:text-[2rem]">
              Um <strong className="font-bold">refúgio planejado</strong> para investir em qualidade
              de vida!
            </h2>
            <p className="mx-auto mt-5 max-w-[343px] text-sm leading-[1.2] lg:mx-0 lg:mt-[25px] lg:max-w-[436px] lg:text-xl">
              A Praia do Cumbuco atrai turistas, velejadores e investidores do mundo inteiro o ano
              todo. Essa alta demanda constante garante uma valorização patrimonial para o Vista
              Coqueiral.
            </p>
            <Cta className="mt-[25px] max-lg:hidden">Quero morar no Cumbuco</Cta>
          </div>

          {/* No desktop a foto vaza até a borda esquerda da tela. */}
          <div className="lg:order-1 lg:ml-[calc(512px-50vw)] lg:w-[calc(100%+50vw-512px)]">
            <Img
              src="/images/vista-coqueiral/praia-kitesurf.webp"
              alt="Praia do Cumbuco com dezenas de kitesurfistas no mar"
              label="praia-kitesurf.webp"
              className="mx-auto aspect-[343/350] w-full max-w-[343px] object-cover lg:aspect-auto lg:h-[431px] lg:max-w-none"
            />
          </div>

          <div className="text-center lg:hidden">
            <Cta>Quero morar no Cumbuco</Cta>
          </div>
        </div>

        <div className="grid items-center gap-y-8 lg:grid-cols-[467px_1fr] lg:gap-x-[47px]">
          <div className="max-lg:text-center">
            <h2 className="mx-auto max-w-[302px] text-2xl leading-[1.2] font-normal lg:mx-0 lg:max-w-[424px] lg:text-[2rem]">
              Conveniência e lazer <strong className="font-bold">a poucos passos do mar</strong>
            </h2>
            <p className="mx-auto mt-5 max-w-[280px] text-sm leading-[1.2] lg:mx-0 lg:max-w-[490px] lg:text-xl">
              Viva a calmaria de um refúgio litorâneo sem abrir mão do acesso rápido a tudo o que
              você precisa no dia a dia.
            </p>

            <ul className="mt-5 flex flex-col items-center gap-[21px] lg:mt-[22px] lg:items-start lg:gap-3">
              {NEARBY.map(({ time, place }) => (
                <li
                  key={time}
                  className="max-w-[286px] cursor-default bg-brand-driftwood px-[18px] py-2 text-center text-sm leading-[1.2] transition-[translate,filter,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-6px_rgba(0,0,0,0.45)] hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:max-w-none lg:text-left lg:text-base lg:whitespace-nowrap"
                >
                  <strong className="font-bold">{time}</strong> {place}
                </li>
              ))}
            </ul>
          </div>

          <iframe
            title="Mapa da Praia do Cumbuco, onde fica o Vista Coqueiral"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[253px] w-full border-0 lg:h-[439px]"
          />
        </div>
      </div>
    </section>
  );
}
