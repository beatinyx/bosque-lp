import { Img } from "./Img";
import { LeadForm } from "./LeadForm";
import { ProductLogo } from "./ProductLogo";

/** DOBRA 1 — Produto. */
export function HeroSection() {
  return (
    <header id="inicio" className="relative isolate bg-brand text-white">
      {/* Faixa de lançamento: atravessa a largura da página, acima da imagem. */}
      <div className="relative z-10 bg-brand-amber py-3 text-center">
        <span className="text-[0.72rem] font-extrabold tracking-[0.26em] text-brand uppercase sm:text-[0.8rem]">
          Lançamento na Messejana
        </span>
      </div>

      {/* A imagem cobre só o que vem abaixo da faixa, por isso o isolate aqui. */}
      <div className="relative isolate overflow-hidden">
        {/*
          Perspectiva da fachada ao pôr do sol, sangrando na dobra inteira. O
          `object-position` puxa o enquadramento para a esquerda e para cima: é
          onde está a torre, e assim o céu aberto do render fica atrás do
          formulário, à direita.
        */}
        <Img
          src="/images/fachada.webp"
          alt="Perspectiva da fachada do Victa Viver Bosque ao pôr do sol"
          label="fachada.webp"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-[42%_16%]"
          loading="eager"
          fetchPriority="high"
        />
        {/*
          Véu em duas camadas. O escurecimento é preto, não verde: uma lavagem de
          `brand` forte o bastante para o texto branco apagava o pôr do sol do
          render e deixava a dobra monocromática. O preto dá contraste preservando
          as cores da imagem, e a segunda camada devolve só um tom da marca.
          No mobile o véu é uniforme; no desktop fecha na esquerda (texto) e abre
          na direita, deixando o céu aparecer atrás do formulário.
        */}
        <div className="absolute inset-0 -z-10 bg-black/52 lg:bg-linear-to-r lg:from-black/80 lg:via-black/46 lg:via-45% lg:to-black/10" />
        <div className="absolute inset-0 -z-10 bg-brand/34" />

        <div className="lp-container flex flex-col gap-10 py-14 lg:grid lg:min-h-[84vh] lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-14 lg:py-20">
          <div className="flex flex-col items-start gap-8 max-lg:items-center max-lg:text-center">
            <ProductLogo variant="light" className="h-auto w-[clamp(215px,27vw,320px)]" />

            {/*
              A manchete é a linha descritiva (bairro + referência de endereço) e
              a tagline é a linha de campanha. A tagline vem maior de propósito:
              é ela que carrega o conceito, a manchete entra como apoio.
            */}
            <h1 className="max-w-[34ch] text-[clamp(1.15rem,2.1vw,1.6rem)] leading-[1.25] font-light text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]">
              O seu apartamento na Messejana{" "}
              <span className="emphasis font-normal">a poucos passos da Avenida Frei Cirilo</span>
            </h1>

            {/* Tagline da campanha */}
            <p className="flex items-start gap-4 text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.14] text-brand-lime [text-shadow:0_2px_18px_rgba(15,47,25,0.75)]">
              <span
                aria-hidden="true"
                className="mt-3 h-[4.5rem] w-[3px] shrink-0 rounded-full bg-brand-lime/60 max-lg:hidden"
              />
              <span>
                Entre o <span className="emphasis">verde e a cidade,</span>
                <br />
                um lugar para <span className="emphasis">você</span>
              </span>
            </p>
          </div>

          <LeadForm />
        </div>
      </div>
    </header>
  );
}
