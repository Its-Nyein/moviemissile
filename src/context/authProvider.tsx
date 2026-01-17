import { useEffect, useState, ReactNode } from "react";
import { auth } from "../services/firebase"; // Your firebase configuration
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import type { AuthContextType } from "../types";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function signUpWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function loginWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading: isLoading,
    signInWithEmail: loginWithEmailPassword,
    signUpWithEmail: signUpWithEmailPassword,
    signInWithGoogle: async () => {
      throw new Error("Google sign-in not implemented");
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
