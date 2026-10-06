# Imagens da landing page — Vitória Íris

Todas vieram do Figma Sites publicado
(<https://vista-coqueiral-victa.figma.site/vitoria-iris>), em `/_assets/v11/<hash>.png`,
convertidas com `ffmpeg -c:v libwebp` (a mesma receita das outras LPs).

| Arquivo                   | Origem (hash) | Tratamento                           |
| ------------------------- | ------------- | ------------------------------------ |
| `fachada.webp`            | `0abf0307…`   | 2000px, q80 (hero desktop)           |
| `fachada-mobile.webp`     | `0abf0307…`   | 1200px, q76 (hero mobile)            |
| `logo-iris.png`           | `a214d345…`   | PNG com alpha, sem redimensão        |
| `casal-selo.webp`         | `92c412fb…`   | WebP com alpha, q85                  |
| `logo-parque-vitoria.png` | `57c03b05…`   | PNG com alpha, sem redimensão        |
| `praca.webp`              | `fdd6ff18…`   | 1400px, q78                          |
| `mapa-messejana.webp`     | `22087227…`   | 2000px, q80                          |
| `mapa-legenda.webp`       | `2d585673…`   | WebP sem perda, alpha (texto branco) |
| `piscina.webp`            | `a8325c17…`   | 1200px, q78                          |
| `quadra.webp`             | `0f608d9e…`   | 1200px, q78                          |
| `salao-de-festas.webp`    | `442212fc…`   | 1200px, q78                          |
| `lazer-icones.png`        | `7b41009f…`   | PNG com alpha, sem redimensão        |
| `grafismo-iris.png`       | `e97a6ac0…`   | PNG, 683×683 (estrela decorativa)    |

O arquivo do Figma nomeia os renders como "padre-climerio…"; é herança de outro
produto, e o conteúdo (piscina, quadra, salão) é o do Íris. O `mapa-legenda.webp`
é texto branco sobre transparente — só aparece sobre o fundo escuro do cartão.

## Adicionadas depois (fora do Figma)

`bicicletario`, `churrasqueiras`, `espaco-fitness`, `espaco-picnic`, `horta`,
`pet-place`, `playground`, `quadras` e `redario` entraram como JPG de 4000px,
vindas direto do material do empreendimento, e foram convertidas para WebP
(1200px, q78). Os JPGs originais estão em `assets-originais/vitoria-iris/`, fora
do git. Todas alimentam o carrossel da dobra de lazer.
