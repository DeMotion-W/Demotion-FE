"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@shared/schema/emailSchema";

export default function EmailPopup({
  onSubmit,
}: {
  onSubmit: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(emailSchema),
  });

  const handleFormSubmit = (data: { email: string }) => {
    onSubmit(data.email);
  };

  return (
    <div className="bg-transparent z-20 flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-10 py-12 w-[850px] text-center relative"
      >
        <h2 className="text-6xl font-bold font-['Pretendard'] text-[#191F28] mb-4 font-['Montserrat']">
          지금 바로 데모를 확인하세요 👋🏻
        </h2>
        <p className="text-2xl text-[#191F28] mb-10 font-['Montserrat']">
          이메일을 입력하면 데모를 체험하실 수 있습니다.
        </p>

        <input
          type="text"
          placeholder="이메일 주소를 입력하세요"
          {...register("email")}
          className="w-[700px] px-7 py-4 bg-[#FFFFFF] rounded-md text-base border border-[#D1D5DB] mb-2 font-['Pretendard'] focus:outline-none focus:ring-2 focus:ring-[#369AFF]"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mb-3">
            {errors.email.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-5 mt-5 rounded-xl bg-[#191F28] text-xl text-white font-semibold font-['Montserrat'] hover:bg-[#121418] transition"
        >
          시작하기
        </button>
      </form>
    </div>
  );
}
