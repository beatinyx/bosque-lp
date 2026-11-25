/*
 * Régua de e-mail do Vibe Cumbuco (VBC-0020-26) — gera os HTMLs que vão colados
 * no Marketing Cloud (Content Builder > E-mail > "Colar HTML").
 *
 *   node marketing-cloud/emails/vibe-cumbuco/build.mjs
 *
 * Os .html desta pasta são saída deste script: mexer aqui e gerar de novo, não
 * editar o HTML na mão. Texto: briefing de redação (PDF do job). Visual: KV
 * "Vibe Cumbuco · Apresentação" (Book V2).
 *
 * Por que o HTML é "feio" (tabelas, estilo inline, largura fixa de 600):
 * cliente de e-mail não é navegador. Outlook desktop renderiza com o motor do
 * Word (sem flex, sem grid, sem border-radius, sem imagem de fundo confiável)
 * e o Gmail descarta boa parte do <style>. O que está em <style> aqui é só
 * reforço para o celular.
 *
 * Variáveis de ambiente (só para pré-visualizar localmente):
 *   IMG_BASE  troca a base das imagens (padrão: domínio publicado das LPs)
 *   OUT_DIR   grava em outra pasta
 */
import fs from "node:fs";
import path from "node:path";

const HERE = import.meta.dirname;
const OUT_DIR = process.env.OUT_DIR || HERE;
/*
 * As imagens moram em public/images/emails/vibe-cumbuco e são servidas direto
 * do GitHub (repo público), pela `main`: só abrem depois do merge do PR.
 */
const IMG =
  process.env.IMG_BASE ||
  "https://raw.githubusercontent.com/beatinyx/bosque-lp/main/public/images/emails/vibe-cumbuco";

const LP = "https://more.victa.eng.br/vibe-cumbuco";
const WHATSAPP = "https://wa.me/558535123512";
const UTM = "utm_source=marketing-cloud&utm_medium=email&utm_campaign=vbc-regua-investidores";

/* Cartela do KV */
const C = {
  petroleo: "#0f4446",
  petroleo2: "#105a5e",
  mar: "#2b8c88",
  areia: "#efe3cc",
  linho: "#f7f2e8",
  citrino: "#d8d93f",
  texto: "#35504f",
  branco: "#ffffff",
};

/* Figtree é a substituta da Articulat CF na LP; onde a webfont não carrega
   (Gmail, Outlook) cai em Arial/Helvetica. */
const FONT = "'Figtree','Segoe UI',Helvetica,Arial,sans-serif";

/*
 * Nota legal. A do produto é a mesma da LP (Footer.tsx), sem a frase do preço
 * "a partir de", que ainda está sem valor. PENDENTE: o número do ofício
 * ("xxxxº") veio em aberto no briefing da LP — preencher antes do envio do
 * e-mail 2.
 */
const LEGAL_DESTINO = "Imagem meramente ilustrativa.";
const LEGAL_PRODUTO =
  "Os preços, condições comerciais, disponibilidade das unidades e formas de pagamento poderão ser alterados, suspensos ou atualizados sem aviso prévio, de acordo com a política comercial da incorporadora. O Memorial de Incorporação encontra-se registrado sob o R.3 da Matrícula nº 067.153, do xxxxº Ofício de Registro de Imóveis de Caucaia/CE. As imagens, perspectivas, mobiliários, objetos decorativos, vegetação e demais elementos apresentados neste material possuem caráter meramente ilustrativo e poderão sofrer alterações. Para informações detalhadas acerca das especificações técnicas, acabamentos, dimensões, áreas e demais características do empreendimento e de suas unidades, prevalecerão as disposições constantes do Memorial Descritivo, plantas e demais documentos integrantes do Memorial de Incorporação.";

/* ------------------------------------------------------------------ peças */

const img = (file, alt, w, h, style = "") =>
  `<img src="${IMG}/${file}" alt="${alt}" width="${w}" height="${h}" style="display:block;width:100%;max-width:${w}px;height:auto;border:0;outline:none;text-decoration:none;${style}">`;

const spacer = (h) =>
  `<tr><td height="${h}" style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</td></tr>`;

/** Uma faixa de 600 com cor de fundo e respiro lateral. */
const band = (bg, inner, pad = "0 40px") =>
  `<tr><td class="px" bgcolor="${bg}" style="background-color:${bg};padding:${pad};">${inner}</td></tr>`;

const p = (html, color = C.texto, extra = "") =>
  `<p style="margin:0 0 18px;font-family:${FONT};font-size:16px;line-height:26px;color:${color};${extra}">${html}</p>`;

const h1 = (html, color = C.petroleo) =>
  `<h1 class="h1" style="margin:0 0 22px;font-family:${FONT};font-size:34px;line-height:40px;font-weight:300;letter-spacing:-0.4px;color:${color};">${html}</h1>`;

const h2 = (html, color = C.petroleo) =>
  `<h2 class="h2" style="margin:0 0 18px;font-family:${FONT};font-size:26px;line-height:32px;font-weight:300;letter-spacing:-0.3px;color:${color};">${html}</h2>`;

/**
 * Botão "à prova de Outlook": a cor fica na célula (bgcolor), então aparece
 * mesmo onde o CSS do link é ignorado. No Outlook sai de cantos retos.
 */
const button = (label, href, alias, { bg, color }) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
  <tr>
    <td align="center" bgcolor="${bg}" style="background-color:${bg};border-radius:999px;mso-padding-alt:16px 34px;">
      <a href="${href}" alias="${alias}" target="_blank" style="display:inline-block;padding:16px 34px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:600;color:${color};text-decoration:none;border-radius:999px;">${label}&nbsp;&nbsp;&rarr;</a>
    </td>
  </tr>
</table>`;

/** Logo do Vibe centralizado; `linha` é a assinatura opcional embaixo dele. */
const header = ({ linha } = {}) =>
  band(
    C.petroleo,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td align="center" style="padding:34px 0 30px;">
        <a href="${LP}?${UTM}&utm_content=logo" alias="logo-vibe-cumbuco" target="_blank" style="text-decoration:none;">
          <img src="${IMG}/logo-vibe-areia.png" alt="Vibe Cumbuco" width="150" height="66" style="display:block;border:0;width:150px;height:auto;margin:0 auto;">
        </a>
        ${linha ? `<p style="margin:16px 0 0;font-family:${FONT};font-size:11px;line-height:16px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:${C.areia};">${linha}</p>` : ""}
      </td></tr></table>`,
  );

/**
 * Box do KV: petróleo sobre o linho, cantos 0-50-0-50 (reto em cima à esquerda
 * e embaixo à direita), 40px de margem de cada lado. No Outlook desktop sai de
 * cantos retos.
 */
const box = (inner, pad = "0 40px 0") =>
  band(
    C.linho,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.petroleo}" style="background-color:${C.petroleo};border-radius:0 50px 0 50px;border-collapse:separate;">
      <tr><td class="box" style="padding:42px 40px 40px;border-radius:0 50px 0 50px;">
        ${inner}
      </td></tr>
    </table>`,
    pad,
  );

const signature = () =>
  band(
    C.linho,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="border-top:1px solid #dcd3bf;padding:26px 0 40px;font-family:${FONT};font-size:16px;line-height:26px;color:${C.texto};">
        Um abraço,<br><strong style="color:${C.petroleo};font-weight:600;">Seu time Victa</strong>
      </td></tr></table>`,
  );

/**
 * Rodapé. O bloco final (%%Member_*%% e os dois links) é exigência do
 * Marketing Cloud para envio comercial: sem endereço físico e link de
 * descadastro a validação do e-mail reprova.
 */
const VICTA_VERDE = "#6ecc01";
const REDES = [
  ["facebook", "Facebook", "https://www.facebook.com/victaengenharia"],
  ["instagram", "Instagram", "https://www.instagram.com/victaengenharia/"],
  ["youtube", "YouTube", "https://www.youtube.com/@victaengenharia"],
];

/* Rodapé padrão Victa: fundo branco, logo de 10 anos, site e WhatsApp numa
   linha (empilham no celular), redes sociais em círculos verdes embaixo. */
const footer = (legal) =>
  band(
    C.branco,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:36px 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
          <td class="col col-gap" align="center" valign="middle" style="padding:0 18px 0 0;">
            <a href="https://victa.eng.br/?${UTM}&utm_content=rodape-logo" alias="rodape-logo-victa" target="_blank" style="text-decoration:none;">
              <img src="${IMG}/logo-victa-10-anos.png" alt="Victa 10 anos" width="180" height="40" style="display:block;border:0;width:180px;height:auto;margin:0 auto;">
            </a>
          </td>
          <td class="col col-gap" align="center" valign="middle" style="padding:0 18px 0 0;font-family:${FONT};font-size:17px;line-height:22px;font-weight:700;">
            <a href="https://victa.eng.br/?${UTM}&utm_content=rodape-site" alias="rodape-site" target="_blank" style="color:${VICTA_VERDE};text-decoration:none;">victa.eng.br</a>
          </td>
          <td class="col" align="center" valign="middle">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
              <td bgcolor="${VICTA_VERDE}" style="background-color:${VICTA_VERDE};border-radius:999px;padding:8px 16px 8px 12px;">
                <a href="${WHATSAPP}" alias="rodape-whatsapp" target="_blank" style="text-decoration:none;font-family:${FONT};font-size:16px;line-height:24px;color:${C.branco};white-space:nowrap;">
                  <img src="${IMG}/icone-whatsapp-branco.png" alt="WhatsApp" width="24" height="24" style="display:inline-block;border:0;width:24px;height:24px;vertical-align:middle;">&nbsp;(85) <strong style="font-weight:700;">3512-3512</strong>
                </a>
              </td>
            </tr></table>
          </td>
        </tr></table>
      </td></tr>
      <tr><td align="center" style="padding:26px 0 30px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
          ${REDES.map(
            ([id, nome, url]) =>
              `<td style="padding:0 8px;"><a href="${url}" alias="rodape-${id}" target="_blank" style="text-decoration:none;"><img src="${IMG}/icone-${id}.png" alt="${nome}" width="36" height="36" style="display:block;border:0;width:36px;height:36px;"></a></td>`,
          ).join("")}
        </tr></table>
      </td></tr>
      <tr><td style="border-top:1px solid #e6e6e6;padding:22px 0 0;font-family:${FONT};font-size:10px;line-height:16px;color:#7a7a7a;text-align:left;">
        ${legal}
      </td></tr>
      <tr><td align="center" style="padding:22px 0 34px;font-family:${FONT};font-size:11px;line-height:18px;color:#7a7a7a;">
        Este e-mail foi enviado por %%Member_Busname%%<br>
        %%Member_Addr%% &middot; %%Member_City%%, %%Member_State%% &middot; %%Member_PostalCode%% &middot; %%Member_Country%%<br>
        <a href="%%profile_center_url%%" alias="central-de-preferencias" style="color:#4a4a4a;text-decoration:underline;">Preferências</a>
        &nbsp;&middot;&nbsp;
        <a href="%%unsub_center_url%%" alias="descadastrar" style="color:#4a4a4a;text-decoration:underline;">Descadastrar</a>
      </td></tr>
    </table>`,
  );

/** Moldura do documento. `subject` e `preheader` vão também no comentário do topo. */
function layout({ n, date, subject, preheader, rows }) {
  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--
  Vibe Cumbuco · Régua de e-mail (VBC-0020-26) · E-mail ${n} · envio ${date}
  Assunto:    ${subject}
  Pré-header: ${preheader}
  Gerado por marketing-cloud/emails/vibe-cumbuco/build.mjs — não editar à mão.
-->
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${subject}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>table,td,h1,h2,p,a{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;600;700&display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  body{margin:0;padding:0;width:100% !important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;}
  img{-ms-interpolation-mode:bicubic;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;}
  @media only screen and (max-width:620px){
    .wrap{width:100% !important;}
    .px{padding-left:24px !important;padding-right:24px !important;}
    .box{padding:34px 26px 32px !important;}
    .grade{padding:16px 16px 8px !important;}
    .px0{padding-left:0 !important;padding-right:0 !important;}
    .col{display:block !important;width:100% !important;max-width:100% !important;padding-left:0 !important;padding-right:0 !important;}
    .col-gap{padding-bottom:22px !important;}
    .col-gap8{padding-bottom:8px !important;}
    .card{padding:24px 18px 18px !important;}
    .h1{font-size:28px !important;line-height:34px !important;}
    .h2{font-size:23px !important;line-height:29px !important;}
    .big{font-size:44px !important;line-height:48px !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.areia};">
<!-- Pré-header: aparece ao lado do assunto na caixa de entrada, some no corpo. -->
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${C.areia};">${preheader}${"&nbsp;&zwnj;".repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.areia}" style="background-color:${C.areia};">
<tr><td align="center" style="padding:0;">
  <!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
  <table role="presentation" class="wrap" width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;">
    <tr><td align="center" style="padding:14px 16px;font-family:${FONT};font-size:11px;line-height:16px;color:#7b7461;">
      Não está vendo as imagens? <a href="%%view_email_url%%" alias="ver-no-navegador" style="color:${C.petroleo};text-decoration:underline;">Abra no navegador</a>
    </td></tr>
${rows.join("\n")}
    ${spacer(28)}
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
<custom name="opencounter" type="tracking" />
</body>
</html>
`;
}

/* --------------------------------------------------------------- e-mail 1 */

function email1() {
  const cta = `${LP}?${UTM}&utm_content=email-1-cta`;
  const stat = (big, label) =>
    `<p style="margin:0 0 8px;font-family:${FONT};font-size:34px;line-height:42px;font-weight:700;letter-spacing:-0.8px;white-space:nowrap;color:${C.citrino};">${big}</p>
     <p style="margin:0;font-family:${FONT};font-size:15px;line-height:23px;color:${C.areia};">${label}</p>`;

  return layout({
    n: 1,
    date: "24/11",
    subject: "Cumbuco: um novo horizonte para quem investe! 🚀",
    preheader: "O movimento do turismo cearense convida a olhar para novas oportunidades.",
    rows: [
      header(),
      `<tr><td bgcolor="${C.petroleo}" style="background-color:${C.petroleo};padding:0;">
        <a href="${cta}" alias="email-1-imagem" target="_blank" style="text-decoration:none;">${img("e1-praia-kitesurf.jpg", "Praia do Cumbuco ao entardecer, com pipas de kitesurf no céu e velejadores no mar", 600, 338)}</a>
      </td></tr>`,
      band(
        C.linho,
        `
         ${h1(`O que faz um destino atrair<br><strong style="font-weight:600;">os olhares do mundo?</strong>`)}
         ${p(`No Cumbuco, a resposta está na combinação entre paisagens naturais e condições privilegiadas de vento, que fazem da região um dos <strong style="color:${C.petroleo};font-weight:600;">principais destinos brasileiros</strong> para a prática de kitesurf e windsurf.`)}
         ${p("Conhecido como a meca internacional do kitesurf, o Cumbuco faz parte de um cenário para o turismo cearense. Os números traduzem esse movimento:", C.texto, "margin-bottom:0;")}`,
        "44px 40px 36px",
      ),
      box(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="col col-gap" width="50%" valign="top" style="padding:0 16px 0 0;">
              ${stat("+17,6%", `<strong style="font-weight:600;color:${C.branco};">de crescimento</strong> no fluxo de turistas do segmento esportivo e de aventura entre 2024 e 2025.`)}
            </td>
            <td class="col" width="50%" valign="top" style="padding:0 0 0 16px;">
              ${stat("R$ 1,387 bi", `<strong style="font-weight:600;color:${C.branco};">R$ 1,387 bilhão</strong> em receita turística direta do segmento em 2025.`)}
            </td>
          </tr>
          <tr><td colspan="2" class="col" style="padding:26px 0 0;font-family:${FONT};font-size:11px;line-height:16px;letter-spacing:0.4px;color:#9fbdbb;">Fonte: Secretaria do Turismo do Ceará (Setur-CE).</td></tr>
        </table>`,
      ),
      band(
        C.linho,
        `${p("Para quem investe, acompanhar o movimento dos destinos turísticos é também uma forma de identificar novas possibilidades no mercado imobiliário.")}
         ${h2(`E os ventos do Cumbuco estão trazendo <strong style="font-weight:600;">uma novidade.</strong>`)}
         <div style="padding:10px 0 0;">${button("Quero conhecer a novidade", cta, "email-1-cta", { bg: C.petroleo, color: C.linho })}</div>`,
        "40px 40px 44px",
      ),
      signature(),
      footer(LEGAL_DESTINO),
    ],
  });
}

/* --------------------------------------------------------------- e-mail 2 */

function email2() {
  const cta = `${LP}?${UTM}&utm_content=email-2-cta`;
  const G = 12; // respiro entre as fotos da montagem
  /* Cantos das fotos como os boxes do KV, alternando os dois sentidos. */
  const R_A = "border-radius:0 30px 0 30px;";
  const R_B = "border-radius:30px 0 30px 0;";
  const half = (file, alt, left, radius) =>
    `<td width="50%" valign="top" style="padding:${G}px ${left ? G / 2 : 0}px 0 ${left ? 0 : G / 2}px;">${img(file, alt, 268, 199, radius)}</td>`;
  const PILL = `background-color:#e3f0ee;color:${C.petroleo};font-family:${FONT};font-weight:600;`;
  /* Pill curta, de uma linha: as três dividem a largura total (as larguras
     somam 100% e acompanham o tamanho de cada texto) e empilham no celular. */
  const pill = (text, width, padL, padR) =>
    `<td class="col col-gap8" width="${width}" valign="top" style="padding:0 ${padR}px 8px ${padL}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" bgcolor="#e3f0ee" style="${PILL}font-size:12px;line-height:16px;white-space:nowrap;padding:8px 6px;border-radius:999px;">${text}</td>
      </tr></table>
    </td>`;
  /* Pill longa, de duas linhas: meia largura cada, empilham no celular. */
  const pillLonga = (text, left) =>
    `<td class="col col-gap8" width="50%" valign="top" style="padding:0 ${left ? 4 : 0}px 0 ${left ? 0 : 4}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="#e3f0ee" style="${PILL}font-size:12px;line-height:17px;padding:10px 16px;border-radius:22px;">${text}</td>
      </tr></table>
    </td>`;

  return layout({
    n: 2,
    date: "30/11",
    subject: "Conheça o novo lançamento da Victa a poucos metros do mar. 👀",
    preheader: "Localização a poucos metros do mar, lazer completo e opções de plantas no Cumbuco",
    rows: [
      header(),
      /* Montagem: fachada em cima, quatro ambientes embaixo, todos do mesmo
         tamanho para nenhum pesar mais que o outro. São imagens separadas
         (e não uma colagem só) para o e-mail não virar "uma imagem gigante",
         que cai em spam e some com imagens bloqueadas.
         O fundo (areia do KV com a forma inclinada por cima) é imagem de
         fundo da célula: o Outlook desktop não mostra e fica só a cor de areia. */
      `<tr><td background="${IMG}/e2-fundo-areia.jpg" bgcolor="#e3cfa6" style="background-color:#e3cfa6;background-image:url('${IMG}/e2-fundo-areia.jpg');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="grade" style="padding:26px 26px 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td colspan="2" style="padding:0;"><a href="${cta}" alias="email-2-fachada" target="_blank" style="text-decoration:none;">${img("e2-fachada.jpg", "Fachada do Vibe Cumbuco", 548, 347, R_A)}</a></td></tr>
          <tr>${half("e2-rooftop.jpg", "Rooftop com lounge aberto e vista para o mar", true, R_B)}${half("e2-academia.jpg", "Academia", false, R_A)}</tr>
          <tr><td colspan="2" style="padding:${G}px 0 0;">${img("e2-coworking-largo.jpg", "Coworking", 548, 210, R_A)}</td></tr>
        </table>
        </td></tr>
        <!-- Divisão em ondas: PNG com o linho embaixo e transparente em cima. -->
        <tr><td style="padding:0;font-size:0;line-height:0;">${img("onda-linho.png", "", 600, 44)}</td></tr>
        </table>
      </td></tr>`,
      band(
        C.linho,
        `
         ${h2(`No destino onde os ventos atraem o mundo, <strong style="font-weight:600;">chega uma nova possibilidade</strong> para quem deseja investir no litoral cearense.`)}
         ${p(`Conheça o <strong style="color:${C.petroleo};font-weight:600;">Vibe Cumbuco</strong>, lançamento da Victa que reúne localização, lazer e experiências em sintonia com o estilo de vida de um destino internacionalmente reconhecido.`, C.texto, "margin-bottom:0;")}`,
        "44px 40px 34px",
      ),
      band(
        C.linho,
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.branco}" style="background-color:${C.branco};border-radius:16px;">
          <tr><td style="padding:0;">${img("e2-piscina-box.jpg", "Piscina do condomínio", 520, 230, "border-radius:16px 16px 0 0;")}</td></tr>
          <tr><td class="card" style="padding:28px 24px 24px;">
            ${h2(`<strong style="font-weight:600;">A poucos metros do mar.</strong><br>A muitas possibilidades de viver.`)}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              ${pill("Apês de 2 quartos com varanda", "43%", 0, 4)}
              ${pill("Condomínio fechado", "31%", 4, 4)}
              ${pill("Lazer completo", "26%", 4, 0)}
            </tr></table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              ${pillLonga("Plantas de 37,63 m² a 65,92 m² de área total, conforme a tipologia", true)}
              ${pillLonga("204 unidades, todas com uma vaga de garagem", false)}
            </tr></table>
          </td></tr>
        </table>`,
        "0 40px 28px",
      ),
      box(
        `
         ${h2("Um rooftop à altura da paisagem.", C.linho)}
         ${p("Com vista panorâmica para o mar, o rooftop reúne lounge aberto, espaço de coworking e brinquedoteca, proporcionando diferentes experiências em um mesmo endereço.", C.areia, "margin-bottom:0;")}`,
      ),
      band(
        C.linho,
        `${p("Para aproveitar o litoral ou diversificar seu patrimônio, descubra as possibilidades que o Vibe Cumbuco tem para oferecer.", C.texto, "text-align:center;")}
         <div style="padding:8px 0 0;">${button("Conheça o Vibe Cumbuco", cta, "email-2-cta", { bg: C.petroleo, color: C.linho })}</div>`,
        "40px 40px 44px",
      ),
      signature(),
      footer(LEGAL_PRODUTO),
    ],
  });
}

/* --------------------------------------------------------------- e-mail 3 */

function email3() {
  const lp = `${LP}?${UTM}&utm_content=email-3-plantas`;
  const cta = `${WHATSAPP}?text=${encodeURIComponent("Olá! Recebi o e-mail do Vibe Cumbuco e quero falar com um especialista.")}`;
  /* Metragens por tipo: quadros 18 a 21 do Book V2 (C e D incluem jardim privativo). */
  const plant = (key, tipo, area, left) =>
    `<td class="col col-gap" width="50%" valign="top" style="padding:0 ${left ? 8 : 0}px 16px ${left ? 0 : 8}px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.branco}" style="background-color:${C.branco};border-radius:14px;">
        <tr><td style="padding:6px 6px 0;"><a href="${lp}" alias="email-3-planta-${key}" target="_blank" style="text-decoration:none;">${img(`planta-${key}.jpg`, `Planta humanizada do apartamento ${tipo}, ${area} m²`, 520, 430, "border-radius:10px;")}</a></td></tr>
        <tr><td style="padding:10px 18px 18px;font-family:${FONT};">
          <span style="font-size:17px;line-height:22px;font-weight:600;color:${C.petroleo};">${tipo}</span><br>
          <span style="font-size:15px;line-height:22px;color:${C.mar};">${area} m²</span>
        </td></tr>
      </table>
    </td>`;
  const cond = (label, big) =>
    `<td class="col col-gap" width="50%" valign="top" style="padding:0 12px 0 0;">
      <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;line-height:18px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.areia};">${label}</p>
      <p class="big" style="margin:0;font-family:${FONT};font-size:46px;line-height:50px;font-weight:700;letter-spacing:-1px;color:${C.citrino};">${big}</p>
    </td>`;

  return layout({
    n: 3,
    date: "07/12",
    subject: "Seu próximo investimento pode começar com R$ 999*",
    preheader: "Conheça as condições especiais para investir no Vibe Cumbuco.",
    rows: [
      header(),
      `<tr><td bgcolor="${C.petroleo}" style="background-color:${C.petroleo};padding:0;">
        ${img("e3-rooftop.jpg", "Rooftop do Vibe Cumbuco, com lounge aberto e vista para o mar", 600, 380)}
      </td></tr>`,
      band(
        C.linho,
        `
         ${p("Você já descobriu o potencial turístico do Cumbuco e conheceu os diferenciais do novo lançamento da Victa.")}
         ${h2(`Agora, é hora de conhecer as possibilidades para transformar esse endereço em <strong style="font-weight:600;">parte do seu patrimônio.</strong>`)}
         <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
         ${p(`<strong style="color:${C.petroleo};font-weight:600;">Escolha a planta que combina com seus planos.</strong> Apartamentos de 2 quartos, com uma vaga de garagem e diferentes configurações, a poucos metros do mar.`, C.texto, "margin-bottom:0;")}`,
        "44px 40px 26px",
      ),
      band(
        C.linho,
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
           <tr>${plant("a", "Tipo A", "37,63", true)}${plant("b", "Tipo B", "39,97", false)}</tr>
           <tr>${plant("c", "Tipo C", "65,92", true)}${plant("d", "Tipo D", "65,92", false)}</tr>
         </table>`,
        "0 40px 22px",
      ),
      box(
        `
            ${h2(`Novos horizontes para investir.<br><strong style="font-weight:600;">Condições para começar.</strong>`, C.linho)}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
              <tr>${cond("Sinal a partir de", "R$ 999*")}${cond("Mensais em até", "72x*")}</tr>
              <tr><td colspan="2" class="col" style="padding:26px 0 0;border-top:0;font-family:${FONT};font-size:16px;line-height:24px;color:${C.linho};">Financiamento facilitado pela <strong style="font-weight:600;">Caixa Econômica Federal</strong>.</td></tr>
              <tr><td colspan="2" class="col" style="padding:18px 0 0;font-family:${FONT};font-size:11px;line-height:17px;color:#9fbdbb;">*Condições sujeitas à tabela vigente e à disponibilidade de unidades.</td></tr>
            </table>`,
        "18px 40px 0",
      ),
      band(
        C.linho,
        `${p("Conte com um atendimento especializado para conhecer as unidades disponíveis, esclarecer suas dúvidas e avaliar as condições de aquisição.", C.texto, "text-align:center;")}
         ${p(`<strong style="color:${C.petroleo};font-weight:600;">Dê o próximo passo em direção ao Cumbuco.</strong>`, C.texto, "text-align:center;")}
         <div style="padding:8px 0 0;">${button("Fale com um especialista", cta, "email-3-cta-whatsapp", { bg: C.petroleo, color: C.linho })}</div>`,
        "40px 40px 44px",
      ),
      signature(),
      footer(LEGAL_PRODUTO),
    ],
  });
}

/* ------------------------------------------------------------------ saída */

const files = {
  "email-1-destino-cumbuco.html": email1(),
  "email-2-lancamento.html": email2(),
  "email-3-plantas-e-condicoes.html": email3(),
};
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const [name, html] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT_DIR, name), html);
  // O Gmail corta o e-mail ("Ver mensagem inteira") acima de ~102 KB de HTML.
  console.log(`${name}  ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
}
