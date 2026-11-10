# Imagens da landing page — Vibe Cumbuco

## Perspectivas oficiais

Entregues em 2026-11-09 como `SQUAD-VICTA ENGENHARIA-COSTEIRA-IMG-<AMBIENTE>-R0x.jpg`
(o "COSTEIRA" é do nome do arquivo de origem, não do produto). Os JPGs
originais ficam em `assets-originais/vibe-cumbuco/`, fora do git e do deploy;
aqui só os webp convertidos com ffmpeg.

| Arquivo                | Original                       | Tratamento                                                          |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------- |
| `fachada.webp`         | `FACHADA-R01` 2000×1333        | 2000px, q82 — hero e dobra do MCMV                                  |
| `fachada-mobile.webp`  | idem                           | recorte 1100×1333 a partir de x=860 (torre da direita), 1000px, q78 |
| `rooftop.webp`         | `LOUNGE-R01` 2000×1333         | 1600px, q80 — é o rooftop, o render oficial chama de lounge         |
| `living.webp`          | `LIVING01-R01` 2000×1176       | 1600px, q78 — área comum, não interior de apartamento               |
| `living-jogos.webp`    | `LIVING02-R01` 2000×1333       | 1600px, q78                                                         |
| `coworking.webp`       | `COWORKING-R00` 2000×1176      | 1600px, q78                                                         |
| `piscina.webp`         | `PISCINA-R01` 2000×1000        | 1600px, q78                                                         |
| `salao-de-festas.webp` | `SALÃO DE FESTAS-R01` 2000×909 | 1600px, q78                                                         |
| `academia.webp`        | `ACADEMIA-R01` 2000×667        | 1600px, q78                                                         |
| `brinquedoteca.webp`   | `BRINQUEDOTECA-R01` 2000×690   | 1600px, q78                                                         |

A fachada do KV (4096×2189) é este mesmo render expandido dos lados; a LP usa o
oficial. Piscina, salão, academia e brinquedoteca do KV eram byte a byte os
mesmos arquivos oficiais.

## Foto do kitesurf

`kitesurf.webp` (1920×1080, q82) e `kitesurf-mobile.webp` (recorte 1100×1080 a partir de x=720, 1000px, q80) vêm do PNG entregue em 2026-11-09 (o mesmo do quadro "Book Pré · 06 · Breve lançamento" do KV), guardado em `assets-originais/vibe-cumbuco/kitesurf-breve-lancamento.png`. Céu amostrado para o fundo do texto no celular: `#c4deea`.

## Casal de kitesurf

`casal-kitesurf.webp` (1600px, q80) vem do JPG entregue em 2026-11-09 (casal com roupa e pranchas de kitesurf em frente à portaria, 2752×1536), guardado em `assets-originais/vibe-cumbuco/casal-kitesurf-pranchas.jpg` — substituiu uma primeira versão (`casal-kitesurf-portaria.jpg`, também lá). Usado na dobra do investidor, em recorte 4:3 ancorado à direita (`object-[88%_center]`) para pegar o letreiro e o casal.

## Do KV no Figma

`Vibe Cumbuco · Apresentação`, página `book pré`, baixado pelo MCP do Figma em
resolução original.

| Arquivo                            | Quadro do KV                                                                                                                                                    | Tratamento                                                                                                                                                                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapa.webp`                        | 07 · Mapa ilustrado (fonte 3600×2482)                                                                                                                           | recorte 2533×1425 em (1067, 997) — exatamente a janela do quadro —, 2000px, q80                                                                                                                                                                           |
| `pin-mapa.svg`, `terreno-mapa.svg` | 07 · pin e contorno do terreno                                                                                                                                  | SVG do Figma sem os atributos de estilo                                                                                                                                                                                                                   |
| `fundo-mar-1..4.webp`              | KV v2 · 01b · Gradiente em movimento (página "Draft · Apresentação · Novo KV"): 1 petróleo, 2 ardósia com petróleo, 3 marinho com petróleo, 4 ardósia e marinho | SVGs do Figma renderizados uma vez no Chrome headless (1600×900) e salvos em webp 1280px, q82 (~5 KB cada). Os SVGs tinham nove desfoques gaussianos cada e travavam a rolagem no celular quando animados. Revezam em fade na dobra do mapa (`.vibe-sea`) |

## Logos

| Arquivo                  | Origem                                |
| ------------------------ | ------------------------------------- |
| `logo-vibe-petroleo.svg` | 02 · Logo do produto, traço `#0F4446` |
| `logo-vibe-branco.svg`   | idem, versão branca                   |
| `logo-vibe-areia.svg`    | a petróleo recolorida para `#EFE3CC`  |
