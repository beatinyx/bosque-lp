# Imagens da landing page — Vista Costeira

Todas vieram do Figma Sites publicado
(<https://vista-coqueiral-victa.figma.site/costeira>), em
`/_assets/v11/<hash>.<png|svg>`. Os renders foram convertidos com
`ffmpeg -c:v libwebp` (a mesma receita das outras LPs); logo, selo e SVGs
ficaram como estão. Os PNGs originais estão em `assets-originais/vista-costeira/`,
fora do git.

| Arquivo                                     | Origem (hash)            | Tratamento                                         |
| ------------------------------------------- | ------------------------ | -------------------------------------------------- |
| `fachada.webp`, `fachada-mobile.webp`       | `7fbe8b6d…`              | 2000px q80 / 1200px q76                            |
| `logo-vista-costeira.png`                   | `1eecd81f…`              | PNG com alpha, versão negativa (branca)            |
| `selo-2-quartos.png`                        | `2b5874b4…`              | PNG com alpha ("2 Quartos com suíte e varanda")    |
| `praia-cumbuco.webp`                        | `2e3aac21…`              | 1024px q80                                         |
| `piscina.webp`                              | `a6ff39b8…`              | 1600px q78                                         |
| `academia.webp`                             | `db6ba440…`              | 1600px q78                                         |
| `quadra.webp`                               | `3c9ded4e…`              | 1600px q78                                         |
| `bicicletario.webp`                         | `bff4ec12…`              | 1600px q78                                         |
| `beach-tennis.webp`                         | `bdca5182…`              | 1600px q78                                         |
| `redario.webp`                              | `c22915e3…`              | 1600px q78                                         |
| `espaco-kitesurf.webp`                      | `e2904714…`              | 1600px q78                                         |
| `churrasqueira.webp`                        | `9439a264…`              | 1600px q78                                         |
| `lista-lazer.svg`, `lista-lazer-mobile.svg` | `387bb9fb…`, `c13699ee…` | SVG do Figma, texto em curvas (desktop / mobile)   |
| `onda-azul.svg`                             | `d005f2f7…`              | onda da dobra de lazer (#086c91), usada duas vezes |
| `onda-areia.svg`                            | `97e54cf8…`              | onda branca a 10% da dobra de praia                |

Os renders do carrossel são os de 4000px que o Figma usa no carrossel mobile
(o desktop usa versões de 1600px dos mesmos renders). Dois arquivos do
carrossel desktop (`808fea4b…` e `53d19fb7…`, nomeados `SQUAD-LIV-ESTRELA
AZUL…`) são renders de outro produto que só preenchem as pontas da trilha no
Figma — ficaram de fora.

A dobra institucional usa os assets compartilhados de `/images/victa/`: a foto
do Figma (`d123b3e6…`, "humanizacao geral lps") é a mesma de
`humanizacao-victa.png`, e os números ficam no PNG oficial (+7.200 vendidas e
+3.100 em construção, contra +7.000 e +3.110 no Figma), como nas outras LPs.
