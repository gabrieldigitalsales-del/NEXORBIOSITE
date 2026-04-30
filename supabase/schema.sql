-- NEXOR Biosite - Supabase schema exclusivo do projeto
-- Execute no SQL Editor do Supabase.
-- Este arquivo cria tudo dentro do schema nexor_biosite para nao misturar com outros projetos.

create extension if not exists pgcrypto;
create schema if not exists nexor_biosite;

grant usage on schema nexor_biosite to anon, authenticated;
grant all on schema nexor_biosite to service_role;

create table if not exists nexor_biosite.hero_slides (
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

create table if not exists nexor_biosite.services (
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

create table if not exists nexor_biosite.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null default '',
  answer text not null default '',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nexor_biosite.plan_items (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  featured boolean not null default false,
  features text[] not null default '{}',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nexor_biosite.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null default '',
  value_type text not null default 'text' check (value_type in ('text', 'image_url', 'url', 'color')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(section, key)
);

create or replace function nexor_biosite.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_hero_slides_updated_at on nexor_biosite.hero_slides;
create trigger set_hero_slides_updated_at before update on nexor_biosite.hero_slides for each row execute function nexor_biosite.set_updated_at();

drop trigger if exists set_services_updated_at on nexor_biosite.services;
create trigger set_services_updated_at before update on nexor_biosite.services for each row execute function nexor_biosite.set_updated_at();

drop trigger if exists set_faq_items_updated_at on nexor_biosite.faq_items;
create trigger set_faq_items_updated_at before update on nexor_biosite.faq_items for each row execute function nexor_biosite.set_updated_at();

drop trigger if exists set_plan_items_updated_at on nexor_biosite.plan_items;
create trigger set_plan_items_updated_at before update on nexor_biosite.plan_items for each row execute function nexor_biosite.set_updated_at();

drop trigger if exists set_site_content_updated_at on nexor_biosite.site_content;
create trigger set_site_content_updated_at before update on nexor_biosite.site_content for each row execute function nexor_biosite.set_updated_at();

grant select, insert, update, delete on all tables in schema nexor_biosite to anon, authenticated;
grant usage, select on all sequences in schema nexor_biosite to anon, authenticated;

alter table nexor_biosite.hero_slides enable row level security;
alter table nexor_biosite.services enable row level security;
alter table nexor_biosite.faq_items enable row level security;
alter table nexor_biosite.plan_items enable row level security;
alter table nexor_biosite.site_content enable row level security;

-- Leitura publica do site e escrita via painel com senha do front-end.
-- Sem login Supabase/servidor, a seguranca real fica limitada ao controle da interface.
drop policy if exists "Nexor public read hero slides" on nexor_biosite.hero_slides;
create policy "Nexor public read hero slides" on nexor_biosite.hero_slides for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write hero slides" on nexor_biosite.hero_slides;
create policy "Nexor admin write hero slides" on nexor_biosite.hero_slides for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read services" on nexor_biosite.services;
create policy "Nexor public read services" on nexor_biosite.services for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write services" on nexor_biosite.services;
create policy "Nexor admin write services" on nexor_biosite.services for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read faq items" on nexor_biosite.faq_items;
create policy "Nexor public read faq items" on nexor_biosite.faq_items for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write faq items" on nexor_biosite.faq_items;
create policy "Nexor admin write faq items" on nexor_biosite.faq_items for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read plan items" on nexor_biosite.plan_items;
create policy "Nexor public read plan items" on nexor_biosite.plan_items for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write plan items" on nexor_biosite.plan_items;
create policy "Nexor admin write plan items" on nexor_biosite.plan_items for all to anon, authenticated using (true) with check (true);

drop policy if exists "Nexor public read site content" on nexor_biosite.site_content;
create policy "Nexor public read site content" on nexor_biosite.site_content for select to anon, authenticated using (true);
drop policy if exists "Nexor admin write site content" on nexor_biosite.site_content;
create policy "Nexor admin write site content" on nexor_biosite.site_content for all to anon, authenticated using (true) with check (true);

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
