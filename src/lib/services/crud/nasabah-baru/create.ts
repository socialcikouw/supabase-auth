import {
  getCurrentUser,
  parseCurrency,
} from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

export type NasabahBaruInsert = {
  nama: string;
  alamat: string;
  angsuran: string; // input string (mungkin berformat ribuan), akan di-parse ke number
};

/**
 * Menyimpan data nasabah baru ke tabel public.nasabah_baru.
 * Field yang dihitung (saldo_awal, sisa_saldo, tabungan, dst) akan diisi oleh trigger DB.
 */
export async function insertNasabahBaru(input: NasabahBaruInsert) {
  try {
    // pastikan user login (konsisten dengan layanan lain)
    const user = await getCurrentUser();

    const payload = {
      user_id: user.id,
      nama: input.nama?.trim() || null,
      alamat: input.alamat?.trim() || null,
      angsuran: parseCurrency(input.angsuran),
      status: "aktif" as const,
    };

    const { data, error } = await supabase
      .from("nasabah_baru")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data } as const;
  } catch (err: any) {
    console.error("Error insertNasabahBaru:", err);
    return {
      success: false,
      error: err?.message || "Gagal menyimpan nasabah",
    } as const;
  }
}
