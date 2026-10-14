# Imagens da landing page — Vista Coqueiral

Todas vieram do Figma Sites publicado
(<https://vista-coqueiral-victa.figma.site/vista-coqueiral-lancamento>), em
`/_assets/v11/<hash>.<png|svg>`. Os renders foram convertidos com
`ffmpeg -c:v libwebp` (a mesma receita das outras LPs). Os PNGs originais estão
em `assets-originais/vista-coqueiral/`, fora do git.

| Arquivo                             | Origem (hash)           | Tratamento                                        |
| ----------------------------------- | ----------------------- | ------------------------------------------------- |
| `fachada.webp`                      | `514ec033…`             | 2000px q80 (hero desktop)                         |
| `fachada-mobile.webp`               | `f3cbfb39…`             | 1200px q76 (hero mobile, enquadramento do Figma)  |
| `logo-vista-coqueiral.png`          | `5fab77c1…`             | PNG com alpha, versão negativa (branca)           |
| `selo-2-quartos.webp`               | `b15ad906…`             | 1400px q85 ("2 Quartos" + "Lazer completo")       |
| `praia-kitesurf.webp`               | `a3d52fd5…`             | 1024px q80                                        |
| `folha-coqueiro.webp`               | `e0efc29f…`             | 1000px q82 com alpha (grafismo da dobra de lazer) |
| `piscina.webp` … `picnic.webp` (10) | ver abaixo              | 1600px q78                                        |
| `icones/*.svg` (11)                 | SVGs do quadro de lazer | como estão; brancos via `var(--fill-0, white)`    |

Os dez renders do carrossel saíram da versão de maior resolução de cada um —
o Figma usa arquivos diferentes no carrossel desktop (1600px) e no mobile (até
4000px): piscina `4fab1584…`, academia `844c1410…`, beach tennis `2a0c7017…`,
salão de festas `22a7df4c…`, playground `bc89dc70…`, pet place `77f0065f…`,
espaço kitesurf `48a08185…`, churrasqueira `b78e432b…`, redário `366abe2b…` e
picnic `8db46caa…`. Os nomes das camadas no Figma ainda são os do carrossel do
Costeira (ex.: "quadra", "bicicletário"); o que vale é a etiqueta de cada slide.

A dobra institucional usa os assets compartilhados de `/images/victa/`, como o
Costeira: a foto "humanizacao geral lps" do Figma é a mesma de
`humanizacao-victa.png`, e os números ficam no PNG oficial.

A camada "Mar visto de cima" atrás da dobra de investimento não tem
preenchimento no arquivo (não aparece no site publicado), então ficou de fora.
