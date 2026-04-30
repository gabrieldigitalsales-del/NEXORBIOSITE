-- NEXOR Biosite - schema.sql DEFINITIVO
-- Execute este arquivo inteiro no SQL Editor do Supabase.
-- Estrutura isolada no schema public com prefixo nexor_biosite_.
-- Seguro para rodar mais de uma vez: cria e tambem repara colunas/permissoes se algo ficou incompleto.

create extension if not exists pgcrypto;
grant usage on schema public to anon, authenticated;

create table if not exists public.nexor_biosite_hero_slides (
  id uuid primary key default gen_random_uuid()
);
alter table public.nexor_biosite_hero_slides add column if not exists tag text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists title text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists highlight text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists "desc" text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists cta text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists wamsg text not null default '';
alter table public.nexor_biosite_hero_slides add column if not exists image_url text default '';
alter table public.nexor_biosite_hero_slides add column if not exists bg_color text default 'from-amber-50 to-orange-50';
alter table public.nexor_biosite_hero_slides add column if not exists "order" integer not null default 1;
alter table public.nexor_biosite_hero_slides add column if not exists active boolean not null default true;
alter table public.nexor_biosite_hero_slides add column if not exists created_at timestamptz not null default now();
alter table public.nexor_biosite_hero_slides add column if not exists updated_at timestamptz not null default now();

create table if not exists public.nexor_biosite_services (
  id uuid primary key default gen_random_uuid()
);
alter table public.nexor_biosite_services add column if not exists tag text not null default '';
alter table public.nexor_biosite_services add column if not exists title text not null default '';
alter table public.nexor_biosite_services add column if not exists "desc" text not null default '';
alter table public.nexor_biosite_services add column if not exists features text[] not null default '{}';
alter table public.nexor_biosite_services add column if not exists wamsg text not null default '';
alter table public.nexor_biosite_services add column if not exists bg_color text default 'from-amber-50 to-orange-50';
alter table public.nexor_biosite_services add column if not exists badge_color text default 'bg-amber-100 text-amber-700';
alter table public.nexor_biosite_services add column if not exists icon_name text default 'LayoutGrid';
alter table public.nexor_biosite_services add column if not exists "order" integer not null default 1;
alter table public.nexor_biosite_services add column if not exists active boolean not null default true;
alter table public.nexor_biosite_services add column if not exists created_at timestamptz not null default now();
alter table public.nexor_biosite_services add column if not exists updated_at timestamptz not null default now();

create table if not exists public.nexor_biosite_faq_items (
  id uuid primary key default gen_random_uuid()
);
alter table public.nexor_biosite_faq_items add column if not exists question text not null default '';
alter table public.nexor_biosite_faq_items add column if not exists answer text not null default '';
alter table public.nexor_biosite_faq_items add column if not exists "order" integer not null default 1;
alter table public.nexor_biosite_faq_items add column if not exists active boolean not null default true;
alter table public.nexor_biosite_faq_items add column if not exists created_at timestamptz not null default now();
alter table public.nexor_biosite_faq_items add column if not exists updated_at timestamptz not null default now();

create table if not exists public.nexor_biosite_plan_items (
  id uuid primary key default gen_random_uuid()
);
alter table public.nexor_biosite_plan_items add column if not exists name text not null default '';
alter table public.nexor_biosite_plan_items add column if not exists featured boolean not null default false;
alter table public.nexor_biosite_plan_items add column if not exists features text[] not null default '{}';
alter table public.nexor_biosite_plan_items add column if not exists "order" integer not null default 1;
alter table public.nexor_biosite_plan_items add column if not exists active boolean not null default true;
alter table public.nexor_biosite_plan_items add column if not exists created_at timestamptz not null default now();
alter table public.nexor_biosite_plan_items add column if not exists updated_at timestamptz not null default now();

create table if not exists public.nexor_biosite_site_content (
  id uuid primary key default gen_random_uuid()
);
alter table public.nexor_biosite_site_content add column if not exists section text not null default '';
alter table public.nexor_biosite_site_content add column if not exists key text not null default '';
alter table public.nexor_biosite_site_content add column if not exists value text not null default '';
alter table public.nexor_biosite_site_content add column if not exists value_type text not null default 'text';
alter table public.nexor_biosite_site_content add column if not exists created_at timestamptz not null default now();
alter table public.nexor_biosite_site_content add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'nexor_biosite_site_content_section_key_unique'
  ) then
    alter table public.nexor_biosite_site_content
      add constraint nexor_biosite_site_content_section_key_unique unique(section, key);
  end if;
end $$;

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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('nexor-biosite-assets', 'nexor-biosite-assets', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Nexor public reads assets" on storage.objects;
create policy "Nexor public reads assets" on storage.objects for select to anon, authenticated using (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin uploads assets" on storage.objects;
create policy "Nexor admin uploads assets" on storage.objects for insert to anon, authenticated with check (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin updates assets" on storage.objects;
create policy "Nexor admin updates assets" on storage.objects for update to anon, authenticated using (bucket_id = 'nexor-biosite-assets') with check (bucket_id = 'nexor-biosite-assets');
drop policy if exists "Nexor admin deletes assets" on storage.objects;
create policy "Nexor admin deletes assets" on storage.objects for delete to anon, authenticated using (bucket_id = 'nexor-biosite-assets');

-- Teste rapido depois de executar:
-- select count(*) from public.nexor_biosite_hero_slides;
