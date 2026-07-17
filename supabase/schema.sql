우리-- EVERY AI TOOLS - DATABASE SCHEMA (SUPABASE READY)

-- Enable uuid extension
create extension if not exists "uuid-ossp";

-- INDEPENDENT AUTH PROFILES
-- Run this schema in the Supabase project used by this app. A profile is
-- created automatically whenever a user signs up through Supabase Auth.
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    username text,
    plan text not null default 'free' check (plan in ('free', 'pro')),
    role text not null default 'user' check (role in ('user', 'admin')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile" on public.profiles
    for select to authenticated using ((select auth.uid()) = id);

-- Profile entitlements are server-managed. Browser clients may read their own
-- row but cannot promote themselves to Pro or admin.
revoke insert, update, delete on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

-- Avoid recursive RLS checks while determining whether the current user is an
-- administrator. The function runs as its owner and exposes only a boolean.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
    select exists (
        select 1 from public.profiles
        where id = (select auth.uid()) and role = 'admin'
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create policy "Admins can read all profiles" on public.profiles
    for select to authenticated using ((select public.is_admin()));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
    insert into public.profiles (id, email, username)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data ->> 'user_name', new.raw_user_meta_data ->> 'name')
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- 1. CATEGORIES TABLE
create table if not exists categories (
    id text primary key,
    name jsonb not null, -- { "en": "...", "ko": "..." }
    slug text not null unique,
    description jsonb not null,
    icon text not null,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. TOOLS TABLE
create table if not exists tools (
    id text primary key default uuid_generate_v4()::text,
    name text not null unique,
    slug text not null unique,
    description jsonb not null, -- { "en": "...", "ko": "..." }
    long_description jsonb not null,
    beginner_description jsonb,
    website_url text not null,
    affiliate_url text,
    logo_url text not null,
    category_id text references categories(id) on delete set null,
    pricing_type text not null check (pricing_type in ('Free', 'Freemium', 'Paid')),
    starting_price text,
    rating numeric(3, 2) default 5.00 check (rating >= 0.00 and rating <= 5.00),
    beginner_friendly boolean default false,
    korean_support boolean default false,
    mobile_support boolean default false,
    commercial_use boolean default false,
    featured boolean default false,
    tags text[] default '{}'::text[],
    features jsonb[] default '{}'::jsonb[],
    pros jsonb[] default '{}'::jsonb[],
    cons jsonb[] default '{}'::jsonb[],
    use_cases jsonb[] default '{}'::jsonb[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. COMPARISONS TABLE
create table if not exists comparisons (
    id text primary key default uuid_generate_v4()::text,
    title jsonb not null,
    slug text not null unique,
    tool_ids text[] default '{}'::text[], -- References tools(id)
    summary jsonb not null,
    table_data jsonb not null, -- Array of features and comparison values
    pros_and_cons jsonb not null, -- Mapping of toolId -> { pros, cons }
    recommendation jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SUBMISSIONS TABLE
create table if not exists submissions (
    id uuid default uuid_generate_v4() primary key,
    tool_name text not null,
    website_url text not null,
    category text not null,
    description text not null,
    pricing_type text not null,
    submitter_name text not null,
    email text not null,
    listing_type text not null check (listing_type in ('Free', 'Featured ($29)', 'Sponsored ($99)', 'Premium ($199/mo)')),
    status text default 'pending'::text check (status in ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. NEWSLETTER SUBSCRIBERS TABLE
create table if not exists newsletter_subscribers (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    source text default 'homepage'::text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRIGGER FOR UPDATED_AT IN TOOLS
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_tools_updated_at
    before update on tools
    for each row
    execute procedure update_updated_at_column();

-- ENABLE ROW LEVEL SECURITY (RLS) FOR SECURITY
alter table categories enable row level security;
alter table tools enable row level security;
alter table comparisons enable row level security;
alter table submissions enable row level security;
alter table newsletter_subscribers enable row level security;

-- RLS POLICIES

-- Read access is public for content tables
create policy "Allow public read access for categories" on categories
    for select using (true);

create policy "Allow public read access for tools" on tools
    for select using (true);

create policy "Allow public read access for comparisons" on comparisons
    for select using (true);

-- Submission writing is public, while reading and moderation are admin-only.
create policy "Allow public to submit tools" on submissions
    for insert with check (true);

create policy "Allow authenticated admin to read submissions" on submissions
    for select to authenticated using ((select public.is_admin()));

create policy "Allow authenticated admin to update submissions" on submissions
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

-- Newsletter signups are public
create policy "Allow public to subscribe to newsletter" on newsletter_subscribers
    for insert with check (true);

create policy "Allow authenticated admin to view subscribers" on newsletter_subscribers
    for select to authenticated using ((select public.is_admin()));
