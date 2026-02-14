-- Roleplay Trainer Database Schema
-- Run this in the Supabase SQL Editor

-- Profiles table (linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Progress table
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text not null,
  status text check (status in ('started', 'completed')) default 'started',
  badge_url text,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.progress enable row level security;

-- Progress policies
create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress for update
  using (auth.uid() = user_id);

-- Index for faster lookups
create index if not exists idx_progress_user_id on public.progress(user_id);
create index if not exists idx_progress_course_id on public.progress(course_id);
