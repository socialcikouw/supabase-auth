import { AUTH_MESSAGES } from "../../constants/auth/authMessages";
import type { AuthFormData } from "../../types/auth/auth";

type ValidationResult = { isValid: boolean; message?: string };

export function validateLoginForm(data: AuthFormData): ValidationResult {
  if (!data.email || !data.password) {
    return {
      isValid: false,
      message: AUTH_MESSAGES.ERROR.EMAIL_PASSWORD_REQUIRED,
    };
  }
  if (data.password.length < 6) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT };
  }
  return { isValid: true };
}

export function validateRegisterForm(data: AuthFormData): ValidationResult {
  if (
    !data.username ||
    !data.email ||
    !data.password ||
    !data.confirmPassword
  ) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.FIELDS_REQUIRED };
  }
  if (data.password.length < 6) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT };
  }
  if (data.password !== data.confirmPassword) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.PASSWORD_MISMATCH };
  }
  return { isValid: true };
}
