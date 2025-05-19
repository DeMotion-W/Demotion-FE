"use client";

import { user } from "@/mock/user";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { logout } from "@/actions/auth";

export default function Page() {
  const router = useRouter();

  const editProfile = () => {};
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        router.push("/login");
      }
    } catch (err) {
      alert("로그아웃 실패");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center mt-10 mb-4 gap-4">
        <button
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
          My Page
        </h1>
      </div>
      <div className="w-full h-px bg-gray-200 my-6" />

      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-300px)] p-6">
        <div className="w-full max-w-md px-10 py-12 rounded-[20px] border border-[#E2E7EB] shadow-sm">
          <Image
            src="/images/profile_default.png"
            alt="Profile Image"
            width={128}
            height={128}
            className="mx-auto"
          />
          <p className="text-center justify-start mt-8 mb-4 text-[#191F28] text-2xl font-semibold font-['Pretendard'] leading-7">
            {user.name}
          </p>
          <p className="text-center justify-start mb-15 text-[#4E5968] text-sm font-medium font-['Pretendard'] leading-tight">
            {user.email}
          </p>
          <div className="flex justify-center gap-3">
            <Button
              label={"내 정보 수정"}
              bgColor={"#333D4B"}
              textColor={"#FFFFFF"}
              width={"140px"}
              onClick={editProfile}
            />
            <Button
              label={"로그아웃"}
              bgColor={"#FF5E5E"}
              textColor={"#FFFFFF"}
              width={"140px"}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
