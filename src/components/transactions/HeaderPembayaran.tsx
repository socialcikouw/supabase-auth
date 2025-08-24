import { theme } from "@/src/lib/styles/theme";
import { formatAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  nama?: string;
  alamat?: string;
  nomorSobek: number;
};

/**
 * Menampilkan header informasi nasabah dan nomor sobekan.
 */
export default function HeaderPembayaran({ nama, alamat, nomorSobek }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.nama}>{nama || "-"}</Text>
        <Text style={styles.alamat}>{alamat || "-"}</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.sobekan}>
          <Text style={styles.nomorSobek}>
            {formatAngka(String(nomorSobek))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  nama: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.xs,
  },
  alamat: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.gray[300],
  },
  sobekan: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  nomorSobek: {
    color: theme.colors.black,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.medium,
  },
});
