-- Membuat tabel drop_baru
create table public.drop_baru (
    id uuid primary key default gen_random_uuid(),

    -- Relasi ke user Supabase
    user_id uuid not null references auth.users(id) on delete cascade,

    -- Kolom data pinjaman
    nama text not null,
    alamat text not null,
    besar_pinjaman numeric(15,2) not null,
    angsuran numeric(15,2) not null,
    tabungan numeric(15,2) not null,
    premi numeric(15,2) not null,
    saldo_pinjaman numeric(15,2) not null,

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

create trigger update_drop_baru_updated_at
before update on public.drop_baru
for each row
execute function public.update_updated_at_column();

-- Aktifkan Row Level Security
alter table public.drop_baru enable row level security;

-- Policy: User hanya bisa melihat data miliknya
create policy "User can view own drop_baru"
on public.drop_baru
for select using (auth.uid() = user_id);

-- Policy: User hanya bisa insert data miliknya
create policy "User can insert own drop_baru"
on public.drop_baru
for insert with check (auth.uid() = user_id);

-- Policy: User hanya bisa update data miliknya
create policy "User can update own drop_baru"
on public.drop_baru
for update using (auth.uid() = user_id);

-- Policy: User hanya bisa delete data miliknya
create policy "User can delete own drop_baru"
on public.drop_baru
for delete using (auth.uid() = user_id);

-- ==========================
-- INDEX OPTIMALISASI QUERY
-- ==========================

-- Index untuk mempercepat filter by user_id
create index idx_drop_baru_user_id on public.drop_baru(user_id);

-- Index gabungan untuk filter user_id + urut berdasarkan created_at
create index idx_drop_baru_user_id_created_at
on public.drop_baru(user_id, created_at desc);



