import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 요청에서 토큰 가져오기
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 보호된 경로 목록
  const protectedPaths = ["/mypage"];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 이미 로그인된 상태에서 로그인 페이지로 접근하는 경우
  if (request.nextUrl.pathname === "/login" && accessToken) {
    return NextResponse.redirect(new URL("/demotions", request.url));
  }

  // accessToken 없고 refreshToken 있을 때 -> 자동 로그인 시도
  if (
    !accessToken &&
    refreshToken &&
    request.nextUrl.pathname !== "/api/auto-login"
  ) {
    return NextResponse.redirect(
      new URL("/api/auto-login", request.url)
    );
  }

  // 보호된 경로에 접근하려고 하는데 인증되지 않은 경우
  if (isProtectedPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ["/login", "/signup", "/mypage", "/api/auto-login"],
};

//"/demo/:path*"
//"/demo"
