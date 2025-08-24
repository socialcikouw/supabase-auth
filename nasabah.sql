-- Aktifkan extension kalau belum ada
create extension if not exists pgcrypto;

drop table if exists public.nasabah cascade;

create table public.nasabah (
  id_nasabah uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  -- Data identitas
  nama text not null,
  alamat text null,
  angsuran bigint not null,

  -- Data pinjaman (disimpan langsung, tidak auto hitung)
  pokok_pinjaman bigint not null,
  saldo_awal bigint not null,
  tabungan bigint default 0,
  premi bigint default 0,
  pencairan bigint default 0,

  -- Data transaksi
  setor bigint default 0,       
  storting bigint default 0,   

  -- Perhitungan otomatis
  sisa_saldo bigint default 0,
  pelunasan bigint default 0,
  murni bigint default 0,

  status text null
); 

-------------------------------------------------
-- ENABLE RLS (Row Level Security)
-------------------------------------------------
alter table public.nasabah enable row level security;

-- POLICY agar user hanya bisa akses datanya sendiri
create policy "Users can insert own nasabah" 
on public.nasabah
for insert
with check (auth.uid() = user_id);

create policy "Users can view own nasabah" 
on public.nasabah
for select
using (auth.uid() = user_id);

create policy "Users can update own nasabah" 
on public.nasabah
for update
using (auth.uid() = user_id);

create policy "Users can delete own nasabah" 
on public.nasabah
for delete
using (auth.uid() = user_id);
