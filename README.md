# Victa Viver Bosque — landing page

Landing page de lançamento do **Victa Viver Bosque**: apartamentos de 2 quartos em
condomínio fechado na Messejana, Fortaleza, a poucos passos da Av. Frei Cirilo.

A identidade visual é derivada do folder oficial (`FOLDER VIVER BOSQUE_3.pdf`):
paleta, tipografia, grafismos, perspectivas e mapa ilustrado saíram todos de lá.
A dobra institucional e o rodapé seguem o padrão das outras LPs da Victa (mesma
estrutura da LP do Vitória Eusébio).

## Estrutura da página

| Dobra | Componente                | Conteúdo                                                                                 |
| ----- | ------------------------- | ---------------------------------------------------------------------------------------- |
| 1     | `HeroSection`             | Logo do produto, selo de lançamento, manchete, fachada, tagline e formulário de captação |
| 2     | `LocationSection`         | Mapa do Google no endereço da obra, endereço e texto do entorno                          |
| 3     | `LeisureSection`          | Carrossel das perspectivas de lazer + lista completa de itens                            |
| 4     | `ConditionsSection`       | Minha Casa, Minha Vida (Faixa 3) e o box de condições                                    |
| 5     | `VictaSection` + `Footer` | Institucional Victa e texto legal do empreendimento                                      |

## Design system

Tudo em `src/styles.css`:

- **Cores** — dois conjuntos que não se misturam: `brand-*` (produto, dobras 1 a 4,
  extraído dos operadores CMYK do folder) e `victa-*` (institucional, dobra 5 e
  rodapé).
- **Tipografia** — o folder monta as manchetes misturando duas famílias na mesma
  frase: a parte enfática em serifada (**Fraunces**) e o resto em sans
  (**Articulat CF**). Use a classe `.emphasis` para a palavra serifada em vez de
  negrito — é o marcador visual mais forte da marca.
- **Chanfro** — a classe `.chamfer` reproduz a moldura do folder, com o canto
  superior direito cortado na diagonal (`.chamfer-sm` / `.chamfer-lg` mudam o
  tamanho do corte).

Articulat CF é licenciada (Connary Fagen) e não está no Google Fonts. A pilha a
declara primeiro; até ela ser auto-hospedada, o fallback é Figtree.

## Captação

O formulário da dobra 1 é o embed do RD Station
(`bosque-6026d4e5f95b4ee9aa59`), montado em
`src/components/site/LeadForm.tsx`. Campos, botão e linha de consentimento vêm
configurados no painel do RD; o CSS em `.rd-form-card` (`src/styles.css`) só
esconde os campos de UTM — preenchidos pela URL da campanha, não pelo usuário — e
aplica a paleta da marca aos rótulos, aos inputs e ao botão.

## Development

```sh
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm run lint`, `npm run format`.

## Build with Lovable

Este projeto é sincronizado com o [Lovable](https://lovable.dev/projects/7252be24-c7fb-4d22-9d2c-9700560a9ed9).
Commits enviados para `main` voltam para o editor, então mantenha a branch em
estado funcional e evite reescrever histórico já publicado.
