import { User } from "@supabase/supabase-js";
import { supabase } from "../database/supabase";

async function getCurrentUser(): Promise<User> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User tidak ditemukan");
  }
  return user;
}

function parseCurrency(value: string): number {
  // Hapus semua karakter non-digit (termasuk pemisah ribuan)
  const cleaned = value.replace(/[^\d]/g, "");
  const parsed = parseFloat(cleaned);

  // Pastikan mengembalikan 0 jika parsing gagal atau NaN
  return isNaN(parsed) ? 0 : parsed;
}

export { getCurrentUser, parseCurrency };
