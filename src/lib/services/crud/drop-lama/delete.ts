import { supabase } from "../../database/supabase";
import { getCurrentUser } from "../crud-helper";
import { ServiceResponse } from "./types";

/**
 * Hapus data drop lama
 */
export async function deleteDropLama(id: string): Promise<ServiceResponse> {
  try {
    const user = await getCurrentUser();

    const { error } = await supabase
      .from("drop_lama")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Error deleteDropLama:", err);
    return {
      success: false,
      error: err.message || "Gagal menghapus data drop lama",
    };
  }
}
