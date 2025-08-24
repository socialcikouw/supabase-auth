import { theme } from "@/src/lib/styles/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export default function EmptyState({
  title = "Belum Ada Data",
  subtitle = "Data belum tersedia saat ini",
  icon = "📋",
  actionText,
  onActionPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {actionText && onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing["2xl"],
    paddingVertical: theme.spacing["4xl"],
  },

  icon: {
    fontSize: theme.iconSizes["3xl"],
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.gray[400],
    textAlign: "center",
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },

  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },

  actionText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
  },
});
