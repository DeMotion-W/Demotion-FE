"use client";

import { useState } from "react";
import { Demo, LeadsData } from "@/types";
import { leadsMock } from "@/mock/leads";
import DemoDropdown from "@/components/DropDown/DemoDropdown";
import Tooltip from "@/components/ToolTip/Tooltip";

export default function DemoLeadsView({
  demoList,
}: {
  demoList: Demo[];
}) {
  const [selectedDemo, setSelectedDemo] =
    useState<Demo | null>(null);
  const [leadsData, setLeadsData] = useState<
    LeadsData[] | null
  >(null);

  const handleDemoSelect = (demo: Demo) => {
    setSelectedDemo(demo);

    // 실제 API 연동 전까지는 목데이터로
    setLeadsData(leadsMock[demo.demoId] ?? null);
  };

  const firstTimeViewers =
    leadsData?.filter((lead) => !lead.contactClicked) || [];
  const inquiryUsers =
    leadsData?.filter((lead) => lead.contactClicked) || [];

  return (
    <div className="gap-4">
      <div className="flex flex-col mt-10">
        <label className="text-[#369AFF] text-sm font-semibold font-['Montserrat'] leading-normal">
          Select the demo!
        </label>
        <DemoDropdown
          demos={demoList}
          selected={selectedDemo}
          onSelect={handleDemoSelect}
        />
      </div>

      {!selectedDemo ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-base font-bold text-[#191F28] mb-2">
            데모를 선택해 보세요!
          </p>
          <p className="text-[#6B7684] text-xs font-normal font-['Pretendard'] leading-tight">
            데모를 선택하면 데모별 고객 리스트를 확인할 수
            있어요.
          </p>
        </div>
      ) : (
        <div className="flex gap-6 items-start">
          {/* First time viewer 카드 */}
          <div className="w-1/2 rounded-2xl border border-[#E2E7EB] p-7 gap-2">
            <div className="flex justify-between mb-8">
              <div className="flex text-lg font-semibold font-['Montserrat'] leading-tight gap-2">
                <span className="text-[#191F28]">
                  First time viewer
                </span>
                <span className="text-[#369AFF]">
                  {firstTimeViewers.length}
                </span>
              </div>
              <Tooltip
                title="title"
                description="description"
              >
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold text-gray-500 leading-none">
                    ?
                  </span>
                </div>
              </Tooltip>
            </div>
            <div className="max-h-[460px] overflow-y-auto pr-2 space-y-6">
              {firstTimeViewers.length > 0 ? (
                firstTimeViewers.map((lead, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#333D4B] text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                      {index + 1}
                    </div>
                    <span className="text-sm text-[#191F28] font-medium font-['Montserrat'] leading-tight">
                      {lead.email}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No first-time viewers.
                </p>
              )}
            </div>
          </div>

          {/* Inquiry Users 카드 */}
          <div className="w-1/2 rounded-2xl border border-[#E2E7EB] p-7 gap-2">
            <div className="flex justify-between mb-8">
              <div className="flex text-lg font-semibold font-['Montserrat'] leading-tight gap-2">
                <span className="text-[#191F28]">
                  Inquiry Users
                </span>
                <span className="text-[#369AFF]">
                  {inquiryUsers.length}
                </span>
              </div>
              <Tooltip
                title="title"
                description="description"
              >
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold text-gray-500 leading-none">
                    ?
                  </span>
                </div>
              </Tooltip>
            </div>
            <div className="max-h-[460px] overflow-y-auto pr-2 space-y-6">
              {inquiryUsers.length > 0 ? (
                inquiryUsers.map((lead, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#333D4B] text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                      {index + 1}
                    </div>
                    <span className="text-sm text-[#191F28] font-medium font-['Montserrat'] leading-tight">
                      {lead.email}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No inquiry users.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
