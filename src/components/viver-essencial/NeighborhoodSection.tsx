import { Img } from "./Img";

/**
 * DOBRA 4 — O bairro.
 *
 * Foto aérea do Pici à esquerda e o argumento de investimento à direita, como
 * no Figma. No mobile a foto vai para cima do texto.
 */
export function NeighborhoodSection() {
  return (
    <section id="bairro" className="py-12 text-white md:py-14">
      <div className="lp-container grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <Img
          src="/images/viver-essencial/aerea-pici.webp"
          alt="Vista aérea do bairro Pici, em Fortaleza"
          label="aerea-pici.webp"
          /* Proporção fixa: sem ela a imagem colapsa quando a grade vira uma coluna só. */
          className="aspect-3/2 w-full rounded-[4px] object-cover"
        />

        <div>
          <p className="text-[clamp(0.875rem,3.6vw,1rem)] leading-[1.5]">
            O lançamento imobiliário no bairro Pici une a conveniência de um endereço consolidado ao
            potencial de um excelente investimento.
          </p>
          <p className="mt-5 text-[clamp(0.875rem,3.6vw,1rem)] leading-[1.5]">
            Seja para morar com sua família ou garantir um patrimônio seguro, comprar apartamento no
            Pici é a escolha certa para quem quer estar onde a cidade cresce.
          </p>

          <div className="mt-7">
            <a
              href="#inicio"
              className="inline-flex items-center justify-center rounded-full bg-brand-gold px-7 py-3 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:brightness-105"
            >
              Quero morar aqui
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
