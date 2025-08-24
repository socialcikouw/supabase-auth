## Mengatasi Error: `Network request failed`

1. Pastikan file `.env` ada di root proyek.
   - `EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co`
   - `EXPO_PUBLIC_SUPABASE_KEY=eyJhbGciOi...` (anon key)
2. Restart bundler setelah mengubah `.env`:
   - `npx expo start -c`
3. Periksa koneksi internet perangkat/emulator.
4. Untuk Android Emulator, cek apakah bisa mengakses internet (buka browser internal ke `https://supabase.com`).
5. Jika tetap gagal, lihat log lengkap di Metro/terminal dan tangkapan `console.error` dari layer CRUD.

cara menampilkan data dengan sederhana

import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import { useDropBaru } from "@/src/lib/hooks/drop/useDropBaru";
import { useDropLama } from "@/src/lib/hooks/drop/useDropLama";
import { theme } from "@/src/lib/styles/theme";
import { formatAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import {
ActivityIndicator,
ScrollView,
StyleSheet,
Text,
View,
} from "react-native";
import { commonStyles } from "../../lib/styles/common";

export default function HomeScreen() {
const { user } = useAuth();
const { data: dropData, loading, error } = useDropBaru();
const { data: dropLamaData } = useDropLama();

if (loading) {
return (
<View style={commonStyles.centeredContainer}>
<ActivityIndicator size="large" />
<Text style={commonStyles.title}>Memuat data...</Text>
</View>
);
}

if (error) {
return (
<View style={commonStyles.centeredContainer}>
<Text style={commonStyles.title}>Error: {error}</Text>
</View>
);
}

return (
<ScrollView style={styles.container}>
<Text style={styles.title}>
Selamat Bergabung {user?.user_metadata?.display_name || "User"}!
</Text>

      {dropData.length > 0 ? (
        dropData.map((item, idx) => (
          <View key={idx} style={{ marginBottom: 10 }}>
            <Text>Nama: {item.nama}</Text>
            <Text>Alamat: {item.alamat}</Text>
            <Text>Besar Pinjaman: {formatAngka(item.besar_pinjaman)}</Text>
            <Text>Angsuran: {formatAngka(item.angsuran)}</Text>
            <Text>Tabungan: {formatAngka(item.tabungan)}</Text>
            <Text>Premi: {formatAngka(item.premi)}</Text>
            <Text>Saldo Pinjaman: {formatAngka(item.saldo_pinjaman)}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        ))
      ) : (
        <Text>Belum ada data drop</Text>
      )}

      {dropLamaData.length > 0 ? (
        dropLamaData.map((item, idx) => (
          <View key={idx} style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Nama: {item.nama}</Text>
            <Text style={styles.text}>Alamat: {item.alamat}</Text>
            <Text style={styles.text}>
              Angsuran: {formatAngka(item.angsuran)}
            </Text>
            <Text style={styles.text}>
              Tabungan: {formatAngka(item.tabungan)}
            </Text>
            <Text style={styles.text}>
              Sisa Saldo: {formatAngka(item.sisa_saldo)}
            </Text>
            <Text style={styles.text}>Status: {item.status}</Text>
          </View>
        ))
      ) : (
        <Text>Belum ada data drop</Text>
      )}
    </ScrollView>

);
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: theme.spacing.xl,
},
title: {
fontSize: theme.typography.sizes["2xl"],
fontWeight: theme.typography.weights.bold,
color: theme.colors.primary,
marginBottom: theme.spacing.xs,
},
text: {
fontSize: theme.typography.sizes.sm,
color: theme.colors.success,
},
});

// import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
// import { getDropBaru } from "@/src/lib/services/crud/drop-baru/read";
// import { formatAngka } from "@/src/lib/utils/form/formatAngka";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import { DropBaru } from "../../lib/services/crud/drop-baru/types";
// import { commonStyles } from "../../lib/styles/common";

// export default function HomeScreen() {
// const { user } = useAuth();
// const [dropData, setDropData] = useState<DropBaru[]>([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
// const fetchDropData = async () => {
// try {
// setLoading(true);
// const result = await getDropBaru();

// if (result.success && result.data) {
// setDropData(result.data);
// } else {
// setError(result.error || "Gagal mengambil data");
// }
// } catch (err) {
// console.error("Error fetching drop data:", err);
// setError("Terjadi kesalahan sistem");
// } finally {
// setLoading(false);
// }
// };

// fetchDropData();
// }, []);

// if (loading) {
// return (
// <View style={commonStyles.centeredContainer}>
// <ActivityIndicator size="large" />
// <Text style={commonStyles.title}>Memuat data...</Text>
// </View>
// );
// }

// if (error) {
// return (
// <View style={commonStyles.centeredContainer}>
// <Text style={commonStyles.title}>Error: {error}</Text>
// </View>
// );
// }

// return (
// <View style={commonStyles.centeredContainer}>
// <Text style={commonStyles.title}>
// Selamat Bergabung {user?.user_metadata?.display_name || "User"}!
// </Text>
// {dropData.length > 0 ? (
// <View>
// <Text>Data Drop: {dropData.map((item) => item.nama).join(", ")}</Text>
// <Text>
// Data Drop: {dropData.map((item) => item.alamat).join(", ")}
// </Text>
// <Text>
// Data Drop:{" "}
// {formatAngka(
// dropData.map((item) => item.besar_pinjaman).join(", ")
// )}
// </Text>
// <Text>
// Data Drop:{" "}
// {formatAngka(dropData.map((item) => item.angsuran).join(", "))}
// </Text>
// <Text>
// Data Drop:{" "}
// {formatAngka(dropData.map((item) => item.tabungan).join(", "))}
// </Text>
// <Text>
// Data Drop:{" "}
// {formatAngka(dropData.map((item) => item.premi).join(", "))}
// </Text>
// <Text>
// Data Drop:{" "}
// {formatAngka(
// dropData.map((item) => item.saldo_pinjaman).join(", ")
// )}
// </Text>
// <Text>
// Data Drop: {dropData.map((item) => item.status).join(", ")}
// </Text>
// </View>
// ) : (
// <Text>Belum ada data drop</Text>
// )}
// </View>
// );
// }
