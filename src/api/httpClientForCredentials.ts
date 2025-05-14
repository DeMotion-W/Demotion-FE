import axios from "axios";
import { TOKEN_REFRESH_PATH } from "@shared/constants/api";
import { useAuthStore } from "@/lib/store/auth";

export const httpClientForCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClientForCredentials.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !!originalRequest.url.includes(TOKEN_REFRESH_PATH)
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }/api/auth/login-refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        useAuthStore
          .getState()
          .setAccessToken(newAccessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        return httpClientForCredentials(originalRequest);
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
