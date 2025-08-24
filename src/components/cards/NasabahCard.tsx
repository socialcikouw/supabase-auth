import { DropBaru } from "@/src/lib/services/crud/drop-baru/types";
import { DropLama } from "@/src/lib/services/crud/drop-lama/types";
import { theme } from "@/src/lib/styles/theme";
import { formatAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Union type untuk menggabungkan kedua tipe data
export type NasabahData = DropBaru | DropLama;

export interface NasabahCardProps {
  item: NasabahData;
  type: "baru" | "lama";
  onPress?: (item: NasabahData) => void;
}

// Type guard untuk mengecek apakah item adalah DropBaru
function isDropBaru(item: NasabahData): item is DropBaru {
  return "saldo_pinjaman" in item;
}

export default function NasabahCard({ item, type, onPress }: NasabahCardProps) {
  // Tentukan nilai saldo berdasarkan tipe
  const getSaldoValue = () => {
    if (type === "baru" && isDropBaru(item)) {
      return item.saldo_pinjaman;
    } else if (type === "lama" && !isDropBaru(item)) {
      return item.sisa_saldo;
    }
    return 0;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.saldo}>{formatAngka(getSaldoValue())}</Text>
      </View>
      <View style={styles.alamatContainer}>
        <Text style={styles.alamat}>{item.alamat}</Text>
        <Text style={styles.angsuran}>{formatAngka(item.angsuran)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nama: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
    flex: 1,
  },

  alamatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  alamat: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    lineHeight: 20,
  },

  angsuran: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weights.bold,
  },

  saldo: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    fontWeight: theme.typography.weights.medium,
  },
});
