import { useState } from "react";
import { Demo } from "@/types";
import DemoCard from "./DemoCard";

const demoList: Demo[] = Array.from(
  { length: 23 },
  (_, i) => ({
    title: `Demo Title ${i + 1}`,
    date: "2025.03.01",
  })
);

const ITEMS_PER_PAGE = 8;

export default function DemoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    demoList.length / ITEMS_PER_PAGE
  );

  const currentItems = demoList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        {currentItems.map((demo, i) => (
          <DemoCard
            key={i}
            title={demo.title}
            date={demo.date}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full text-sm ${
              currentPage === i + 1
                ? "bg-[#3E82F6] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
