"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@shared/schema/signupSchema";
import { SignupForm } from "@shared/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "@/components/Input/InputField";
import VerificationInput from "@/components/Input/VerificationInput";
import SignButton from "@/components/Button/SignButton";
import { signup } from "@/api/auth/signup";

export default function Page() {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupForm>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl p-6 md:px-10">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-semibold text-[#191F28]">
            회원가입
          </h2>
          <p className="text-sm text-[#6B7684]">
            회원가입에 필요한 정보를 입력해 주세요.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <InputField
            label="이름"
            type="text"
            placeholder="이름을 입력해 주세요."
            {...register("name")}
            errorMessage={errors.name?.message}
          />

          <VerificationInput
            register={register}
            error={errors.email?.message}
            email={watch("email")}
            setIsVerified={setIsEmailVerified}
          />

          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register("password")}
            errorMessage={errors.password?.message}
          />

          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            {...register("passwordConfirm")}
            errorMessage={errors.passwordConfirm?.message}
          />

          <SignButton
            label="가입하기"
            type="submit"
            disabled={!isValid || !isEmailVerified}
          />
        </form>
      </div>
    </div>
  );
}
