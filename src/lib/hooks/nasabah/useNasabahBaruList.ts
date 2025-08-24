import {
  listNasabahBaru,
  NasabahBaruRow,
} from "@/src/lib/services/crud/nasabah-baru/read";
import { tambahStortingNasabahBaru } from "@/src/lib/services/crud/nasabah-baru/update";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/** Hook untuk mengambil daftar nasabah_baru milik user */
export function useNasabahBaruList() {
  const [items, setItems] = useState<NasabahBaruRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingSetorId, setLoadingSetorId] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await listNasabahBaru();
      if (!res.success) {
        setError(res.error || "Gagal memuat data");
        return;
      }
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const setorAngsuran = useCallback(
    async (row: NasabahBaruRow, nominal?: number) => {
      try {
        const amount = Number(
          nominal ?? (row.angsuran != null ? row.angsuran : 0)
        );
        if (!Number.isFinite(amount) || amount <= 0) {
          Alert.alert("Nominal tidak valid", "Angsuran belum tersedia.");
          return;
        }
        setLoadingSetorId(row.id_nasabah_baru);
        const res = await tambahStortingNasabahBaru(
          row.id_nasabah_baru,
          amount
        );
        if (!res.success) {
          Alert.alert("Gagal", res.error || "Gagal setor");
          return;
        }
        await fetchList();
        Alert.alert("Berhasil", "Setoran tercatat.");
      } finally {
        setLoadingSetorId(null);
      }
    },
    [fetchList]
  );

  return {
    items,
    loading,
    error,
    loadingSetorId,
    refetch: fetchList,
    setorAngsuran,
  } as const;
}
