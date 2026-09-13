create type public.user_role as enum ('candidate', 'company', 'admin');
create type public.job_status as enum ('pending', 'approved', 'rejected');
create type public.application_status as enum ('applied', 'reviewing', 'rejected', 'accepted');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'candidate',
  japanese_level text,
  visa_type text,
  location text,
  created_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  company_name text not null,
  description text,
  website text,
  logo_url text,
  created_at timestamptz not null default now()
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  description text not null,
  prefecture text not null,
  city text not null,
  salary_min integer,
  salary_max integer,
  japanese_level text not null,
  visa_type text not null,
  contract_type text not null,
  remote_type text not null default 'onsite',
  status public.job_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.profiles(id) on delete cascade,
  message text,
  status public.application_status not null default 'applied',
  created_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (job_id, user_id)
);

create index jobs_status_idx on public.jobs(status);
create index jobs_filters_idx on public.jobs(prefecture, japanese_level, visa_type, contract_type);
create index applications_candidate_idx on public.applications(candidate_id);

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.favorites enable row level security;

create policy "Public approved jobs are readable"
on public.jobs for select
using (status = 'approved');

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);
