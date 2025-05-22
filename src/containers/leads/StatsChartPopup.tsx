"use client";

import ChartTooltip from "@/components/ToolTip/ChartTooltip";
import { useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

type StayTimeData = {
  screenshotId: number;
  stayTimeMillis: number;
};

type Props = {
  data: StayTimeData[];
  onClose: () => void;
};

type LabelPosition = {
  x: number;
  y: number;
  value: number;
  width: number;
};

export default function StatsChartPopup({ data, onClose }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const chartData = data.map((item, idx) => ({
    name: `Step ${idx + 1}`,
    staySec: Math.round(item.stayTimeMillis / 1000),
  }));

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div ref={popupRef} className="bg-white w-[600px] p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#191F28]">체류시간 통계</h2>
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {chartData.length === 0 ? (
          <div className="flex items-start justify-center h-[300px] pt-30 text-center text-sm text-gray-500">
            아직 데이터가 없습니다.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 30, bottom: 20 }}>
              <CartesianGrid stroke="#E5E8EB" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#191F28" }}
                tickMargin={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v}s`}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip fields={[{ key: "staySec", label: "체류시간", unit: "s", color: "#3B82F6" }]} />}
              />
              <Bar dataKey="staySec" name="체류시간 (초)" fill="#69B0F8" radius={[6, 6, 0, 0]} maxBarSize={100}>
                <LabelList
                  dataKey="staySec"
                  position="top"
                  content={({ x, y, value, width }: LabelPosition) => {
                    const boxWidth = 30;
                    const boxHeight = 20;
                    const centerX = (x ?? 0) + (width ?? 0) / 2;

                    return (
                      <g transform={`translate(${centerX - boxWidth / 2}, ${(y ?? 0) - boxHeight - 6})`}>
                        <rect width={boxWidth} height={boxHeight} rx={4} fill="#333D4B" />
                        <text
                          x={boxWidth / 2}
                          y={boxHeight / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
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
        )}
      </div>
    </div>
  );
}
