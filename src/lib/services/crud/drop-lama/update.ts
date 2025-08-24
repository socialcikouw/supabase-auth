import { supabase } from "../../database/supabase";
import { getCurrentUser, parseCurrency } from "../crud-helper";
import { DropLama, DropLamaFormData, ServiceResponse } from "./types";

/**
 * Update data drop lama
 */
export async function updateDropLama(
  id: string,
  formData: DropLamaFormData
): Promise<ServiceResponse<DropLama>> {
  try {
    const user = await getCurrentUser();

    const updateData: Partial<DropLama> = {
      nama: formData.nama,
      alamat: formData.alamat,
      angsuran: parseCurrency(formData.angsuran),
      tabungan: parseCurrency(formData.tabungan),
      sisa_saldo: parseCurrency(formData.sisaSaldo),
    };

    const { data, error } = await supabase
      .from("drop_lama")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error updateDropLama:", err);
    return {
      success: false,
      error: err.message || "Gagal mengupdate data drop lama",
    };
  }
}
