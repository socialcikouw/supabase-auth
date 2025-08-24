import { useCallback, useEffect, useState } from "react";
import { getDropLama } from "../../services/crud/drop-lama/read";
import { DropLama } from "../../services/crud/drop-lama/types";

export function useDropLama() {
  const [data, setData] = useState<DropLama[]>([]);
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

      const result = await getDropLama();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Gagal mengambil data drop lama");
      }
    } catch (err) {
      console.error("Error fetching drop lama:", err);
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
