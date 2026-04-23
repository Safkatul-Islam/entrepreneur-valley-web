-- Entrepreneur Valley — database schema
-- Run this once in the Supabase SQL editor for the club project.

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
