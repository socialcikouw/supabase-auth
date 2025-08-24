import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert } from "react-native";

export type MenuItemType = {
  id: string;
  judul: string;
  deskripsi: string;
  ikon: keyof typeof Ionicons.glyphMap;
  warna: string;
  gradien: string[];
  navigasi?: string;
  onPress: () => void;
};

export type MenuGroupType = {
  id: string;
  groupTitle: string;
  items: MenuItemType[];
};

export const menuGroups: MenuGroupType[] = [
  {
    id: "transaksi",
    groupTitle: "Transaksi",
    items: [
      {
        id: "tambah-drop-baru",
        judul: "Drop Baru",
        deskripsi: "Tambah nasabah drop baru",
        ikon: "add-circle",
        warna: "#10B981", // Emerald-500
        gradien: ["#10B981", "#059669"],
        navigasi: "DropBaruFormScreen",
        onPress: () => {
          try {
            router.push("/DropBaruFormScreen");
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Gagal membuka halaman Drop Baru");
          }
        },
      },
      {
        id: "tambah-drop-lama",
        judul: "Drop Lama",
        deskripsi: "Tambah nasabah drop lama",
        ikon: "document-text",
        warna: "#3B82F6", // Blue-500
        gradien: ["#3B82F6", "#2563EB"],
        navigasi: "DropLamaFormScreen",
        onPress: () => {
          try {
            router.push("/DropLamaFormScreen");
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Gagal membuka halaman Drop Lama");
          }
        },
      },
      {
        id: "kasbon-operasional",
        judul: "Kasbon Operasional",
        deskripsi: "Kelola kasbon operasional",
        ikon: "wallet",
        warna: "#F59E0B", // Amber-500
        gradien: ["#F59E0B", "#D97706"],
        onPress: () => {
          Alert.alert(
            "Coming Soon",
            "Fitur kasbon operasional akan segera tersedia!",
            [{ text: "OK" }]
          );
        },
      },
    ],
  },
  {
    id: "laporan",
    groupTitle: "Laporan & Analisis",
    items: [
      {
        id: "riwayat-transaksi",
        judul: "Riwayat Transaksi",
        deskripsi: "Lihat semua riwayat transaksi",
        ikon: "time",
        warna: "#06B6D4", // Cyan-500
        gradien: ["#06B6D4", "#0891B2"],
        onPress: () => {
          Alert.alert(
            "Coming Soon",
            "Fitur riwayat transaksi akan segera tersedia!",
            [{ text: "OK" }]
          );
        },
      },
      {
        id: "laporan-harian",
        judul: "Laporan Harian",
        deskripsi: "Lihat transaksi hari ini",
        ikon: "today",
        warna: "#8B5CF6", // Violet-500
        gradien: ["#8B5CF6", "#7C3AED"],
        onPress: () => {
          Alert.alert(
            "Coming Soon",
            "Fitur laporan harian akan segera tersedia!",
            [{ text: "OK" }]
          );
        },
      },
      {
        id: "laporan-bulanan",
        judul: "Laporan Bulanan",
        deskripsi: "Analisis bulanan lengkap",
        ikon: "calendar",
        warna: "#EF4444", // Red-500
        gradien: ["#EF4444", "#DC2626"],
        onPress: () => {
          Alert.alert(
            "Coming Soon",
            "Fitur laporan bulanan akan segera tersedia!",
            [{ text: "OK" }]
          );
        },
      },
    ],
  },
  {
    id: "data",
    groupTitle: "Data & Manajemen",
    items: [
      {
        id: "data-nasabah",
        judul: "Data Nasabah",
        deskripsi: "Kelola data nasabah",
        ikon: "people",
        warna: "#06B6D4", // Cyan-500
        gradien: ["#06B6D4", "#0891B2"],
        navigasi: "index",
        onPress: () => {
          try {
            router.push("/");
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Gagal membuka halaman Data Nasabah");
          }
        },
      },
      {
        id: "backup-data",
        judul: "Backup Data",
        deskripsi: "Backup & restore data",
        ikon: "cloud-upload",
        warna: "#10B981", // Emerald-500
        gradien: ["#10B981", "#059669"],
        onPress: () => {
          Alert.alert("Coming Soon", "Fitur backup akan segera tersedia!", [
            { text: "OK" },
          ]);
        },
      },
    ],
  },
  {
    id: "akun",
    groupTitle: "Akun & Pengaturan",
    items: [
      {
        id: "profil",
        judul: "Profil",
        deskripsi: "Kelola profil pengguna",
        ikon: "person-circle",
        warna: "#F59E0B", // Amber-500
        gradien: ["#F59E0B", "#D97706"],
        navigasi: "ProfileScreen",
        onPress: () => {
          try {
            router.push("/ProfileScreen");
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Gagal membuka halaman Profil");
          }
        },
      },
      {
        id: "pengaturan",
        judul: "Pengaturan",
        deskripsi: "Konfigurasi aplikasi",
        ikon: "settings",
        warna: "#6B7280", // Gray-500
        gradien: ["#6B7280", "#4B5563"],
        navigasi: "SettingsScreen",
        onPress: () => {
          Alert.alert("Coming Soon", "Fitur pengaturan akan segera tersedia!", [
            { text: "OK" },
          ]);
        },
      },
    ],
  },
];

// Backward compatibility
export const menuItem: MenuItemType[] = menuGroups.flatMap(
  (group) => group.items
);
