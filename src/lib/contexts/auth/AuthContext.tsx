import { supabase } from "@/src/lib/services/supabase";
import type { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AUTH_MESSAGES } from "../../constants/auth/authMessages";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  initializing: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; message?: string }>;
  signUp: (
    email: string,
    password: string,
    username?: string
  ) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setSession(data.session ?? null);
        setInitializing(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setSession(null);
        setInitializing(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { ok: false, message: AUTH_MESSAGES.ERROR.LOGIN_FAILED };
      }
      return { ok: true };
    } catch (_e) {
      return { ok: false, message: AUTH_MESSAGES.ERROR.GENERIC_ERROR };
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, username?: string) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: username ? { display_name: username } : undefined,
          },
        });
        if (error) {
          return { ok: false, message: AUTH_MESSAGES.ERROR.REGISTER_FAILED };
        }
        return {
          ok: true,
          message: `${AUTH_MESSAGES.SUCCESS.REGISTER_SUCCESS}. ${AUTH_MESSAGES.SUCCESS.REGISTER_CHECK_EMAIL}`,
        };
      } catch (_e) {
        return { ok: false, message: AUTH_MESSAGES.ERROR.GENERIC_ERROR };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      session,
      user: session?.user ?? null,
      initializing,
      signIn,
      signUp,
      signOut,
    };
  }, [session, initializing, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return ctx;
}
