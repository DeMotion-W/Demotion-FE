type TooltipPayload = {
  name: string;
  value: number | string;
  dataKey: "viewCount" | "durationSec" | "staySec";
  payload: {
    name: string;
    viewCount?: number;
    durationSec?: number;
    staySec?: number;
  };
};

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  coordinate?: { x: number; y: number };
  labelKey?: string; // 예: 'name'
  fields: {
    key: string; // payload 안의 key
    label: string; // 보여줄 라벨 텍스트
    color?: string;
    unit?: string;
  }[];
};

export default function ChartTooltip({ active, payload, coordinate, labelKey = "name", fields }: TooltipProps) {
  if (!active || !payload || !payload.length || !coordinate) return null;

  const baseData = payload[0]?.payload;

  return (
    <div
      className="bg-white shadow-lg rounded-md px-4 py-3 border border-gray-200 text-xs text-gray-800 text-center"
      style={{
        position: "absolute",
        left: coordinate.x - 65,
        top: coordinate.y - 100,
        width: 130,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <p className="text-xs font-semibold text-[#333D4B] mb-2">{baseData?.[labelKey]}</p>
      {fields.map(({ key, label, color = "#333D4B", unit = "" }) => (
        <p key={key} className="text-[10px] font-medium" style={{ color }}>
          {label} : {baseData?.[key]}
          {unit}
        </p>
      ))}
    </div>
  );
}
