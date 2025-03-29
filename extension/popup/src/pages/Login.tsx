import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/loginSchema";
import { LoginForm } from "../type";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const fakeToken = "demo-token-123";
  //   dispatch?.({ type: "LOGIN", token: fakeToken });
  //   nav("/capture");
  // };
  const onSubmit = (data: LoginForm) => {
    console.log("로그인 정보:", data);
    const fakeToken = "demo-token-123";
    dispatch?.({ type: "LOGIN", token: fakeToken });
    nav("/capture");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          로그인
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center"
        >
          <InputField
            type="email"
            placeholder="이메일을 입력하세요"
            {...register("email")}
            errorMessage={errors.email?.message}
          />

          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password")}
            errorMessage={errors.password?.message}
          />

          <Button label="로그인하기" type="submit" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          아직 계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
