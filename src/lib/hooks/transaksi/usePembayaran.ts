import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import { simpanDropBaru } from "@/src/lib/services/crud/drop-baru/create";
import { supabase } from "@/src/lib/services/database/supabase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

export type TransaksiJenis = "angsuran" | "tabungan" | "premi" | "setor";

export type TransaksiItem = {
  id: string;
  jenis: TransaksiJenis;
  nominal: number;
  created_at: string;
};

export type PembayaranParams = {
  id?: string;
  type?: string;
  nama?: string;
  alamat?: string;
  angsuran?: string;
  tabungan?: string;
  saldo?: string;
};

/**
 * Mengelola seluruh state dan logic transaksi pembayaran/putar saldo.
 * Pisahkan dari UI agar lebih mudah dirawat dan diuji.
 */
export function usePembayaran(params: PembayaranParams) {
  const { user } = useAuth();

  // ------------------------- State -------------------------
  const [nominal, setNominal] = useState<string>("");
  const [loadingJenis, setLoadingJenis] = useState<TransaksiJenis | null>(null);
  const [history, setHistory] = useState<TransaksiItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [loadingPutar, setLoadingPutar] = useState<boolean>(false);
  const [spinMode, setSpinMode] = useState<"tetap" | "naik" | "turun" | null>(
    null
  );
  const [pinjamanDelta, setPinjamanDelta] = useState<string>("");

  // ------------------------- Derived -------------------------
  const dropId = useMemo(
    () => (params.id ? String(params.id) : ""),
    [params.id]
  );
  const dropTipe = useMemo(
    () => (params.type ? String(params.type) : ""),
    [params.type]
  );

  /**
   * Parsing nominal dari input pengguna menjadi number.
   * Menghapus spasi/titik dan mengubah koma menjadi titik.
   */
  function parseNominal(input: string): number {
    if (!input) return 0;
    const normalized = input
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(/[^0-9,-]/g, "")
      .replace(/(,)(?=.*,)/g, "")
      .replace(",", ".");
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
  }

  /**
   * Menentukan apakah tombol submit transaksi aktif.
   */
  const canSubmit = useMemo(() => {
    const hasDigit = /[0-9]/.test(nominal);
    if (!hasDigit) return false;
    const amount = parseNominal(nominal);
    if (amount > Number(params.saldo || "0")) {
      Alert.alert("Nominal tidak boleh lebih besar dari sisa saldo");
      return false;
    }
    return !(Number.isNaN(amount) || amount < 0);
  }, [nominal, params.saldo]);

  /**
   * Total nilai transaksi dengan jenis "setor" dari riwayat.
   */
  const totalSetor = useMemo(() => {
    return history
      .filter((t) => t.jenis === "setor")
      .reduce((sum, t) => sum + (t.nominal || 0), 0);
  }, [history]);

  /**
   * Nomor sobekan dihitung dari total setoran dibagi angsuran saat ini.
   */
  const nomorSobek = useMemo(() => {
    const angsuranNow = parseNominal(String(params.angsuran || "0"));
    return angsuranNow > 0 ? totalSetor / angsuranNow : 0;
  }, [totalSetor, params.angsuran]);

  /**
   * Validasi aturan putar untuk drop tipe "baru": minimal 8x angsuran.
   */
  const canPutarDropBaru = useMemo(() => {
    if (dropTipe !== "baru") return true;
    return Math.floor(nomorSobek) >= 8;
  }, [dropTipe, nomorSobek]);

  /**
   * Mengambil riwayat transaksi untuk user + drop tertentu.
   */
  const fetchHistory = useCallback(async () => {
    if (!user?.id || !dropId || !dropTipe) return;
    try {
      setLoadingHistory(true);
      const { data, error } = await supabase
        .from("transaksi")
        .select("id, jenis, nominal, created_at")
        .eq("user_id", user.id)
        .eq("drop_id", dropId)
        .eq("drop_tipe", dropTipe)
        .order("created_at", { ascending: false });
      if (error) {
        // Diamkan error fetch riwayat agar UI utama tetap jalan
        return;
      }
      setHistory((data as TransaksiItem[]) ?? []);
    } finally {
      setLoadingHistory(false);
    }
  }, [user?.id, dropId, dropTipe]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  /**
   * Menyimpan transaksi baru (angsuran/tabungan/premi/setor).
   */
  async function handleCreateTransaksi(jenis: TransaksiJenis) {
    if (!user?.id) {
      Alert.alert("Butuh Login", "Silakan login terlebih dahulu.");
      return;
    }
    if (!dropId || !dropTipe) {
      Alert.alert("Data tidak lengkap", "ID atau tipe drop tidak ditemukan.");
      return;
    }
    const amount = parseNominal(nominal);
    if (amount < 0) {
      Alert.alert("Nominal tidak valid", "Nominal tidak boleh negatif.");
      return;
    }

    try {
      setLoadingJenis(jenis);
      const { error } = await supabase.from("transaksi").insert({
        user_id: user.id,
        drop_id: dropId,
        drop_tipe: dropTipe,
        jenis,
        nominal: amount,
      });
      if (error) {
        Alert.alert("Gagal", error.message ?? "Gagal menyimpan transaksi.");
        return;
      }
      Alert.alert("Berhasil", "Transaksi berhasil disimpan.");
      setNominal("");
      await fetchHistory();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Terjadi kesalahan tak terduga.");
    } finally {
      setLoadingJenis(null);
    }
  }

  /**
   * Membuka dialog pilihan jenis putar saldo pinjaman.
   */
  function openPilihanPutar() {
    Alert.alert("Konfirmasi Putar", "Pilih jenis putar pinjaman", [
      { text: "Tetap pinjaman", onPress: () => handlePutar("tetap", 0) },
      { text: "Naik pinjaman", onPress: () => setSpinMode("naik") },
      { text: "Turun pinjaman", onPress: () => setSpinMode("turun") },
      { text: "Batal", style: "cancel" },
    ]);
  }

  /**
   * Memutar saldo pinjaman menjadi drop baru, dengan opsi tetap/naik/turun.
   * - Menyetor sisa saldo (menjadi 0)
   * - Menghapus drop lama jika saldo benar-benar 0
   * - Menghitung ulang besaran pinjaman baru
   * - Membuat record drop baru
   */
  async function handlePutar(
    variant: "tetap" | "naik" | "turun" = "tetap",
    deltaPinjaman: number = 0
  ) {
    if (!user?.id) {
      Alert.alert("Butuh Login", "Silakan login terlebih dahulu.");
      return;
    }
    if (!dropId || !dropTipe) {
      Alert.alert("Data tidak lengkap", "ID atau tipe drop tidak ditemukan.");
      return;
    }
    const sisaSaldo = parseNominal(String(params.saldo || "0"));
    const angsuranNow = parseNominal(String(params.angsuran || "0"));
    const tabunganNow = parseNominal(String(params.tabungan || "0"));

    if (sisaSaldo <= 0) {
      Alert.alert("Tidak bisa", "Sisa saldo sudah 0 atau tidak valid.");
      return;
    }

    try {
      setLoadingPutar(true);
      // 1) Nolkan sisa saldo (drop_lama: sisa_saldo, drop_baru: saldo_pinjaman)
      //    - drop_lama: gunakan jenis 'setor'
      //    - drop_baru: gunakan jenis 'angsuran' (lebih semantik)
      const jenisPembayaran = dropTipe === "baru" ? "angsuran" : "setor";
      if (dropTipe === "baru" && !canPutarDropBaru) {
        Alert.alert(
          "Belum memenuhi syarat",
          "Putar hanya bisa setelah 8x angsuran."
        );
        return;
      }

      const { error: trxErr } = await supabase.from("transaksi").insert({
        user_id: user.id,
        drop_id: dropId,
        drop_tipe: dropTipe,
        jenis: jenisPembayaran,
        nominal: sisaSaldo,
      });
      if (trxErr) {
        Alert.alert(
          "Gagal",
          trxErr.message ?? "Gagal memutar saldo (tahap setor).”"
        );
        return;
      }

      // 1b) Setelah dinolkan, hapus record drop sesuai tipe bila saldo benar-benar 0
      try {
        if (dropTipe === "lama") {
          const { data: cekLama, error: cekErr } = await supabase
            .from("drop_lama")
            .select("sisa_saldo")
            .eq("id", dropId)
            .eq("user_id", user.id)
            .single();

          if (!cekErr && cekLama && Number(cekLama.sisa_saldo) <= 0) {
            await supabase
              .from("drop_lama")
              .delete()
              .eq("id", dropId)
              .eq("user_id", user.id);
          }
        } else {
          const { data: cekBaru, error: cekErr2 } = await supabase
            .from("drop_baru")
            .select("saldo_pinjaman")
            .eq("id", dropId)
            .eq("user_id", user.id)
            .single();

          if (!cekErr2 && cekBaru && Number(cekBaru.saldo_pinjaman) <= 0) {
            await supabase
              .from("drop_baru")
              .delete()
              .eq("id", dropId)
              .eq("user_id", user.id);
          }
        }
      } catch (_) {
        // Abaikan error hapus; riwayat transaksi tetap aman
      }

      // 2) Buat drop baru: hitung besarPinjaman dari angsuran berjalan,
      //    lalu sesuaikan bila naik/turun sesuai input deltaPinjaman
      let besarPinjaman = angsuranNow > 0 ? angsuranNow / 0.05 : 0;
      if (variant === "naik" && deltaPinjaman > 0) {
        besarPinjaman += deltaPinjaman;
      }
      if (variant === "turun" && deltaPinjaman > 0) {
        besarPinjaman = Math.max(0, besarPinjaman - deltaPinjaman);
      }
      const baselinePremi = besarPinjaman * 0.05;
      const saldoPinjaman = besarPinjaman * 1.2;

      const perhitunganBaru = {
        angsuran: besarPinjaman * 0.05,
        tabungan: tabunganNow + besarPinjaman * 0.05,
        premi: baselinePremi,
        saldo_pinjaman: saldoPinjaman,
      } as const;

      const formBaru = {
        nama: String(params.nama || ""),
        alamat: String(params.alamat || ""),
        besarPinjaman: String(Math.round(besarPinjaman)),
      } as const;

      const simpan = await simpanDropBaru(formBaru, perhitunganBaru);
      if (!simpan.success) {
        Alert.alert(
          "Sebagian berhasil",
          (simpan.error || "Gagal membuat drop baru") +
            "\nCatatan: Sisa saldo sudah dinolkan."
        );
        await fetchHistory();
        return;
      }

      Alert.alert("Berhasil", "Saldo berhasil diputar ke drop baru.");
      setNominal("");
      setSpinMode(null);
      setPinjamanDelta("");
      await fetchHistory();
    } catch (e: any) {
      Alert.alert(
        "Error",
        e?.message ?? "Terjadi kesalahan saat memutar saldo."
      );
    } finally {
      setLoadingPutar(false);
    }
  }

  return {
    state: {
      nominal,
      loadingJenis,
      history,
      loadingHistory,
      loadingPutar,
      spinMode,
      pinjamanDelta,
    },
    setters: {
      setNominal,
      setSpinMode,
      setPinjamanDelta,
    },
    derived: {
      dropId,
      dropTipe,
      canSubmit,
      totalSetor,
      nomorSobek,
      canPutarDropBaru,
      parseNominal,
    },
    actions: {
      fetchHistory,
      handleCreateTransaksi,
      openPilihanPutar,
      handlePutar,
    },
  } as const;
}
