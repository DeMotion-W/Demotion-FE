"use client";

import { useState, useRef, useEffect } from "react";

const options = ["최신순", "오래된 순"];

export default function SortDropdown({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-3 border border-[#E2E6EB] rounded-lg bg-white shadow-sm flex items-center justify-center gap-3 min-w-[110px] text-[#191F28] text-base font-medium font-['Pretendard'] leading-tight cursor-pointer"
      >
        {selected}
        <svg
          className="w-4 h-4 text-[#8B95A1]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-white border border-[#E2E6EB] rounded-lg shadow-md z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option === selected
                  ? "bg-[#F9FAFB] font-semibold"
                  : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
