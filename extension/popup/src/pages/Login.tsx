import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();

  const handleLogin = () => {
    const fakeToken = "demo-token-123";
    dispatch?.({ type: "LOGIN", token: fakeToken });
    nav("/capture");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">로그인</h2>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        로그인하기
      </button>
    </div>
  );
}
