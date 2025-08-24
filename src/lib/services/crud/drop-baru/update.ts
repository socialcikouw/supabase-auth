import { supabase } from "../../database/supabase";
import { getCurrentUser, parseCurrency } from "../crud-helper";
import { DropBaru, DropBaruFormData, ServiceResponse } from "./types";

/**
 * Update data drop baru
 */
export async function updateDropBaru(
  id: string,
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
): Promise<ServiceResponse<DropBaru>> {
  try {
    const user = await getCurrentUser();

    const updateData: Partial<DropBaru> = {
      nama: formData.nama,
      alamat: formData.alamat,
      besar_pinjaman: parseCurrency(formData.besarPinjaman),
      angsuran: perhitungan.angsuran,
      tabungan: perhitungan.tabungan,
      premi: perhitungan.premi,
      saldo_pinjaman: perhitungan.saldo_pinjaman,
    };

    const { data, error } = await supabase
      .from("drop_baru")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error updateDropBaru:", err);
    return {
      success: false,
      error: err.message || "Gagal mengupdate data drop",
    };
  }
}
