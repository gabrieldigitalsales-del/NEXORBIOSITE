-- NEXOR Biosite - schema.sql exclusivo deste projeto
-- Execute este arquivo inteiro no SQL Editor do Supabase.
-- As tabelas ficam no schema public com prefixo nexor_biosite_ para nao misturar com outros projetos.
-- Assim voce nao precisa configurar Exposed schemas no Supabase.

create extension if not exists pgcrypto;

create table if not exists public.nexor_biosite_hero_slides (
  id uuid primary key default gen_random_uuid(),
  tag text not null default '',
  title text not null default '',
  highlight text not null default '',
  "desc" text not null default '',
  cta text not null default '',
  wamsg text not null default '',
  image_url text default '',
  bg_color text default 'from-amber-50 to-orange-50',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexor_biosite_services (
  id uuid primary key default gen_random_uuid(),
  tag text not null default '',
  title text not null default '',
  "desc" text not null default '',
  features text[] not null default '{}',
  wamsg text not null default '',
  bg_color text default 'from-amber-50 to-orange-50',
  badge_color text default 'bg-amber-100 text-amber-700',
  icon_name text default 'LayoutGrid',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexor_biosite_faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null default '',
  answer text not null default '',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexor_biosite_plan_items (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  featured boolean not null default false,
  features text[] not null default '{}',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nexor_biosite_site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null default '',
  value_type text not null default 'text' check (value_type in ('text', 'image_url', 'url', 'color')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(section, key)
);

create or replace function public.nexor_biosite_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists nexor_biosite_hero_slides_updated_at on public.nexor_biosite_hero_slides;
create trigger nexor_biosite_hero_slides_updated_at before update on public.nexor_biosite_hero_slides for each row execute function public.nexor_biosite_set_updated_at();

drop trigger if exists nexor_biosite_services_updated_at on public.nexor_biosite_services;
create trigger nexor_biosite_services_updated_at before update on public.nexor_biosite_services for each row execute function public.nexor_biosite_set_updated_at();

drop trigger if exists nexor_biosite_faq_items_updated_at on public.nexor_biosite_faq_items;
create trigger nexor_biosite_faq_items_updated_at before update on public.nexor_biosite_faq_items for each row execute function public.nexor_biosite_set_updated_at();

drop trigger if exists nexor_biosite_plan_items_updated_at on public.nexor_biosite_plan_items;
create trigger nexor_biosite_plan_items_updated_at before update on public.nexor_biosite_plan_items for each row execute function public.nexor_biosite_set_updated_at();

drop trigger if exists nexor_biosite_site_content_updated_at on public.nexor_biosite_site_content;
create trigger nexor_biosite_site_content_updated_at before update on public.nexor_biosite_site_content for each row execute function public.nexor_biosite_set_updated_at();

grant select, insert, update, delete on table
  public.nexor_biosite_hero_slides,
  public.nexor_biosite_services,
  public.nexor_biosite_faq_items,
  public.nexor_biosite_plan_items,
  public.nexor_biosite_site_content
  to anon, authenticated;

alter table public.nexor_biosite_hero_slides enable row level security;
alter table public.nexor_biosite_services enable row level security;
alter table public.nexor_biosite_faq_items enable row level security;
alter table public.nexor_biosite_plan_items enable row level security;
alter table public.nexor_biosite_site_content enable row level security;

-- Leitura publica do site e escrita via painel com senha simples do front-end.
-- Observacao: sem login/backend, esta permissao precisa permitir anon para o painel salvar.
drop policy if exists "Nexor public read hero slides" on public.nexor_biosite_hero_slides;
create policy "Nexor public read hero slides" on public.nexor_biosite_hero_slides for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write hero slides" on public.nexor_biosite_hero_slides;
create policy "Nexor admin write hero slides" on public.nexor_biosite_hero_slides for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read services" on public.nexor_biosite_services;
create policy "Nexor public read services" on public.nexor_biosite_services for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write services" on public.nexor_biosite_services;
create policy "Nexor admin write services" on public.nexor_biosite_services for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read faq items" on public.nexor_biosite_faq_items;
create policy "Nexor public read faq items" on public.nexor_biosite_faq_items for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write faq items" on public.nexor_biosite_faq_items;
create policy "Nexor admin write faq items" on public.nexor_biosite_faq_items for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read plan items" on public.nexor_biosite_plan_items;
create policy "Nexor public read plan items" on public.nexor_biosite_plan_items for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write plan items" on public.nexor_biosite_plan_items;
create policy "Nexor admin write plan items" on public.nexor_biosite_plan_items for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read site content" on public.nexor_biosite_site_content;
create policy "Nexor public read site content" on public.nexor_biosite_site_content for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write site content" on public.nexor_biosite_site_content;
create policy "Nexor admin write site content" on public.nexor_biosite_site_content for all to anon, authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('nexor-biosite-assets', 'nexor-biosite-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Nexor public reads assets" on storage.objects;
create policy "Nexor public reads assets" on storage.objects for select to anon, authenticated using (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin uploads assets" on storage.objects;
create policy "Nexor admin uploads assets" on storage.objects for insert to anon, authenticated with check (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin updates assets" on storage.objects;
create policy "Nexor admin updates assets" on storage.objects for update to anon, authenticated using (bucket_id = 'nexor-biosite-assets') with check (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin deletes assets" on storage.objects;
create policy "Nexor admin deletes assets" on storage.objects for delete to anon, authenticated using (bucket_id = 'nexor-biosite-assets');
