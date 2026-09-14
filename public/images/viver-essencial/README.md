# Imagens da landing page — Viver Essencial

## Procedência

Como no Vitória Jasmim, **nada veio de PDF nem de pasta de backup**: o design
do Viver Essencial mora no arquivo do **Figma Sites**
(`figma.com/site/vHztSOgS48zViVrDP0eTZJ`, página `/essencial`), que o MCP do
Figma não abre.

O caminho foi o site publicado: <https://vista-coqueiral-victa.figma.site/essencial>.
A página serve a árvore de nós do Figma em
`/_json/a4b10a33-f7de-4337-b116-1ba45e8c06a8/essencial.json` e os assets em
resolução cheia em `/_assets/v11/<hash>.<ext>` — dali saíram as medidas, as
cores, os textos e todas as imagens abaixo.

| Arquivo                | Origem (hash do Figma Sites) | Tratamento                                       |
| ---------------------- | ---------------------------- | ------------------------------------------------ |
| `fachada.webp`         | `1f770f06…` (2559×1556)      | 2000px, q80 (hero, desktop)                      |
| `fachada-mobile.webp`  | `81359dce…` (2916×1663)      | 1200px, q76 (mesma fachada, corte do mobile)     |
| `logo-essencial.svg`   | `759304f9…`                  | SVG do arquivo, sem alteração                    |
| `selo-2-quartos.png`   | `dcccec8c…` (974×362)        | PNG com alpha, sem redimensão                    |
| `selo-mcmv.png`        | `1fb9f369…` (566×566)        | PNG com alpha, sem redimensão                    |
| `grafismo-v.png`       | `43133ecb…` (3154×2919)      | 900px, PNG com alpha                             |
| `marcador.png`         | `f557a51e…` (1736×1399)      | 88px, PNG com alpha (bullet da lista de entorno) |
| `piscina.webp`         | `c9cedbba…` (4000×2353)      | 1400px, q78                                      |
| `espaco-fitness.webp`  | `07cf0066…` (4000×2667)      | 1400px, q78                                      |
| `quadra.webp`          | `03752c53…` (4000×2353)      | 1400px, q78                                      |
| `salao-de-festas.webp` | `9df0fde4…` (1600×800)       | 1400px, q78 — só existe nesta resolução          |
| `playground.webp`      | `e5500a22…` (4000×2353)      | 1400px, q78                                      |
| `redario.webp`         | `db731247…` (4000×2354)      | 1400px, q78                                      |
| `churrasqueira.webp`   | `e18ac82c…` (4000×2352)      | 1400px, q78                                      |
| `casal-sofa.webp`      | `8c54d754…` (4096×2286)      | 1400px, q78 (dobra de facilidades)               |
| `aerea-pici.webp`      | `84d78d95…` (4096×2729)      | 1400px, q78 (dobra do bairro)                    |
| `casal-sala.webp`      | `307f264f…` (2752×1536)      | 1200px, q78 (dobra do Minha Casa, Minha Vida)    |

Conversão com `ffmpeg -c:v libwebp`, a mesma receita das outras LPs. Os
originais em resolução cheia estão em `assets-originais/viver-essencial/`, fora
do git e fora do build.

## O que não veio de imagem

- **A faixa de itens de lazer** e a **lista de entorno** são imagens achatadas
  no Figma. Aqui viraram markup, com os ícones em traço de `Icons.tsx` — escalam
  no mobile e são lidas por leitor de tela. Só o bullet da lista de entorno
  continua sendo imagem (`marcador.png`), porque é o "V" da marca.
- **A pastilha do endereço** e o lockup **"lazer completo"** do hero também são
  PNG de texto no arquivo; aqui são texto.
- **O véu do hero** é um PNG de degradê no Figma (`114fdb2b…`, "Prancheta-1");
  aqui é um `linear-gradient` em CSS, com as mesmas duas cores da marca
  (`#49b7a6` → `#1a5996`).
- **A dobra institucional e o rodapé** usam os assets compartilhados em
  `/images/victa/`, iguais aos das outras LPs. O bloco de números do Figma marca
  os mesmos valores do PNG oficial do repositório (+9.200, +7.200, +3.110 e
  +4.970), então ficou o PNG.
- **Pet place**, **horta** e **bicicletário** aparecem só na faixa de ícones:
  não existe render dos três no arquivo.
