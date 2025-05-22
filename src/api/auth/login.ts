import { httpClient } from "../httpClient";
import { LoginForm } from "@shared/type";
import {
  LOG_IN_PATH,
  TOKEN_REFRESH_PATH,
} from "@shared/constants/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosError } from "axios";

export async function onLogIn(params: LoginForm) {
  try {
    const response = await httpClient.post(
      LOG_IN_PATH,
      params
    );
    if (response.status === 200) {
      const { accessToken } = response.data;
      return response;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러가 발생했습니다.");
    }
  }
}

export async function onSilentRefresh(
  router: AppRouterInstance
) {
  console.log("🔄 refresh 호출됨");
  try {
    const response = await httpClient.post(
      TOKEN_REFRESH_PATH,
      {},
      {
        withCredentials: true,
      }
    );
    const { accessToken } = response.data;
    if (!accessToken)
      throw new Error("accessToken이 없습니다.");

    console.log("silent refresh 성공:", accessToken);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      router.push("/login");
    }
  }
}
