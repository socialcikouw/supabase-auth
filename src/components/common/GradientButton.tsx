import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { commonStyles } from "../../lib/styles/common";
import { theme } from "../../lib/styles/theme";

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  gradient?: readonly string[];
  loadingText?: string;
}

export default function GradientButton({
  title,
  icon,
  loading = false,
  gradient = theme.colors.gradients.primary,
  loadingText = "Loading...",
  style,
  disabled,
  ...props
}: GradientButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[commonStyles.button, { opacity: isDisabled ? 0.6 : 1 }, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      <LinearGradient
        colors={gradient as any}
        style={commonStyles.buttonContent}
      >
        {loading ? (
          <>
            <ActivityIndicator size="small" color={theme.colors.white} />
            <Text style={commonStyles.buttonText}>{loadingText}</Text>
          </>
        ) : (
          <>
            {icon && (
              <Ionicons
                name={icon}
                size={theme.iconSizes.md}
                color={theme.colors.white}
              />
            )}
            <Text style={commonStyles.buttonText}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
