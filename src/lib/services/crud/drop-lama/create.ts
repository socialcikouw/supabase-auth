import { supabase } from "../../database/supabase";
import { getCurrentUser, parseCurrency } from "../crud-helper";
import { DropLama, DropLamaFormData } from "./types";

export async function simpanDropLama(formData: DropLamaFormData) {
  try {
    console.log("Memulai proses simpan drop lama...");

    // Validasi user terlebih dahulu
    const user = await getCurrentUser();
    console.log("User ditemukan:", user.id);

    // Parsing data numerik
    const angsuranValue = parseCurrency(formData.angsuran);
    const tabunganValue = parseCurrency(formData.tabungan);
    const sisaSaldoValue = parseCurrency(formData.sisaSaldo);

    console.log("Data yang akan disimpan:", {
      user_id: user.id,
      nama: formData.nama,
      alamat: formData.alamat,
      angsuran: angsuranValue,
      tabungan: tabunganValue,
      sisa_saldo: sisaSaldoValue,
    });

    // Validasi nilai numerik
    if (angsuranValue <= 0 || tabunganValue <= 0 || sisaSaldoValue <= 0) {
      throw new Error("Semua nilai keuangan harus lebih dari 0");
    }

    const dropData: DropLama = {
      user_id: user.id,
      nama: formData.nama.trim(),
      alamat: formData.alamat.trim(),
      angsuran: angsuranValue,
      tabungan: tabunganValue,
      sisa_saldo: sisaSaldoValue,
      status: "aktif",
    };

    console.log("Mengirim data ke Supabase...");
    const { data, error } = await supabase
      .from("drop_lama")
      .insert([dropData])
      .select()
      .single();

    if (error) {
      console.error("Error dari Supabase:", error);
      throw error;
    }

    console.log("Data berhasil disimpan:", data);
    return { success: true, data };
  } catch (err: any) {
    console.error("Error simpanDropLama:", err);

    // Memberikan pesan error yang lebih spesifik
    let errorMessage = "Gagal menyimpan data drop lama";

    if (err.message.includes("User tidak ditemukan")) {
      errorMessage = "Sesi pengguna tidak valid. Silakan login ulang.";
    } else if (err.message.includes("row level security")) {
      errorMessage =
        "Tidak memiliki izin untuk menyimpan data. Pastikan Anda sudah login.";
    } else if (err.message.includes("violates")) {
      errorMessage = "Data tidak valid. Periksa kembali input Anda.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
