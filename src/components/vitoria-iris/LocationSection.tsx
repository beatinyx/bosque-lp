import { Img } from "./Img";

/**
 * DOBRA 3 — Localização.
 *
 * O mapa ilustrado e a legenda são duas imagens empilhadas dentro do mesmo
 * cartão escuro (cantos de 40px). A legenda é uma imagem transparente com os
 * 33 pontos numerados — é a única fonte dos nomes —, então o `alt` resume o
 * que ela traz para leitor de tela.
 */
export function LocationSection() {
  return (
    <section id="localizacao" className="bg-brand-jade py-16 text-white">
      <div className="lp-container">
        <h2 className="mx-auto max-w-[654px] text-center text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.3] font-normal">
          Morar em Messejana é estar perto de tudo que facilita o seu dia a dia
        </h2>

        <div className="mx-auto mt-10 max-w-[1171px] rounded-[40px] bg-brand px-4 py-5 sm:px-10 sm:py-10">
          <Img
            src="/images/vitoria-iris/mapa-messejana.webp"
            alt="Mapa ilustrado de Messejana com a localização do Vitória Íris"
            label="mapa-messejana.webp"
            className="h-auto w-full rounded-[20px] object-cover"
          />
          <Img
            src="/images/vitoria-iris/mapa-legenda.webp"
            alt="Legenda do mapa, com 33 pontos de interesse numerados: escolas, supermercados, postos de saúde, bancos, shoppings, terminal rodoviário e hospital, entre outros"
            label="mapa-legenda.webp"
            className="mt-5 h-auto w-full object-contain sm:mt-7"
          />
        </div>
      </div>
    </section>
  );
}
