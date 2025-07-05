import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_AGE } from "@/constants";
import { TOKEN_REFRESH_PATH } from "@shared/constants/api";

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_SITE_URL)
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${TOKEN_REFRESH_PATH}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_SITE_URL)
    );
  }

  const data = await response.json();
  const token = data.accessToken?.replace(/^Bearer\s/, "");

  const res = NextResponse.redirect(
    new URL("/autoLogin", process.env.NEXT_PUBLIC_SITE_URL)
  );

  res.cookies.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ACCESS_TOKEN_AGE,
  });

  return res;
}
