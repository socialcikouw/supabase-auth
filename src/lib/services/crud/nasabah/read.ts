import { getCurrentUser } from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

export type NasabahRow = {
  id_nasabah: string;
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
  setor: number | null;
  storting: number | null;
  murni: number | null;
  pelunasan: number | null;
  pencairan: number | null;
  status: string | null;
};

/** Mengambil daftar nasabah milik user yang login */
export async function listNasabah() {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("nasabah")
      .select(
        `id_nasabah, user_id, created_at, updated_at, nama, alamat, pokok_pinjaman, angsuran, saldo_awal, sisa_saldo, tabungan, setor, storting, murni, pelunasan, pencairan, status`
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data: (data || []) as NasabahRow[] } as const;
  } catch (err: any) {
    console.error("Error listNasabah:", err);
    return {
      success: false,
      error: err?.message || "Gagal memuat data",
    } as const;
  }
}
