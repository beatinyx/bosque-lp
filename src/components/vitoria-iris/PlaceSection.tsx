import { Img } from "./Img";

/**
 * DOBRA 2 — O lugar.
 *
 * O Vitória Íris fica dentro do Parque Vitória Messejana, e é o logo do bairro
 * planejado que abre o bloco — não o do Íris. Texto à esquerda e a praça à
 * direita no desktop; no mobile o texto vem primeiro e a imagem fecha o bloco.
 */
export function PlaceSection() {
  return (
    <section id="lugar" className="bg-brand py-16 text-white">
      <div className="lp-container">
        <div className="mx-auto grid max-w-[1028px] items-center gap-10 lg:grid-cols-[404px_1fr] lg:gap-[36px]">
          <div className="max-lg:text-center">
            <Img
              src="/images/vitoria-iris/logo-parque-vitoria.png"
              alt="Parque Vitória Messejana"
              label="logo-parque-vitoria.png"
              className="h-auto w-[261px] object-contain max-lg:mx-auto lg:w-[319px]"
            />
            <h2 className="mt-5 text-[clamp(1.2rem,2.2vw,1.3rem)] leading-[1.3] font-normal text-balance">
              Um lugar pensado para viver bons momentos e construir novas histórias com quem você
              ama
            </h2>
            <p className="mt-5 text-[0.9rem] leading-[1.35] lg:text-[1rem]">
              No Parque Vitória Messejana, cada detalhe foi pensado para acolher você e sua família.
              Aqui, você encontra um lugar tranquilo, com espaço para as crianças brincarem, para
              reunir quem você ama e construir novas memórias todos os dias.
            </p>
            <p className="mt-3 text-[0.9rem] leading-[1.35] lg:text-[1rem]">
              Além de morar em um apartamento confortável e pronto para viver, você faz parte de um
              bairro planejado, com mais organização, mais cuidado e um ambiente que valoriza o seu
              dia a dia.
            </p>
          </div>

          <figure className="relative overflow-hidden rounded-tr-[50px]">
            <Img
              src="/images/vitoria-iris/praca.webp"
              alt="Perspectiva da praça do Parque Vitória Messejana"
              label="praca.webp"
              className="aspect-[588/489] w-full object-cover"
            />
            <figcaption className="absolute top-4 left-4 text-[0.75rem] tracking-wide text-[#013334] uppercase">
              imagem meramente ilustrativa
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
