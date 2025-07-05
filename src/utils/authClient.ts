export function hasAccessToken(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("accessToken=");
}
