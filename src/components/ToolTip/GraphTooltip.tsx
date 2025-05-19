type GraphTooltipPayload = {
  name: string;
  value: number | string;
  dataKey: "viewCount" | "durationSec";
  payload: {
    name: string;
    viewCount: number;
    durationSec: number;
  };
};

export default function GraphTooltip({
  active,
  payload,
  coordinate,
}: {
  active?: boolean;
  payload?: GraphTooltipPayload[];
  coordinate?: { x: number; y: number };
}) {
  if (!active || !payload || !payload.length || !coordinate)
    return null;

  const viewCount = payload.find(
    (p) => p.dataKey === "viewCount"
  )?.value;
  const durationSec = payload.find(
    (p) => p.dataKey === "durationSec"
  )?.value;

  return (
    <div
      className="text-center bg-white shadow-lg rounded-xl px-4 py-3 border border-gray-200"
      style={{
        position: "absolute",
        left: coordinate.x - 65, // 막대 중심 기준 정렬 (가로 160px니까 /2)
        top: coordinate.y - 100, // 막대 위로 올리기
        width: 130,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <p className="text-xs text-[#333D4B] font-semibold mb-2">
        {payload[0]?.payload?.name}
      </p>
      <p className="text-[10px] text-[#3B82F6] font-medium">
        스텝별 조회수 : {viewCount}
      </p>
      <p className="text-[10px] text-[#333D4B] font-medium">
        스텝별 체류시간 : {durationSec}s
      </p>
    </div>
  );
}
