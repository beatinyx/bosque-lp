import { IconArrowRight } from "./Icons";

/**
 * As três faixas do design: moldura branca de 1px com os cantos superior
 * direito e inferior esquerdo arredondados em 30px, e o destaque em negrito
 * dentro da própria frase.
 */
const HIGHLIGHTS = [
  { before: "Use o seu ", strong: "FGTS", after: " na entrada.", display: true },
  { before: "", strong: "Financiamento facilitado", after: " pela Caixa Econômica." },
  { before: "Parcelas que cabem no seu ", strong: "planejamento familiar", after: "" },
];

/** DOBRA 4 — Condições. */
export function ConditionsSection() {
  return (
    <section id="condicoes" className="relative isolate overflow-hidden py-16 text-white">
      {/*
        A foto é a mesma nas duas versões do arquivo, em recortes diferentes:
        deitado no desktop e em pé no mobile. O `picture` troca de arquivo no
        mesmo ponto em que o design troca de breakpoint.
      */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/vitoria-jasmim/casal-sala.webp" />
        <img
          src="/images/vitoria-jasmim/casal-sala-retrato.webp"
          alt="Casal na sala do apartamento"
          className="absolute inset-0 -z-10 size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/*
        Véu do design: no desktop é um degradê que escurece o lado do texto e
        solta a foto à direita; no mobile é uma lavagem uniforme, porque ali o
        texto fica centralizado sobre a imagem inteira.
      */}
      <div className="absolute inset-0 -z-10 bg-[#231f20]/80 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(35,31,32,0.94)_0%,rgba(35,31,32,0.82)_42%,rgba(35,31,32,0)_92%)]" />

      <div className="lp-container">
        <div className="max-w-[620px] max-md:mx-auto max-md:text-center">
          <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.22] font-normal">
            Seu apê com condições que cabem no{" "}
            <strong className="font-bold italic">seu momento</strong>
          </h2>

          <p className="mt-5 text-[0.95rem] leading-[1.35]">
            O Vitória Jasmim foi pensado para quem acredita que ter um lar seguro, planejado e cheio
            de vida não precisa ser um sonho distante. Você pode contar com subsídios de até R$55
            mil e parcelas que cabem no seu orçamento. Tudo isso para garantir o seu apartamento na
            Messejana em um residencial completo, onde sua família tem espaço para viver com
            qualidade e florescer todos os dias.
          </p>

          <ul className="mt-8 flex flex-col gap-4 md:flex-row md:items-stretch">
            {HIGHLIGHTS.map(({ before, strong, after, display }) => (
              <li
                key={strong}
                className="flex-1 rounded-[0_30px_0_30px] border border-white px-5 py-4 text-[0.95rem] leading-[1.55]"
              >
                {before}
                <strong
                  className={display ? "block text-[2.4rem] leading-none font-bold" : "font-bold"}
                >
                  {strong}
                </strong>
                {after}
              </li>
            ))}
          </ul>

          <div className="mt-9 max-md:text-center">
            <a
              href="#inicio"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-3.5 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.28)] transition hover:brightness-105"
            >
              Quero verificar meu perfil
              <IconArrowRight className="size-[18px] transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
