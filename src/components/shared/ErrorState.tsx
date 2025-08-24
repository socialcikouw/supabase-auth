import { theme } from "@/src/lib/styles/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ErrorStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  error?: string | null;
  retryText?: string;
  onRetry?: () => void;
  showErrorDetails?: boolean;
}

export default function ErrorState({
  title = "Terjadi Kesalahan",
  subtitle = "Gagal memuat data. Silakan coba lagi.",
  icon = "❌",
  error,
  retryText = "Coba Lagi",
  onRetry,
  showErrorDetails = false,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {showErrorDetails && error && (
        <View style={styles.errorDetailsContainer}>
          <Text style={styles.errorDetailsTitle}>Detail Error:</Text>
          <Text style={styles.errorDetails}>{error}</Text>
        </View>
      )}

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{retryText}</Text>
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
    color: theme.colors.error,
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

  errorDetailsContainer: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    width: "100%",
    maxWidth: 300,
  },

  errorDetailsTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.sm,
  },

  errorDetails: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    lineHeight: 18,
  },

  retryButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },

  retryText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
  },
});
