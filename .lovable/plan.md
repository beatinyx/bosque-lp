# Base limpa para a futura landing page

Deixar o projeto pronto para receber a LP, sem conteúdo de exemplo.

## O que muda

- Remover o placeholder da página inicial (`/`) e deixar uma página neutra: fundo do tema, um container centralizado e vazio, sem imagem nem texto de demonstração.
- Definir metadados próprios da página inicial (título, descrição, og:title, og:description) em vez dos valores genéricos "Lovable App".
- Atualizar os metadados padrão do root para valores neutros do projeto.

## O que NÃO muda

- Nenhuma seção de LP (hero, features, CTA, footer) será criada agora.
- Sem backend, sem dependências novas, sem alterações no design system.

## Detalhes técnicos

- `src/routes/index.tsx`: remover o `<img data-lovable-blank-page-placeholder>`, adicionar `head()` com meta tags específicas.
- `src/routes/__root.tsx`: substituir os títulos/descrições placeholder por texto neutro do projeto.
