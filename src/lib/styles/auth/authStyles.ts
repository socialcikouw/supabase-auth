import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    justifyContent: "center",
    padding: theme.spacing.xl,
  },
  formContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing["3xl"],
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.typography.sizes["4xl"],
    fontWeight: theme.typography.weights.bold,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
    color: theme.colors.gray[500],
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
    color: theme.colors.gray[400],
  },
  inputContainer: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.sm,
    color: theme.colors.gray[500],
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.lg,
    fontSize: theme.typography.sizes.base,
    backgroundColor: "#fafafa",
  },
  button: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
  },
  registerButton: {
    backgroundColor: theme.colors.success,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray[200],
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  switchText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
  },
  switchLink: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
});
