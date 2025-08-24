/**
 * Theme system terpusat untuk aplikasi
 * Mengelola colors, typography, spacing, dan shadows
 */
export const theme = {
  colors: {
    primary: "#2196F3",
    secondary: "#667eea",
    success: "#28A745",
    error: "#f5576c",
    warning: "#ffc107",
    white: "#ffffff",
    black: "#000000",
    gray: {
      50: "#f5f5f5",
      100: "#e0e0e0",
      200: "#ccc",
      300: "#999",
      400: "#666",
      500: "#333",
    },
    gradients: {
      primary: ["#667eea", "#764ba2"],
      secondary: ["#f093fb", "#f5576c"],
      tertiary: ["#4facfe", "#00f2fe"],
    },
  },

  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      "2xl": 22,
      "3xl": 24,
      "4xl": 28,
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 40,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 15,
    xl: 20,
    full: 999,
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
  },

  iconSizes: {
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
    "2xl": 30,
    "3xl": 40,
  },
} as const;

export type Theme = typeof theme;
