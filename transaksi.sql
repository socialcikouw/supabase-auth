-- ==========================================
-- TABEL TRANSAKSI + TRIGGER UPDATE SALDO
-- ==========================================

-- 1) TABEL TRANSAKSI
create table if not exists public.transaksi (
    id uuid primary key default gen_random_uuid(),

    -- Relasi user Supabase
    user_id uuid not null references auth.users(id) on delete cascade,

    -- Referensi pinjaman (bisa ke drop_baru atau drop_lama)
    drop_id uuid not null,
    drop_tipe text not null check (drop_tipe in ('baru', 'lama')),

    -- Jenis transaksi
    jenis text not null check (jenis in ('angsuran', 'tabungan', 'premi', 'setor')),
    nominal numeric(15,2) not null check (nominal >= 0),

    -- Waktu dibuat
    created_at timestamp with time zone default now()
);

-- 2) RLS DAN POLICIES
alter table public.transaksi enable row level security;

-- Hapus dulu biar bisa rerun tanpa error
drop policy if exists "User can view own transaksi" on public.transaksi;
drop policy if exists "User can insert own transaksi" on public.transaksi;
drop policy if exists "User can update own transaksi" on public.transaksi;
drop policy if exists "User can delete own transaksi" on public.transaksi;

create policy "User can view own transaksi"
on public.transaksi
for select using (auth.uid() = user_id);

create policy "User can insert own transaksi"
on public.transaksi
for insert with check (auth.uid() = user_id);

create policy "User can update own transaksi"
on public.transaksi
for update using (auth.uid() = user_id);

create policy "User can delete own transaksi"
on public.transaksi
for delete using (auth.uid() = user_id);

-- 3) INDEX OPTIMALISASI
create index if not exists idx_transaksi_user_id on public.transaksi(user_id);
create index if not exists idx_transaksi_user_id_created_at on public.transaksi(user_id, created_at desc);
create index if not exists idx_transaksi_drop on public.transaksi(drop_id, created_at desc);

-- 4) TRIGGER VALIDASI REFERENSI DROP
create or replace function public.validate_transaksi_drop_ref()
returns trigger as $$
begin
    if new.drop_tipe = 'baru' then
        if not exists (
            select 1 from public.drop_baru b where b.id = new.drop_id and b.user_id = new.user_id
        ) then
            raise exception 'drop_baru tidak ditemukan atau bukan milik user';
        end if;
    elsif new.drop_tipe = 'lama' then
        if not exists (
            select 1 from public.drop_lama l where l.id = new.drop_id and l.user_id = new.user_id
        ) then
            raise exception 'drop_lama tidak ditemukan atau bukan milik user';
        end if;
    else
        raise exception 'drop_tipe tidak valid (hanya baru|lama)';
    end if;
    return new;
end;
$$ language plpgsql;

drop trigger if exists transaksi_validate_drop_ref on public.transaksi;
create trigger transaksi_validate_drop_ref
before insert on public.transaksi
for each row
execute function public.validate_transaksi_drop_ref();

-- 5) TRIGGER UPDATE SALDO OTOMATIS
create or replace function public.apply_transaksi_update_saldo()
returns trigger as $$
begin
    if new.jenis in ('angsuran', 'setor') then
        if new.drop_tipe = 'baru' then
            update public.drop_baru
            set saldo_pinjaman = saldo_pinjaman - new.nominal,
                updated_at = now()
            where id = new.drop_id and user_id = new.user_id;
        else
            update public.drop_lama
            set sisa_saldo = sisa_saldo - new.nominal,
                updated_at = now()
            where id = new.drop_id and user_id = new.user_id;
        end if;
    end if;
    return new;
end;
$$ language plpgsql;

drop trigger if exists transaksi_after_insert on public.transaksi;
create trigger transaksi_after_insert
after insert on public.transaksi
for each row
execute function public.apply_transaksi_update_saldo();
