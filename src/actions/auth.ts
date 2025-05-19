"use server";

import {
  EMAIL_VERIFICATION_CONFIRM_PATH,
  EMAIL_VERIFICATION_REQUEST_PATH,
  LOG_IN_PATH,
  LOG_OUT_PATH,
  SIGNUP_PATH,
} from "@shared/constants/api";
import { LoginForm, SignupForm } from "@shared/type";
import { cookies } from "next/headers";

export async function login(data: LoginForm) {
  try {
    // 백엔드 API에 로그인 요청
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + LOG_IN_PATH,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const responseData = await response.json();
    const token = responseData.accessToken;

    const cookieStore = await cookies();
    // 쿠키에 토큰 저장
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1주일
    });

    return { success: true };
  } catch (error) {
    console.error("로그인 에러:", error);
    return {
      success: false,
      error: "로그인에 실패했습니다.",
    };
  }
}

// 로그아웃 함수
export async function logout() {
  // 백엔드에 로그아웃 알림 (필요한 경우)
  try {
    await fetch(
      process.env.NEXT_PUBLIC_API_URL + LOG_OUT_PATH,
      {
        method: "POST",
        credentials: "include",
      }
    );
  } catch (error) {
    console.error("로그아웃 API 에러:", error);
  }

  const cookieStore = await cookies();

  // 쿠키 삭제
  cookieStore.delete("auth_token");

  return { success: true };
}

export async function signup({
  name,
  email,
  password,
}: Pick<SignupForm, "name" | "email" | "password">) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + SIGNUP_PATH,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "회원가입 실패");
    }

    return { success: true };
  } catch (err) {
    console.error("회원가입 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

export async function sendVerificationCode(email: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        EMAIL_VERIFICATION_REQUEST_PATH,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "인증번호 전송 실패");
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "서버 오류로 인증번호 전송에 실패했습니다.",
    };
  }
}

export async function verifyCode(
  email: string,
  code: string
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        EMAIL_VERIFICATION_CONFIRM_PATH,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          verificationCode: code,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "인증번호 확인 실패");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message,
      // 필요하다면: resetToken: data.resetToken
    };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "서버 오류로 인증에 실패했습니다.",
    };
  }
}
