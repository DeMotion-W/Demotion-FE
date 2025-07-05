"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/demotions"; // 🔄 강제 전체 새로고침
    }, 100); // 토큰 저장 보장 시간
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center text-sm text-[#9CA3AF]">
      자동 로그인 중입니다...
    </div>
  );
}
