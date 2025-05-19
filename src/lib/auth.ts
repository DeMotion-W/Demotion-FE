import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 인증 상태 확인 함수
export async function getAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return {
    isLoggedIn: !!token,
    token,
  };
}

// 로그인이 필요한 페이지를 위한 인증 체크
export async function requireAuth() {
  const { isLoggedIn } = await getAuthStatus();

  if (!isLoggedIn) {
    redirect("/login");
  }
}
