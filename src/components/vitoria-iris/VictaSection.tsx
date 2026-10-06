import { Img } from "./Img";

/**
 * DOBRA 5 — Institucional padrão da Victa.
 *
 * Mesmo conteúdo das outras LPs; o que muda aqui é a cartela do Vitória
 * Íris: fundo creme (#f0f5cd) e texto no verde-escuro institucional
 * (#00512a), como no arquivo do Figma.
 */
export function VictaSection() {
  return (
    <section className="overflow-hidden bg-victa-cream py-[60px] text-victa-forest">
      <div className="lp-container grid items-center gap-10 min-[900px]:grid-cols-2">
        <div>
          <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-normal">
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

          <p className="mb-7 max-w-[506px] text-[0.9rem] leading-[1.35]">
            Somos protagonistas da transformação e apaixonados por potencializar vidas e realizar
            sonhos. Carregamos em <strong className="font-bold">nosso DNA</strong> a dedicação, o
            comprometimento e o amor pelo que fazemos. O sentimento de gratidão e felicidade de quem
            adquire um lugar para chamar de seu é o{" "}
            <strong className="font-bold">nosso maior triunfo</strong>.
          </p>

          <Img
            src="/images/victa/victa-big-numbers.png"
            alt="+9.200 unidades lançadas, +7.200 vendidas, +3.100 em construção e +4.970 entregues"
            label="victa-big-numbers"
            className="block h-auto w-full max-w-[400px]"
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
    </section>
  );
}
