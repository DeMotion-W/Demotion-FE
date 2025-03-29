import * as Yup from "yup";

const specialChars = `!"#$%&'()*+,-./:;<=>?@[\\₩\\]^_\`{|}~`;
const specialRegex = `[${specialChars.replace(
  /[-/\\^$*+?.()|[\]{}]/g,
  "\\$&"
)}]`;

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("올바른 이메일 형식이 아닙니다.")
    .required("이메일을 입력해주세요."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*${specialRegex}).{8,16}$`
      ),
      "영문 대/소문자, 숫자, 특수문자를 포함한 8~16자리여야 합니다."
    ),
  passwordConfirm: Yup.string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf(
      [Yup.ref("password")],
      "비밀번호가 일치하지 않습니다."
    ),
});
