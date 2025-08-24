import { TransaksiItem } from "@/src/lib/hooks/transaksi/usePembayaran";
import { theme } from "@/src/lib/styles/theme";
import { formatAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  loading: boolean;
  items: TransaksiItem[];
  totalSetor: number;
};

/**
 * Daftar riwayat transaksi, menampilkan total stor dan daftar item.
 */
export default function HistoryList({ loading, items, totalSetor }: Props) {
  return (
    <View style={styles.historySection}>
      <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
      <View style={styles.row}>
        <Text style={styles.label}>
          Storting : {formatAngka(String(totalSetor))}
        </Text>
      </View>
      {loading ? (
        <Text style={styles.label}>Memuat...</Text>
      ) : items.length === 0 ? (
        <Text style={styles.label}>Belum ada transaksi.</Text>
      ) : (
        <View style={styles.historyList}>
          {items.map((item) => {
            const tanggal = new Date(item.created_at).toLocaleString();
            return (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyItemRow}>
                  <Text style={styles.historyJenis}>
                    {item.jenis.toUpperCase()}
                  </Text>
                  <Text style={styles.historyNominal}>
                    {formatAngka(String(item.nominal))}
                  </Text>
                </View>
                <Text style={styles.historyDate}>{tanggal}</Text>
              </View>
            );
          })}
        </View>
      )}
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
  label: {
    color: theme.colors.gray[400],
    fontSize: theme.typography.sizes.sm,
  },
  historySection: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.gray[400],
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.base,
    marginBottom: theme.spacing.sm,
  },
  historyList: {
    gap: theme.spacing.sm as any,
  },
  historyItem: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  historyItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyJenis: {
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  historyNominal: {
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
  },
  historyDate: {
    marginTop: theme.spacing.xs,
    color: theme.colors.gray[300],
    fontSize: theme.typography.sizes.xs,
  },
});
