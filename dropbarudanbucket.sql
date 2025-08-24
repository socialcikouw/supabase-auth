-- Buat bucket untuk foto drop baru
INSERT INTO storage.buckets (id, name, public) 
VALUES ('drop-foto', 'drop-foto', true)
ON CONFLICT (id) DO NOTHING;

-- Buat tabel drop baru
CREATE TABLE IF NOT EXISTS drop_baru (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    foto_url TEXT,
    nama VARCHAR(255) NOT NULL,
    alamat TEXT NOT NULL,
    besar_pinjaman DECIMAL(15,2) NOT NULL,
    angsuran DECIMAL(15,2) NOT NULL,
    tabungan DECIMAL(15,2) NOT NULL,
    premi DECIMAL(15,2) NOT NULL,
    saldo_pinjaman DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buat index untuk optimasi query
CREATE INDEX IF NOT EXISTS idx_drop_baru_user_id ON drop_baru(user_id);
CREATE INDEX IF NOT EXISTS idx_drop_baru_status ON drop_baru(status);
CREATE INDEX IF NOT EXISTS idx_drop_baru_created_at ON drop_baru(created_at);

-- Buat trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_drop_baru_updated_at 
    BEFORE UPDATE ON drop_baru 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Buat RLS (Row Level Security) policies
ALTER TABLE drop_baru ENABLE ROW LEVEL SECURITY;

-- Policy untuk user hanya bisa melihat data miliknya sendiri
CREATE POLICY "Users can view own drop data" ON drop_baru
    FOR SELECT USING (auth.uid() = user_id);

-- Policy untuk user hanya bisa insert data untuk dirinya sendiri
CREATE POLICY "Users can insert own drop data" ON drop_baru
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy untuk user hanya bisa update data miliknya sendiri
CREATE POLICY "Users can update own drop data" ON drop_baru
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy untuk user hanya bisa delete data miliknya sendiri
CREATE POLICY "Users can delete own drop data" ON drop_baru
    FOR DELETE USING (auth.uid() = user_id);

-- Buat storage policy untuk bucket drop-foto
CREATE POLICY "Users can upload own drop photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'drop-foto' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view own drop photos" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'drop-foto' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own drop photos" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'drop-foto' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own drop photos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'drop-foto' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Komentar untuk dokumentasi
COMMENT ON TABLE drop_baru IS 'Tabel untuk menyimpan data drop baru';
COMMENT ON COLUMN drop_baru.user_id IS 'Foreign key ke tabel auth.users, akan terhapus otomatis jika user dihapus';
COMMENT ON COLUMN drop_baru.foto_url IS 'URL foto drop yang disimpan di storage bucket drop-foto';
COMMENT ON COLUMN drop_baru.besar_pinjaman IS 'Jumlah pinjaman dalam rupiah';
COMMENT ON COLUMN drop_baru.angsuran IS '5% dari besar pinjaman';
COMMENT ON COLUMN drop_baru.tabungan IS '5% dari besar pinjaman';
COMMENT ON COLUMN drop_baru.premi IS '5% dari besar pinjaman';
COMMENT ON COLUMN drop_baru.saldo_pinjaman IS '120% dari besar pinjaman';