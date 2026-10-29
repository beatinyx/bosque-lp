import { Img } from "./Img";
import { LeadForm } from "./LeadForm";

/**
 * DOBRA 1 — Hero.
 *
 * A composição é a do Figma: a faixa de lançamento sobre o degradê de mar, e
 * abaixo dela um painel recuado com borda fina onde tudo acontece — coluna à
 * esquerda com o logo e, embaixo dele, o card laranja alto com a manchete no
 * topo; a fachada preenchendo a direita e o recorte do casal encostado na base
 * à direita, na frente do prédio. O logo é centrado na largura do card, então
 * os dois leem como um bloco só.
 *
 * O formulário não existe no design. Ele entra dentro do card
 * laranja, na área que o Figma deixa vazia embaixo da manchete: é o único
 * espaço livre da dobra, e usá-lo mantém a silhueta do painel intacta em vez
 * de criar um bloco novo que o design não prevê.
 */
export function HeroSection() {
  return (
    <section id="inicio" className="bg-brand-sea pb-10 lg:pb-14">
      {/*
        Faixa de lançamento. No design ela não é uma barra escura: fica direto
        sobre o degradê, acima do painel.
      */}
      <p className="py-3.5 text-center text-[0.6rem] font-bold tracking-[0.3em] text-brand-shell uppercase sm:text-[0.68rem]">
        Lançamento na Praia do Futuro
      </p>

      {/*
        Painel do hero. É o recorte do design: recuado das bordas, a máscara
        chanfrada da marca — a mesma da dobra de localização — e um fio claro
        em volta, com a fachada sangrando dentro dele. O recuo vem do wrapper
        com padding, para o painel continuar centrado quando a largura passa
        do máximo.

        O `clip-path` do chanfro já recorta os filhos, então não há
        `overflow-hidden` aqui.
      */}
      <div className="px-4 sm:px-6">
        <div className="chamfer-diag relative isolate mx-auto max-w-[1320px] px-6 pt-8 pb-10 sm:px-8 sm:pb-12 lg:min-h-[620px] lg:px-12 lg:pb-14">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/viver-hype/fachada-mobile.webp" />
            <img
              src="/images/viver-hype/fachada.webp"
              alt="Fachada do Hype Condomínio Clube, na Praia do Futuro"
              className="absolute inset-0 -z-10 size-full object-cover object-[62%_center]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          {/*
          Lavagem escura por cima da foto, mais forte à esquerda: é onde ficam
          o logo e o card, e a fachada tem céu claro atrás. Preta e não teal —
          um véu colorido sujava o branco do logo.
        */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/20 to-black/30"
          />

          {/*
          Recorte do casal: base do painel, à direita, na frente do prédio.
          Abaixo de `lg` o card ocupa a largura toda e não sobra espaço, então
          ele sai.
        */}
          <Img
            src="/images/viver-hype/casal-hero.webp"
            alt="Casal comemorando a conquista do apartamento"
            label="casal-hero.webp"
            loading="eager"
            className="pointer-events-none absolute right-[4%] bottom-0 hidden h-[54%] w-auto object-contain object-bottom lg:block xl:right-[8%] xl:h-[60%]"
          />

          <div className="relative max-w-[440px]">
            <img
              src="/images/viver-hype/logo-hype-branco.svg"
              alt="Viver Hype Condomínio Clube"
              className="mx-auto mb-7 block h-auto w-[clamp(170px,20vw,240px)]"
            />

            {/*
            Card da manchete. No design é alto, com o texto ancorado no topo e
            o resto vazio — é ali que o formulário entra. O chanfro fica só no
            canto inferior esquerdo, como na peça.
          */}
            <div
              className="chamfer-bl w-full px-7 pt-8 pb-9 text-white shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-9"
              style={{ background: "linear-gradient(168deg, #e8833f 0%, #c2431e 100%)" }}
            >
              <h1 className="text-center text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.35] font-normal">
                Entre o <strong className="font-extrabold">som do mar</strong> e o ritmo da{" "}
                <strong className="font-extrabold">sua vida</strong>
              </h1>

              <span aria-hidden="true" className="mx-auto my-4 block h-px w-16 bg-white/45" />

              <p className="text-center text-[0.8rem] leading-snug font-medium text-white/95">
                Garanta seu apê e dê adeus ao aluguel!
              </p>

              <div className="mt-7">
                <LeadForm />
              </div>
            </div>
          </div>

          {/*
            Fio da moldura. Vai como anel vazado (ver `.chamfer-outline` em
            styles.css) e não como `border`: o `clip-path` do chanfro corta a
            borda, e as duas diagonais — que são justamente o recorte da marca
            — ficariam sem traço.
          */}
          <div
            aria-hidden="true"
            className="chamfer-outline pointer-events-none absolute inset-0 [--stroke:1px] text-brand-shell/35"
          />
        </div>
      </div>
    </section>
  );
}
