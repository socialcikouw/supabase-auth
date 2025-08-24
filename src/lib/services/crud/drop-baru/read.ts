import { supabase } from "../../database/supabase";
import { getCurrentUser } from "../crud-helper";
import { DropBaru, ServiceResponse } from "./types";

/**
 * Ambil semua data drop baru milik user
 */
export async function getDropBaru(): Promise<ServiceResponse<DropBaru[]>> {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("drop_baru")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error getDropBaru:", err);
    return {
      success: false,
      error: err.message || "Gagal mengambil data drop",
    };
  }
}

/**
 * Ambil data drop baru berdasarkan ID
 */
export async function getDropBaruById(
  id: string
): Promise<ServiceResponse<DropBaru>> {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("drop_baru")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error getDropBaruById:", err);
    return {
      success: false,
      error: err.message || "Gagal mengambil data drop",
    };
  }
}
