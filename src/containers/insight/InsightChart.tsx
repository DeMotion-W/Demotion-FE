"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import type { ScreenshotStat } from "@/types";
import GraphTooltip from "@/components/ToolTip/GraphTooltip";

type LabelPosition = {
  x: number;
  y: number;
  value: number;
  width: number;
};

export default function InsightChart({
  data,
}: {
  data: ScreenshotStat[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-80 flex flex-col items-center justify-center border border-[#E2E7EB] rounded-xl gap-2">
        <div className="text-[#191F28] text-base font-semibold font-['Pretendard'] leading-normal">
          데모를 선택해 보세요!
        </div>
        <div className="text-[#6B7684] text-xs font-normal font-['Pretendard'] leading-tight">
          데모를 선택하면 데모별 조회수를 확인할 수 있어요.
        </div>
      </div>
    );
  }

  const chartData = data.map((step, idx) => ({
    name: `Step ${idx + 1}`,
    viewCount: step.viewCount,
    durationSec: Math.round(step.avgDurationMillis / 1000),
  }));

  return (
    <div className="flex flex-col justify-center w-full h-[480px] rounded-2xl border border-[#E2E7EB] p-4">
      <div className="mb-8 ml-5 mt-7 flex items-center gap-6 text-xs text-[#4E5968] font-normal font-['Pretendard'] leading-tight">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#369AFF]" />
          <span>스텝별 조회수</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D7EBFF]" />
          <span>스텝별 체류시간</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 50,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid
            stroke="#E5E8EB"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 13,
              fill: "#191F28",
              fontFamily: "Montserrat",
              fontWeight: "600",
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            tickCount={8}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `${v}s`}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            tickCount={8}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<GraphTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="viewCount"
            name="스텝별 조회수"
            fill="#369AFF"
            radius={[6, 6, 0, 0]}
            maxBarSize={100}
          >
            <LabelList
              dataKey="viewCount"
              position="top"
              content={({
                x,
                y,
                value,
                width,
              }: LabelPosition) => {
                const boxWidth = 30;
                const boxHeight = 26;
                const radius = 6;

                const centerX = (x ?? 0) + (width ?? 0) / 2;

                return (
                  <g
                    transform={`translate(${
                      centerX - boxWidth / 2
                    }, ${(y ?? 0) - boxHeight - 6})`}
                  >
                    <rect
                      width={boxWidth}
                      height={boxHeight}
                      rx={radius}
                      ry={radius}
                      fill="#333D4B"
                    />
                    <text
                      x={boxWidth / 2}
                      y={boxHeight / 2}
                      textAnchor="middle" // 가로 정렬
                      dominantBaseline="middle" // 세로 정렬
                      fill="white"
                      fontSize="10"
                      fontWeight="500"
                      fontFamily="Pretendard"
                    >
                      {value}
                    </text>
                  </g>
                );
              }}
            />
          </Bar>
          <Bar
            yAxisId="right"
            dataKey="durationSec"
            name="스텝별 체류시간"
            fill="#D7EBFF"
            radius={[6, 6, 0, 0]}
            maxBarSize={100}
          >
            <LabelList
              dataKey="durationSec"
              content={({
                x,
                y,
                value,
                width,
              }: LabelPosition) => {
                const boxWidth = 30;
                const boxHeight = 26;
                const radius = 6;

                const centerX = (x ?? 0) + (width ?? 0) / 2;

                return (
                  <g
                    transform={`translate(${
                      centerX - boxWidth / 2
                    }, ${(y ?? 0) - boxHeight - 6})`}
                  >
                    <rect
                      width={boxWidth}
                      height={boxHeight}
                      rx={radius}
                      ry={radius}
                      fill="#EEF0F2"
                    />
                    <text
                      x={boxWidth / 2}
                      y={boxHeight / 2}
                      textAnchor="middle" // 가로 정렬
                      dominantBaseline="middle" // 세로 정렬
                      fill="#333D4B"
                      fontSize="10"
                      fontWeight="500"
                      fontFamily="Pretendard"
                    >
                      {value}s
                    </text>
                  </g>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
