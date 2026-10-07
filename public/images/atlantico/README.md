# Imagens da landing page — Atlântico

Todas vieram do Figma Sites publicado
(<https://vista-coqueiral-victa.figma.site/atlantico>), em
`/_assets/v11/<hash>.<png|svg>`. Os renders foram convertidos com
`ffmpeg -c:v libwebp` (a mesma receita das outras LPs); logos, selo, títulos em
lettering e ícones ficaram como estão.

| Arquivo                                                                   | Origem (hash)                                                   | Tratamento                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------- |
| `fachada.webp`, `fachada-mobile.webp`                                     | `99aa8642…`                                                     | 2000px q80 / 1200px q76 (a 50% sobre o azul)       |
| `logo-atlantico.png`                                                      | `f092f6f7…`                                                     | PNG com alpha, sem redimensão                      |
| `selo-2-quartos.png`                                                      | `2b2838d4…`                                                     | PNG com alpha                                      |
| `casal-plantas.webp`                                                      | `7edf0327…`                                                     | alpha, 1080px q85 (a faixa de plantas é da imagem) |
| `textura-agua.webp`                                                       | `a9a5e00b…`                                                     | faixa "Apartamentos na Praia do Futuro"            |
| `textura-azul.webp`                                                       | `65b31d97…`                                                     | fundo da dobra de localização                      |
| `textura-creme.webp`                                                      | `217501e1…`                                                     | fundo da dobra de lazer                            |
| `titulo-localizacao.png`                                                  | `4b8cf41e…`                                                     | lettering branco com alpha                         |
| `mapa.webp`                                                               | `610b26de…`                                                     | 1800px q80                                         |
| `lounge.webp`                                                             | `e0f45b88…`                                                     | 1400px q78                                         |
| `titulo-querer-ficar.png`                                                 | `357be1ac…`                                                     | lettering marrom com alpha                         |
| `piscina`, `churrasqueiras`, `coworking`, `academia`, `pet-place` `.webp` | `5c2805b5…`, `ecc18572…`, `2f2705fd…`, `62eff31b…`, `1a0187d9…` | 1200–1600px q78                                    |
| `viva-melhor.webp`                                                        | `38fccff9…`                                                     | recorte com alpha, 1400px q85                      |
| `lista-lazer.svg`, `lista-lazer-mobile.svg`                               | `348d279e…`, `1c3bf217…`                                        | SVG do Figma, texto em curvas (desktop / mobile)   |
| `icone-mar.svg`, `icone-pin.svg`, `icone-comercio.svg`                    | `fbaac00d…`, `c0c26f9b…`, `76d2cdf2…`                           | SVGs brancos dos três itens de localização         |

Os SVGs trazem `var(--fill-0, #52413A)`: fora do Figma vale a cor de reserva.
Dois assets grandes (`38fccff9…` e `5c2805b5…`) deram erro 500 na primeira
tentativa de download e vieram na segunda.

## Perspectivas do carrossel

Além dos cinco renders do Figma (piscina, churrasqueiras, coworking, academia e
pet place), entraram `salao-de-festas`, `playground`, `living` (código `LD`, rótulo "Estar externo"),
e `redario` (`RD`), convertidos de JPG de
4000px para WebP de 1200px, q78. O lounge externo (`LG`) já é a imagem da dobra
própria. Os JPGs originais estão em `assets-originais/atlantico/`, fora do git.
