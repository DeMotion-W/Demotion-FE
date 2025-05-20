import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";
import {
  AuthAction,
  AuthState,
} from "../../../../shared/type";

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        loggedIn: true,
        email: action.email,
        password: action.password,
      };
    case "LOGOUT":
      return {
        token: null,
        loggedIn: false,
        email: undefined,
        password: undefined,
      };
    default:
      return state;
  }
}

export const AuthStateContext =
  createContext<AuthState | null>(null);
export const AuthDispatchContext =
  createContext<Dispatch<AuthAction> | null>(null);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    token: null,
    loggedIn: false,
    email: undefined,
    password: undefined,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
