import * as Yup from "yup";

export const emailSchema = Yup.object({
  email: Yup.string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일을 입력해 주세요."),
});
