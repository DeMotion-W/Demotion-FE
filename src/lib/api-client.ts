"use server";

import { TOKEN_REFRESH_PATH } from "@shared/constants/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 인증이 필요한 API 요청 함수
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  // 쿠키에서 토큰 가져오기
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  // 헤더 설정
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  // API 요청
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    {
      ...options,
      headers,
      credentials: "include",
    }
  );

  // 401 에러 처리 (토큰 만료)
  if (response.status === 401) {
    // 토큰 갱신 시도
    const refreshed = await refreshToken();

    // 토큰 갱신 성공한 경우 원래 요청 재시도
    if (refreshed) {
      const newToken = cookieStore.get("auth_token")?.value;

      return fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        }
      ).then((res) => res.json());
    } else {
      // 토큰 갱신 실패 - 로그인 페이지로 리다이렉트
      redirect("/login");
    }
  }

  // 응답 처리
  return response.json();
}

// 토큰 갱신 함수
async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + TOKEN_REFRESH_PATH,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    const cookieStore = await cookies();

    // 새 토큰을 쿠키에 저장
    cookieStore.set({
      name: "auth_token",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1주일
    });

    return true;
  } catch (error) {
    console.error("토큰 갱신 오류:", error);
    return false;
  }
}
