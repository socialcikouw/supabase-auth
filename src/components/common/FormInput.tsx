import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { commonStyles } from "../../lib/styles/common";
import { theme } from "../../lib/styles/theme";

interface FormInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  containerStyle?: any;
}

export default function FormInput({
  label,
  icon,
  error,
  containerStyle,
  style,
  ...props
}: FormInputProps) {
  return (
    <View style={[commonStyles.section, containerStyle]}>
      {label && <Text style={commonStyles.sectionTitle}>{label}</Text>}

      <View style={commonStyles.inputContainer}>
        {icon && (
          <Ionicons
            name={icon}
            size={theme.iconSizes.sm}
            color={theme.colors.primary}
            style={commonStyles.inputIcon}
          />
        )}

        <TextInput
          style={[commonStyles.input, style]}
          placeholderTextColor={theme.colors.gray[300]}
          {...props}
        />
      </View>

      {error && (
        <Text
          style={{
            color: theme.colors.error,
            fontSize: theme.typography.sizes.sm,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
