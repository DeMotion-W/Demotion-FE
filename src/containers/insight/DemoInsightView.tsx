"use client";

import { useState } from "react";
import { Demo, InsightData } from "@/types";
import InsightSummary from "./InsightSummary";
import InsightChart from "./InsightChart";
import DemoDropdown from "@/components/DropDown/DemoDropdown";
import { fetchWithAuth } from "@/actions/api-client";

export default function DemoInsightView({
  demoList,
}: {
  demoList: Demo[];
}) {
  const [selectedDemo, setSelectedDemo] =
    useState<Demo | null>(null);
  const [insightData, setInsightData] =
    useState<InsightData | null>(null);

  // const handleDemoSelect = (demo: Demo) => {
  //   setSelectedDemo(demo);

  //   // 실제 API 연동 전까지는 목데이터로
  //   setInsightData(insightMock[demo.id] ?? null);
  // };

  const handleDemoSelect = async (demo: Demo) => {
    setSelectedDemo(demo);
    const data: InsightData = await fetchWithAuth(
      `/api/demos/${demo.demoId}/insight/stat`
    );
    setInsightData(data);
  };

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
      <div className="gap-2">
        <div className="mt-6 grid grid-cols-2 gap-4">
          <InsightSummary data={insightData} />
        </div>
        <div className="mt-6">
          <InsightChart
            data={insightData?.screenshotStats ?? []}
          />
        </div>
      </div>
    </div>
  );
}
