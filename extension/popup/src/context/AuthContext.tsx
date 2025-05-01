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
        ...state,
        token: action.token,
        loggedIn: true,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { token: null, loggedIn: false };
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
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
