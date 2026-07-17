-- Run this once in the Every AI Finder Supabase SQL Editor.
-- It allows authenticated administrators to read all signup profiles while
-- ordinary users remain limited to their own profile.

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

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles" on public.profiles
    for select to authenticated using ((select public.is_admin()));

-- Tighten the older content policies so merely being signed in never grants
-- administrative access.
drop policy if exists "Allow authenticated admin to read submissions" on public.submissions;
create policy "Allow authenticated admin to read submissions" on public.submissions
    for select to authenticated using ((select public.is_admin()));

drop policy if exists "Allow authenticated admin to update submissions" on public.submissions;
create policy "Allow authenticated admin to update submissions" on public.submissions
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

drop policy if exists "Allow authenticated admin to view subscribers" on public.newsletter_subscribers;
create policy "Allow authenticated admin to view subscribers" on public.newsletter_subscribers
    for select to authenticated using ((select public.is_admin()));
