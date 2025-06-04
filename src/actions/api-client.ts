"use server";

import { ACCESS_TOKEN_AGE, REFRESH_TOKEN_AGE } from "@/constants";
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
  let token = cookieStore.get("accessToken")?.value;

  // accessToken 없으면 refresh 시도
  if (!token && cookieStore.get("refreshToken")?.value) {
    const refreshedToken = await refreshToken();
    if (!refreshedToken) redirect("/login");
    token = refreshedToken; // refreshToken 성공 시 새 토큰으로 교체
  }

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
    }
  );

  // 401 에러 처리 (토큰 만료)
  if (response.status === 401) {
    console.log("401에러");
    // 토큰 갱신 시도
    const newAccessToken = await refreshToken();

    // 토큰 갱신 성공한 경우 원래 요청 재시도
    if (newAccessToken) {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      }).then((res) => res.json());
    } else {
      // 토큰 갱신 실패 - 로그인 페이지로 리다이렉트
      redirect("/login");
    }
  }

  // 응답 처리
  return response.json();
}

// 토큰 갱신 함수
async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${TOKEN_REFRESH_PATH}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.accessToken?.replace(/^Bearer\s/, ""); // "Bearer " 제거

    const cookieStore = await cookies();

    // 새 토큰을 쿠키에 저장
    cookieStore.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ACCESS_TOKEN_AGE,
    });

    response.headers.getSetCookie().forEach((items) => {
      const [key, str] = items.split("=");
      const [value] = str.split("; ");
      cookieStore.set(key, value, {
        httpOnly: true,
        secure: false,
        maxAge: REFRESH_TOKEN_AGE,
      });
    });

    return newAccessToken;
  } catch (err) {
    console.error("토큰 갱신 오류:", err);
    return null;
  }
}
