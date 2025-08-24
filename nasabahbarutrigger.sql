-- Aktifkan extension gen_random_uuid kalau belum ada
create extension if not exists pgcrypto;

-- Buat tabel nasabah_baru
drop table if exists public.nasabah_baru cascade;

create table public.nasabah_baru (
  id_nasabah_baru uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade, -- relasi ke auth.users

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null default now(),

  -- Data identitas
  nama text null,
  alamat text null,

  -- Data pinjaman & perhitungan
  pokok_pinjaman bigint null,   -- dihitung otomatis dari angsuran * 20 (atau input manual)
  angsuran bigint null,         -- dihitung otomatis dari pokok_pinjaman * 5%
  saldo_awal bigint null,       -- angsuran * 24
  sisa_saldo bigint null,       -- saldo_awal - storting
  tabungan bigint null,         -- pokok_pinjaman * 5%
  storting bigint null,         -- total angsuran (sementara = angsuran)
  murni bigint null,            -- storting - pelunasan
  pelunasan bigint null,        -- saldo_awal - sisa_saldo
  pencairan bigint null,        -- pokok_pinjaman * 90%

  status text null,

  constraint nasabah_baru_pkey primary key (id_nasabah_baru)
) tablespace pg_default;

-------------------------------------------------
-- FUNCTION untuk perhitungan otomatis
-------------------------------------------------
create or replace function public.hitung_nasabah_baru()
returns trigger as $$
begin
  -- Hitung angsuran (jika pokok_pinjaman diinput)
  if new.pokok_pinjaman is not null then
    new.angsuran := (new.pokok_pinjaman * 0.05)::bigint;
  end if;

  -- Hitung pokok pinjaman (jika angsuran diinput)
  if new.angsuran is not null and (new.pokok_pinjaman is null or new.pokok_pinjaman = 0) then
    new.pokok_pinjaman := (new.angsuran * 20)::bigint;
  end if;

  -- Saldo awal = angsuran * 24
  if new.angsuran is not null then
    new.saldo_awal := (new.angsuran * 24)::bigint;
  end if;

  -- Tabungan = pokok pinjaman * 5%
  if new.pokok_pinjaman is not null then
    new.tabungan := (new.pokok_pinjaman * 0.05)::bigint;
  end if;

  -- Storting default (hanya saat INSERT jika belum diisi) = angsuran
  if TG_OP = 'INSERT' and new.storting is null and new.angsuran is not null then
    new.storting := new.angsuran;
  end if;

  -- Jika sudah ada storting, gunakan storting yang ada
  if TG_OP = 'UPDATE' and new.storting is null and old.storting is not null then
    new.storting := old.storting;
  end if;

  -- Sisa saldo = saldo awal - storting
  if new.saldo_awal is not null and new.storting is not null then
    new.sisa_saldo := new.saldo_awal - new.storting;
  end if;

  -- Pelunasan = saldo awal - sisa saldo
  if new.saldo_awal is not null and new.sisa_saldo is not null then
    new.pelunasan := new.saldo_awal - new.sisa_saldo;
  end if;

  -- Murni = storting - pelunasan
  if new.storting is not null and new.pelunasan is not null then
    new.murni := new.storting - new.pelunasan;
  end if;

  -- Pencairan = pokok pinjaman * 90%
  if new.pokok_pinjaman is not null then
    new.pencairan := (new.pokok_pinjaman * 0.9)::bigint;
  end if;

  -- Update timestamp
  new.updated_at := now();

  return new;
end;
$$ language plpgsql;

-------------------------------------------------
-- TRIGGER untuk perhitungan otomatis
-------------------------------------------------
drop trigger if exists trigger_hitung_nasabah_baru on public.nasabah_baru;

create trigger trigger_hitung_nasabah_baru
before insert or update on public.nasabah_baru
for each row
execute function public.hitung_nasabah_baru();

-------------------------------------------------
-- ENABLE RLS (Row Level Security)
-------------------------------------------------
alter table public.nasabah_baru enable row level security;

-- POLICY agar user hanya bisa akses datanya sendiri
create policy "Users can insert own nasabah" 
on public.nasabah_baru
for insert
with check (auth.uid() = user_id);

create policy "Users can view own nasabah" 
on public.nasabah_baru
for select
using (auth.uid() = user_id);

create policy "Users can update own nasabah" 
on public.nasabah_baru
for update
using (auth.uid() = user_id);

create policy "Users can delete own nasabah" 
on public.nasabah_baru
for delete
using (auth.uid() = user_id);
