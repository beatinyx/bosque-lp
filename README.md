# Landing pages VICTA

Um repositório, um deploy, cinco landing pages de lançamento — cada uma na sua
rota:

| Rota               | Produto                   | Onde                                                |
| ------------------ | ------------------------- | --------------------------------------------------- |
| `/viver-bosque`    | **Victa Viver Bosque**    | Messejana, Fortaleza — Av. Frei Cirilo              |
| `/vitoria-eusebio` | **Vitória Eusébio**       | Mangabeira, Eusébio                                 |
| `/viver-hype`      | **Hype Condomínio Clube** | Praia do Futuro II, Fortaleza                       |
| `/vitoria-jasmim`  | **Vitória Jasmim**        | Messejana/Paupina, Fortaleza — R. Antero de Quental |
| `/viver-essencial` | **Viver Essencial**       | Pici, Fortaleza — Av. Cel. Matos Dourado            |
| `/vitoria-iris`    | **Vitória Íris**          | Parque Vitória Messejana, Fortaleza                 |
| `/atlantico`       | **Atlântico**             | Praia do Futuro, Fortaleza                          |
| `/vista-costeira`  | **Vista Costeira**        | Cumbuco (Tabuba), Caucaia                           |
| `/vista-coqueiral` | **Vista Coqueiral**       | Praia do Cumbuco, Caucaia                           |
| `/`                | —                         | Redireciona (302) para `https://www.victa.eng.br/`  |

Cada LP tem também a sua página de obrigado em `/obrigado/<produto>` — o destino
do redirect do formulário do RD Station e o gatilho de conversão do GTM. Ver
[Medição e conversão](#medição-e-conversão).

As cinco LPs compartilham stack, componentes de UI (`src/components/ui`), o shell
(`src/routes/__root.tsx`), o CSS (`src/styles.css`) e a dobra institucional da
Victa. O que é de produto — seções, imagens, paleta, tipografia e formulário de
captação — fica separado por pasta:

```
src/
  components/
    viver-bosque/      seções da LP do Viver Bosque
    vitoria-eusebio/   seções da LP do Vitória Eusébio
    viver-hype/        seções da LP do Hype
    vitoria-jasmim/    seções da LP do Vitória Jasmim
    viver-essencial/   seções da LP do Viver Essencial
    vitoria-iris/      seções da LP do Vitória Íris
    atlantico/         seções da LP do Atlântico
    vista-costeira/    seções da LP do Vista Costeira
    vista-coqueiral/   seções da LP do Vista Coqueiral
    obrigado/          página de obrigado, compartilhada pelos cinco produtos
    ui/                shadcn/ui, compartilhado
  routes/
    index.tsx          redirect da raiz
    viver-bosque.tsx
    vitoria-eusebio.tsx
    viver-hype.tsx
    vitoria-jasmim.tsx
    viver-essencial.tsx
    vitoria-iris.tsx
    atlantico.tsx
    vista-costeira.tsx
    vista-coqueiral.tsx
    obrigado/          uma rota por produto, com o KV e a confirmação
public/
  images/victa/        logos e institucional da Victa (as cinco LPs usam)
  images/viver-bosque/
  images/vitoria-eusebio/
  images/viver-hype/
  images/vitoria-jasmim/
  images/viver-essencial/
  images/vitoria-iris/
  images/atlantico/
  images/vista-costeira/
  images/vista-coqueiral/
  video/viver-bosque/
```

Os originais em resolução cheia ficam em `assets-originais/<produto>/`, na raiz —
fora do git e fora do build.

## Como as paletas convivem

As cinco LPs usam os mesmos nomes de classe (`bg-brand`, `text-brand-sand`…). Quem
decide os valores é a classe de tema no wrapper da rota —
`.theme-viver-bosque`, `.theme-vitoria-eusebio`, `.theme-viver-hype`,
`.theme-vitoria-jasmim` ou `.theme-viver-essencial`: ela redeclara os tokens
`--color-brand-*` e a família de texto, e como as utilities do Tailwind v4
compilam para `var(--color-brand-*)`, a subárvore inteira repinta sem tocar em
componente nenhum.

Cada rota também carrega só o seu par de fontes (veja os `links` em
`src/routes/*.tsx`), então nenhuma visita baixa todas as famílias. Os detalhes
e o passo a passo para uma nova LP estão comentados em `src/styles.css`.

Tokens `victa-*` (+ `bark`/`stone`) são a paleta institucional e valem para as
cinco páginas, na dobra institucional e no rodapé. O Vitória Jasmim e o Viver Essencial usam
outra faixa da mesma paleta — `victa-forest`, `victa-lime` e `victa-cream` —,
porque o design dos dois fecha em verde-escuro e creme em vez do degradê verde
das outras.

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
| 4     | `ConditionsSection`       | Minha Casa, Minha Vida (Faixa 2) e o box de condições                                     |
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
- **Captação** — formulário próprio em `src/components/viver-bosque/LeadForm.tsx`,
  enviado para o **Marketing Cloud** (não é mais o RD Station). É um POST
  comum para uma CloudPage (`MC_LEAD_ENDPOINT`) que grava na DE `leads_bosque`
  (Contact Builder → Extensões de Dados → pasta _viver bosque_, chave externa
  `05ACEDC3-95F1-467D-AFD8-54CC2971FA5C`) e redireciona para
  `/obrigado/viver-bosque` — ou de volta para a LP com `?cadastro=erro`, que
  mostra o aviso acima dos campos. O código da CloudPage está em
  `marketing-cloud/viver-bosque-lead.html`: ao mudar, colar de novo no Cloud e
  republicar. As UTMs vão em campos ocultos (`utm_*`, mesma origem de
  `src/lib/rd-utm.ts`), o telefone chega à DE só com dígitos e o 55 na frente,
  e um campo-armadilha (`website`) descarta envio de robô. A DE não tem chave
  primária: cada envio é uma linha nova.

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

## Vitória Jasmim — `/vitoria-jasmim`

Apartamentos de 2 quartos com opção de jardim privativo na Messejana, em
R. Antero de Quental, 383 (Paupina). É a única LP roxa do repositório.

| Dobra | Componente                | Conteúdo                                                                      |
| ----- | ------------------------- | ----------------------------------------------------------------------------- |
| 1     | `HeroSection`             | Faixa de lançamento, logo, selo de 2 quartos e o card roxo com o formulário   |
| 2     | `LocationSection`         | Mapa do Google, endereço e os cinco cards de tempo até o entorno              |
| 3     | `LeisureSection`          | Carrossel das dez perspectivas + faixa com os itens de lazer                  |
| 4     | `ConditionsSection`       | Foto do casal com as três faixas de condição (FGTS, financiamento e parcelas) |
| 5     | `VictaSection` + `Footer` | Institucional Victa e o texto legal do empreendimento                         |

- **Paleta** — roxo `#64328a` como cor principal, verde-claro `#ebf4e6` nas
  dobras claras, verde-oliva `#556b27` na faixa de lançamento e nos cards de
  entorno, e dourado `#e89500` nos três CTAs. Todos amostrados do arquivo
  publicado, não a olho.
- **Molduras** — o design alterna dois arredondamentos de 60px em cantos
  opostos: `0 60px 0 60px` no card do formulário e no mapa, `60px 0 60px 0` nos
  slides do carrossel. As faixas de condição usam o mesmo desenho em 30px.
- **Tipografia** — Montserrat, com itálico nos destaques ("para toda a
  família", "seu momento", os tempos do entorno) e Montserrat Alternates só nos
  números da dobra institucional.
- **Captação** — embed do RD Station `vitoria-jasmin-94114a5c148789bc1bee`
  (grafia com "n", é o id cadastrado no RD), o mesmo que a página do Figma já
  usa. O `LeadForm` também guarda as UTMs da URL e preenche os campos
  `cf_utm_*` escondidos, como o code layer do Figma faz.
- **CTAs** — no Figma os três botões não levam a lugar nenhum (não há
  interação de URL em nenhum deles). Aqui eles rolam para `#inicio`, o
  formulário do hero.

### Fidelidade ao design

O design mora num arquivo do **Figma Sites**, que o MCP do Figma não abre. A
transcrição saiu do site publicado
(<https://vista-coqueiral-victa.figma.site/vitoria-jasmin>), que entrega o JSON
com a árvore de nós do arquivo e os assets em resolução cheia — então texto,
cor, tipografia, raio de canto e medida vieram do arquivo, e não de estimativa.
O que diverge do design está registrado em
`public/images/vitoria-jasmim/README.md`: a faixa de lazer virou markup, a
dobra institucional usa os assets compartilhados da Victa (com `+4.970`
entregues, contra `+4.900` no Figma) e o bicicletário entrou na lista de itens
por ter render próprio no carrossel.

## Vitória Íris — `/vitoria-iris`

Mesma origem do Jasmim: o design mora no **Figma Sites** (página `/vitoria-iris`),
lido pelo site publicado (JSON da árvore de nós + `/_assets/v11/`). A página é
um irmão do Parque Vitória: o bloco "Um lugar pensado…" abre com o logo e o
texto do **Parque Vitória Messejana**, o bairro planejado onde o Íris fica, e o
mapa ilustrado é o de Messejana com o pino do Íris.

Estrutura (hero → lugar → localização → lazer → institucional → rodapé), tema
`.theme-vitoria-iris` e formulário `vitoria-iris-bfbb1b5b19b7c5e74b84` do RD.
Pontos a saber:

- **Faixa de lazer e legenda do mapa** são imagens, como no Figma (a legenda
  traz os 33 nomes e não existe como texto em lugar nenhum); o `alt` resume o
  conteúdo.
- **Números da dobra institucional:** o Figma marca +9.000 / +6.400 / +4.600 /
  +2.200, e o PNG oficial do repositório (`/images/victa/victa-big-numbers.png`)
  é o que ficou, como nas outras LPs.
- **GTM e obrigado:** a página `/obrigado/vitoria-iris` existe, e o Íris carrega o
  container `GTM-M7HJDQRK` — o **mesmo do Vitória Jasmim**, por indicação do time;
  se o Íris ganhar container próprio, trocar em `src/routes/__root.tsx`. O redirect
  do formulário no RD (fora do código) precisa apontar para
  `https://more.victa.eng.br/obrigado/vitoria-iris`.

## Atlântico — `/atlantico`

Também transcrito do Figma Sites (`/atlantico`), pelo site publicado. Hero com
formulário do RD (`atlantico-34bc527c3d8e5ca98ed2`), localização, lounge, lazer,
condições (sinal a partir de R$ 999*, renda R$ 8.000*, entrada em até 48x),
institucional e rodapé com o texto legal do empreendimento. Tema
`.theme-atlantico`: azul `#4061a6`, sálvia, verde-água e cacau.

- **Texturas e lettering são imagens**, como no Figma (água, azul, creme; os dois
  títulos em lettering). A lista de itens do lazer é um SVG com texto em curvas,
  em duas versões (desktop e mobile), e o `alt` repete os oito itens.
- **Ordem dos renders:** o Figma não usa a mesma no desktop e no mobile; o grid
  usa `order-*` para reproduzir as duas.
- **Obrigado e GTM:** a página `/obrigado/atlantico` existe e o Atlântico carrega o
  container `GTM-NCH7568J` (`src/routes/__root.tsx`), então a conversão é o
  pageview dela. O redirect do formulário no RD já aponta para
  `https://more.victa.eng.br/obrigado/atlantico`.

## Vista Costeira — `/vista-costeira`

Apartamentos de 2 quartos com suíte e varanda no Cumbuco (Av. Central da Tabuba,
4169 — Caucaia), a 1 minuto do mar. Transcrito do Figma Sites (página
`/costeira`) pelo site publicado, como o Atlântico: hero com formulário do RD
(`costeira-c425f54d178632eba730`), praia e localização sobre o mesmo fundo
areia, lazer com carrossel, lista de itens e o vídeo de apresentação do YouTube,
institucional e rodapé com o texto legal do empreendimento. Tema
`.theme-vista-costeira`: petróleo `#005676`, areia `#e6bb94`, pêssego `#e29759`
e o verde `#31e519` dos CTAs. Montserrat, com Poppins só nas etiquetas do
carrossel.

- **Carrossel** — dois desenhos, como no Figma: no desktop o render ativo grande
  com os vizinhos menores vazando pelas bordas; no mobile um card só, com setas
  laterais e arraste. Os dois dão a volta nas pontas (no Figma o desktop para).
- **Lista de lazer e ondas são SVG do Figma** — a lista tem texto em curvas, em
  versão desktop e mobile, e o `alt` repete os oito itens.
- **CTAs** — no Figma todos rolam para o hero, e aqui também; o "fale com a
  gente" da dobra institucional abre o WhatsApp da Victa, como nas outras LPs.
- **Obrigado e GTM:** a página `/obrigado/vista-costeira` existe e a LP carrega o
  container `GTM-NP9LS9B7` (o mesmo que o Figma usa em `/costeira`). **O redirect
  do formulário no RD ainda aponta para
  `https://cloud.victacomunica.com.br/agradecimento`** (conferido em
  2026-10-14): enquanto não for trocado para
  `https://more.victa.eng.br/obrigado/vista-costeira`, o lead sai da LP e a
  conversão não é contada aqui.

## Vista Coqueiral — `/vista-coqueiral`

Apartamentos de 2 quartos com suíte e varanda pé na areia na Praia do Cumbuco
(Caucaia). Transcrito do Figma Sites (página `/vista-coqueiral-lancamento`)
pelo site publicado, com os mesmos componentes do Vista Costeira: hero com
formulário do RD (`vista-coqueiral-6bd0476496edd77126c5`), investimento e
localização sobre o verde-coqueiro, lazer com carrossel de dez renders e o
quadro de itens com ícones, institucional e rodapé com o texto legal do
empreendimento. Tema `.theme-vista-coqueiral`: verde-coqueiro `#2c6045`,
verde-claro `#a3c74c`, teal `#008c8b` e o caramelo `#d3863f` dos CTAs.
Montserrat, com Poppins nos botões e nas etiquetas do carrossel.

- **Formulário** — o Figma tem dois embeds do Coqueiral no RD; o desta página
  (o code layer do hero) é `vista-coqueiral-6bd0476496edd77126c5`. O
  `vista-coqueiral-51b9c8fad669ffb64547` é de outra página do arquivo.
- **Mapa sem endereço** — o embed do Figma ainda é o placeholder do Figma Sites
  ("San Francisco City Hall"), e nenhuma página do arquivo traz o endereço da
  obra. O mapa centraliza na Praia do Cumbuco até o endereço oficial chegar
  (`MAP_QUERY` em `src/components/vista-coqueiral/InvestSection.tsx`).
- **Carrossel** — o mesmo do Costeira (trilho animado no desktop, deslize com
  parallax e arraste no mobile), com as setas teal e a etiqueta verde do design.
- **Obrigado e GTM:** a página `/obrigado/vista-coqueiral` existe e a LP carrega o
  container `GTM-5DV6MQBG` (o mesmo que o Figma usa nas três páginas do
  Coqueiral). **O redirect do formulário no RD ainda aponta para
  `https://cloud.victacomunica.com.br/agradecimento`** (conferido em
  2026-10-14): precisa ser trocado para
  `https://more.victa.eng.br/obrigado/vista-coqueiral`.

## Viver Essencial — `/viver-essencial`

Apartamentos de 2 quartos com opção de jardim privativo no Pici, na Av. Cel.
Matos Dourado, 1281. É a LP azul do repositório, e a única que mistura duas
famílias de texto na mesma página.

| Dobra | Componente                | Conteúdo                                                                 |
| ----- | ------------------------- | ------------------------------------------------------------------------ |
| 1     | `HeroSection`             | Fachada, lockup do produto, formulário, selo de 2 quartos e selo do MCMV |
| 2     | `AdvantagesSection`       | Faixa azul com as seis vantagens de compra e a foto do casal no sofá     |
| 3     | `LeisureSection`          | Carrossel das sete perspectivas + faixa teal com os dez itens de lazer   |
| 4     | `NeighborhoodSection`     | Foto aérea do Pici e o argumento de investimento no bairro               |
| 5     | `LocationSection`         | Card azul com a pastilha do endereço, os tempos até o entorno e o mapa   |
| 6     | `ConditionsSection`       | Minha Casa, Minha Vida: foto, texto e as quatro faixas de renda          |
| 7     | `VictaSection` + `Footer` | Institucional Victa e o texto legal do empreendimento                    |

- **Paleta** — azul `#1a5a97` como cor principal, teal `#49b7a6` nas faixas,
  azul-claro `#3c84c9` nas pastilhas de vantagem e laranja `#f39222` nos CTAs.
  Todas amostradas do arquivo publicado, não a olho.
- **Degradê contínuo** — no Figma as dobras 3 a 6 ficam sobre um único degradê
  teal → azul, e não sobre quatro fundos. Por isso elas vão dentro do mesmo
  wrapper na rota, em vez de cada uma pintar o próprio fundo.
- **Molduras** — o design alterna os mesmos dois arredondamentos de 60px em
  cantos opostos: `0 60px 0 60px` na faixa de lazer e `60px 0 60px 0` no card
  de localização. A moldura das faixas de renda usa o desenho em 30px.
- **Tipografia** — Poppins nas dobras do produto e Montserrat no institucional,
  no rodapé e nas pastilhas de vantagem, como no arquivo. É o que a classe
  `font-montserrat` faz; as duas famílias são pedidas num link só na rota.
- **Captação** — embed do RD Station `viver-pici-lancamento-64a33be93e868edfe509`
  (cadastrado pelo bairro, não pelo nome do produto), o mesmo que a página do
  Figma já usa. O `LeadForm` também guarda as UTMs da URL e preenche os campos
  `cf_utm_*` escondidos, como o code layer do Figma faz.
- **CTAs** — no Figma os botões não levam a lugar nenhum. Aqui "quero ver a
  planta", "quero morar aqui" e "descubra meu perfil" rolam para `#inicio`, o
  formulário do hero; "fale com a gente", da dobra institucional, abre o
  WhatsApp da Victa, como nas outras LPs.

### Fidelidade ao design

Mesma rota do Vitória Jasmim: o design mora no arquivo do **Figma Sites**, que
o MCP do Figma não abre, e a transcrição saiu do site publicado
(<https://vista-coqueiral-victa.figma.site/essencial>), que entrega o JSON com a
árvore de nós e os assets em resolução cheia — texto, cor, tipografia, raio de
canto e medida vieram do arquivo. O que diverge está registrado em
`public/images/viver-essencial/README.md`: a faixa de lazer, a lista de entorno
e a pastilha do endereço viraram markup, o véu do hero virou `linear-gradient`
e a dobra institucional usa os assets compartilhados da Victa.

## Formulários do RD Station

O markup dos cinco vem pronto do painel do RD, então os seletores em
`src/styles.css` são os dele e precisam de `!important`. A regra que esconde os
campos de UTM (preenchidos pela URL da campanha, não pelo usuário) é
compartilhada; o resto é escopado por classe de tema. Os cinco formulários são
embeds diferentes: `bosque-6026d4e5f95b4ee9aa59`,
`eusebio-4044c95a9a0395652ffc`, `hype-73927ee2be76598111e4`,
`vitoria-jasmin-94114a5c148789bc1bee` e
`viver-pici-lancamento-64a33be93e868edfe509`, todos no token `UA-169812363-1`.

## Medição e conversão

O repositório instala o container do GTM e nada mais — nenhum evento sai do
código. O mapa `GTM_IDS_BY_PATH` em `src/routes/__root.tsx` casa a rota com o
container do produto, e a página de obrigado herda o container da própria LP
tirando o prefixo `/obrigado`. Rota que não está no mapa não recebe snippet
nenhum, sem erro nem aviso: é o primeiro lugar a olhar quando uma página nova
não aparece no Preview do GTM.

A conversão é o **pageview de `/obrigado/<produto>`**, e não o clique no botão
de envio. Clique conta tentativa — formulário vazio, campo inválido, clique
duplo — e infla o número; os CTAs `href="#cadastro"` das LPs, que só rolam a
página até o formulário, entram na conta pelo mesmo gatilho. No GTM a tag de
conversão fica num gatilho de Page View com _Page Path_ contendo `/obrigado`,
que serve para as cinco; gatilho de clique, se existir, é micro-conversão e
nunca a conversão.

Isso depende de um passo que não está neste repositório: **a URL de redirect de
cada um dos cinco formulários, configurada no painel do RD**. O Viver Bosque é a
exceção: o formulário dele vai para o Marketing Cloud, e o redirect está fixo
no código da CloudPage (`marketing-cloud/viver-bosque-lead.html`). Sem ela o embed
mostra a mensagem de sucesso no lugar, ninguém chega na página de obrigado e não
há conversão para contar.

As UTMs chegam ao RD por outro caminho, e ele também não é automático. Os cinco
formulários trazem seis campos personalizados `cf_utm_*` (source, medium,
campaign, term, content e placement), escondidos pelo CSS, e o script do RD não
preenche campo nenhum a partir da URL — a única coisa que ele lê é o cookie
`__trf.src` do código de monitoramento, e só para o campo oculto
`traffic_source`, no envio. Quem preenche os `cf_utm_*` é `src/lib/rd-utm.ts`:
lê os `utm_*` da URL na chegada, guarda o conjunto inteiro no `localStorage`
(chave `victa:utm`) e escreve nos campos quando o RD injeta o formulário e de
novo no `submit`. A origem nativa do RD (`traffic_source`) continua dependendo
do código de monitoramento, que entra pelo GTM: container sem a tag do RD deixa
o lead com as UTMs nos campos personalizados e sem origem.

As cinco páginas de obrigado são `noindex, nofollow` — indexadas, receberiam
visita orgânica de quem nunca preencheu o formulário. A URL continua acessível,
então refresh e link compartilhado contam conversão de novo; é o limite conhecido
da abordagem por pageview, e o que sobra se resolve deduplicando no GA4.

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
