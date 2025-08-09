import { useAuthNavigation } from "@/src/lib/hooks/auth/useAuthNavigation";
import React from "react";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

export const AuthScreen: React.FC = () => {
  const { isLogin, switchToLogin, switchToRegister } = useAuthNavigation();

  return isLogin ? (
    <LoginScreen onSwitchToRegister={switchToRegister} />
  ) : (
    <RegisterScreen onSwitchToLogin={switchToLogin} />
  );
};
