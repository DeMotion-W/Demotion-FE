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

export interface AuthCredentials {
  email: string;
  password: string;
}

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export interface SignupSuccessResponse {
  userId: number;
  email: string;
}
