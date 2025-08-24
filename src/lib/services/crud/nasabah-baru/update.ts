import { getCurrentUser } from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

/** Menambahkan nominal ke kolom `storting` untuk 1 nasabah_baru */
export async function tambahStortingNasabahBaru(
  idNasabahBaru: string,
  nominal: number
) {
  try {
    if (!idNasabahBaru) throw new Error("ID nasabah tidak valid");
    if (!Number.isFinite(nominal) || nominal <= 0)
      throw new Error("Nominal setor tidak valid");

    const user = await getCurrentUser();

    // 1) Ambil nilai storting saat ini (dengan RLS)
    const { data: rows, error: selErr } = await supabase
      .from("nasabah_baru")
      .select("storting")
      .eq("id_nasabah_baru", idNasabahBaru)
      .eq("user_id", user.id)
      .limit(1);

    if (selErr) throw selErr;
    const current = rows && rows.length ? Number(rows[0].storting || 0) : 0;
    const updated = current + nominal;

    // 2) Update nilai storting (trigger akan hitung turunan lain)
    const { data, error } = await supabase
      .from("nasabah_baru")
      .update({ storting: updated })
      .eq("id_nasabah_baru", idNasabahBaru)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data } as const;
  } catch (err: any) {
    console.error("Error tambahStortingNasabahBaru:", err);
    return { success: false, error: err?.message || "Gagal setor" } as const;
  }
}
