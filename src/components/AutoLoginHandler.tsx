"use client";

import { login } from "@/actions/auth";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect } from "react";

export default function AutoLoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    // email, password 없으면 아무 것도 하지 않음
    if (!email || !password) return;

    // 이메일 비번 있으면 자동 로그인 시도
    login({ email, password })
      .then((res) => {
        if (res.success) {
          window.location.href = window.location.pathname;
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return null;
}
