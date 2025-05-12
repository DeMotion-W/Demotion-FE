import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
} from "../utils/auth";

export const httpClientForCredentials = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

httpClientForCredentials.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isLoggedIn = !!getAccessToken();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      isLoggedIn
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
        setAccessToken(newAccessToken);

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
