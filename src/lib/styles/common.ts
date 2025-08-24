import { StyleSheet } from "react-native";
import { theme } from "./theme";

/**
 * Common styles yang dapat digunakan di seluruh aplikasi
 */
export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  paddedContainer: {
    padding: theme.spacing.xl,
  },

  // Card styles
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    ...theme.shadows.md,
  },

  // Input styles
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.md,
  },

  input: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.gray[500],
  },

  inputIcon: {
    marginRight: theme.spacing.md,
  },

  // Text styles
  title: {
    fontSize: theme.typography.sizes["3xl"],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.gray[400],
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
  },

  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.md,
  },

  // Button styles
  button: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.lg,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginLeft: theme.spacing.md,
  },

  // Layout styles
  section: {
    marginBottom: theme.spacing["2xl"],
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    justifyContent: "space-between",
  },

  // Spacing utilities
  marginTop: {
    marginTop: theme.spacing.md,
  },

  marginBottom: {
    marginBottom: theme.spacing.md,
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
