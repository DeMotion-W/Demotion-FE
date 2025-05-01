import { AxiosError } from "axios";
import { httpClientForCredentials } from "..";
import { NavigateFunction } from "react-router-dom";
import {
  LOG_IN_PATH,
  TOKEN_REFRESH_PATH,
} from "../../../../../shared/constants/api";
import { LoginForm } from "../../../../../shared/type";
import { setAccessToken } from "../../utils/auth";

//let refreshTimer: NodeJS.Timeout | null = null;

export const onLogIn = async (params: LoginForm) => {
  try {
    const response = await httpClientForCredentials.post(
      LOG_IN_PATH,
      params
    );
    if (response.status === 200) {
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      return response;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

// export const onLogInSuccess = (response: AxiosResponse) => {
//   const { accessToken } = response.data;
//   setAccessToken(accessToken);

//   if (refreshTimer) clearTimeout(refreshTimer);

//   refreshTimer = setTimeout(() => {
//     onSilentRefresh(nav("/capture")); // navigateFunction은 필요 시 외부 주입
//   }, (expiresIn - 60) * 1000);
// };

export const onSilentRefresh = async (
  navigate: NavigateFunction
) => {
  try {
    console.log("🔄 silent refresh 요청 시작");

    const response = await httpClientForCredentials.post(
      TOKEN_REFRESH_PATH
    );

    console.log("✅ silent refresh 응답:", response.data);

    if (response.status === 200) {
      const { accessToken } = response.data;
      setAccessToken(accessToken);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      navigate("/login", { replace: true });
    }
  }
};
