import axios from "axios";
import { TOKEN_REFRESH_PATH } from "@shared/constants/api";
// import { useAuthStore } from "@/lib/store/auth";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== TOKEN_REFRESH_PATH
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/login-refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        // useAuthStore
        //   .getState()
        //   .setAccessToken(newAccessToken);

        originalRequest.headers["Authorization"] =
          newAccessToken;

        return httpClient(originalRequest);
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
