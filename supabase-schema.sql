-- Supabase SQL Schema for "Central Al Día"

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Table: events
-- Almacena la información de los eventos de la iglesia.
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  start_time timestamp with time zone not null,
  location text,
  expected_attendance int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Table: news
-- Avisos y noticias, incluyendo bandera si es notificación importante.
create table public.news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  is_notification boolean default false,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Table: attendance
-- Gestión de asistencias a los eventos de la comunidad.
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  user_name text not null, -- Usamos un nombre sencillo o ID de auth más adelante.
  registered_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Table: prayers
-- Muro de oración para que los miembros compartan sus peticiones.
create table public.prayers (
  id uuid default uuid_generate_v4() primary key,
  author text not null,
  content text not null,
  is_anonymous boolean default false,
  praying_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. RLS (Row Level Security) - Reglas básicas
alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.attendance enable row level security;
alter table public.prayers enable row level security;

-- Permitir lectura a cualquier persona (para la app pública)
create policy "Permitir lectura de eventos" on public.events for select using (true);
create policy "Permitir lectura de noticias" on public.news for select using (true);
create policy "Permitir lectura de oraciones" on public.prayers for select using (true);

-- Permitir inserción de asistencia anónima/identificada
create policy "Permitir apuntarse a eventos" on public.attendance for insert with check (true);
create policy "Ver total asistencias" on public.attendance for select using (true);
