import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일을 입력해주세요."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .min(6, "비밀번호는 최소 6자 이상입니다."),
});
