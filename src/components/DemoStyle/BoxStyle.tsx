import { toRgbaWithAlpha, toRgbString } from "@/utils/color";
import { ScreenshotButtonProps } from "@/types";
import { ChevronRight } from "lucide-react";

export default function BoxStyle({
  positionX,
  positionY,
  buttonText,
  buttonBgColor,
  buttonTextColor,
  onClick,
}: ScreenshotButtonProps) {
  const left = (positionX / 1920) * 100;
  const top = (positionY / 1080) * 100;

  const shadowColor = toRgbaWithAlpha(buttonBgColor, 0.5);
  const shadowRgb = toRgbString(buttonBgColor);

  return (
    <div
      className="absolute group"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="flex flex-col items-start gap-3 px-5 py-4 text-lg font-normal 
             rounded-xl min-w-[180px] max-w-[240px]
             group-hover:shadow-[var(--tw-shadow)] group-hover-scale
             transition-shadow animate-pulse-opacity group-hover:animate-none"
        style={
          {
            backgroundColor: buttonBgColor,
            color: buttonText ? buttonTextColor : "#FFFFFF66",
            // "--pulse-shadow-color": buttonBgColor,
            "--shadow-rgb": shadowRgb,
            "--tw-shadow": `0 0 0 6px ${shadowColor}`,
          } as React.CSSProperties
        }
      >
        <span className="flex-1 break-words text-left text-base font-normal font-['Pretendard'] leading-tight">
          {buttonText || "텍스트를 입력해 주세요."}
        </span>
        <button
          onClick={onClick}
          className="rounded-full bg-white flex items-center justify-center cursor-pointer animate-stretch-horizontal transition-all"
          style={{
            height: "36px",
          }}
        >
          <ChevronRight className="w-4 h-4 text-[#168AFF]" />
        </button>
      </div>
    </div>
  );
}
