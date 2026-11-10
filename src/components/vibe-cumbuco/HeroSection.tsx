import { useEffect, useRef } from "react";

import { LeadForm } from "./LeadForm";
import { SHELL } from "./ui";

/**
 * DOBRA 1 — KV, tagline e formulário.
 *
 * A fachada corre de ponta a ponta da página, com o destaque "Lançamento em
 * Cumbuco", o lockup e a tagline empilhados no pé, à esquerda. O conteúdo
 * por cima dela segue a largura do resto da página (`SHELL`).
 *
 * O formulário é um card de linho: no desktop ele flutua sobre a foto, no
 * canto inferior direito e alinhado à margem do conteúdo; no celular desce
 * para baixo da foto, sobrepondo um pouco a borda dela.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  /*
   * Mede o card do formulário e escreve a altura em `--hero-form-h`, que o
   * bloco da esquerda usa como altura mínima no desktop. Acompanha mudanças
   * (mensagens de erro no form, troca de fonte) pelo ResizeObserver.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form || !("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(() => {
      section.style.setProperty("--hero-form-h", `${form.offsetHeight}px`);
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative isolate flex min-h-[min(100svh,920px)] flex-col overflow-hidden bg-brand text-white max-lg:min-h-[80svh]">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/vibe-cumbuco/fachada-mobile.webp" />
          <img
            src="/images/vibe-cumbuco/fachada.webp"
            alt="Fachada do Vibe Cumbuco ao entardecer, com coqueiros na frente das torres"
            className="absolute inset-0 -z-10 size-full object-cover object-[60%_center]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/*
          Véus: um da esquerda para a direita, que segura a tagline sobre o
          céu claro do render, e um de baixo para cima, que dá chão ao texto.
          Os dois em petróleo fechado, não em preto, para a foto manter o tom
          do KV.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/75 via-brand/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand/80 via-brand/10 to-brand/30"
        />

        <div className={`${SHELL} flex flex-1 flex-col`}>
          {/* No topo só fica o atalho para o formulário, e só no celular. */}
          <header className="flex justify-end pt-6 sm:pt-9 lg:hidden">
            <a
              href="#cadastro"
              className="rounded-full bg-brand-orange px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-brand-orange-deep"
            >
              Cadastre-se
            </a>
          </header>

          {/*
            No desktop este bloco tem a mesma altura do card do formulário
            (`--hero-form-h`, medida no cliente) e o mesmo pé (56px, o
            `bottom-14` do card), com o conteúdo empilhado no topo: a tag fica na
            linha do topo do form, e o logo e a tagline vêm logo abaixo dela.
          */}
          <div className="mt-auto flex flex-col pb-24 sm:pb-28 lg:min-h-[calc(var(--hero-form-h,0px)+3.5rem)] lg:max-w-[calc(100%-470px)] lg:justify-start lg:pb-14">
            <p className="mb-7 inline-flex items-center gap-2.5 self-start rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-citrus" />
              Lançamento em Cumbuco
            </p>

            <div>
              <img
                src="/images/vibe-cumbuco/logo-vibe-branco.svg"
                alt="Vibe Cumbuco"
                width={544}
                height={239}
                className="mb-8 block h-auto w-[clamp(150px,15vw,220px)]"
              />

              <h1 className="text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.98] font-extralight tracking-[-0.03em] [text-shadow:0_2px_30px_rgba(15,68,70,0.35)]">
                Leve sua rotina{" "}
                <span className="mt-1 block pl-[0.5em] font-script text-[1.3em] leading-[0.95] font-normal tracking-normal text-brand-sand">
                  para ver o mar
                </span>
              </h1>

              {/*
                As tags se encaixam ao lado da perninha do "p" de "para": a
                lista tem o tamanho de fonte do h1, então os `em` abaixo seguem
                a manchete em qualquer tela. `ml` = recuo da manuscrita (0.65em)
                + a largura do "p" (0.36 × 1.3em); `mt` negativo sobe até logo
                abaixo da linha de base do texto, por dentro da descendente.
                Medidas feitas na Sacramento, a manuscrita carregada.
              */}
              <ul className="-mt-[0.14em] ml-[1.12em] flex flex-wrap gap-2.5 text-[clamp(2.6rem,6.4vw,5.6rem)]">
                {["A 100 metros do mar", "Minha Casa, Minha Vida"].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*
        Fora do bloco da foto para poder descer abaixo dela no celular. No
        desktop vira uma camada absoluta na largura do `SHELL`, presa ao pé da
        dobra, e o card se encosta à direita.
      */}
      <div
        className={`${SHELL} relative z-10 -mt-12 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-14 lg:mt-0 lg:flex lg:justify-end`}
      >
        <div
          ref={formRef}
          id="cadastro"
          className="vibe-frame vibe-frame-sm scroll-mt-6 bg-brand-linen p-6 text-brand shadow-[0_30px_80px_-20px_rgba(15,68,70,0.45)] sm:mx-2 sm:p-8 lg:pointer-events-auto lg:mx-0 lg:w-[420px] lg:bg-brand-linen/95 lg:p-9 lg:backdrop-blur-md"
        >
          <h2 className="mb-6 text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.2] font-light tracking-[-0.01em] text-balance">
            Garanta sua oportunidade no{" "}
            <strong className="font-medium text-brand-petrol">endereço mais desejado</strong> de
            Cumbuco
          </h2>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
