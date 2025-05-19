"use client";

import {
  EMAIL_VERIFICATION_CONFIRM_PATH,
  EMAIL_VERIFICATION_REQUEST_PATH,
} from "@shared/constants/api";
import { SignupForm } from "@shared/type";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import axios from "axios";
import { httpClient } from "@/api/httpClient";
import {
  sendVerificationCode,
  verifyCode,
} from "@/actions/auth";

type Props = {
  register: UseFormRegister<SignupForm>;
  email: string;
  error?: string;
  setIsVerified: (value: boolean) => void;
};

export default function VerificationInput({
  register,
  email,
  error,
  setIsVerified,
}: Props) {
  const [code, setCode] = useState("");
  const [step, setStep] = useState<
    "idle" | "sent" | "verified"
  >("idle");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "info" | "error" | "success"
  >("info");

  const handleSendCode = async () => {
    if (!email) {
      setMessage("이메일을 입력해 주세요.");
      setMessageType("error");
      return;
    }

    const result = await sendVerificationCode(email);

    if (result.success) {
      setStep("sent");
      setCode("");
      setMessage(result.message);
      setMessageType("info");
    } else {
      setMessage(result.error || "인증번호 전송 실패");
      setMessageType("error");
    }
    // try {
    //   const res = await httpClient.post(
    //     EMAIL_VERIFICATION_REQUEST_PATH,
    //     {
    //       email,
    //     }
    //   );
    //   setStep("sent");
    //   setMessage(res.data.message);
    //   setCode("");
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     const { message } = error.response.data;

    //     setMessage(message);
    //     setMessageType("error");
    //   } else {
    //     setMessage("알 수 없는 오류가 발생했습니다.");
    //     setMessageType("error");
    //   }
    // }
  };

  const handleVerifyCode = async () => {
    setMessage("");
    setMessageType("info");

    if (code.length !== 8) {
      setMessage("8자리 인증번호를 입력해주세요.");
      setMessageType("error");
      return;
    }

    const result = await verifyCode(email, code);

    if (result.success) {
      setStep("verified");
      setMessage(result.message);
      setMessageType("success");
      setIsVerified(true);
    } else {
      setMessage(result.error || "인증 실패");
      setMessageType("error");
    }

    // try {
    //   const res = await httpClient.post(
    //     EMAIL_VERIFICATION_CONFIRM_PATH,
    //     {
    //       email,
    //       verificationCode: code,
    //     }
    //   );

    //   setStep("verified");
    //   setMessage(res.data.message);
    //   setMessageType("success");
    //   setIsVerified(true);

    //   // res.data.resetToken 필요 시 전달
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     const { message } = error.response.data;

    //     setMessage(message || "인증 실패");
    //     setMessageType("error");
    //   } else {
    //     setMessage("알 수 없는 오류가 발생했습니다.");
    //     setMessageType("error");
    //   }
    // }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="justify-start text-[#191F28] text-sm font-medium font-['Pretendard'] leading-normal mt-3">
        이메일
      </label>
      <div className="flex gap-2 justify-center">
        <input
          type="email"
          {...register("email")}
          className="flex-1 border border-gray-300 rounded border-1 rounded-lg p-2 text-sm font-normal font-['Pretendard'] leading-relaxed"
          placeholder="이메일을 입력해 주세요."
        />
        <button
          onClick={handleSendCode}
          type="button"
          className={`w-34 p-2 text-center border-1 rounded-lg text-xs font-normal font-['Pretendard'] leading-tight ${
            step === "sent" || step === "verified"
              ? "bg-[#FFFFFF] text-[#191F28]"
              : "bg-[#333D4B] text-[#FFFFFF] hover:bg-[#2b313a]"
          }`}
        >
          인증번호{" "}
          {step === "sent" || step === "verified"
            ? "재전송"
            : "전송"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      {step !== "idle" && (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 border border-gray-300 rounded border-1 rounded-lg p-2 text-sm font-normal font-['Pretendard'] leading-relaxed"
            placeholder="인증번호 6자리를 입력해 주세요."
            disabled={step === "verified"}
          />
          <button
            onClick={handleVerifyCode}
            type="button"
            disabled={step === "verified"}
            className={`w-34 p-2 text-center border-1 rounded-lg text-xs font-normal font-['Pretendard'] leading-tight ${
              step === "verified"
                ? "bg-[#D0D7DD] text-[#FFFFFF] cursor-not-allowed"
                : "bg-[#333D4B] text-[#FFFFFF] hover:bg-[#2b313a]"
            }`}
          >
            인증번호 확인
          </button>
        </div>
      )}

      {message && (
        <p
          className={`text-xs ${
            messageType === "error"
              ? "text-red-500"
              : messageType === "success"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
