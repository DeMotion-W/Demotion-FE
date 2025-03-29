import axios from "axios";

export const httpClientForCredentials = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});
