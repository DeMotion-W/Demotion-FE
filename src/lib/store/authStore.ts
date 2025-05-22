import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  name: string | null;
  email: string | null;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      email: null,
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      clearAuth: () => set({ name: null, email: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 이름
    }
  )
);
