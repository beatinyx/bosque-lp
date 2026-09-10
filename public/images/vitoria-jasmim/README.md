# Imagens da landing page — Vitória Jasmim

## Procedência

Diferente das outras três LPs, aqui **nada veio de PDF nem de pasta de
backup**: o design do Vitória Jasmim mora em um arquivo do **Figma Sites**
(`figma.com/site/vHztSOgS48zViVrDP0eTZJ`, página `/vitoria-jasmin`), que o MCP
do Figma não abre — as ferramentas de leitura só trabalham com arquivo de
design, e nesse arquivo elas respondem "você não tem acesso de edição" mesmo
para o dono.

O caminho foi o site publicado: <https://vista-coqueiral-victa.figma.site/vitoria-jasmin>.
A página serve o JSON com a árvore de nós do Figma
(`/_json/<id>/vitoria-jasmin.json`) e os assets em resolução cheia em
`/_assets/v11/<hash>.<ext>` — dali saíram as medidas, as cores, os textos e
todas as imagens abaixo.

| Arquivo                   | Origem (hash do Figma Sites) | Tratamento                                    |
| ------------------------- | ---------------------------- | --------------------------------------------- |
| `fachada.webp`            | `ff6cd5f3…` (2000×1334)      | 2000px, q80 (hero)                            |
| `fachada-mobile.webp`     | `ff6cd5f3…`                  | 1200px, q76                                   |
| `logo-jasmim-branco.png`  | `0a543cae…` (633×231)        | PNG com alpha, sem redimensão                 |
| `selo-2-quartos.png`      | `e7b9665a…` (703×469)        | PNG com alpha, sem redimensão                 |
| `grafismo-jasmim.png`     | `734067ce…` (1633×1633)      | 800px, PNG com alpha                          |
| `icone-*.png`             | 144×146 cada                 | medalhões do bloco de entorno                 |
| `piscina.webp`            | `fb2749fd…`                  | 1200px, q78                                   |
| `salao-de-festas.webp`    | `8820d53f…`                  | 1200px, q78                                   |
| `churrasqueira.webp`      | `514b4701…`                  | 1200px, q78                                   |
| `playground.webp`         | `c89d3dd4…`                  | 1200px, q78                                   |
| `quadra-gramada.webp`     | `ddb74bde…`                  | 1200px, q78                                   |
| `pet-place.webp`          | `6553d16d…`                  | 1200px, q78                                   |
| `espaco-multiuso.webp`    | `269e2573…`                  | 1200px, q78                                   |
| `quadra.webp`             | `9dafcf5a…`                  | 1200px, q78                                   |
| `praca.webp`              | `9026214d…`                  | 1200px, q78                                   |
| `bicicletario.webp`       | `fc88cc1c…`                  | 1200px, q78                                   |
| `casal-sala.webp`         | `1c18e855…` (4096×2286)      | 2000px, q78 (dobra de condições, desktop)     |
| `casal-sala-retrato.webp` | `64914ec5…` (3300×4096)      | 1000px, q76 (mesma foto, corte em pé, mobile) |

Conversão com `ffmpeg -c:v libwebp`, a mesma receita das outras LPs. Os
originais em resolução cheia estão em `assets-originais/vitoria-jasmim/`, fora
do git e fora do build.

## O que não veio de imagem

- **A faixa de itens de lazer** é uma imagem achatada no Figma (os onze itens
  com medalhões roxos sobre a barra verde-oliva). Aqui virou markup, com os
  ícones em traço de `Icons.tsx` — escala no mobile e é lida por leitor de
  tela.
- **A dobra institucional e o rodapé** usam os assets compartilhados em
  `/images/victa/`, iguais aos das outras três LPs. O bloco de números do
  Figma marca `+4.900` unidades entregues; o PNG oficial do repositório já
  está em `+4.970`, e foi ele que ficou.
- **Redário** e **espaço fitness** aparecem só na faixa de ícones: não existe
  render dos dois no arquivo.
