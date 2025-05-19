import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_REFRESH_PATH } from "@shared/constants/api";

export async function POST() {
  try {
    // 서버 API에 토큰 갱신 요청
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + TOKEN_REFRESH_PATH,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 기존 리프레시 토큰이 있는 쿠키 포함
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("토큰 갱신 실패");
    }

    const data = await response.json();

    // 새 토큰으로 응답
    const responseObj = NextResponse.json({
      accessToken: data.accessToken,
    });

    // 쿠키에 새 토큰 설정
    responseObj.cookies.set({
      name: "auth_token",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1주일
    });

    return responseObj;
  } catch (error) {
    console.error("토큰 갱신 API 에러:", error);
    return NextResponse.json(
      { error: "인증 갱신에 실패했습니다." },
      { status: 401 }
    );
  }
}
