import { Img } from "./Img";

/** DOBRA 5 — Institucional padrão da Victa. */
export function VictaSection() {
  return (
    <section className="overflow-hidden bg-victa-mist py-[60px]">
      <div className="lp-container grid items-center gap-10 min-[900px]:grid-cols-2">
        <div className="max-[899px]:text-center">
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

          <p className="mb-7 max-w-[440px] max-[899px]:mx-auto text-[0.86rem] leading-[1.7] text-bark">
            Somos protagonistas da transformação e apaixonados por potencializar vidas e realizar
            sonhos. Carregamos em <strong className="font-bold">nosso DNA</strong> a dedicação, o
            comprometimento e o amor pelo que fazemos. O sentimento de gratidão e felicidade de quem
            adquire um lugar para chamar de seu é o{" "}
            <strong className="font-bold">nosso maior triunfo</strong>.
          </p>

          <Img
            src="/images/victa/victa-big-numbers.png"
            alt="+6.000 unidades lançadas, +4.900 entregues, +1.500 em construção, +3.900 clientes satisfeitos"
            label="victa-big-numbers"
            className="block h-auto w-full max-w-[440px] max-[899px]:mx-auto"
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
