import { supabase } from "../../database/supabase";
import { getCurrentUser } from "../crud-helper";
import { DropLama, ServiceResponse } from "./types";

/**
 * Ambil semua data drop lama milik user
 */
export async function getDropLama(): Promise<ServiceResponse<DropLama[]>> {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("drop_lama")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error getDropLama:", err);
    return {
      success: false,
      error: err.message || "Gagal mengambil data drop lama",
    };
  }
}

/**
 * Ambil data drop lama berdasarkan ID
 */
export async function getDropLamaById(
  id: string
): Promise<ServiceResponse<DropLama>> {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("drop_lama")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error getDropLamaById:", err);
    return {
      success: false,
      error: err.message || "Gagal mengambil data drop lama",
    };
  }
}
