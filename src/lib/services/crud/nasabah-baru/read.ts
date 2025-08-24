import { getCurrentUser } from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

export type NasabahBaruRow = {
  id_nasabah_baru: string;
  user_id: string;
  created_at: string;
  updated_at: string | null;
  nama: string | null;
  alamat: string | null;
  pokok_pinjaman: number | null;
  angsuran: number | null;
  saldo_awal: number | null;
  sisa_saldo: number | null;
  tabungan: number | null;
  storting: number | null;
  murni: number | null;
  pelunasan: number | null;
  pencairan: number | null;
  status: string | null;
};

/** Mengambil daftar nasabah_baru milik user yang login */
export async function listNasabahBaru() {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("nasabah_baru")
      .select(
        `id_nasabah_baru, user_id, created_at, updated_at, nama, alamat, pokok_pinjaman, angsuran, saldo_awal, sisa_saldo, tabungan, storting, murni, pelunasan, pencairan, status`
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data: (data || []) as NasabahBaruRow[] } as const;
  } catch (err: any) {
    console.error("Error listNasabahBaru:", err);
    return {
      success: false,
      error: err?.message || "Gagal memuat data",
    } as const;
  }
}
