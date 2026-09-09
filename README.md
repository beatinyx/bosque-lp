# Landing pages VICTA

Um repositório, um deploy, três landing pages de lançamento — cada uma na sua
rota:

| Rota               | Produto                   | Onde                                               |
| ------------------ | ------------------------- | -------------------------------------------------- |
| `/viver-bosque`    | **Victa Viver Bosque**    | Messejana, Fortaleza — Av. Frei Cirilo             |
| `/vitoria-eusebio` | **Vitória Eusébio**       | Mangabeira, Eusébio                                |
| `/viver-hype`      | **Hype Condomínio Clube** | Praia do Futuro II, Fortaleza                      |
| `/`                | —                         | Redireciona (302) para `https://www.victa.eng.br/` |

As três LPs compartilham stack, componentes de UI (`src/components/ui`), o shell
(`src/routes/__root.tsx`), o CSS (`src/styles.css`) e a dobra institucional da
Victa. O que é de produto — seções, imagens, paleta, tipografia e formulário de
captação — fica separado por pasta:

```
src/
  components/
    viver-bosque/      seções da LP do Viver Bosque
    vitoria-eusebio/   seções da LP do Vitória Eusébio
    viver-hype/        seções da LP do Hype
    ui/                shadcn/ui, compartilhado
  routes/
    index.tsx          redirect da raiz
    viver-bosque.tsx
    vitoria-eusebio.tsx
    viver-hype.tsx
public/
  images/victa/        logos e institucional da Victa (as três LPs usam)
  images/viver-bosque/
  images/vitoria-eusebio/
  images/viver-hype/
  video/viver-bosque/
```

Os originais em resolução cheia ficam em `assets-originais/<produto>/`, na raiz —
fora do git e fora do build.

## Como as duas paletas convivem

As três LPs usam os mesmos nomes de classe (`bg-brand`, `text-brand-sand`…). Quem
decide os valores é a classe de tema no wrapper da rota —
`.theme-viver-bosque`, `.theme-vitoria-eusebio` ou `.theme-viver-hype`: ela redeclara os tokens
`--color-brand-*` e a família de texto, e como as utilities do Tailwind v4
compilam para `var(--color-brand-*)`, a subárvore inteira repinta sem tocar em
componente nenhum.

Cada rota também carrega só o seu par de fontes (veja os `links` em
`src/routes/*.tsx`), então nenhuma visita baixa todas as famílias. Os detalhes
e o passo a passo para uma nova LP estão comentados em `src/styles.css`.

Tokens `victa-*` (+ `bark`/`stone`) são a paleta institucional e valem para as
três páginas, na dobra institucional e no rodapé.

## Victa Viver Bosque — `/viver-bosque`

Apartamentos de 2 quartos em condomínio fechado na Messejana, a poucos passos da
Av. Frei Cirilo. A identidade vem do folder oficial
(`FOLDER VIVER BOSQUE_3.pdf`): paleta, tipografia, grafismos, perspectivas e
mapa ilustrado saíram todos de lá.

| Dobra | Componente                | Conteúdo                                                                                  |
| ----- | ------------------------- | ----------------------------------------------------------------------------------------- |
| 1     | `HeroSection`             | Logo do produto, selo de lançamento, manchete, vídeo de monstera e formulário de captação |
| 2     | `LocationSection`         | Mapa ilustrado do entorno, endereço e texto de localização                                |
| 3     | `LeisureSection`          | Carrossel das perspectivas de lazer + lista completa de itens                             |
| 4     | `ConditionsSection`       | Minha Casa, Minha Vida (Faixa 3) e o box de condições                                     |
| 5     | `VictaSection` + `Footer` | Institucional Victa e texto legal do empreendimento                                       |

- **Tipografia** — o folder monta as manchetes misturando duas famílias na mesma
  frase: a parte enfática em serifada (**Fraunces**) e o resto em sans
  (**Articulat CF**). Use a classe `.emphasis` para a palavra serifada em vez de
  negrito — é o marcador visual mais forte da marca. Articulat CF é licenciada
  (Connary Fagen) e não está no Google Fonts; a pilha a declara primeiro e, até
  ela ser auto-hospedada, o fallback é Figtree.
- **Chanfro** — a classe `.chamfer` reproduz a moldura do folder, com o canto
  superior direito cortado na diagonal (`.chamfer-sm` / `.chamfer-lg` mudam o
  tamanho do corte).
- **Captação** — embed do RD Station `bosque-6026d4e5f95b4ee9aa59`, montado em
  `src/components/viver-bosque/LeadForm.tsx`. Aqui o formulário assenta direto
  sobre o vídeo, sem card: o CSS repinta rótulos, inputs e botão.

## Vitória Eusébio — `/vitoria-eusebio`

Apartamentos de 2 quartos com opção de jardim privativo, no Eusébio.

| Dobra | Componente                | Conteúdo                                                           |
| ----- | ------------------------- | ------------------------------------------------------------------ |
| 1     | `HeroSection`             | Logo do produto, manchete, fachada, selo de 2 quartos e formulário |
| 2     | `LocationSection`         | Mapa do Google embedado no endereço da obra e texto do entorno     |
| 3     | `LeisureSection`          | Carrossel das perspectivas de lazer + lista de itens               |
| 4     | `EntrySection`            | Entrada facilitada pelo Minha Casa, Minha Vida                     |
| 5     | `VictaSection` + `Footer` | Institucional Victa e texto legal do empreendimento                |

- **Tipografia** — **Montserrat** nas manchetes e no corpo, com Cormorant
  Garamond disponível como serifada de apoio.
- **Captação** — embed do RD Station `eusebio-4044c95a9a0395652ffc`, montado em
  `src/components/vitoria-eusebio/LeadForm.tsx`. Aqui o formulário fica dentro de
  um card verde escuro, então só o botão precisa de tratamento no CSS.

## Hype Condomínio Clube — `/viver-hype`

Apartamentos de 2 quartos a 400 metros do mar, na Praia do Futuro II, com
rooftop e lazer de condomínio clube. Endereço: Av. Pintor Antônio Bandeira, 4770. São 528 unidades em três torres, plantas de 38,52 m² a 58,66 m² e entrega
prevista para janeiro de 2030.

| Dobra | Componente                | Conteúdo                                                                      |
| ----- | ------------------------- | ----------------------------------------------------------------------------- |
| 1     | `HeroSection`             | Painel com logo, fachada, casal e o card laranja com a tagline e o formulário |
| 2     | `SeaSection`              | Foto aérea da Praia do Futuro e o texto "O mar como seu novo vizinho"         |
| 3     | `LocationSection`         | Bloco claro chanfrado com mapa do Google, texto e três selos de entorno       |
| 4     | `LeisureSection`          | Carrossel das perspectivas + card com os nove itens de lazer                  |
| 5     | `ConditionsSection`       | Minha Casa, Minha Vida, faixa laranja de condições e o CTA                    |
| 6     | `VictaSection` + `Footer` | Institucional Victa, segundo CTA e o texto legal do empreendimento            |

- **Paleta** — é a única LP de praia das três, e o fundo é um degradê de mar
  contínuo (`.sea-flow`) em vez de uma cor plana. O claro da página é o creme
  `brand-shell`; o card de lazer e o texto sobre as dobras claras usam o teal
  `brand-deepsea`.
- **Moldura** — a classe `.chamfer-diag` corta o canto superior direito e o
  inferior esquerdo (o `.chamfer` do Viver Bosque corta só um), e
  `.chamfer-bl` corta só o inferior esquerdo, que é o do card do hero. O
  contorno fino deslocado das fotos é o `.chamfer-outline`, um anel com
  `clip-path: evenodd` — um `border` recortado deixaria as duas diagonais sem
  traço.
- **Tipografia** — Montserrat, a mesma família do Vitória Eusébio, então a
  rota não pede fonte nova ao Google.
- **Captação** — embed do RD Station `hype-73927ee2be76598111e4`, montado em
  `src/components/viver-hype/LeadForm.tsx`. O formulário **não existe no
  design**: o Figma fecha as duas dobras de CTA com um botão que sai para
  `cloud.victacomunica.com.br/hype`. Ele entrou depois, dentro do card laranja
  do hero — o card é alto e o design deixa vazia a área embaixo da manchete,
  que é o único espaço livre da dobra. Por isso os dois CTAs agora rolam para
  `#inicio` em vez de sair do site.

### Fidelidade ao design

A página foi transcrita do arquivo do Figma (`LPs Victa`, página `/hype`), que
está público só em modo leitura: dá para ler o design, mas **não para exportar
asset nem inspecionar valor de cor ou tipografia**. Na prática:

- **Texto** — copiado do design, lido a 100% de zoom, inclusive o texto legal
  do rodapé.
- **Cores** — os valores oficiais (`brand-deepsea`, `brand-shell`,
  `brand-coral`) vieram da campanha do Hype já codificada em
  `praia-do-futuro`. Os dois tons do degradê, o verde da dobra clara e o
  magenta dos CTAs foram **amostrados a olho** do design e precisam de
  confirmação.
- **Espaçamento e corpo de texto** — reconstruídos por proporção, não por
  medida do arquivo.
- **Composição do hero** — segue a variante principal do Figma: a faixa de
  lançamento sobre o degradê, e abaixo dela um painel recuado com fio claro em
  volta, logo no alto à esquerda, card laranja alto logo abaixo, fachada
  preenchendo a direita e o recorte do casal encostado na base à direita, na
  frente do prédio. O casal sai abaixo de `lg`, onde o card passa a ocupar a
  largura toda do painel.
- **Duas fotos** (aérea da praia e casal na piscina) existem só dentro do
  Figma e estão no placeholder listrado. Ver
  `public/images/viver-hype/README.md`, que também lista as divergências entre
  o design e as fontes oficiais do produto.

## Formulários do RD Station

O markup dos três vem pronto do painel do RD, então os seletores em
`src/styles.css` são os dele e precisam de `!important`. A regra que esconde os
campos de UTM (preenchidos pela URL da campanha, não pelo usuário) é
compartilhada; o resto é escopado por classe de tema. Os três formulários são
embeds diferentes: `bosque-6026d4e5f95b4ee9aa59`,
`eusebio-4044c95a9a0395652ffc` e `hype-73927ee2be76598111e4`, todos no token
`UA-169812363-1`.

## Development

```sh
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm run lint`, `npm run format`.

## Build with Lovable

Este projeto é sincronizado com o
[Lovable](https://lovable.dev/projects/7252be24-c7fb-4d22-9d2c-9700560a9ed9). A
LP do Vitória Eusébio vinha de um projeto separado
(`8efb0353-10e2-4ef0-bdb3-590094dca031`, repositório `eusebio-lp`) e foi
absorvida aqui — o repositório antigo não recebe mais mudanças.
