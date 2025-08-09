import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import { AuthFormData } from "@/src/lib/types/auth/auth";
import {
  validateLoginForm,
  validateRegisterForm,
} from "@/src/lib/utils/auth/validation";
import { useState } from "react";
import { Alert } from "react-native";

export const useLoginForm = (onSwitchToRegister: () => void) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      Alert.alert("Error", validation.message || "Form tidak valid");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(formData.email, formData.password);
      if (!result.ok) {
        Alert.alert("Login Failed", result.message || "Login gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    handleLogin,
    updateField,
    onSwitchToRegister,
  };
};

export const useRegisterForm = (onSwitchToLogin: () => void) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      Alert.alert("Error", validation.message || "Form tidak valid");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(
        formData.email,
        formData.password,
        formData.username
      );
      if (!result.ok) {
        Alert.alert(
          "Registration Failed",
          result.message || "Registrasi gagal"
        );
      } else {
        Alert.alert(
          "Success",
          result.message ||
            "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.",
          [{ text: "OK", onPress: onSwitchToLogin }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    loading,
    handleRegister,
    updateField,
    onSwitchToLogin,
  };
};
