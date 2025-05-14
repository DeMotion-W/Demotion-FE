import axios from "axios";

export const httpClientPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
