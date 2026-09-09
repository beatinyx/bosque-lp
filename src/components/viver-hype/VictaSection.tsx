import { Img } from "./Img";

/**
 * DOBRA 6 — Institucional da Victa.
 *
 * Mesma dobra das outras duas LPs, mas o texto é o do design do Hype, que é
 * mais novo: fala de "momentos de vida" em vez do "protagonistas da
 * transformação" das peças anteriores.
 *
 * Os números seguem no PNG compartilhado (`victa-big-numbers.png`), que traz
 * +6.000 unidades lançadas. O Figma do Hype já mostra +7.000 e +4.970 — quando
 * a arte atualizada chegar, é só trocar o arquivo em /public/images/victa.
 */
export function VictaSection() {
  return (
    <section className="overflow-hidden bg-victa-mist py-[60px]">
      <div className="lp-container grid items-center gap-10 min-[900px]:grid-cols-2">
        <div>
          <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-normal text-stone">
            Sua nova
            <br />
            história
            <br />
            <strong className="font-extrabold">merece ser</strong>
            <br />
            <img
              src="/images/victa/logo-victa-verde-escuro.svg"
              alt="VICTA"
              className="mt-3 inline-block h-auto w-[clamp(190px,26vw,280px)]"
            />
          </h2>

          <div className="mb-7 max-w-[460px] space-y-4 text-[0.86rem] leading-[1.7] text-bark">
            <p>
              A Victa Engenharia desenvolve projetos pensados para diferentes momentos de vida, com
              atenção à qualidade, à funcionalidade e ao cuidado em cada detalhe.
            </p>
            <p>
              Mais do que construir empreendimentos, a Victa acompanha decisões importantes,
              oferecendo estrutura e confiança em cada etapa. Cada entrega reflete um compromisso
              real com quem escolhe dar{" "}
              <strong className="font-bold">um novo passo e busca um lugar</strong> que faça sentido
              hoje e ao longo do tempo.
            </p>
          </div>

          <Img
            src="/images/victa/victa-big-numbers.png"
            alt="+6.000 unidades lançadas, +4.900 entregues, +1.500 em construção, +3.900 clientes satisfeitos"
            label="victa-big-numbers"
            className="block h-auto w-full max-w-[440px]"
          />
        </div>

        <div className="flex justify-center max-[899px]:order-first">
          <Img
            src="/images/victa/humanizacao-victa.png"
            alt="Humanização VICTA"
            label="/images/victa/humanizacao-victa.png"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
