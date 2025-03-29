import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schema/signupSchema";
import { signup } from "../api/auth/signup";
import { SignupForm } from "../type";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const res = await signup({
        email: data.email,
        password: data.password,
      });
      alert(`회원가입 완료! 환영합니다: ${res.email}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">
        회원가입
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <InputField
          label="이메일"
          type="email"
          placeholder="example@email.com"
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

        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          {...register("passwordConfirm")}
          errorMessage={errors.passwordConfirm?.message}
        />

        <Button label="회원가입" type="submit" />
      </form>
    </div>
  );
}
