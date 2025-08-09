import { AUTH_MESSAGES } from "@/src/lib/constants/auth/authMessages";
import { useRegisterForm } from "@/src/lib/hooks/auth/useAuthForm";
import { authStyles } from "@/src/lib/styles/auth/authStyles";
import { RegisterScreenProps } from "@/src/lib/types/auth/auth";
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

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSwitchToLogin,
}) => {
  const { formData, loading, handleRegister, updateField } =
    useRegisterForm(onSwitchToLogin);

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>{AUTH_MESSAGES.UI.REGISTER_TITLE}</Text>
        <Text style={authStyles.subtitle}>
          {AUTH_MESSAGES.UI.REGISTER_SUBTITLE}
        </Text>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>
            {AUTH_MESSAGES.UI.USERNAME_LABEL}
          </Text>
          <TextInput
            style={authStyles.input}
            value={formData.username}
            onChangeText={(value) => updateField("username", value)}
            placeholder={AUTH_MESSAGES.UI.USERNAME_PLACEHOLDER}
            placeholderTextColor="#28A745"
            editable={!loading}
          />
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>{AUTH_MESSAGES.UI.EMAIL_LABEL}</Text>
          <TextInput
            style={authStyles.input}
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder={AUTH_MESSAGES.UI.EMAIL_PLACEHOLDER}
            placeholderTextColor="#28A745"
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
            placeholder={AUTH_MESSAGES.UI.PASSWORD_HINT_PLACEHOLDER}
            placeholderTextColor="#28A745"
            secureTextEntry
            editable={!loading}
          />
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>
            {AUTH_MESSAGES.UI.CONFIRM_PASSWORD_LABEL}
          </Text>
          <TextInput
            style={authStyles.input}
            value={formData.confirmPassword || ""}
            onChangeText={(value) => updateField("confirmPassword", value)}
            placeholder={AUTH_MESSAGES.UI.CONFIRM_PASSWORD_PLACEHOLDER}
            placeholderTextColor="#28A745"
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[
            authStyles.button,
            authStyles.registerButton,
            loading && authStyles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={authStyles.buttonText}>
              {AUTH_MESSAGES.UI.REGISTER_BUTTON}
            </Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.switchContainer}>
          <Text style={authStyles.switchText}>
            {AUTH_MESSAGES.UI.HAVE_ACCOUNT}
          </Text>
          <TouchableOpacity onPress={onSwitchToLogin} disabled={loading}>
            <Text style={authStyles.switchLink}>
              {AUTH_MESSAGES.UI.LOGIN_LINK}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
