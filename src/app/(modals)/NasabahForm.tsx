import GradientButton from "@/src/components/common/GradientButton";
import { useNasabahForm } from "@/src/lib/hooks/nasabah/useNasabahForm";
import { theme } from "@/src/lib/styles/theme";
import { formatInputAngka } from "@/src/lib/utils/form/formatAngka";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Form Nasabah: UI presentasional yang memakai hook useNasabahForm.
 */
export default function NasabahForm() {
  const { state, isValid, setNama, setAlamat, setAngsuran, submit } =
    useNasabahForm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.group}>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          value={state.nama}
          onChangeText={setNama}
          placeholder="Nama nasabah"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[300]}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Alamat</Text>
        <TextInput
          value={state.alamat}
          onChangeText={setAlamat}
          placeholder="Alamat nasabah"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[300]}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Angsuran</Text>
        <TextInput
          value={state.angsuran}
          onChangeText={(t) => setAngsuran(formatInputAngka(t))}
          placeholder="Masukkan angsuran"
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={theme.colors.gray[300]}
        />
      </View>

      <GradientButton
        title="Simpan"
        icon="save-outline"
        loading={state.submitting}
        disabled={!isValid}
        onPress={submit}
        style={{ marginTop: theme.spacing.md }}
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
  group: {
    marginBottom: theme.spacing.md,
  },
  label: {
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
});
