import { Img } from "./Img";
import { IconWhatsApp } from "./ui";

/**
 * Rodapé da Victa, igual ao das outras LPs (Vista Costeira, Atlântico, Viver
 * Essencial): verde-escuro liso, endereço do site em lima e o telefone dentro
 * de uma pastilha lima, em Montserrat.
 *
 * A nota legal é a do Vibe Cumbuco e veio do briefing com os campos ainda em
 * aberto (`xxxx`) — valor, unidade, torre, área, mês da tabela e ofício.
 * Trocar pelos dados da tabela vigente antes de publicar.
 */
export function Footer() {
  return (
    <footer className="font-montserrat bg-victa-forest pt-[30px] pb-[34px] text-white">
      <div className="lp-container mb-[22px] flex flex-wrap items-center justify-center gap-4 sm:gap-[26px]">
        <Img
          src="/images/victa/logo-victa-verde-claro.png"
          alt="VICTA"
          label="VICTA"
          className="h-[30px] w-auto"
        />
        <span className="text-[0.95rem] font-bold text-victa-lime">victa.eng.br</span>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-victa-lime px-5 py-2.5 text-[0.95rem] font-bold text-white"
          href="https://wa.me/558535123512"
          target="_blank"
          rel="noreferrer"
        >
          <IconWhatsApp className="size-5" />
          (85) 3512-3512
        </a>
      </div>

      <div className="lp-container">
        <p className="mx-auto max-w-[780px] text-center text-[0.62rem] leading-[1.6] text-white/85 md:text-left">
          Unidades a partir de R$ xxxx,xx, valor referente à Unidade xxx, Torre xxx, com área
          privativa de xxxx m², conforme tabela de preços vigente no mês de XXX de 20XX. Os preços,
          condições comerciais, disponibilidade das unidades e formas de pagamento poderão ser
          alterados, suspensos ou atualizados sem aviso prévio, de acordo com a política comercial
          da incorporadora. O Memorial de Incorporação encontra-se registrado sob o R.3 da Matrícula
          nº 067.153, do xxxxº Ofício de Registro de Imóveis de Caucaia/CE. As imagens,
          perspectivas, mobiliários, objetos decorativos, vegetação e demais elementos apresentados
          neste material possuem caráter meramente ilustrativo e poderão sofrer alterações. Para
          informações detalhadas acerca das especificações técnicas, acabamentos, dimensões, áreas e
          demais características do empreendimento e de suas unidades, prevalecerão as disposições
          constantes do Memorial Descritivo, plantas e demais documentos integrantes do Memorial de
          Incorporação.
        </p>
      </div>
    </footer>
  );
}
