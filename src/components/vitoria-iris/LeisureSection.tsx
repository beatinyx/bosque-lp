import { Carousel } from "./Carousel";
import { Img } from "./Img";

/** Piscina, quadra e salão vêm do Figma; as outras foram adicionadas depois. */
const SLIDES = [
  { file: "piscina.webp", label: "Piscina" },
  { file: "salao-de-festas.webp", label: "Salão de festas" },
  { file: "churrasqueiras.webp", label: "Churrasqueiras" },
  { file: "playground.webp", label: "Playground" },
  { file: "quadra.webp", label: "Quadra" },
  { file: "quadras.webp", label: "Quadras" },
  { file: "pet-place.webp", label: "Pet place" },
  { file: "redario.webp", label: "Redário" },
  { file: "espaco-fitness.webp", label: "Espaço fitness" },
  { file: "espaco-picnic.webp", label: "Espaço picnic" },
  { file: "horta.webp", label: "Horta" },
  { file: "bicicletario.webp", label: "Bicicletário" },
];

/**
 * DOBRA 4 — Lazer.
 *
 * As três perspectivas (piscina, quadra e salão) ficam num carrossel, igual ao
 * do Vitória Jasmim. A faixa verde com os itens de lazer é uma imagem no Figma e
 * foi mantida como imagem — o `alt` lista os itens. O vídeo fecha a dobra.
 *
 * O grafismo da estrela só aparece no desktop, vazando pela borda esquerda.
 */
export function LeisureSection() {
  return (
    <section id="lazer" className="relative isolate overflow-hidden bg-brand-sky py-16 text-white">
      <img
        src="/images/vitoria-iris/grafismo-iris.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-[360px] -z-10 hidden w-[683px] max-w-none select-none xl:block"
      />

      <div className="lp-container">
        <h2 className="mx-auto max-w-[634px] text-center text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.3] font-normal">
          Mais tempo de qualidade com quem você ama, sem precisar sair de casa
        </h2>

        <div className="mx-auto mt-10 max-w-[1038px]">
          <Carousel slides={SLIDES} />

          <div className="mx-auto mt-14 max-w-[885px] rounded-[20px] bg-brand-jade px-4 py-5 sm:px-10 sm:py-8">
            <Img
              src="/images/vitoria-iris/lazer-icones.png"
              alt="Lazer completo: piscina, 2 quadras, 2 churrasqueiras, salão de festas, playground, fitness, horta, picnic e praças"
              label="lazer-icones.png"
              className="mx-auto h-auto w-full max-w-[801px] object-contain"
            />
          </div>

          <div className="mx-auto mt-8 aspect-[3/2] w-full max-w-[1079px] overflow-hidden rounded-[20px] bg-black/20">
            <iframe
              title="Vídeo do Vitória Íris"
              src="https://www.youtube.com/embed/HlrdBhhGHck"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="size-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
