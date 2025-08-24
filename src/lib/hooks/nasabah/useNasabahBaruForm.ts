import { insertNasabahBaru } from "@/src/lib/services/crud/nasabah-baru/create";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

export type NasabahBaruFormState = {
  nama: string;
  alamat: string;
  angsuran: string;
  submitting: boolean;
};

/**
 * Hook untuk mengelola state, validasi, dan submit form Nasabah Baru.
 */
export function useNasabahBaruForm() {
  const [state, setState] = useState<NasabahBaruFormState>({
    nama: "",
    alamat: "",
    angsuran: "",
    submitting: false,
  });

  /** Apakah form valid untuk disubmit */
  const isValid = useMemo(() => {
    const namaOk = state.nama.trim().length > 0;
    const alamatOk = state.alamat.trim().length > 0;
    const hasDigit = /[0-9]/.test(state.angsuran);
    return namaOk && alamatOk && hasDigit;
  }, [state.nama, state.alamat, state.angsuran]);

  function setNama(nama: string) {
    setState((s) => ({ ...s, nama }));
  }

  function setAlamat(alamat: string) {
    setState((s) => ({ ...s, alamat }));
  }

  function setAngsuran(angsuran: string) {
    setState((s) => ({ ...s, angsuran }));
  }

  /** Submit form ke Supabase */
  async function submit() {
    if (!isValid) {
      Alert.alert("Form belum valid", "Mohon lengkapi field yang wajib.");
      return;
    }
    try {
      setState((s) => ({ ...s, submitting: true }));
      const res = await insertNasabahBaru({
        nama: state.nama,
        alamat: state.alamat,
        angsuran: state.angsuran,
      });
      if (!res.success) {
        Alert.alert("Gagal", res.error || "Gagal menyimpan data");
        return;
      }
      Alert.alert("Berhasil", "Data nasabah tersimpan.");
      setState({ nama: "", alamat: "", angsuran: "", submitting: false });
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Terjadi kesalahan.");
    } finally {
      setState((s) => ({ ...s, submitting: false }));
    }
  }

  return {
    state,
    isValid,
    setNama,
    setAlamat,
    setAngsuran,
    submit,
  } as const;
}
