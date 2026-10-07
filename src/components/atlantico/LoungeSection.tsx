import { Img } from "./Img";

/** Etiqueta sálvia no canto inferior esquerdo dos renders — o nome da área. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="absolute bottom-3 left-3 bg-brand-sage px-3 py-2 text-[0.62rem] leading-none tracking-wide text-white uppercase italic sm:bottom-8 sm:left-7 sm:px-3.5 sm:py-3.5 sm:text-[0.95rem]">
      {children}
    </span>
  );
}

/**
 * DOBRA 3 — O lounge externo, em tela cheia.
 *
 * A perspectiva é o fundo da dobra inteira (`object-cover`), com a mesma altura
 * que o design dá ao bloco: 735px no desktop. A etiqueta fica no canto inferior
 * esquerdo do conteúdo, alinhada com o resto da página.
 */
export function LoungeSection() {
  return (
    <section
      id="lounge"
      className="group relative isolate min-h-[340px] overflow-hidden bg-brand-aqua sm:min-h-[520px] lg:min-h-[735px]"
    >
      <Img
        src="/images/atlantico/lounge.webp"
        alt="Perspectiva do lounge externo do Atlântico"
        label="lounge.webp"
        className="absolute inset-0 -z-10 size-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="lp-container relative flex min-h-[inherit] items-end">
        <Tag>lounge externo</Tag>
      </div>
    </section>
  );
}
