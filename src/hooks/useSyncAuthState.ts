import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function useSyncAuthState() {
  const { setIsLoggedIn, clearLoginState } = useAuthStore();

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch("/api/check-auth", {
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
          return;
        } else {
          clearLoginState(); // accessToken 없으면 false로 강제 설정
        }
      } catch {
        clearLoginState();
      }
    };

    sync();
  }, []);
}
