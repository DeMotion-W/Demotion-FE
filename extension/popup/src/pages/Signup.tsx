import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const handleSignup = () => {
    // TODO: 이메일 인증 로직 등 추가
    alert("회원가입 완료! 로그인해주세요.");
    nav("/");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">회원가입</h2>
      <button
        className="p-2 bg-green-500 text-white rounded"
        onClick={handleSignup}
      >
        회원가입 하기
      </button>
    </div>
  );
}
