import { ReactNode, useContext } from "react";
import AuthProvider, {
  AuthStateContext,
} from "./context/AuthContext";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Capture from "./pages/Capture";

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useContext(AuthStateContext);
  return auth?.loggedIn ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/capture"
            element={
              <ProtectedRoute>
                <Capture />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
