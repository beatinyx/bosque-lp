import { Img } from "./Img";

/** Os três quadros de condição — cores e textos do design, do branco ao sálvia. */
const BOXES = [
  { label: "Sinal a partir de", value: "R$ 999*", cls: "bg-white text-brand" },
  { label: "Renda", value: "R$ 8.000*", cls: "bg-brand-cocoa text-white" },
  { label: "Entrada em até", value: "48x", cls: "bg-brand-sage text-white" },
];

/**
 * DOBRA 5 — Condições.
 *
 * Azul liso da marca, a manchete com "o melhor" em negrito, o casal com o
 * prédio recortado e, colados embaixo dele sem espaço, os três quadros lado a
 * lado (empilhados no mobile).
 */
export function ConditionsSection() {
  return (
    <section id="condicoes" className="bg-brand pt-[60px] pb-[73px] text-white">
      <div className="lp-container">
        <h2 className="text-center text-[clamp(1.5rem,3.4vw,2rem)] leading-[1.3] font-normal">
          Viva <strong className="font-bold">o melhor</strong> da vida.
          <br />
          Viva <strong className="font-bold">o melhor</strong> da praia.
        </h2>

        <Img
          src="/images/atlantico/viva-melhor.webp"
          alt="Casal com o cachorro diante do prédio do Atlântico"
          label="viva-melhor.webp"
          className="mx-auto mt-6 h-auto w-full max-w-[330px] object-contain lg:mt-[29px] lg:max-w-[801px]"
        />

        <ul className="mx-auto grid max-w-[331px] lg:max-w-[993px] lg:grid-cols-3">
          {BOXES.map(({ label, value, cls }) => (
            <li
              key={label}
              className={`flex h-[115px] flex-col items-center justify-center text-center lg:h-[143px] ${cls}`}
            >
              <span className="text-[1.25rem] leading-[1.3] lg:text-[1.5rem]">{label}</span>
              <span className="text-[2.5rem] leading-[1.15] font-semibold lg:text-[3rem]">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
