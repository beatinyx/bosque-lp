# Imagens da landing page — Hype Condomínio Clube

## Procedência

As perspectivas e a fachada **não saíram do Figma** — o arquivo de design está
público apenas em modo leitura e não permite exportar asset. Elas vieram dos
renders oficiais do Hype já usados em outro projeto da Victa
(`praia-do-futuro/public/images/hype-*.png`, 1431×954), convertidos aqui com a
mesma receita das outras duas LPs do repositório. A fachada do hero e o
recorte do casal foram entregues à parte (`pf4-expandida.png` e o PNG do
Magnific), e os arquivos de origem foram removidos da pasta depois da
conversão:

| Arquivo                | Origem                   | Tratamento             |
| ---------------------- | ------------------------ | ---------------------- |
| `piscina.webp`         | `hype-piscina.png`       | 1200px de largura, q78 |
| `academia.webp`        | `hype-academia.png`      | 1200px, q78            |
| `rooftop.webp`         | `hype-rooftop.png`       | 1200px, q78            |
| `salao-de-festas.webp` | `hype-salao.png`         | 1200px, q78            |
| `churrasqueira.webp`   | `hype-churrasqueira.png` | 1200px, q78            |
| `quadra.webp`          | `hype-quadra.png`        | 1200px, q78            |
| `playground.webp`      | `hype-playground.png`    | 1200px, q78            |
| `fachada.webp`         | `pf4-expandida.png`      | 2000px, q80 (hero)     |
| `fachada-mobile.webp`  | `pf4-expandida.png`      | 1200px, q76            |
| `casal-hero.webp`      | recorte entregue         | trim do alpha, 643×735 |
| `logo-hype-branco.svg` | `logo-hype-negativo.svg` | copiado sem mudança    |

O logo é a versão negativa (traço branco, fundo transparente) e o lockup diz
"VIVER HYPE / CONDOMÍNIO CLUBE".

## As duas fotos

Não são renders e não saíram do Figma — foram entregues à parte, depois do
resto da pasta. Nenhuma imagem da página usa mais o placeholder listrado.

| Arquivo                      | Onde aparece                            | Tratamento                           |
| ---------------------------- | --------------------------------------- | ------------------------------------ |
| `praia-do-futuro-aerea.webp` | Dobra 2 ("O mar como seu novo vizinho") | entregue já em webp, 1000×672        |
| `casal-piscina.webp`         | Dobra 5 (condições)                     | de `casal-piscina.png`, 603×409, q80 |

## Divergências entre o design e as fontes do produto

Anotadas para quem for validar a peça:

- **Casal do hero** — o recorte entregue tem alpha de verdade, mas o desenho
  útil mede 643×735 depois do trim. No hero ele é exibido com ~300px de
  altura, então está perto de 1:1 e não sobra resolução para tela retina. Um
  arquivo maior renderiza melhor.
- **Casal da piscina** — o arquivo entregue tem 603×409. No desktop a moldura
  da dobra 5 mede ~535px de largura, ou seja, quase 1:1, e a foto é recortada
  pelo `aspect-[4/3]` da moldura. Funciona, mas não sobra resolução para tela
  retina; um arquivo a partir de 1200px de largura renderiza melhor.
- **Distância do RioMar** — o design diz "5 min do Shopping RioMar
  Fortaleza". O portfólio da SQUAD (`realty-site-v2/projeto-hype.html`)
  registra 10 minutos para o mesmo trajeto.
- **Números do institucional** — o Figma mostra +7.000 e +4.970. O PNG
  compartilhado em `/public/images/victa/victa-big-numbers.png` ainda traz
  +6.000 e +4.900. Trocar o arquivo atualiza as três LPs de uma vez.
