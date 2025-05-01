import { http, HttpResponse } from "msw";
import {
  SIGNUP_PATH,
  LOG_IN_PATH,
  TOKEN_REFRESH_PATH,
} from "../constants/api";
import { AuthCredentials } from "../type";

export const handlers = [
  http.post(SIGNUP_PATH, async ({ request }) => {
    const { email } =
      (await request.json()) as AuthCredentials;

    if (email === "existing@email.com") {
      return HttpResponse.json(
        { message: "이미 존재하는 이메일입니다." },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { email, message: "회원가입 성공" },
      { status: 201 }
    );
  }),

  http.post(LOG_IN_PATH, async ({ request }) => {
    const { email, password } =
      (await request.json()) as AuthCredentials;

    if (
      email === "test@email.com" &&
      password === "Password123!"
    ) {
      return HttpResponse.json(
        {
          accessToken: "mock-token-123",
          message: "로그인 성공",
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "로그인 실패" },
      { status: 401 }
    );
  }),

  http.post(TOKEN_REFRESH_PATH, async () => {
    return HttpResponse.json(
      { accessToken: "mock-refreshed-token" },
      { status: 200 }
    );
  }),
];
