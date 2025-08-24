import { GradientButton } from "@/src/components/common";
import { useNasabahBaruList } from "@/src/lib/hooks/nasabah/useNasabahBaruList";
import { theme } from "@/src/lib/styles/theme";
import { formatAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NasabahBaru() {
  const { items, loading, error, refetch, setorAngsuran, loadingSetorId } =
    useNasabahBaruList();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Daftar Nasabah Baru</Text>
        <Text style={styles.link} onPress={refetch}>
          Muat Ulang
        </Text>
      </View>

      {loading && <Text style={styles.label}>Memuat...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      {items.map((row) => (
        <View key={row.id_nasabah_baru} style={styles.card}>
          <Text style={styles.nama}>{row.nama || "-"}</Text>
          <Text style={styles.alamat}>{row.alamat || "-"}</Text>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Pokok Pinjaman</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.pokok_pinjaman || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Tabungan</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.tabungan || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Storting</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.storting || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Saldo Awal</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.saldo_awal || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Murni</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.murni || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Pelunasan</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.pelunasan || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Pencairan</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.pencairan || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Sisa Saldo</Text>
            <Text style={styles.statValue}>
              {formatAngka(String(row.sisa_saldo || 0))}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Angsuran</Text>
            <Text style={styles.statValue}>{row.angsuran || "-"}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statValue}>
              {row.created_at
                ? new Date(row.created_at).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </Text>
          </View>

          <GradientButton
            title="Setor"
            icon="cash-outline"
            onPress={() => setorAngsuran(row)}
            loading={loadingSetorId === row.id_nasabah_baru}
            style={{ marginTop: theme.spacing.sm }}
            disabled={!row.angsuran}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  link: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
  label: {
    color: theme.colors.gray[400],
    fontSize: theme.typography.sizes.sm,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.sm,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  nama: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  alamat: {
    color: theme.colors.gray[300],
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.xs,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
    paddingBottom: theme.spacing.xs,
  },
  statLabel: {
    color: theme.colors.gray[400],
    fontSize: theme.typography.sizes.xs,
  },
  statValue: {
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.xs,
  },
});
