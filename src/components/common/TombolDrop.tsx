import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../lib/styles/theme";

const { width } = Dimensions.get("window");

export default function TombolDrop() {
  const handleDropLama = () => {
    router.push("/DropLamaFormScreen");
  };

  const handleDropBaru = () => {
    router.push("/DropBaruFormScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={handleDropLama}
      >
        <LinearGradient
          colors={theme.colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-add"
                size={theme.iconSizes.sm}
                color={theme.colors.white}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Drop Lama</Text>
            </View>
          </View>

          <Text style={styles.caption}>Tekan untuk menambah drop lama</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={handleDropBaru}
      >
        <LinearGradient
          colors={theme.colors.gradients.secondary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-add"
                size={theme.iconSizes.sm}
                color={theme.colors.white}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Drop Baru</Text>
            </View>
          </View>

          <Text style={styles.caption}>Tekan untuk menambah drop baru</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.xl,
  },
  contoh: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "red",
  },
  buttonContainer: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
    width: (width - 60) / 2,
    minHeight: 140,
  },
  gradient: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.md,
  },
  textContainer: {
    marginLeft: theme.spacing.md,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    textAlign: "left",
  },
  caption: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    textAlign: "left",
  },
});
