# NEXOR Biosite

Projeto React + Vite limpo da plataforma anterior, preparado para Supabase e Vercel.

## O que foi removido/substituído

- Removidos `@legado/sdk`, `@legado/vite-plugin`, `cliente legado`, `app-params` e entidades plataforma anterior.
- CRUD do painel admin migrado para Supabase Database.
- Upload de imagens migrado para Supabase Storage no bucket `site-assets`.
- Login admin migrado para Supabase Auth com e-mail e senha.
- Assets externos de `host externo anterior` substituídos por arquivos locais em `public/assets`.
- Configuração Vite simplificada e pronta para deploy na Vercel.

## Configuração do Supabase

1. Crie um projeto no Supabase.
2. No SQL Editor, execute `supabase/schema.sql`.
3. Opcionalmente execute `supabase/seed.sql` para criar conteúdo inicial.
4. Em Authentication > Users, crie o usuário admin que será usado no painel `/admin`.
5. Copie `.env.example` para `.env.local` e preencha:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
VITE_SUPABASE_STORAGE_BUCKET=site-assets
VITE_ADMIN_EMAIL=admin@seudominio.com
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

1. Importe este projeto na Vercel.
2. Configure as mesmas variáveis do `.env.example` em Project Settings > Environment Variables.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Aponte seu domínio próprio em Project Settings > Domains.

## Painel admin

Acesse `/admin` e faça login com o usuário criado no Supabase Auth. Qualquer usuário autenticado consegue gerenciar conteúdo; se quiser restringir ainda mais, crie apenas um usuário admin no Supabase ou ajuste as policies em `supabase/schema.sql` para validar um claim de administrador.

## Observação sobre imagens

Como o projeto original usava imagens hospedadas na plataforma anterior, foram criados assets locais neutros em `public/assets`. Substitua `public/assets/logo-nexor.svg` e `public/assets/hero-mockup.svg` pelos arquivos finais da marca quando quiser, mantendo os mesmos nomes para não alterar o layout.
