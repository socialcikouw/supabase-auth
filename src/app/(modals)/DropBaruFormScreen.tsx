import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FormInput from "../../components/common/FormInput";
import GradientButton from "../../components/common/GradientButton";

import { simpanDropBaru } from "@/src/lib/services/crud";
import { commonStyles } from "../../lib/styles/common";
import { theme } from "../../lib/styles/theme";
import {
  formatInputAngka,
  formatMataUang,
  getNumericValue,
} from "../../lib/utils/form/formatAngka";
import { hitungOtomatis } from "../../lib/utils/form/hitungOtomatis";

export default function DropBaruFormScreen() {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    besarPinjaman: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const perhitungan = hitungOtomatis(formData.besarPinjaman, getNumericValue);

  const handleSubmit = async () => {
    if (
      !formData.nama ||
      !formData.alamat ||
      !formData.besarPinjaman ||
      getNumericValue(formData.besarPinjaman) === 0
    ) {
      Alert.alert("Error", "Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setIsLoading(true);

    try {
      const result = await simpanDropBaru(formData, perhitungan);

      if (result.success) {
        Alert.alert("Sukses", "Data drop baru berhasil disimpan!", [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setFormData({
                nama: "",
                alamat: "",
                besarPinjaman: "",
              });
            },
          },
        ]);
      } else {
        Alert.alert("Error", result.error || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={theme.colors.gradients.primary}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Form Drop Baru</Text>
          <Text style={styles.headerSubtitle}>Lengkapi data drop baru</Text>
        </LinearGradient>

        <View style={commonStyles.paddedContainer}>
          <FormInput
            label="Nama Lengkap"
            icon="person"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChangeText={(text) => setFormData({ ...formData, nama: text })}
            returnKeyType="next"
          />

          <FormInput
            label="Alamat"
            icon="location"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamat}
            onChangeText={(text) => setFormData({ ...formData, alamat: text })}
            multiline
            numberOfLines={3}
            style={{ textAlignVertical: "top", minHeight: 80 }}
            returnKeyType="next"
          />

          <FormInput
            label="Besar Pinjaman"
            icon="cash"
            placeholder="Masukkan jumlah pinjaman"
            value={formData.besarPinjaman}
            onChangeText={(text) => {
              const formatted = formatInputAngka(text);
              setFormData({ ...formData, besarPinjaman: formatted });
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          {/* Perhitungan Otomatis Section */}
          {formData.besarPinjaman &&
            getNumericValue(formData.besarPinjaman) > 0 && (
              <View style={commonStyles.section}>
                <Text style={commonStyles.sectionTitle}>
                  Perhitungan Otomatis
                </Text>
                <View style={commonStyles.card}>
                  <View style={styles.calculationRow}>
                    <View style={styles.calculationItem}>
                      <Ionicons
                        name="calculator"
                        size={theme.iconSizes.sm}
                        color={theme.colors.secondary}
                      />
                      <Text style={styles.calculationLabel}>Angsuran (5%)</Text>
                      <Text style={styles.calculationValue}>
                        {formatMataUang(perhitungan.angsuran)}
                      </Text>
                    </View>
                    <View style={styles.calculationItem}>
                      <Ionicons
                        name="wallet"
                        size={theme.iconSizes.sm}
                        color={theme.colors.secondary}
                      />
                      <Text style={styles.calculationLabel}>Tabungan (5%)</Text>
                      <Text style={styles.calculationValue}>
                        {formatMataUang(perhitungan.tabungan)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.calculationRow}>
                    <View style={styles.calculationItem}>
                      <Ionicons
                        name="shield-checkmark"
                        size={theme.iconSizes.sm}
                        color={theme.colors.secondary}
                      />
                      <Text style={styles.calculationLabel}>Premi (5%)</Text>
                      <Text style={styles.calculationValue}>
                        {formatMataUang(perhitungan.premi)}
                      </Text>
                    </View>
                    <View style={styles.calculationItem}>
                      <Ionicons
                        name="trending-up"
                        size={theme.iconSizes.sm}
                        color={theme.colors.secondary}
                      />
                      <Text style={styles.calculationLabel}>
                        Saldo Pinjaman (120%)
                      </Text>
                      <Text style={styles.calculationValue}>
                        {formatMataUang(perhitungan.saldo_pinjaman)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

          <GradientButton
            title="Simpan Data"
            icon="checkmark-circle"
            gradient={theme.colors.gradients.secondary}
            loading={isLoading}
            loadingText="Menyimpan..."
            onPress={handleSubmit}
            style={{ marginTop: theme.spacing.xl }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: theme.spacing["3xl"],
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: theme.typography.sizes["3xl"],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.base,
    color: "rgba(255, 255, 255, 0.9)",
  },
  calculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  calculationItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
  },
  calculationLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },
  calculationValue: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    textAlign: "center",
  },
});
