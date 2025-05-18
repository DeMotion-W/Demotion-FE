"use client";

import { useState } from "react";
import { insightMock } from "@/mock/insight";
import { Demo, InsightData } from "@/types";
import { demoList } from "@/mock/demoList";
import InsightSummary from "./InsightSummary";
import InsightChart from "./InsightChart";
import DemoDropdown from "@/components/DropDown/DemoDropdown";

export default function DemoInsight() {
  const [selectedDemo, setSelectedDemo] =
    useState<Demo | null>(null);
  const [insightData, setInsightData] =
    useState<InsightData | null>(null);

  const handleDemoSelect = (demo: Demo) => {
    setSelectedDemo(demo);

    // 실제 API 연동 전까지는 목데이터로
    setInsightData(insightMock[demo.id] ?? null);
  };

  return (
    <div className="gap-4">
      <div className="flex flex-col mt-10">
        <label className="text-[#369AFF] text-base font-semibold font-['Montserrat'] leading-normal">
          Select the demo!
        </label>
        <DemoDropdown
          demos={demoList}
          selected={selectedDemo}
          onSelect={(demo) => {
            setSelectedDemo(demo);
            setInsightData(insightMock[demo.id] ?? null);
          }}
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
