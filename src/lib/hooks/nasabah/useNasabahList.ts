import { listNasabah, NasabahRow } from "@/src/lib/services/crud/nasabah/read";
import { tambahStortingNasabah } from "@/src/lib/services/crud/nasabah/update";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/** Hook untuk mengambil daftar nasabah milik user */
export function useNasabahList() {
  const [items, setItems] = useState<NasabahRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingSetorId, setLoadingSetorId] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await listNasabah();
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
    async (row: NasabahRow, nominal?: number) => {
      try {
        const amount = Number(
          nominal ?? (row.angsuran != null ? row.angsuran : 0)
        );
        if (!Number.isFinite(amount) || amount <= 0) {
          Alert.alert("Nominal tidak valid", "Angsuran belum tersedia.");
          return;
        }
        setLoadingSetorId(row.id_nasabah);
        const res = await tambahStortingNasabah(row.id_nasabah, amount);
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
