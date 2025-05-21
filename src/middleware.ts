import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 요청에서 토큰 가져오기
  const authToken =
    request.cookies.get("accesstoken")?.value;

  // 보호된 경로 목록
  const protectedPaths = ["/mypage"];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 보호된 경로에 접근하려고 하는데 인증되지 않은 경우
  if (isProtectedPath && !authToken) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // 이미 로그인된 상태에서 로그인 페이지로 접근하는 경우
  if (request.nextUrl.pathname === "/login" && authToken) {
    return NextResponse.redirect(
      new URL("/demotions", request.url)
    );
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ["/login", "/signup", "/mypage"],
};

//"/demo/:path*"
//"/demo"
