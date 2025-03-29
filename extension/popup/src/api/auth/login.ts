import { AxiosError, AxiosResponse } from "axios";
import { httpClientForCredentials } from "..";
import { AuthCredentials } from "../../type";
import { NavigateFunction } from "react-router-dom";
import {
  LOG_IN_PATH,
  TOKEN_REFRESH_PATH,
} from "../../constants/api";

let refreshTimer: NodeJS.Timeout | null = null;

export const onLogInSuccess = (response: AxiosResponse) => {
  const { accessToken } = response.data;
  httpClientForCredentials.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;

  if (refreshTimer) clearTimeout(refreshTimer);

  //  AccessToken 만료 1분전에 RefreshToken으로 AccessToken을 받아오는 함수를 실행하는 코드
};

export const onLogIn = async (params: AuthCredentials) => {
  try {
    const response = await httpClientForCredentials.post(
      LOG_IN_PATH,
      params
    );
    if (response.status === 200) {
      onLogInSuccess(response);
      return response;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const onSilentRefresh = async (
  navigate: NavigateFunction
) => {
  try {
    const response = await httpClientForCredentials.post(
      TOKEN_REFRESH_PATH
    );
    if (response.status === 200) {
      onLogInSuccess(response);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      navigate("/login", { replace: true });
    }
  }
};
