import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../../../shared/schema/signupSchema";
import { signup } from "../api/auth/signup";
import { SignupForm } from "../../../../shared/type";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import VerificationInput from "../components/VerificationInput";

export default function Signup() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupForm>({
    resolver: yupResolver(
      signupSchema
    ) as Resolver<SignupForm>,
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const res = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert(`회원가입 완료! 환영합니다: ${res.email}`);
      nav("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl p-6 md:px-10 bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-4">
          <div className="text-[#191F28] text-xl font-semibold font-['Pretendard'] leading-normal">
            회원가입
          </div>
          <div className="text-[#6B7684] text-sm font-normal font-['Pretendard'] leading-normal">
            회원가입에 필요한 정보를 입력해 주세요.
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <InputField
            label="이름"
            type="name"
            placeholder="이름을 입력해 주세요."
            {...register("name")}
            errorMessage={errors.name?.message}
          />

          <VerificationInput />

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
            placeholder="비밀번호를 한번 더 입력해 주세요"
            {...register("passwordConfirm")}
            errorMessage={errors.passwordConfirm?.message}
          />

          <Button
            label="가입하기"
            type="submit"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
}
