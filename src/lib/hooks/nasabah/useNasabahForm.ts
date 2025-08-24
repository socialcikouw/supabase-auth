import { insertNasabah } from "@/src/lib/services/crud/nasabah/create";
import { getNumericValue } from "@/src/lib/utils/form/formatAngka";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

export type NasabahFormState = {
  nama: string;
  alamat: string;
  angsuran: string; // formatted (pakai formatInputAngka di UI)
  submitting: boolean;

  // nilai hitung otomatis (number)
  pokok_pinjaman: number;
  saldo_awal: number;
  tabungan: number;
  premi: number;
  pencairan: number;
};

/**
 * Hook untuk mengelola form Nasabah beserta perhitungan otomatis.
 *
 * Rumus:
 * - pokok_pinjaman = angsuran * 20
 * - saldo_awal = angsuran * 24
 * - tabungan = pokok_pinjaman * 0.05
 * - premi = pokok_pinjaman * 0.05
 * - pencairan = pokok_pinjaman * 0.9
 *
 */
export function useNasabahForm() {
  const [base, setBase] = useState({
    nama: "",
    alamat: "",
    angsuran: "",
    submitting: false,
  });

  const computed = useMemo(() => {
    const ang = getNumericValue(base.angsuran); // parse dari string berformat (ribuan)
    const pokok_pinjaman = ang * 20;
    const saldo_awal = ang * 24;
    const tabungan = pokok_pinjaman * 0.05;
    const premi = pokok_pinjaman * 0.05;
    const pencairan = pokok_pinjaman * 0.9;

    return { pokok_pinjaman, saldo_awal, tabungan, premi, pencairan };
  }, [base.angsuran]);

  const state: NasabahFormState = {
    ...base,
    ...computed,
  };

  const isValid = useMemo(() => {
    const namaOk = base.nama.trim().length > 0;
    const alamatOk = base.alamat.trim().length > 0;
    const hasDigit = /[0-9]/.test(base.angsuran);
    return namaOk && alamatOk && hasDigit;
  }, [base.nama, base.alamat, base.angsuran]);

  function setNama(nama: string) {
    setBase((s) => ({ ...s, nama }));
  }

  function setAlamat(alamat: string) {
    setBase((s) => ({ ...s, alamat }));
  }

  function setAngsuran(angsuran: string) {
    setBase((s) => ({ ...s, angsuran }));
  }

  async function submit() {
    if (!isValid) {
      Alert.alert("Form belum valid", "Mohon lengkapi field yang wajib.");
      return;
    }
    try {
      setBase((s) => ({ ...s, submitting: true }));
      const res = await insertNasabah({
        nama: state.nama,
        alamat: state.alamat,
        angsuran: state.angsuran,
      });
      if (!res.success) {
        Alert.alert("Gagal", res.error || "Gagal menyimpan data");
        return;
      }
      Alert.alert("Berhasil", "Data nasabah tersimpan.");
      setBase({ nama: "", alamat: "", angsuran: "", submitting: false });
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Terjadi kesalahan.");
    } finally {
      setBase((s) => ({ ...s, submitting: false }));
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
