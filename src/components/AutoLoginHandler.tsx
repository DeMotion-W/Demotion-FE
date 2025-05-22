"use client";

import { login } from "@/actions/auth";
import { useAuthStore } from "@/lib/store/authStore";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect } from "react";

export default function AutoLoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setName, setEmail } = useAuthStore();

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    // email, password 없으면 아무 것도 하지 않음
    if (!email || !password) return;

    // 이메일 비번 있으면 자동 로그인 시도
    login({ email, password })
      .then((response) => {
        if (response.success) {
          console.log(response.name);
          console.log(email);
          setName(response.name);
          setEmail(email);
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
