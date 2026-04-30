# NEXOR Biosite

Projeto React + Vite limpo, preparado para Supabase e Vercel, sem dependencias da plataforma anterior.

## O que foi ajustado

- Painel admin sem e-mail: usa apenas senha.
- Senha padrao do painel: `asd123`.
- Carrossel hero restaurado com fallback local para nao sumir se o Supabase estiver vazio.
- Supabase isolado no schema `nexor_biosite`.
- Storage isolado no bucket `nexor-biosite-assets`.
- Arquivos prontos para Vercel com SPA fallback em `vercel.json`.

## Configuracao do Supabase

1. Crie ou abra seu projeto no Supabase.
2. No SQL Editor, execute `supabase/schema.sql`.
3. Em Project Settings > API > Exposed schemas, adicione:

```text
nexor_biosite
```

4. Execute `supabase/seed.sql` para inserir o conteudo inicial do site.
5. Copie `.env.example` para `.env.local` e preencha:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
VITE_SUPABASE_SCHEMA=nexor_biosite
VITE_SUPABASE_STORAGE_BUCKET=nexor-biosite-assets
VITE_ADMIN_PASSWORD=asd123
```

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
