# Imagens da landing page — Vitória Eusébio

Enquanto um arquivo não existir, o site mostra um placeholder listrado com o
caminho esperado.

> Se você adicionar uma imagem com o servidor de desenvolvimento já rodando e ela
> continuar aparecendo como placeholder, reinicie o `npm run dev` — o Vite às
> vezes mantém em cache a listagem de `public/`.

## Ainda pendente

| Arquivo | Onde aparece | O que é |
| --- | --- | --- |
| `eusebio-casal-sofa.jpg` | Dobra 4 | Humanização do casal, felizes, sentados no sofá |

## Perspectivas (webp otimizado)

Os originais em 4000px (~140 MB no total) ficam em `assets-originais/vitoria-eusebio/`, na raiz do
repositório — fora do git e fora do build. Aqui em `public/images/vitoria-eusebio` ficam só as
versões webp usadas na página: hero em 2000px, carrossel em 1200px, qualidade 78.

**No hero:** `fachada.webp`

**No carrossel da dobra 3** (a ordem segue o array `AMENITIES` em
`src/components/site/LeisureSection.tsx`):

`piscina` · `salao-de-festas` · `churrasqueira` · `quadra` · `playground` ·
`pet-place` · `espaco-fitness` · `espaco-picnic` · `redario` · `espaco-puff`

**Otimizadas mas ainda sem uso na página:** `area-de-lazer.webp`,
`espaco-jogos.webp`, `guarita.webp`, `praca.webp` — é só adicionar ao array
`AMENITIES` (ou a uma lista própria do carrossel) para entrarem.

## Marca do produto

- `logo-eusebio-branco.png` — logo negativo, usado no hero
- `logo-eusebio.png` — logo positivo (ainda sem uso na página)
- `grafismo-eusebio.png` — grafismo topográfico, marca d'água da dobra 2
- `tipologia_eusebio.png` — lockup da tipologia no hero

## Institucional Victa

- `logo-victa-verde-escuro.svg` — assinatura na dobra 5
- `logo-victa-verde-claro.png` — assinatura no rodapé
- `victa-big-numbers.png` — big numbers da dobra 5
- `humanizacao-victa.png` — humanização da dobra 5
