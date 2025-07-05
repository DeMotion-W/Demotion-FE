import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setIsLoggedIn: (v: boolean) => void;
  clearAuth: () => void;
  clearLoginState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      email: null,
      isLoggedIn: false,
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setIsLoggedIn: (v) => set({ isLoggedIn: v }),
      clearAuth: () =>
        set({ name: null, email: null, isLoggedIn: false }),
      clearLoginState: () => set({ isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 이름
    }
  )
);
