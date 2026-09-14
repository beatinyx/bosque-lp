import { Img } from "./Img";

/**
 * DOBRA 7 — Institucional da Victa.
 *
 * Mesmo bloco das outras LPs, na cartela do Viver Essencial: fundo creme
 * (#f0f5cd), texto no verde-escuro institucional (#00512a) e a família
 * Montserrat, que é a que o Figma usa aqui — o resto da página é Poppins.
 *
 * O texto é o mais novo da Victa, o que está no arquivo desta página, e não o
 * "Somos protagonistas da transformação" das três LPs anteriores. O botão roxo
 * fecha a dobra, centralizado sob as duas colunas.
 */
export function VictaSection() {
  return (
    <section className="font-montserrat overflow-hidden bg-victa-cream py-[60px] text-victa-forest">
      <div className="lp-container grid items-center gap-10 min-[900px]:grid-cols-2">
        <div>
          <h2 className="mb-6 flex flex-wrap items-center gap-x-3 text-[clamp(1.6rem,4vw,2.2rem)] leading-[1.2] font-normal">
            <span>
              Sua nova história
              <br />
              merece ser
            </span>
            <img
              src="/images/victa/logo-victa-verde-escuro.svg"
              alt="VICTA"
              className="inline-block h-auto w-[clamp(150px,20vw,205px)]"
            />
          </h2>

          <div className="mb-7 flex max-w-[566px] flex-col gap-4 text-[0.9rem] leading-[1.3]">
            <p>
              A Victa Engenharia desenvolve projetos pensados para diferentes momentos de vida, com
              atenção à qualidade, à funcionalidade e ao cuidado em cada detalhe.
            </p>
            <p>
              Mais do que construir empreendimentos, a Victa acompanha decisões importantes,
              oferecendo estrutura e confiança em cada etapa. Cada entrega reflete um compromisso
              real com quem escolhe dar um novo passo e busca um lugar que faça sentido hoje e ao
              longo do tempo.
            </p>
            <p>
              É dessa forma que a Victa constrói sua trajetória: com consistência, responsabilidade
              e foco em entregar soluções que realmente atendem à vida como ela é.
            </p>
          </div>

          <Img
            src="/images/victa/victa-big-numbers.png"
            alt="+9.200 unidades lançadas, +7.200 vendidas, +3.110 em construção e +4.970 entregues"
            label="victa-big-numbers"
            className="block h-auto w-full max-w-[360px]"
          />
        </div>

        <div className="flex justify-center max-[899px]:order-first">
          <Img
            src="/images/victa/humanizacao-victa.png"
            alt="Humanização VICTA"
            label="humanizacao-victa.png"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="lp-container mt-10 text-center">
        <a
          href="https://wa.me/558535123512"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-brand-orchid px-7 py-2.5 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase transition hover:brightness-110"
        >
          Fale com a gente
        </a>
      </div>
    </section>
  );
}
