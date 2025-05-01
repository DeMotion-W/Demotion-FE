import { useContext } from "react";
import { Resolver } from "react-hook-form";
import { AuthDispatchContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../shared/schema/loginSchema";
import { LoginForm } from "../../../../shared/type";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { onLogIn } from "../api/auth/login";

export default function Login() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(
      loginSchema
    ) as Resolver<LoginForm>,
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("로그인 정보:", data);
    try {
      const response = await onLogIn(data);
      const token = response?.data.accessToken;

      dispatch?.({ type: "LOGIN", token });
      nav("/capture");
    } catch (error) {
      alert(
        "로그인 실패! 이메일 또는 비밀번호를 확인해주세요."
      );
      console.error(error);
    }
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
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            {...register("email")}
            errorMessage={errors.email?.message}
          />

          <InputField
            label="비밀번호"
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
