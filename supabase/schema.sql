create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'student'
    check (role in ('student', 'teacher', 'parent', 'admin', 'super_admin')),
  class_name text,
  section text,
  roll_number text,
  created_at timestamptz default now()
);

create table if not exists public.notices (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  content text,
  file_path text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.notices enable row level security;
alter table public.posts enable row level security;

create policy "Users can read profiles"
on public.profiles for select
to authenticated
using (true);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Anyone can read notices"
on public.notices for select
using (true);

create policy "Authenticated users can read posts"
on public.posts for select
to authenticated
using (true);

create policy "Users can create own posts"
on public.posts for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete own posts"
on public.posts for delete
to authenticated
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('school-files', 'school-files', false)
on conflict (id) do nothing;

create policy "Authenticated upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'school-files');

create policy "Authenticated read"
on storage.objects for select
to authenticated
using (bucket_id = 'school-files');
