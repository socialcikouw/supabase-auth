export type AuthFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type LoginScreenProps = {
  onSwitchToRegister: () => void;
};

export type RegisterScreenProps = {
  onSwitchToLogin: () => void;
};
