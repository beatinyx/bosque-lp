# Imagens da landing page — Victa Viver Bosque

Duas procedências convivem aqui, e a diferença importa:

1. **Renders oficiais de Messejana** (`SQUAD-VICTA ENGENHARIA-MESSEJANA-IMG-*`),
   além do logo, da fachada do hero e do grafismo da folha. São as imagens deste
   empreendimento e são as únicas que entram no carrossel de lazer.
2. **Extraídas do folder** (`FOLDER VIVER BOSQUE_3.pdf`), direto dos objetos de
   imagem do PDF. Servem para plantas, mapa e grafismos, mas **algumas
   perspectivas de lazer do folder são renders reaproveitados de outros produtos
   da Victa** — por isso ficaram fora da página quando os renders oficiais
   chegaram.

Tudo é convertido para webp aqui; os originais em resolução cheia ficam em
`assets-originais/` na raiz do repositório — fora do git e fora do build. Nada de
arquivo bruto (JPG de 3 MB, PSD, MP4 de origem) em `public/`: o que está aqui é
servido ao navegador.

Enquanto um arquivo não existir, o site mostra um placeholder listrado com o
caminho esperado (ou, no caso do logo do produto, um lockup tipográfico).

> Se você adicionar uma imagem com o servidor de desenvolvimento já rodando e ela
> continuar aparecendo como placeholder, reinicie o `npm run dev` — o Vite às
> vezes mantém em cache a listagem de `public/`.

## Ainda pendente

| Arquivo                 | Onde aparece | O que é                                 |
| ----------------------- | ------------ | --------------------------------------- |
| `logo-viver-bosque.png` | —            | Versão positiva do logo (sem uso ainda) |

Só temos a versão negativa do logo (`logo-viver-bosque-branco.png`, traço em lima
claro sobre fundo transparente), que é a usada no hero. Se algum dia a marca
precisar aparecer sobre fundo claro, é esse arquivo que falta — `ProductLogo.tsx`
com `variant="dark"` cai num lockup tipográfico de reserva até ele existir.

Nota: **"Solar dos Diogos" faz parte do lockup do logo**, abaixo de "VIVER
BOSQUE". Não é sobra de outro produto.

## Em uso na página

**Dobra 1 — hero:** `logo-viver-bosque-branco.png` e `fachada.webp` (perspectiva
da fachada ao pôr do sol, sangrando na dobra inteira)

**Dobra 2 — localização:** `grafismo-folha.webp` (folha de monstera como marca
d'água no fundo). O mapa em si é um embed do Google Maps apontando para o
endereço da obra, não uma imagem.

**Dobra 3 — carrossel de lazer**, só com renders oficiais de Messejana (a ordem
segue o array `GALLERY` em `src/components/site/LeisureSection.tsx`):

`piscina` · `churrasqueira` · `salao-de-festas` · `academia` · `quadra` ·
`playground` · `pet-place` · `redario` · `luau` · `yoga-cooper` · `espaco-jogos`

**Dobra 4 — condições:** `sala-de-estar.webp` no card, e `folhas-poster.webp`
como poster do vídeo de fundo. O vídeo em si é `/public/video/folhas.mp4`:
folhagem em 1600×900, 6 s em loop, sem áudio, recodificado de 8,4 MB para 1,3 MB
(H.264, CRF 30, `+faststart`). Quem tem "reduzir movimento" ligado no sistema vê
o poster em vez do vídeo.

## Aqui, mas ainda sem uso na página

- `mapa-ilustrado.webp` — mapa ilustrado da Messejana do folder, com o pin do
  empreendimento e a legenda dos 25 pontos do entorno. Ficou fora da dobra 2
  quando o mapa virou embed do Google, mas é a peça de marca mais bonita do
  material.
- `portaria.webp` — render oficial da portaria. **Atenção:** a parede ainda traz
  um placeholder escrito "LOGO" em vez da marca do empreendimento. Não usar antes
  de o render ser fechado.
- `jardim-privativo.webp` — jardim privativo do apartamento, vindo do folder.
  Saiu da dobra 4 quando ela passou a usar a sala de estar.
- `corte-perspectivado.webp`, `quarto-casal.webp`, `solarium.webp` — do folder.
- `planta-tipo-a.webp` (38,52 m²), `planta-tipo-b.webp` (40,90 m²) — plantas com
  fundo transparente, para uma eventual dobra de tipologia. O folder tem também
  uma PLANTA TIPO D que não foi trazida.

## Só em `assets-originais/`

Existem em resolução cheia fora do build, prontos para virar webp se algum dia
entrarem na página:

- `fachada-grafismo.png` — a composição de capa do folder (fachada ao anoitecer
  recortada sobre a mancha verde e a folha)
- `brinquedoteca.png`, `coworking.png` — aparecem na lista de itens do memorial,
  mas **não há render oficial de Messejana** para eles: essas imagens do folder
  são de outros produtos da Victa. O mesmo vale para o `solarium.webp` acima.

## Institucional Victa

- `logo-victa-verde-escuro.svg` — assinatura na dobra 5
- `logo-victa-verde-claro.png` — assinatura no rodapé
- `victa-big-numbers.png` — big numbers da dobra 5
- `humanizacao-victa.png` — humanização da dobra 5
