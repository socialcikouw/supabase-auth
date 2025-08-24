import {
  getCurrentUser,
  parseCurrency,
} from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

export type NasabahInsert = {
  nama: string;
  alamat: string;
  angsuran: string; // input string (mungkin berformat ribuan), akan di-parse ke number
};

/**
 * Menyimpan data nasabah baru ke tabel public.nasabah.
 * Field yang dihitung akan dihitung di sini (tanpa trigger DB).
 */
export async function insertNasabah(input: NasabahInsert) {
  try {
    const user = await getCurrentUser();

    const ang = parseCurrency(input.angsuran);
    const pokok_pinjaman = ang * 20;
    const saldo_awal = ang * 24;
    const tabungan = Math.round(pokok_pinjaman * 0.05);
    const premi = Math.round(pokok_pinjaman * 0.05);
    const pencairan = Math.round(pokok_pinjaman * 0.9);
    // Nilai turunan awal saat belum ada setoran
    const storting = 0;
    const sisa_saldo = saldo_awal - storting; // awalnya = saldo_awal
    const pelunasan = 0;
    const murni = 0;
    const setor = 0;

    const payload = {
      user_id: user.id,
      nama: input.nama?.trim(),
      alamat: input.alamat?.trim() || null,
      angsuran: ang,
      pokok_pinjaman,
      saldo_awal,
      sisa_saldo,
      tabungan,
      premi,
      pencairan,
      storting,
      pelunasan,
      murni,
      setor,
      status: "aktif" as const,
      // kolom lain (storting, sisa_saldo, pelunasan, murni, setor) biarkan default 0
    };

    const { data, error } = await supabase
      .from("nasabah")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data } as const;
  } catch (err: any) {
    console.error("Error insertNasabah:", err);
    return {
      success: false,
      error: err?.message || "Gagal menyimpan nasabah",
    } as const;
  }
}
