import { theme } from "@/src/lib/styles/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

/** Menampilkan baris label: value dengan gaya konsisten. */
export default function InfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
  value: {
    color: theme.colors.gray[500],
    fontWeight: theme.typography.weights.medium,
    fontSize: theme.typography.sizes.base,
  },
});
