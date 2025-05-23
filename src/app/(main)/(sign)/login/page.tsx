"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@shared/schema/loginSchema";
import { LoginForm } from "@shared/type";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { useToast } from "@/components/UI/Toast";
import InputField from "@/components/Input/InputField";
import SignButton from "@/components/Button/SignButton";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const { setName, setEmail } = useAuthStore();
  const { showToast } = useToast();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      setName(response.name);
      setEmail(data.email);

      if (!response.success) {
        showToast({
          type: "error",
          message: response.error || "로그인 실패!",
        });
        return;
      }

      router.replace("/demotions");
    } catch (err) {
      if (err instanceof Error) {
        showToast({
          type: "error",
          message: err.message,
        });
      } else {
        showToast({
          type: "error",
          message: "로그인 중 오류가 발생했습니다.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.png"
        alt="Demotion Logo"
        width={244}
        height={48}
        className="mb-18"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 w-full max-w-md px-4"
      >
        <InputField
          label="이메일"
          type="text"
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
        <SignButton label="로그인" type="submit" />
      </form>

      <div className="flex text-center justify-center mt-6 text-[#6B7684] text-sm font-normal font-['Pretendard'] leading-snug gap-2">
        <Link
          href="/signup"
          className="hover:underline text-gray-800"
        >
          회원가입
        </Link>
        <span className="text-[#D0D7DD]">|</span>
        <Link
          href="/findpassword"
          className="hover:underline text-gray-800"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
