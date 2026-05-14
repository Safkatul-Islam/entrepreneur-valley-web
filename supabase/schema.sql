-- Entrepreneur Valley — database schema
-- Run this once in the Supabase SQL editor for the club project.
-- Idempotent: safe to re-run.

-- ============================================================================
-- 1. Registrations
-- ============================================================================

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null default 'sharks-valley',
  full_name text not null,
  email text not null,
  phone text,
  school text not null,
  year_major text not null,
  dietary text,
  accessibility text,
  motivation text,
  consent bool not null,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

-- No anon policies. All writes go through the Next.js API route using the
-- service-role key (server only). Reads happen via the Supabase dashboard
-- or a future authenticated admin view.

create index if not exists registrations_event_created_idx
  on public.registrations (event_slug, created_at desc);

create unique index if not exists registrations_event_email_uniq
  on public.registrations (event_slug, lower(email));

-- ============================================================================
-- 1b. Migration: two-track registration (attendee / pitcher)
-- ============================================================================
-- Safe to re-run: uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS.

alter table public.registrations
  add column if not exists registration_type text not null default 'attendee';

alter table public.registrations
  add column if not exists major text;

alter table public.registrations
  add column if not exists video_url text;

-- major: active academic major / focus for registrants (used by current API).
-- year_major: legacy column from the original single-field schema; prefer
--   `major` for new data. Optionally backfill year_major from major via SQL
--   in the dashboard for reporting continuity.

alter table public.registrations
  alter column year_major drop not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_registration_type_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_registration_type_check
      check (registration_type in ('attendee', 'pitcher'));
  end if;
end $$;

-- ============================================================================
-- 1c. Supabase Storage — pitch-videos bucket
-- ============================================================================
-- Create via Supabase dashboard or CLI:
--   Storage → New bucket → "pitch-videos"
--   - Public: ON (the app returns public review links after upload)
--   - Max file size: 100 MB
--   - Allowed MIME types: video/mp4, video/quicktime, video/webm
--
-- All uploads go through the Next.js API route using the service-role key,
-- so no anon/authenticated insert policies are needed. Public read access is
-- used for unlisted review links in confirmation/admin emails.

-- ============================================================================
-- 2. Rate limiting (DB-backed; durable across Vercel cold starts)
-- ============================================================================

create table if not exists public.rate_limits (
  key text primary key,
  count int not null default 0,
  window_start timestamptz not null default now()
);

alter table public.rate_limits enable row level security;

-- Atomic rate-limit check. Returns whether the request is allowed and, if not,
-- how many seconds until the bucket resets. Uses SELECT FOR UPDATE to avoid
-- races between concurrent serverless invocations.
create or replace function public.check_rate_limit(
  p_key text,
  p_limit int,
  p_window_seconds int
) returns table (allowed boolean, retry_after int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window interval := make_interval(secs => p_window_seconds);
  v_row public.rate_limits%rowtype;
begin
  select * into v_row from public.rate_limits where key = p_key for update;

  if not found then
    insert into public.rate_limits (key, count, window_start)
    values (p_key, 1, v_now);
    return query select true, 0;
    return;
  end if;

  if v_row.window_start + v_window < v_now then
    update public.rate_limits
    set count = 1, window_start = v_now
    where key = p_key;
    return query select true, 0;
    return;
  end if;

  if v_row.count >= p_limit then
    return query select false,
      ceil(extract(epoch from (v_row.window_start + v_window - v_now)))::int;
    return;
  end if;

  update public.rate_limits
  set count = count + 1
  where key = p_key;
  return query select true, 0;
end;
$$;

revoke all on function public.check_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function public.check_rate_limit(text, int, int) to service_role;

-- ============================================================================
-- 3. PII retention — null out ip/user_agent on rows older than 30 days
-- ============================================================================
-- Run nightly via Supabase Scheduled Jobs:
--   select public.purge_old_pii();

create or replace function public.purge_old_pii() returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  update public.registrations
  set ip = null, user_agent = null
  where created_at < now() - interval '30 days'
    and (ip is not null or user_agent is not null);
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.purge_old_pii() from public, anon, authenticated;
grant execute on function public.purge_old_pii() to service_role;

-- After applying this schema, schedule the purge in the Supabase dashboard:
--   Database → Cron → New job → "purge_old_pii" → daily at 03:00 UTC →
--   command: select public.purge_old_pii();
