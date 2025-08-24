import GradientButton from "@/src/components/common/GradientButton";
import HeaderPembayaran from "@/src/components/transactions/HeaderPembayaran";
import HistoryList from "@/src/components/transactions/HistoryList";
import InfoRow from "@/src/components/transactions/InfoRow";
import { usePembayaran } from "@/src/lib/hooks/transaksi/usePembayaran";
import { theme } from "@/src/lib/styles/theme";
import {
  formatAngka,
  formatInputAngka,
} from "@/src/lib/utils/form/formatAngka";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Layar Pembayaran: hanya merangkai hook dan komponen presentasional.
 */
export default function PembayaranScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    type?: string;
    nama?: string;
    alamat?: string;
    angsuran?: string;
    tabungan?: string;
    saldo?: string;
  }>();

  const { state, setters, derived, actions } = usePembayaran({
    id: params.id ? String(params.id) : undefined,
    type: params.type ? String(params.type) : undefined,
    nama: params.nama ? String(params.nama) : undefined,
    alamat: params.alamat ? String(params.alamat) : undefined,
    angsuran: params.angsuran ? String(params.angsuran) : undefined,
    tabungan: params.tabungan ? String(params.tabungan) : undefined,
    saldo: params.saldo ? String(params.saldo) : undefined,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderPembayaran
        nama={params.nama ? String(params.nama) : undefined}
        alamat={params.alamat ? String(params.alamat) : undefined}
        nomorSobek={derived.nomorSobek}
      />

      <InfoRow label="Sisa Saldo" value={formatAngka(params.saldo || "-")} />
      <InfoRow label="Tabungan" value={formatAngka(params.tabungan || "-")} />
      <InfoRow label="Angsuran" value={formatAngka(params.angsuran || "-")} />

      <View style={styles.separator} />

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nominal Transaksi</Text>
        <TextInput
          value={state.nominal}
          onChangeText={(text) => setters.setNominal(formatInputAngka(text))}
          placeholder="Masukkan nominal"
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[300]}
        />
      </View>

      <View style={styles.actions}>
        <GradientButton
          title="Setor"
          icon="cash-outline"
          loading={state.loadingJenis === "setor"}
          onPress={() => actions.handleCreateTransaksi("setor")}
          style={{ marginTop: theme.spacing.sm }}
          disabled={!derived.canSubmit}
        />

        <GradientButton
          title="Putar"
          icon="cash-outline"
          loading={state.loadingPutar}
          onPress={actions.openPilihanPutar}
          style={{ marginTop: theme.spacing.sm }}
          disabled={
            derived.dropTipe === "baru" ? !derived.canPutarDropBaru : false
          }
        />
        {state.spinMode && (
          <View style={{ marginTop: theme.spacing.sm }}>
            <Text style={styles.inputLabel}>
              {state.spinMode === "naik"
                ? "Nominal kenaikan pinjaman"
                : "Nominal penurunan pinjaman"}
            </Text>
            <TextInput
              value={state.pinjamanDelta}
              onChangeText={(text) =>
                setters.setPinjamanDelta(formatInputAngka(text))
              }
              placeholder="Masukkan nominal"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={theme.colors.gray[300]}
            />
            <GradientButton
              title={
                state.spinMode === "naik"
                  ? "Konfirmasi Naik"
                  : "Konfirmasi Turun"
              }
              icon="checkmark-outline"
              onPress={() =>
                actions.handlePutar(
                  state.spinMode ?? "tetap",
                  Number(
                    String(state.pinjamanDelta)
                      .replace(/\s/g, "")
                      .replace(/\./g, "")
                      .replace(/[^0-9,-]/g, "")
                      .replace(/(,)(?=.*,)/g, "")
                      .replace(",", ".")
                  ) || 0
                )
              }
              style={{ marginTop: theme.spacing.sm }}
            />
            <GradientButton
              title="Batal"
              icon="close-outline"
              onPress={() => {
                setters.setSpinMode(null);
                setters.setPinjamanDelta("");
              }}
              style={{ marginTop: theme.spacing.xs }}
            />
          </View>
        )}
      </View>

      <HistoryList
        loading={state.loadingHistory}
        items={state.history}
        totalSetor={derived.totalSetor}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
    marginVertical: theme.spacing.md,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    color: theme.colors.gray[400],
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.base,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.gray[500],
    fontSize: theme.typography.sizes.base,
    backgroundColor: theme.colors.white,
  },
  actions: {
    marginTop: theme.spacing.sm,
  },
});
