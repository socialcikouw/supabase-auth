import { AUTH_MESSAGES } from "@/src/lib/constants/auth/authMessages";
import { useLoginForm } from "@/src/lib/hooks/auth/useAuthForm";
import { authStyles } from "@/src/lib/styles/auth/authStyles";
import { LoginScreenProps } from "@/src/lib/types/auth/auth";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSwitchToRegister,
}) => {
  const { formData, loading, handleLogin, updateField } =
    useLoginForm(onSwitchToRegister);

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>{AUTH_MESSAGES.UI.LOGIN_TITLE}</Text>
        <Text style={authStyles.subtitle}>
          {AUTH_MESSAGES.UI.LOGIN_SUBTITLE}
        </Text>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>{AUTH_MESSAGES.UI.EMAIL_LABEL}</Text>
          <TextInput
            style={authStyles.input}
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder={AUTH_MESSAGES.UI.EMAIL_PLACEHOLDER}
            placeholderTextColor="#007AFF"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>
            {AUTH_MESSAGES.UI.PASSWORD_LABEL}
          </Text>
          <TextInput
            style={authStyles.input}
            value={formData.password}
            onChangeText={(value) => updateField("password", value)}
            placeholder={AUTH_MESSAGES.UI.PASSWORD_PLACEHOLDER}
            placeholderTextColor="#007AFF"
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[authStyles.button, loading && authStyles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={authStyles.buttonText}>
              {AUTH_MESSAGES.UI.LOGIN_BUTTON}
            </Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.switchContainer}>
          <Text style={authStyles.switchText}>
            {AUTH_MESSAGES.UI.NO_ACCOUNT}
          </Text>
          <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
            <Text style={authStyles.switchLink}>
              {AUTH_MESSAGES.UI.REGISTER_LINK}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
