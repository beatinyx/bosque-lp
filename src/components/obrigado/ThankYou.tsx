import type { ReactNode } from "react";

import { IconArrowLeft, IconWhatsApp } from "./Icons";

/**
 * Página de obrigado — o KV do empreendimento com a confirmação do cadastro.
 *
 * É a página para onde a CloudPage do Marketing Cloud manda quem acabou de
 * enviar o formulário (o redirect está fixo no código de cada CloudPage, em
 * marketing-cloud/). Ela existe para ser o
 * gatilho de conversão do GTM: o container de cada LP também roda aqui, pela
 * regra de prefixo em `src/routes/__root.tsx`, então a conversão passa a ser um
 * pageview de `/obrigado/<produto>` em vez de um clique no botão de envio.
 *
 * A composição é a mesma das cinco: fachada sangrando na dobra inteira, véu por
 * cima para dar leitura, o lockup do produto no topo, a mensagem no centro e o
 * rodapé padrão da Victa fechando — sem o texto legal, que é da LP e não tem
 * função aqui.
 *
 * O que varia de produto para produto entra por prop, porque nenhuma dessas
 * coisas o componente tem como saber: a classe de tema, o lockup, a fachada, a
 * cor do CTA e qual das duas versões do rodapé da Victa a LP usa.
 */
type ThankYouProps = {
  /** Classe de tema do produto — ver o bloco de temas em styles.css. */
  theme: string;
  /** Lockup do produto na versão negativa: a dobra é escura. */
  logo: ReactNode;
  /** Fachada de fundo. `mobile` entra até 640px, quando o produto tem a versão. */
  fachada: {
    desktop: string;
    mobile?: string | undefined;
    alt: string;
    /** Enquadramento do recorte, ex.: `object-[62%_center]`. Padrão: centro. */
    position?: string | undefined;
  };
  /** Rota da LP, para o botão de volta. */
  back: string;
  /** Cor do CTA do produto, em utility literal (ex.: `bg-brand-clay`). */
  cta: string;
  /** Rodapé da Victa: degradê verde ou verde-escuro liso. Ver `VictaFooter`. */
  footer: "gradient" | "forest";
  /** Extra para o rodapé — só o Viver Essencial usa, para trocar a família. */
  footerClassName?: string | undefined;
};

export function ThankYou({
  theme,
  logo,
  fachada,
  back,
  cta,
  footer,
  footerClassName,
}: ThankYouProps) {
  return (
    <div className={`${theme} flex min-h-screen flex-col bg-brand text-white`}>
      <main className="relative isolate flex flex-1 flex-col items-center overflow-hidden px-6 py-14 lg:py-20">
        <picture>
          {fachada.mobile && <source media="(max-width: 640px)" srcSet={fachada.mobile} />}
          <img
            src={fachada.desktop}
            alt={fachada.alt}
            className={`absolute inset-0 -z-10 size-full object-cover ${fachada.position ?? "object-center"}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/*
          Véu em duas camadas, como no hero do Viver Bosque: o preto garante a
          leitura do texto branco sobre qualquer trecho da fachada (as cinco têm
          céu claro em boa parte do quadro) e a lavagem de marca por cima devolve
          o tom do produto, que o preto sozinho lava.

          Mais forte que o véu dos heros de propósito: lá o texto divide a dobra
          com o formulário e a foto precisa respirar; aqui a única coisa na tela é
          a mensagem, e a foto é pano de fundo.
        */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand/25" />

        {logo}

        <div className="flex flex-1 flex-col items-center justify-center gap-10 py-12 text-center">
          <h1 className="max-w-[24ch] text-[clamp(1.5rem,4.2vw,2.6rem)] leading-[1.28] font-light [text-shadow:0_2px_4px_rgba(0,0,0,0.5),0_2px_28px_rgba(0,0,0,0.45)]">
            <strong className="font-bold">Obrigado!</strong> Em breve, nosso time entrará em contato
            com você.
          </h1>

          {/*
            `<a>` e não `<Link>`: a volta para a LP tem de ser carregamento de
            documento inteiro. Em navegação client-side o embed do RD não
            remonta (a trava em LeadForm.tsx guarda o nó) e o shell não reinjeta
            o snippet do GTM — quem voltasse encontraria a dobra 1 sem
            formulário.

            Peso 700 e não 800 como nos CTAs do Bosque e do Eusébio: é o peso
            mais alto que as cinco famílias carregam (o Poppins do Essencial
            para em 700), então nenhuma das páginas cai em negrito sintético.
          */}
          <a
            href={back}
            className={`group inline-flex items-center gap-3 rounded-full ${cta} px-7 py-4 text-[0.82rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_14px_32px_rgba(0,0,0,0.3)] transition hover:brightness-105`}
          >
            <IconArrowLeft className="size-[18px] transition group-hover:-translate-x-1" />
            Voltar para a página
          </a>
        </div>
      </main>

      <VictaFooter variant={footer} className={footerClassName} />
    </div>
  );
}

/**
 * Rodapé padrão da Victa, sem o texto legal.
 *
 * São as duas versões que as LPs já usam, e a escolha acompanha o produto: o
 * degradê verde no Viver Bosque, Vitória Eusébio e Hype; o verde-escuro liso com
 * lima no Vitória Jasmim e no Viver Essencial. Fora o fundo, o bloco é o mesmo —
 * logo, endereço do site e o telefone numa pastilha.
 *
 * O parágrafo legal das LPs fica de fora: ele fala de preço, unidade de
 * referência e matrícula do memorial, que são informação de oferta. Aqui não há
 * oferta na tela, e a obrigação de exibi-lo é da peça que anuncia.
 */
function VictaFooter({
  variant,
  className,
}: {
  variant: "gradient" | "forest";
  className?: string | undefined;
}) {
  const gradient = variant === "gradient";

  return (
    <footer
      className={`pt-[30px] pb-[34px] ${gradient ? "text-[#dfe9cf]" : "bg-victa-forest text-white"} ${className ?? ""}`}
      style={
        gradient ? { background: "linear-gradient(180deg, #1f7a3a 0%, #17632f 100%)" } : undefined
      }
    >
      <div className="lp-container flex flex-wrap items-center justify-center gap-4 sm:gap-[26px]">
        <img
          src="/images/victa/logo-victa-verde-claro.png"
          alt="VICTA"
          className="h-[30px] w-auto"
        />
        <span
          className={
            gradient ? "text-[0.9rem] font-medium" : "text-[0.95rem] font-bold text-victa-lime"
          }
        >
          victa.eng.br
        </span>
        <a
          className={`inline-flex items-center gap-2 ${
            gradient
              ? "rounded-[20px] bg-white/14 px-4 py-2 text-[0.9rem] font-semibold"
              : "rounded-full bg-victa-lime px-5 py-2.5 text-[0.95rem] font-bold text-white"
          }`}
          href="https://wa.me/558535123512"
          target="_blank"
          rel="noreferrer"
        >
          <IconWhatsApp className="size-5" />
          (85) 3512-3512
        </a>
      </div>
    </footer>
  );
}
