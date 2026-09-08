# Landing pages VICTA

Um repositório, um deploy, duas landing pages de lançamento — cada uma na sua
rota:

| Rota               | Produto                | Onde                                               |
| ------------------ | ---------------------- | -------------------------------------------------- |
| `/viver-bosque`    | **Victa Viver Bosque** | Messejana, Fortaleza — Av. Frei Cirilo             |
| `/vitoria-eusebio` | **Vitória Eusébio**    | Mangabeira, Eusébio                                |
| `/`                | —                      | Redireciona (302) para `https://www.victa.eng.br/` |

As duas LPs compartilham stack, componentes de UI (`src/components/ui`), o shell
(`src/routes/__root.tsx`), o CSS (`src/styles.css`) e a dobra institucional da
Victa. O que é de produto — seções, imagens, paleta, tipografia e formulário de
captação — fica separado por pasta:

```
src/
  components/
    viver-bosque/      seções da LP do Viver Bosque
    vitoria-eusebio/   seções da LP do Vitória Eusébio
    ui/                shadcn/ui, compartilhado
  routes/
    index.tsx          redirect da raiz
    viver-bosque.tsx
    vitoria-eusebio.tsx
public/
  images/victa/        logos e institucional da Victa (as duas LPs usam)
  images/viver-bosque/
  images/vitoria-eusebio/
  video/viver-bosque/
```

Os originais em resolução cheia ficam em `assets-originais/<produto>/`, na raiz —
fora do git e fora do build.

## Como as duas paletas convivem

As duas LPs usam os mesmos nomes de classe (`bg-brand`, `text-brand-sand`…). Quem
decide os valores é a classe de tema no wrapper da rota —
`.theme-viver-bosque` ou `.theme-vitoria-eusebio`: ela redeclara os tokens
`--color-brand-*` e a família de texto, e como as utilities do Tailwind v4
compilam para `var(--color-brand-*)`, a subárvore inteira repinta sem tocar em
componente nenhum.

Cada rota também carrega só o seu par de fontes (veja os `links` em
`src/routes/*.tsx`), então nenhuma visita baixa as quatro famílias. Os detalhes
e o passo a passo para uma terceira LP estão comentados em `src/styles.css`.

Tokens `victa-*` (+ `bark`/`stone`) são a paleta institucional e valem para as
duas páginas, da dobra 5 para baixo.

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

## Formulários do RD Station

O markup dos dois vem pronto do painel do RD, então os seletores em
`src/styles.css` são os dele e precisam de `!important`. A regra que esconde os
campos de UTM (preenchidos pela URL da campanha, não pelo usuário) é
compartilhada; o resto é escopado por classe de tema.

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
