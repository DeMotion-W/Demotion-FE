import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const store = await cookies();
  const accessToken = store.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  // 여기서 실제 토큰 검증 로직 넣어도 됨 (디코딩 or 서버 요청)
  return NextResponse.json({ isLoggedIn: true });
}
