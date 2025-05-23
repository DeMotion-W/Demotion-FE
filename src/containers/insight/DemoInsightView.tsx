"use client";

import { useState } from "react";
import { Demo, InsightData } from "@/types";
import InsightSummary from "./InsightSummary";
import InsightChart from "./InsightChart";
import DemoDropdown from "@/components/DropDown/DemoDropdown";
import { fetchWithAuth } from "@/actions/api-client";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default function DemoInsightView({
  demoList,
}: {
  demoList: Demo[];
}) {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [insightData, setInsightData] = useState<InsightData | null>(
    null
  );

  const handleDemoSelect = async (demo: Demo) => {
    setSelectedDemo(demo);
    const data: InsightData = await fetchWithAuth(
      `${DEMO_VIEW_PATH}/${demo.demoId}/insight/stat`
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
        <div className="mt-3 grid grid-cols-2 gap-4">
          <InsightSummary data={insightData} />
        </div>
        <div className="mt-4">
          <InsightChart data={insightData?.screenshotStats ?? []} />
        </div>
      </div>
    </div>
  );
}
