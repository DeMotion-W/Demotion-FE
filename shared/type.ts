export interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export interface SignupSuccessResponse {
  userId: number;
  email: string;
}

export interface AuthState {
  token: string | null;
  loggedIn: boolean;
  email?: string;
  password?: string;
}

export type AuthAction =
  | {
      type: "LOGIN";
      token: string;
      email: string;
      password: string;
    }
  | { type: "LOGOUT" };
