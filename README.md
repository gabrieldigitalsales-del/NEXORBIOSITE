# NEXOR Biosite

Projeto React + Vite limpo, preparado para Supabase e Vercel, sem dependencias da plataforma anterior.

## O que foi ajustado

- Painel admin sem e-mail: usa apenas senha.
- Senha padrao do painel: `asd123`.
- Carrossel hero restaurado com fallback local para nao sumir se o banco estiver vazio.
- Supabase isolado por nomes exclusivos no schema `public`:
  - `nexor_biosite_hero_slides`
  - `nexor_biosite_services`
  - `nexor_biosite_faq_items`
  - `nexor_biosite_plan_items`
  - `nexor_biosite_site_content`
- Storage isolado no bucket `nexor-biosite-assets`.
- Arquivos prontos para Vercel com SPA fallback em `vercel.json`.

## Configuracao do Supabase

1. Crie ou abra seu projeto no Supabase.
2. Va em **SQL Editor**.
3. Abra o arquivo `supabase/schema.sql`, copie tudo e execute.
4. Confirme em **Table Editor** que apareceram as tabelas com prefixo `nexor_biosite_`.
5. Execute `supabase/seed.sql` para inserir o conteudo inicial do site.
6. Copie `.env.example` para `.env.local` e preencha:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
VITE_SUPABASE_STORAGE_BUCKET=nexor-biosite-assets
VITE_ADMIN_PASSWORD=asd123
```

Na Vercel, cadastre as mesmas variaveis em **Project Settings > Environment Variables**.

## Importante

Esta versao usa tabelas no schema `public` com prefixo exclusivo do projeto. Isso evita o problema de tabela nao aparecer ou API nao encontrar tabela por falta de configuracao de `Exposed schemas`.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Vercel

1. Importe o repositorio na Vercel.
2. Configure as variaveis do `.env.example` em Project Settings > Environment Variables.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Aponte seu dominio proprio em Project Settings > Domains.

## Painel admin

Acesse `/admin` e digite apenas a senha: `asd123`.

Observacao importante: como foi pedido para remover e-mail/login do Supabase Auth, a senha protege apenas a interface do painel no front-end. Para seguranca forte em producao, o ideal e usar Supabase Auth, Edge Function ou backend proprio. Este pacote foi mantido conforme solicitado: sem e-mail/login, apenas senha simples.
