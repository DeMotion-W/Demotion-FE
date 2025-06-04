import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_REFRESH_PATH } from "@shared/constants/api";
import { ACCESS_TOKEN_AGE } from "@/constants";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  console.log("✅ 서버가 받은 refreshToken:", refreshToken);

  if (!refreshToken) {
    return NextResponse.json(
      { error: "refreshToken이 없습니다." },
      { status: 401 }
    );
  }

  try {
    // 서버 API에 토큰 갱신 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${TOKEN_REFRESH_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`,
        },
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
      name: "accessToken",
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ACCESS_TOKEN_AGE,
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
