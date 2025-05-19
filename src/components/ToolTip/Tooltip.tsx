"use client";

import { ReactNode, useState } from "react";

export default function Tooltip({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
          <div className="relative bg-[#191F28] rounded-xl shadow-xl px-5 py-4 max-w-sm w-max whitespace-normal break-words">
            <div className="text-[#FFFFFF] text-sm font-semibold font-['Pretendard'] leading-tight mb-2">
              {title}
            </div>
            <div className="text-[#FFFFFFB2] text-xs font-normal font-['Pretendard'] leading-tight">
              {description}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#1D1D1F]" />
          </div>
        </div>
      )}
    </div>
  );
}
