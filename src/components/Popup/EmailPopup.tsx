"use client";
import { useState } from "react";

export default function EmailPopup({
  onSubmit,
  onClose,
}: {
  onSubmit: (email: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          이메일을 입력해 주세요
        </h3>
        <input
          type="email"
          value={email}
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            취소
          </button>
          <button
            onClick={() => onSubmit(email)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
