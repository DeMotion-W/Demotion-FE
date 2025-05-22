import Tooltip from "@/components/ToolTip/Tooltip";
import type { InsightData } from "@/types";
import { Check, Eye } from "lucide-react";

export default function InsightSummary({
  data,
}: {
  data: InsightData | null;
}) {
  return (
    <>
      {/* 재생횟수 */}
      <div className="p-5 border border-[#E2E7EB] rounded-xl bg-[#FFFFFF]">
        <div className="flex gap-2 items-center text-[#8B95A1]">
          <Eye size={22} />
          <div className="text-[#6B7684] text-sm font-semibold font-['Montserrat'] leading-tight">
            Views
          </div>
          <Tooltip
            title="재생 횟수"
            description="데모 재생 후 3초 이상 시청된 횟수입니다."
          >
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold text-gray-500 leading-none">
                ?
              </span>
            </div>
          </Tooltip>
        </div>
        <div className="text-2xl font-semibold font-['Montserrat'] leading-10 mt-4">
          {data ? data.viewCount.toLocaleString() : "-"}
        </div>
      </div>

      {/* 완주율 */}
      <div className="p-5 border border-[#E2E7EB] rounded-xl bg-[#FFFFFF]">
        <div className="flex gap-2 items-center text-[#8B95A1]">
          <div className="w-5 h-5 px-1 bg-gray-400 rounded-md flex items-center justify-center">
            <Check
              size={14}
              strokeWidth={3}
              className="text-white"
            />
          </div>
          <div className="text-[#6B7684] text-sm font-semibold font-['Montserrat'] leading-tight">
            Completions
          </div>
          <Tooltip
            title="완주율"
            description="끝까지 시청된 횟수입니다."
          >
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold text-gray-500 leading-none">
                ?
              </span>
            </div>
          </Tooltip>
        </div>
        <div className="text-2xl font-semibold font-['Montserrat'] leading-10 mt-4">
          {data ? `${data.completionRate}%` : "-"}
        </div>
      </div>
    </>
  );
}
