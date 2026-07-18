-- ============================================================
-- MINDWELL — SUPABASE SCHEMA (Free Tier: 500MB DB + 1GB Storage)
-- Run this in the Supabase SQL editor (Dashboard > SQL > New query)
-- Then enable Auth and create a Storage bucket named 'avatars' (public)
-- ============================================================

-- ---------- USERS (profiles, linked to auth.users) ----------
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  avatar_url text,
  preferences jsonb default '{"theme":"system","notifications":true,"language":"en"}'::jsonb,
  created_at timestamptz default now()
);

-- ---------- DISORDERS (reference library) ----------
create table if not exists public.disorders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  symptoms text[],
  treatments text[],
  prevalence text,
  severity text check (severity in ('mild','moderate','severe')),
  created_at timestamptz default now()
);

-- ---------- CBT EXERCISES ----------
create table if not exists public.cbt_exercises (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text check (category in ('thoughts','behaviors','emotions','core_beliefs')),
  difficulty text check (difficulty in ('beginner','intermediate','advanced')),
  estimated_time integer,
  steps jsonb,
  tags text[],
  created_at timestamptz default now()
);

-- ---------- WELLNESS LOGS ----------
create table if not exists public.wellness_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  mood integer check (mood between 1 and 10),
  energy integer check (energy between 1 and 10),
  stress integer check (stress between 1 and 10),
  sleep numeric,
  notes text,
  logged_at timestamptz default now()
);

-- ---------- APPOINTMENTS ----------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  therapist_id uuid,
  therapist_name text,
  type text check (type in ('therapy','psychiatry','coaching','group')),
  status text default 'scheduled' check (status in ('scheduled','completed','cancelled','rescheduled')),
  appointment_at timestamptz,
  duration integer,
  notes text,
  created_at timestamptz default now()
);

-- ---------- VENT POSTS (community) ----------
create table if not exists public.vent_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.users(id) on delete cascade,
  author_name text,
  content text not null,
  category text check (category in ('vent','support','celebration','question')),
  anonymous boolean default false,
  likes integer default 0,
  replies integer default 0,
  tags text[],
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.wellness_logs enable row level security;
alter table public.appointments enable row level security;
alter table public.vent_posts enable row level security;
alter table public.disorders enable row level security;
alter table public.cbt_exercises enable row level security;

-- users: a person can read all profiles but only write their own
create policy "profiles readable" on public.users for select using (true);
create policy "own profile write" on public.users for all using (auth.uid() = id) with check (auth.uid() = id);

-- wellness_logs: owner only
create policy "own logs" on public.wellness_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- appointments: owner only
create policy "own appointments" on public.appointments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- vent_posts: readable by all, writable by owner
create policy "posts readable" on public.vent_posts for select using (true);
create policy "own posts write" on public.vent_posts for all using (auth.uid() = author_id) with check (auth.uid() = author_id);

-- reference tables: public read
create policy "disorders public" on public.disorders for select using (true);
create policy "cbt public" on public.cbt_exercises for select using (true);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Friend'), new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- SEED: a few disorders + CBT exercises (optional demo data)
-- ============================================================
insert into public.disorders (name, category, description, symptoms, treatments, prevalence, severity) values
 ('Generalized Anxiety', 'Anxiety', 'Persistent, excessive worry about everyday matters.', array['Restlessness','Fatigue','Difficulty concentrating'], array['CBT','Mindfulness','Breathing'], 'Affects ~6% of adults', 'moderate'),
 ('Depression', 'Mood', 'Persistent low mood and loss of interest.', array['Low mood','Fatigue','Sleep changes'], array['Therapy','CBT','Routine'], 'Affects ~5% of adults', 'severe'),
 ('Burnout', 'Stress', 'Physical and emotional exhaustion from chronic stress.', array['Exhaustion','Cynicism','Reduced performance'], array['Rest','Boundaries','Coaching'], 'Rising globally', 'moderate')
on conflict do nothing;

insert into public.cbt_exercises (title, description, category, difficulty, estimated_time, tags) values
 ('Thought Record', 'Capture a triggering thought and examine the evidence.', 'thoughts', 'beginner', 10, array['anxiety','reflection']),
 ('Cognitive Restructuring', 'Reframe unhelpful thoughts into balanced ones.', 'thoughts', 'intermediate', 15, array['anxiety','depression']),
 ('Box Breathing', 'A simple 4-4-4-4 breathing pattern to calm the nervous system.', 'emotions', 'beginner', 5, array['stress','sleep'])
on conflict do nothing;
