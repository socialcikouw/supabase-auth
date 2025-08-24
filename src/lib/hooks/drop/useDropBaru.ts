import { getDropBaru } from "@/src/lib/services/crud/drop-baru/read";
import { DropBaru } from "@/src/lib/services/crud/drop-baru/types";
import { useCallback, useEffect, useState } from "react";

export function useDropBaru() {
  const [data, setData] = useState<DropBaru[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const result = await getDropBaru();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Gagal mengambil data");
      }
    } catch (err) {
      console.error("Error fetching drop baru:", err);
      setError("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refreshing, refresh };
}
