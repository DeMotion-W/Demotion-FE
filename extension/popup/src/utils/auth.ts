import { httpClientForCredentials } from "../api/httpClientForCredentials";

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
  httpClientForCredentials.defaults.headers.common[
    "Authorization"
  ] = token;
}

export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
  delete httpClientForCredentials.defaults.headers.common[
    "Authorization"
  ];
}
