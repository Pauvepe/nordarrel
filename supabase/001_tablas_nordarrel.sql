-- Base funcional NordArrel: web publica + admin clinico.
-- Las escrituras publicas pasan por API routes con service_role; anon no lee datos privados.

create extension if not exists pgcrypto;

create table if not exists public.nordarrel_admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  nombre text,
  rol text not null default 'admin' check (rol in ('desarrollador', 'admin', 'editor')),
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.nordarrel_contacts (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text,
  telefono text,
  fecha_nacimiento date,
  edad integer,
  canal_origen text not null default 'web',
  segmento text not null default 'lead',
  newsletter boolean not null default false,
  notas text,
  ultimo_motivo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nordarrel_contacts_email_unique unique (email)
);

create table if not exists public.nordarrel_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  estado text not null default 'activo' check (estado in ('activo', 'baja')),
  origen text not null default 'footer',
  contact_id uuid references public.nordarrel_contacts(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nordarrel_appointments (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.nordarrel_contacts(id) on delete set null,
  tipo text not null check (tipo in ('diagnostico', 'cita')),
  fecha date not null,
  hora time not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'completada', 'cancelada')),
  nombre text not null,
  email text not null,
  telefono text not null,
  motivo text,
  edad integer,
  preocupacion text,
  desde_cuando text,
  tratamientos_previos text,
  mensaje text,
  notas_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists nordarrel_appointments_slot_unique
on public.nordarrel_appointments (fecha, hora)
where estado <> 'cancelada';

create table if not exists public.nordarrel_appointment_notes (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.nordarrel_appointments(id) on delete cascade,
  contact_id uuid references public.nordarrel_contacts(id) on delete set null,
  nota text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.nordarrel_calendar_blocks (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  hora time,
  tipo text check (tipo in ('diagnostico', 'cita')),
  motivo text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.nordarrel_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists nordarrel_contacts_touch on public.nordarrel_contacts;
create trigger nordarrel_contacts_touch
before update on public.nordarrel_contacts
for each row execute function public.nordarrel_touch_updated_at();

drop trigger if exists nordarrel_newsletter_touch on public.nordarrel_newsletter_subscribers;
create trigger nordarrel_newsletter_touch
before update on public.nordarrel_newsletter_subscribers
for each row execute function public.nordarrel_touch_updated_at();

drop trigger if exists nordarrel_appointments_touch on public.nordarrel_appointments;
create trigger nordarrel_appointments_touch
before update on public.nordarrel_appointments
for each row execute function public.nordarrel_touch_updated_at();

alter table public.nordarrel_admin_users enable row level security;
alter table public.nordarrel_contacts enable row level security;
alter table public.nordarrel_newsletter_subscribers enable row level security;
alter table public.nordarrel_appointments enable row level security;
alter table public.nordarrel_appointment_notes enable row level security;
alter table public.nordarrel_calendar_blocks enable row level security;

drop policy if exists "service_role_all_admin_users" on public.nordarrel_admin_users;
create policy "service_role_all_admin_users" on public.nordarrel_admin_users
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_contacts" on public.nordarrel_contacts;
create policy "service_role_all_contacts" on public.nordarrel_contacts
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_newsletter" on public.nordarrel_newsletter_subscribers;
create policy "service_role_all_newsletter" on public.nordarrel_newsletter_subscribers
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_appointments" on public.nordarrel_appointments;
create policy "service_role_all_appointments" on public.nordarrel_appointments
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_appointment_notes" on public.nordarrel_appointment_notes;
create policy "service_role_all_appointment_notes" on public.nordarrel_appointment_notes
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_calendar_blocks" on public.nordarrel_calendar_blocks;
create policy "service_role_all_calendar_blocks" on public.nordarrel_calendar_blocks
for all to service_role using (true) with check (true);
