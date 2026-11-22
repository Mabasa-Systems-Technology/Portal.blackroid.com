-- Blackroid Portal foundation. Apply only after reviewing against the target Supabase project.
create extension if not exists pgcrypto;

create type public.internal_role as enum ('platform_admin', 'operations_manager', 'specialist', 'reviewer');
create type public.client_role as enum ('client_admin', 'client_member');
create type public.engagement_status as enum ('draft', 'awaiting_approval', 'active', 'under_review', 'completed', 'closed', 'blocked');
create type public.document_visibility as enum ('internal', 'client');

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(), name text not null, sector text, status text not null default 'active', contact_email text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade, full_name text not null default '', email text, avatar_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.organisation_members (
  organisation_id uuid not null references public.organisations(id) on delete cascade, user_id uuid not null references public.profiles(id) on delete cascade,
  role public.client_role not null default 'client_member', created_at timestamptz not null default now(), primary key (organisation_id, user_id)
);
create table if not exists public.internal_staff (
  user_id uuid primary key references public.profiles(id) on delete cascade, role public.internal_role not null, active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.service_definitions (
  id uuid primary key default gen_random_uuid(), name text not null, category text not null, description text, active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.engagements (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references public.organisations(id) on delete cascade, service_id uuid references public.service_definitions(id), name text not null, scope text, status public.engagement_status not null default 'draft', starts_on date, ends_on date, owner_id uuid references public.profiles(id), client_visible_progress integer not null default 0 check (client_visible_progress between 0 and 100), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(), engagement_id uuid not null references public.engagements(id) on delete cascade, title text not null, description text, status text not null default 'open', assigned_to uuid references public.profiles(id), due_at timestamptz, findings text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.document_records (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references public.organisations(id) on delete cascade, engagement_id uuid references public.engagements(id) on delete cascade, uploaded_by uuid not null references public.profiles(id), storage_path text not null, file_name text not null, mime_type text, visibility public.document_visibility not null default 'internal', version integer not null default 1, created_at timestamptz not null default now()
);
create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(), engagement_id uuid not null references public.engagements(id) on delete cascade, document_id uuid not null references public.document_records(id), status text not null default 'awaiting_review', reviewed_by uuid references public.profiles(id), reviewed_at timestamptz, published_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.information_requests (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references public.organisations(id) on delete cascade, engagement_id uuid references public.engagements(id) on delete cascade, title text not null, description text, status text not null default 'open', due_at timestamptz, requested_by uuid not null references public.profiles(id), resolved_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references public.organisations(id) on delete cascade, engagement_id uuid references public.engagements(id) on delete cascade, deliverable_id uuid references public.deliverables(id) on delete cascade, decision text not null, decided_by uuid not null references public.profiles(id), note text, created_at timestamptz not null default now()
);
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references public.organisations(id) on delete cascade, engagement_id uuid references public.engagements(id), reference text not null, amount_cents integer not null check (amount_cents >= 0), currency text not null default 'ZAR', status text not null default 'draft', due_on date, created_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, title text not null, body text, read_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(), actor_id uuid references public.profiles(id), organisation_id uuid references public.organisations(id), action text not null, entity_type text not null, entity_id uuid, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);

alter table public.organisations enable row level security;
alter table public.profiles enable row level security;
alter table public.organisation_members enable row level security;
alter table public.internal_staff enable row level security;
alter table public.engagements enable row level security;
alter table public.work_items enable row level security;
alter table public.document_records enable row level security;
alter table public.deliverables enable row level security;
alter table public.information_requests enable row level security;
alter table public.approvals enable row level security;
alter table public.invoices enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.is_internal_staff() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.internal_staff where user_id = auth.uid() and active); $$;
create or replace function public.is_org_member(target_org uuid) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.organisation_members where organisation_id = target_org and user_id = auth.uid()); $$;

create policy "staff can manage organisations" on public.organisations for all using (public.is_internal_staff()) with check (public.is_internal_staff());
create policy "members can view their organisation" on public.organisations for select using (public.is_org_member(id));
create policy "members can view engagements" on public.engagements for select using (public.is_internal_staff() or public.is_org_member(organisation_id));
create policy "staff can manage engagements" on public.engagements for all using (public.is_internal_staff()) with check (public.is_internal_staff());
create policy "members can view published documents" on public.document_records for select using (public.is_internal_staff() or (visibility = 'client' and public.is_org_member(organisation_id)));
create policy "staff can manage documents" on public.document_records for all using (public.is_internal_staff()) with check (public.is_internal_staff());
create policy "members can view published deliverables" on public.deliverables for select using (public.is_internal_staff() or (status = 'published' and exists (select 1 from public.engagements e where e.id = engagement_id and public.is_org_member(e.organisation_id))));
create policy "staff can manage deliverables" on public.deliverables for all using (public.is_internal_staff()) with check (public.is_internal_staff());
create policy "members can view their requests" on public.information_requests for select using (public.is_internal_staff() or public.is_org_member(organisation_id));
create policy "staff can manage requests" on public.information_requests for all using (public.is_internal_staff()) with check (public.is_internal_staff());
