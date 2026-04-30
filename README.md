# NEXOR Biosite - Supabase + Vercel

Projeto limpo, pronto para Vercel e Supabase.

## 1. Supabase

No Supabase, abra **SQL Editor** e execute nesta ordem:

1. `supabase/schema.sql`
2. `supabase/seed.sql`

O projeto usa o schema `public`, mas com nomes exclusivos para nao misturar com outros projetos:

- `nexor_biosite_hero_slides`
- `nexor_biosite_services`
- `nexor_biosite_faq_items`
- `nexor_biosite_plan_items`
- `nexor_biosite_site_content`

O bucket de imagens criado e usado pelo site e:

- `nexor-biosite-assets`

O `schema.sql` e reparador/idempotente: pode rodar novamente se alguma tabela, coluna, politica ou bucket tiver ficado faltando.

## 2. Vercel

Configure as variaveis em **Project Settings > Environment Variables**:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
VITE_SUPABASE_STORAGE_BUCKET=nexor-biosite-assets
VITE_ADMIN_PASSWORD=asd123
```

Remova qualquer variavel antiga como `VITE_SUPABASE_SCHEMA`.

Config do projeto na Vercel:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: vazio/em branco se o `package.json` esta na raiz do repositorio

O arquivo `vercel.json` ja esta configurado para abrir `/admin` e outras rotas React.

## 3. Admin

Rota:

```text
/admin
```

Senha padrao:

```text
asd123
```

No topo do painel admin existe um bloco **Status do Supabase**. Clique em **Testar conexao**. Ele verifica:

- se as variaveis da Vercel foram carregadas;
- se as tabelas existem;
- se o site consegue gravar e apagar um registro real no Supabase.

Se esse teste falhar, rode novamente o `supabase/schema.sql` inteiro.

## 4. Deploy

Depois de subir para o GitHub, faca redeploy na Vercel com **Clear Build Cache**.

## 5. GitHub

Exemplo:

```powershell
cd "C:\Users\Admin\Desktop\nexor site"

git add .
git commit -m "Corrige Supabase e admin Nexor Biosite"
git push -u origin main --force
```

## Observacao importante

Como o admin foi solicitado apenas com senha no front-end, as politicas do Supabase permitem escrita anonima para esse projeto. Isso faz o painel funcionar sem login de usuario no Supabase. Para seguranca maior, o ideal futuro seria criar uma API serverless na Vercel ou usar Supabase Auth.
