# Régua de e-mail — Vibe Cumbuco (VBC-0020-26)

Três e-mails para a base de investidores, feitos para o Marketing Cloud.

| Arquivo                            | Envio | Assunto                                                      | Pré-header                                                                          |
| ---------------------------------- | ----- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `email-1-destino-cumbuco.html`     | 24/11 | Cumbuco: um novo horizonte para quem investe! 🚀             | O movimento do turismo cearense convida a olhar para novas oportunidades.           |
| `email-2-lancamento.html`          | 30/11 | Conheça o novo lançamento da Victa a poucos metros do mar. 👀 | Localização a poucos metros do mar, lazer completo e opções de plantas no Cumbuco   |
| `email-3-plantas-e-condicoes.html` | 07/12 | Seu próximo investimento pode começar com R$ 999\*           | Conheça as condições especiais para investir no Vibe Cumbuco.                       |

## Como subir no Marketing Cloud

1. Content Builder → Criar → Mensagem de e-mail → **HTML Colado** (Paste HTML).
2. Colar o conteúdo inteiro do `.html`.
3. Preencher o assunto da tabela acima. **Deixar o campo de pré-header do
   Marketing Cloud vazio**: o pré-header já está dentro do HTML, e preencher os
   dois faz o texto aparecer duplicado na caixa de entrada.
4. Enviar um teste (Preview and Test) antes de agendar.

O HTML já traz o que o Marketing Cloud espera:

- `%%view_email_url%%` no link "Abra no navegador";
- `%%Member_Busname%%`, `%%Member_Addr%%` etc. e os links `%%profile_center_url%%`
  e `%%unsub_center_url%%` no rodapé — sem endereço físico e descadastro a
  validação reprova o envio;
- `<custom name="opencounter" type="tracking" />` para a contagem de aberturas;
- `alias="..."` em todos os links, para o relatório de cliques sair com nome;
- UTMs nos links para a LP (`utm_source=marketing-cloud`, `utm_medium=email`,
  `utm_campaign=vbc-regua-investidores`, `utm_content=email-N-...`).

## Imagens

Ficam em `public/images/emails/vibe-cumbuco/` e são servidas pelo mesmo
domínio das LPs (`https://more.victa.eng.br/images/emails/vibe-cumbuco/...`).
**Só existem nessa URL depois que o commit for publicado** — antes disso o
e-mail abre sem imagem. Não renomear nem apagar depois do envio: e-mail já
entregue continua apontando para lá.

Se preferir hospedar no Content Builder, suba os arquivos lá e gere de novo
com a base trocada:

```powershell
$env:IMG_BASE = "https://image.<...>.exacttarget.com/lib/<...>/m/1"; node marketing-cloud/emails/vibe-cumbuco/build.mjs
```

## Editar

Os `.html` são gerados por `build.mjs` (texto, cores e estrutura estão todos
lá). Mexer no script e rodar:

```powershell
node marketing-cloud/emails/vibe-cumbuco/build.mjs
```

## Pendências

- **Nota legal (e-mails 2 e 3):** o número do ofício ainda está `xxxxº`, como
  na LP. Trocar em `LEGAL_PRODUTO` no `build.mjs`.
- **Logo "Victa 10 anos":** o briefing pede esse selo no rodapé; o arquivo não
  estava no repo nem na pasta de logos, então o rodapé usa o logo Victa padrão.
- **E-mail 4:** o briefing (PDF e Runrun.it) só traz três e-mails.
