-- European Destination Wedding Venue Platform
-- Migration 0001: Initial schema

-- Enums
create type country_code as enum ('IT','FR','ES','PT','UK');
create type venue_type as enum (
  'chateau','villa','castle','vineyard','masia',
  'farmhouse','coastal','country_estate','historic_manor','palazzo'
);
create type season as enum ('spring','summer','autumn','winter');
create type price_band as enum ('$','$$','$$$','$$$$');
create type inquiry_status as enum ('pending','sent','replied','closed');
create type review_status as enum ('pending','approved','rejected');

-- Venues
create table venues (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country country_code not null,
  region text not null,
  nearest_city text not null,
  nearest_airport_code text not null,
  nearest_airport_name text not null,
  airport_drive_minutes int not null,
  lat double precision not null,
  lng double precision not null,
  venue_types venue_type[] not null,
  capacity_min int not null,
  capacity_max int not null,
  price_band price_band not null,
  estimated_price_eur_min int,
  estimated_price_eur_max int,
  seasons season[] not null,
  onsite_accommodation boolean not null default false,
  onsite_beds int,
  in_house_catering boolean not null default false,
  ceremony_and_reception boolean not null default false,
  outdoor_ceremony boolean not null default false,
  indoor_backup boolean not null default false,
  exclusive_use boolean not null default false,
  pet_friendly boolean not null default false,
  accessibility_notes text,
  short_description text not null,
  long_description text not null,
  highlights text[] not null,
  tags text[] not null default '{}',
  website text,
  contact_email text,
  hero_image_url text not null,
  gallery_image_urls text[] not null default '{}',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on venues (country);
create index on venues (price_band);
create index on venues using gin (venue_types);
create index on venues using gin (tags);
create index on venues using gin (
  to_tsvector('simple', name || ' ' || region || ' ' || short_description || ' ' || long_description)
);

-- Reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  reviewer_name text not null,
  reviewer_location text,
  event_date date,
  guest_count int,
  rating int not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  status review_status not null default 'approved',
  created_at timestamptz not null default now()
);
create index on reviews (venue_id);
create index on reviews (status);

-- Inquiries
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  preferred_date_from date,
  preferred_date_to date,
  date_flexible boolean not null default false,
  guest_count int not null,
  budget_band price_band,
  message text not null,
  status inquiry_status not null default 'pending',
  venue_reply text,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);
create index on inquiries (venue_id);
create index on inquiries (user_id);
create index on inquiries (status);

-- Shortlists (authenticated users)
create table shortlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  venue_id uuid not null references venues(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, venue_id)
);

-- Profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- Trigger: auto-create profile on user sign-up
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Trigger: update updated_at on venues
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger venues_updated_at
  before update on venues
  for each row execute procedure update_updated_at();

-- ─────────────────────────────────────────────
-- Row-Level Security
-- ─────────────────────────────────────────────
alter table venues enable row level security;
alter table reviews enable row level security;
alter table inquiries enable row level security;
alter table shortlists enable row level security;
alter table profiles enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- venues: public read; only admins can write
create policy "Venues are publicly readable"
  on venues for select using (true);

create policy "Admins can insert venues"
  on venues for insert
  with check (is_admin());

create policy "Admins can update venues"
  on venues for update
  using (is_admin());

create policy "Admins can delete venues"
  on venues for delete
  using (is_admin());

-- reviews: approved reviews are public; anyone can insert pending; admins manage
create policy "Approved reviews are publicly readable"
  on reviews for select
  using (status = 'approved' or is_admin());

create policy "Anyone can submit a review (pending)"
  on reviews for insert
  with check (status = 'pending');

create policy "Admins can update reviews"
  on reviews for update
  using (is_admin());

create policy "Admins can delete reviews"
  on reviews for delete
  using (is_admin());

-- inquiries: users see own rows; guests allowed via service role; admins see all
create policy "Users see their own inquiries"
  on inquiries for select
  using (user_id = auth.uid() or is_admin());

create policy "Admins can update inquiries"
  on inquiries for update
  using (is_admin());

-- shortlists: users manage only their own rows
create policy "Users manage their own shortlist"
  on shortlists for select
  using (user_id = auth.uid());

create policy "Users can add to shortlist"
  on shortlists for insert
  with check (user_id = auth.uid());

create policy "Users can remove from shortlist"
  on shortlists for delete
  using (user_id = auth.uid());

-- profiles: users manage their own; admins read all
create policy "Users can read their own profile"
  on profiles for select
  using (id = auth.uid() or is_admin());

create policy "Users can update their own profile"
  on profiles for update
  using (id = auth.uid());
