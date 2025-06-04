"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch("/api/auth/login-refresh", {
          method: "POST",
          credentials: "include", // refreshToken 보내기
        });

        if (!res.ok) throw new Error("자동 로그인 실패");

        const { accessToken } = await res.json();
        if (!accessToken) throw new Error("토큰 없음");

        router.replace("/demotions");
      } catch (err) {
        router.replace("/login");
      }
    };

    autoLogin();
  }, [router]);

  return (
    <div className="text-center mt-20 text-gray-500 text-sm">
      자동 로그인 중입니다...
    </div>
  );
}
