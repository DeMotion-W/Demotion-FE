"use client";

import { useState } from "react";
import { ITEMS_PER_PAGE } from "@/constants";
import SortDropdown from "@/components/DropDown/SortDropDown";
import DemoCard from "./DemoCard";
import { Demo } from "@/types";

export default function DemoListView({
  demoList,
}: {
  demoList: Demo[];
}) {
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<
    number | null
  >(null);

  const totalPages = Math.ceil(
    demoList.length / ITEMS_PER_PAGE
  );

  const sortedList = [...demoList].sort((a, b) => {
    if (sortOrder === "최신순") {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    } else {
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
    }
  });

  const currentItems = sortedList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // const currentItems = demoList.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );

  return (
    <>
      <div className="flex justify-between items-center h-[60px] mb-2">
        <div className="flex gap-2 items-center justify-center text-sm text-[#6B7280] font-medium font-['Pretendard'] leading-normal">
          <p>총 항목</p>
          <p className="text-[#3E82F6]">
            {demoList.length}
          </p>
        </div>
        <SortDropdown
          selected={sortOrder}
          onChange={setSortOrder}
        />
      </div>

      <div className="w-full flex flex-col justify-between min-h-[600px]">
        <div className="w-full grid grid-cols-4 gap-6">
          {currentItems.map((demo, i) => (
            <DemoCard
              key={i}
              demoId={demo.demoId}
              title={demo.title}
              firstScreenshotUrl={demo.firstScreenshotUrl}
              createdAt={demo.createdAt}
              isMenuOpen={openMenuId === demo.demoId}
              onToggleMenu={() =>
                setOpenMenuId((prev) =>
                  prev === demo.demoId ? null : demo.demoId
                )
              }
            />
          ))}
        </div>

        <div className="w-full flex justify-center mt-10 gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="px-2 text-xs text-gray-500 cursor-pointer"
          >
            〈
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 text-xs cursor-pointer ${
                currentPage === i + 1
                  ? "text-[#191F28]"
                  : "text-[#8B95A1] hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-2 text-xs text-gray-500 cursor-pointer"
          >
            〉
          </button>
        </div>
      </div>
    </>
  );
}
