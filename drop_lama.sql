-- Membuat tabel drop_lama
create table public.drop_lama (
    id uuid primary key default gen_random_uuid(),

    -- Relasi ke user Supabase
    user_id uuid not null references auth.users(id) on delete cascade,

    -- Kolom data pinjaman
    nama text not null,
    alamat text not null,
    angsuran numeric(15,2) not null,
    tabungan numeric(15,2) not null,
    sisa_saldo numeric(15,2) not null,
   

    -- Status pinjaman
    status text default 'aktif',

    -- Waktu dibuat & diupdate
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Trigger untuk update kolom updated_at otomatis
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_drop_lama_updated_at
before update on public.drop_lama
for each row
execute function public.update_updated_at_column();

-- Aktifkan Row Level Security
alter table public.drop_lama enable row level security;

-- Policy: User hanya bisa melihat data miliknya
create policy "User can view own drop_lama"
on public.drop_lama
for select using (auth.uid() = user_id);

-- Policy: User hanya bisa insert data miliknya
create policy "User can insert own drop_lama"
on public.drop_lama
for insert with check (auth.uid() = user_id);

-- Policy: User hanya bisa update data miliknya
create policy "User can update own drop_lama"
on public.drop_lama
for update using (auth.uid() = user_id);

-- Policy: User hanya bisa delete data miliknya
create policy "User can delete own drop_lama"
on public.drop_lama
for delete using (auth.uid() = user_id);

-- ==========================
-- INDEX OPTIMALISASI QUERY
-- ==========================

-- Index untuk mempercepat filter by user_id
create index idx_drop_lama_user_id on public.drop_lama(user_id);

-- Index gabungan untuk filter user_id + urut berdasarkan created_at
create index idx_drop_lama_user_id_created_at
on public.drop_lama(user_id, created_at desc);
