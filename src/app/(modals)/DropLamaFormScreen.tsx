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
import { simpanDropLama } from "../../lib/services/crud";
import { commonStyles } from "../../lib/styles/common";
import { theme } from "../../lib/styles/theme";
import {
  formatInputAngka,
  getNumericValue,
} from "../../lib/utils/form/formatAngka";

export default function DropLamaFormScreen() {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    sisaSaldo: "",
    angsuran: "",
    tabungan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validasi input
    if (
      !formData.nama.trim() ||
      !formData.alamat.trim() ||
      !formData.sisaSaldo ||
      !formData.angsuran ||
      !formData.tabungan ||
      getNumericValue(formData.sisaSaldo) === 0 ||
      getNumericValue(formData.angsuran) === 0 ||
      getNumericValue(formData.tabungan) === 0
    ) {
      Alert.alert(
        "Error",
        "Mohon lengkapi semua field dengan nilai yang valid"
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log("Form data yang akan dikirim:", {
        nama: formData.nama,
        alamat: formData.alamat,
        sisaSaldo: formData.sisaSaldo,
        angsuran: formData.angsuran,
        tabungan: formData.tabungan,
        sisaSaldoNumeric: getNumericValue(formData.sisaSaldo),
        angsuranNumeric: getNumericValue(formData.angsuran),
        tabunganNumeric: getNumericValue(formData.tabungan),
      });

      const result = await simpanDropLama(formData);

      // console.log("Hasil simpan data:", result);

      if (result.success) {
        Alert.alert("Sukses", "Data drop lama berhasil disimpan!", [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setFormData({
                nama: "",
                alamat: "",
                sisaSaldo: "",
                angsuran: "",
                tabungan: "",
              });
            },
          },
        ]);
      } else {
        const errorMessage = result.error || "Gagal menyimpan data";
        console.error("Error dari server:", errorMessage);
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "Terjadi kesalahan sistem. Periksa koneksi internet dan coba lagi."
      );
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
          colors={theme.colors.gradients.tertiary}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Form Drop Lama</Text>
          <Text style={styles.headerSubtitle}>Lengkapi data drop lama</Text>
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

          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Informasi Keuangan</Text>

            <FormInput
              icon="wallet"
              placeholder="Sisa saldo pinjaman"
              value={formData.sisaSaldo}
              onChangeText={(text) => {
                const formatted = formatInputAngka(text);
                setFormData({ ...formData, sisaSaldo: formatted });
              }}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <FormInput
              icon="calendar"
              placeholder="Jumlah angsuran per hari"
              value={formData.angsuran}
              onChangeText={(text) => {
                const formatted = formatInputAngka(text);
                setFormData({ ...formData, angsuran: formatted });
              }}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <FormInput
              icon="save"
              placeholder="Jumlah tabungan"
              value={formData.tabungan}
              onChangeText={(text) => {
                const formatted = formatInputAngka(text);
                setFormData({ ...formData, tabungan: formatted });
              }}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <GradientButton
            title="Simpan Data"
            icon="checkmark-circle"
            gradient={theme.colors.gradients.primary}
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
});
