import axios from "axios";
import {
  AuthCredentials,
  SignupSuccessResponse,
} from "../../type";
import { SIGNUP_PATH } from "../../constants/api";

export async function signup({
  email,
  password,
}: AuthCredentials): Promise<SignupSuccessResponse> {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_API_URL;
    const response =
      await axios.post<SignupSuccessResponse>(
        `${baseUrl}${SIGNUP_PATH}`,
        {
          email,
          password,
        }
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
