"use client";

import { useState } from "react";
import { Demo, LeadsData, StayTimeData } from "@/types";
import { fetchWithAuth } from "@/actions/api-client";
import DemoDropdown from "@/components/DropDown/DemoDropdown";
import Tooltip from "@/components/ToolTip/Tooltip";
import Skeleton from "react-loading-skeleton";
import StatsChartPopup from "./StatsChartPopup";

export default function DemoLeadsView({ demoList }: { demoList: Demo[] }) {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [leadsData, setLeadsData] = useState<LeadsData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stayStats, setStayStats] = useState<StayTimeData[] | null>(null);
  const [showStatsPopup, setShowStatsPopup] = useState(false);

  const handleDemoSelect = async (demo: Demo) => {
    setIsLoading(true);
    setSelectedDemo(demo);
    try {
      const data: { leads: LeadsData[] } = await fetchWithAuth(`api/demos/${demo.demoId}/insight/leads`);
      setLeadsData(data.leads);
    } catch (err) {
      setLeadsData([]);
      console.error("리드 데이터 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatsClick = async (sessionId: number) => {
    try {
      const data: StayTimeData[] = await fetchWithAuth(`api/demos/sessions/${sessionId}/stay-times`);
      setStayStats(data);
      setShowStatsPopup(true);
    } catch (err) {
      console.error("통계 데이터를 불러오지 못했습니다.", err);
    }
  };

  const firstTimeViewers = leadsData?.filter((lead) => !lead.contactClicked) || [];
  const inquiryUsers = leadsData?.filter((lead) => lead.contactClicked) || [];

  return (
    <div className="gap-4">
      <div className="flex flex-col mt-10">
        <label className="text-[#369AFF] text-sm font-semibold font-['Montserrat'] leading-normal">
          Select the demo!
        </label>
        <DemoDropdown demos={demoList} selected={selectedDemo} onSelect={handleDemoSelect} />
      </div>

      {!selectedDemo ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-base font-bold text-[#191F28] mb-2">데모를 선택해 보세요!</p>
          <p className="text-[#6B7684] text-xs font-normal font-['Pretendard'] leading-tight">
            데모를 선택하면 데모별 고객 리스트를 확인할 수 있어요.
          </p>
        </div>
      ) : (
        <div className="flex gap-6 items-start">
          {/* First time viewer 카드 */}
          <div className="w-1/2 rounded-2xl border border-[#E2E7EB] p-7 gap-2">
            <div className="flex justify-between mb-8">
              <div className="flex text-lg font-semibold font-['Montserrat'] leading-tight gap-2">
                <span className="text-[#191F28]">First time viewer</span>
                <span className="text-[#369AFF]">{firstTimeViewers.length}</span>
              </div>
              <Tooltip title="title" description="description">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold text-gray-500 leading-none">?</span>
                </div>
              </Tooltip>
            </div>
            <div className="max-h-[460px] overflow-y-auto pr-2 space-y-6">
              {isLoading ? (
                <Skeleton />
              ) : firstTimeViewers.length > 0 ? (
                firstTimeViewers.map((lead, index) => (
                  <div key={index} className="flex justify-between mr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#333D4B] text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                        {index + 1}
                      </div>
                      <span className="text-sm text-[#191F28] font-medium font-['Montserrat'] leading-tight">
                        {lead.email}
                      </span>{" "}
                    </div>
                    <button
                      onClick={() => handleStatsClick(lead.sessionId)}
                      className="ml-2 text-xs text-[#369AFF] underline cursor-pointer"
                    >
                      보기
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No first-time viewers.</p>
              )}
            </div>
          </div>

          {/* Inquiry Users 카드 */}
          <div className="w-1/2 rounded-2xl border border-[#E2E7EB] p-7 gap-2">
            <div className="flex justify-between mb-8">
              <div className="flex text-lg font-semibold font-['Montserrat'] leading-tight gap-2">
                <span className="text-[#191F28]">Inquiry Users</span>
                <span className="text-[#369AFF]">{inquiryUsers.length}</span>
              </div>
              <Tooltip title="title" description="description">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold text-gray-500 leading-none">?</span>
                </div>
              </Tooltip>
            </div>
            <div className="max-h-[460px] overflow-y-auto pr-2 space-y-6">
              {isLoading ? (
                <Skeleton />
              ) : inquiryUsers.length > 0 ? (
                inquiryUsers.map((lead, index) => (
                  <div key={index} className="flex justify-between mr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#333D4B] text-white text-sm font-semibold font-['Montserrat'] leading-tight">
                        {index + 1}
                      </div>
                      <span className="text-sm text-[#191F28] font-medium font-['Montserrat'] leading-tight">
                        {lead.email}
                      </span>{" "}
                    </div>
                    <button
                      onClick={() => handleStatsClick(lead.sessionId)}
                      className="ml-2 text-xs text-[#369AFF] underline"
                    >
                      보기
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No inquiry users.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showStatsPopup && stayStats && (
        <StatsChartPopup
          data={stayStats}
          onClose={() => {
            setShowStatsPopup(false);
            setStayStats(null);
          }}
        />
      )}
    </div>
  );
}
