import { getCurrentUser } from "@/src/lib/services/crud/crud-helper";
import { supabase } from "@/src/lib/services/database/supabase";

/** Menambahkan nominal ke kolom `storting` untuk 1 nasabah */
export async function tambahStortingNasabah(
  idNasabah: string,
  nominal: number
) {
  try {
    if (!idNasabah) throw new Error("ID nasabah tidak valid");
    if (!Number.isFinite(nominal) || nominal <= 0)
      throw new Error("Nominal setor tidak valid");

    const user = await getCurrentUser();

    // 1) Ambil nilai storting & saldo_awal saat ini (dengan RLS)
    const { data: rows, error: selErr } = await supabase
      .from("nasabah")
      .select("storting, saldo_awal")
      .eq("id_nasabah", idNasabah)
      .eq("user_id", user.id)
      .limit(1);

    if (selErr) throw selErr;
    const currentStorting =
      rows && rows.length ? Number(rows[0].storting || 0) : 0;
    const saldoAwal = rows && rows.length ? Number(rows[0].saldo_awal || 0) : 0;
    const updatedStorting = currentStorting + nominal;

    // Hitung turunan: sisa_saldo, pelunasan, murni
    const sisaSaldo = Math.max(saldoAwal - updatedStorting, 0);
    const pelunasan = Math.max(saldoAwal - sisaSaldo, 0);
    const murni = Math.max(updatedStorting - pelunasan, 0);

    // 2) Update nilai storting + kolom turunan + updated_at (+ opsional catat "setor" terakhir)
    const { data, error } = await supabase
      .from("nasabah")
      .update({
        storting: updatedStorting,
        sisa_saldo: sisaSaldo,
        pelunasan: pelunasan,
        murni: murni,
        setor: nominal,
        updated_at: new Date().toISOString(),
      })
      .eq("id_nasabah", idNasabah)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data } as const;
  } catch (err: any) {
    console.error("Error tambahStortingNasabah:", err);
    return { success: false, error: err?.message || "Gagal setor" } as const;
  }
}
