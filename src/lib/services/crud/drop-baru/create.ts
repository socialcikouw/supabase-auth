import { supabase } from "../../database/supabase";
import { getCurrentUser, parseCurrency } from "../crud-helper";
import { DropBaru, DropBaruFormData } from "./types";

export async function simpanDropBaru(
  formData: DropBaruFormData,
  perhitungan: Omit<
    DropBaru,
    | "id"
    | "user_id"
    | "nama"
    | "alamat"
    | "besar_pinjaman"
    | "status"
    | "created_at"
    | "updated_at"
  >
) {
  try {
    const user = await getCurrentUser();
    const dropData: DropBaru = {
      user_id: user.id,
      nama: formData.nama,
      alamat: formData.alamat,
      besar_pinjaman: parseCurrency(formData.besarPinjaman),
      angsuran: perhitungan.angsuran,
      tabungan: perhitungan.tabungan,
      premi: perhitungan.premi,
      saldo_pinjaman: perhitungan.saldo_pinjaman,
      status: "aktif",
    };

    const { data, error } = await supabase
      .from("drop_baru")
      .insert([dropData])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error simpanDropBaru:", err);
    return {
      success: false,
      error: err.message || "Gagal menyimpan data drop",
    };
  }
}
