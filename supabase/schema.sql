-- NEXOR Biosite - Supabase schema
-- Execute este arquivo no SQL Editor do Supabase antes de subir o projeto para a Vercel.

create extension if not exists pgcrypto;

create table if not exists public.hero_slides (
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

create table if not exists public.services (
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

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null default '',
  answer text not null default '',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plan_items (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  featured boolean not null default false,
  features text[] not null default '{}',
  "order" integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null default '',
  value_type text not null default 'text' check (value_type in ('text', 'image_url', 'url', 'color')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(section, key)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_hero_slides_updated_at on public.hero_slides;
create trigger set_hero_slides_updated_at before update on public.hero_slides for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();

drop trigger if exists set_faq_items_updated_at on public.faq_items;
create trigger set_faq_items_updated_at before update on public.faq_items for each row execute function public.set_updated_at();

drop trigger if exists set_plan_items_updated_at on public.plan_items;
create trigger set_plan_items_updated_at before update on public.plan_items for each row execute function public.set_updated_at();

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at before update on public.site_content for each row execute function public.set_updated_at();

alter table public.hero_slides enable row level security;
alter table public.services enable row level security;
alter table public.faq_items enable row level security;
alter table public.plan_items enable row level security;
alter table public.site_content enable row level security;

-- Public site can read only active CMS records. Authenticated admins can read everything.
drop policy if exists "Public reads active hero slides" on public.hero_slides;
create policy "Public reads active hero slides" on public.hero_slides for select using (active = true);
drop policy if exists "Authenticated reads all hero slides" on public.hero_slides;
create policy "Authenticated reads all hero slides" on public.hero_slides for select to authenticated using (true);
drop policy if exists "Authenticated manages hero slides" on public.hero_slides;
create policy "Authenticated manages hero slides" on public.hero_slides for all to authenticated using (true) with check (true);

drop policy if exists "Public reads active services" on public.services;
create policy "Public reads active services" on public.services for select using (active = true);
drop policy if exists "Authenticated reads all services" on public.services;
create policy "Authenticated reads all services" on public.services for select to authenticated using (true);
drop policy if exists "Authenticated manages services" on public.services;
create policy "Authenticated manages services" on public.services for all to authenticated using (true) with check (true);

drop policy if exists "Public reads active faq items" on public.faq_items;
create policy "Public reads active faq items" on public.faq_items for select using (active = true);
drop policy if exists "Authenticated reads all faq items" on public.faq_items;
create policy "Authenticated reads all faq items" on public.faq_items for select to authenticated using (true);
drop policy if exists "Authenticated manages faq items" on public.faq_items;
create policy "Authenticated manages faq items" on public.faq_items for all to authenticated using (true) with check (true);

drop policy if exists "Public reads active plan items" on public.plan_items;
create policy "Public reads active plan items" on public.plan_items for select using (active = true);
drop policy if exists "Authenticated reads all plan items" on public.plan_items;
create policy "Authenticated reads all plan items" on public.plan_items for select to authenticated using (true);
drop policy if exists "Authenticated manages plan items" on public.plan_items;
create policy "Authenticated manages plan items" on public.plan_items for all to authenticated using (true) with check (true);

drop policy if exists "Public reads site content" on public.site_content;
create policy "Public reads site content" on public.site_content for select using (true);
drop policy if exists "Authenticated manages site content" on public.site_content;
create policy "Authenticated manages site content" on public.site_content for all to authenticated using (true) with check (true);

-- Public storage bucket for images uploaded by admin.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public reads site assets" on storage.objects;
create policy "Public reads site assets" on storage.objects for select using (bucket_id = 'site-assets');
drop policy if exists "Authenticated uploads site assets" on storage.objects;
create policy "Authenticated uploads site assets" on storage.objects for insert to authenticated with check (bucket_id = 'site-assets');
drop policy if exists "Authenticated updates site assets" on storage.objects;
create policy "Authenticated updates site assets" on storage.objects for update to authenticated using (bucket_id = 'site-assets') with check (bucket_id = 'site-assets');
drop policy if exists "Authenticated deletes site assets" on storage.objects;
create policy "Authenticated deletes site assets" on storage.objects for delete to authenticated using (bucket_id = 'site-assets');
