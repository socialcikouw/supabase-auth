import { useState } from "react";

export const useAuthNavigation = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  return {
    isLogin,
    switchToLogin,
    switchToRegister,
  };
};
