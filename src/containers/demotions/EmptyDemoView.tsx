"use client";

import SortDropdown from "@/components/DropDown/SortDropDown";
import Image from "next/image";
import { useState } from "react";

export default function EmptyDemoView() {
  const [sortOrder, setSortOrder] = useState("최신순");

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-base text-[#6B7280] font-semibold font-['Pretendard'] leading-normal mt-10 mb-10">
          총 항목{" "}
          <span className="text-[#3E82F6] font-semibold">
            0
          </span>
        </p>
        <SortDropdown
          selected={sortOrder}
          onChange={setSortOrder}
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-24 text-center">
        <Image
          src="/images/empty_demo.png"
          alt="Empty Demo"
          width={80}
          height={80}
        />
        <p className="mt-4 text-lg font-semibold text-[#1F2937]">
          아직 데모가 없어요!
        </p>
        <p className="text-sm text-[#6B7280] mt-1">
          데모를 생성하고 인사이트를 확인해 보세요.
        </p>
      </div>
    </>
  );
}
