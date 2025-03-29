export interface CaptureData {
  image: string;
  x: number;
  y: number;
}

export interface AuthState {
  token: string | null;
  loggedIn: boolean;
}

export type AuthAction =
  | { type: "LOGIN"; token: string }
  | { type: "LOGOUT" };
