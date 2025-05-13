import axios from "axios";
import {
  AuthCredentials,
  SignupSuccessResponse,
} from "../../../../../shared/type";
import { SIGNUP_PATH } from "../../../../../shared/constants/api";
import { httpClientForCredentials } from "../httpClientForCredentials";

export async function signup({
  name,
  email,
  password,
}: AuthCredentials): Promise<SignupSuccessResponse> {
  try {
    const response = await httpClientForCredentials.post(
      SIGNUP_PATH,
      { name, email, password }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { message } = error.response.data;
      throw new Error(message);
    }

    throw new Error(
      "회원가입 요청 중 오류가 발생했습니다."
    );
  }
}
