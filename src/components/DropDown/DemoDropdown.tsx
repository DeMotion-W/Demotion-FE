"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";

type Demo = {
  id: number;
  title: string;
  date: string;
};

export default function DemoDropdown({
  demos,
  selected,
  onSelect,
}: {
  demos: Demo[];
  selected: Demo | null;
  onSelect: (demo: Demo) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
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
    <div
      className="relative w-full max-w-md"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex py-3 bg-white rounded-lg hover:border-gray-400 focus:outline-none"
      >
        <div className="flex items-center">
          <div
            className={`truncate ${
              selected ? "text-[#000000]" : "text-[#8B95A1]"
            } text-2xl font-semibold font-['Pretendard'] leading-loose`}
          >
            {selected
              ? `${
                  selected.title.length > 30
                    ? selected.title.slice(0, 30) + "..."
                    : selected.title
                } (${selected.date})`
              : "데모를 선택해 주세요."}
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute top-full w-full bg-white border-2 border-[#E2E6EB] rounded-lg z-10">
          {demos.map((demo) => (
            <li
              key={demo.id}
              onClick={() => {
                onSelect(demo);
                setIsOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer hover:bg-gray-100 text-[#191F28] text-sm font-medium font-['Pretendard'] leading-tight truncate
                ${
                  selected?.id === demo.id
                    ? "bg-blue-50 font-semibold"
                    : ""
                }`}
            >
              {demo.title.length > 30
                ? demo.title.slice(0, 30) + "..."
                : demo.title}{" "}
              ({demo.date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
