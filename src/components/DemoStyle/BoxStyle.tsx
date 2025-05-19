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
        className="flex flex-col items-start gap-3 px-5 py-4 text-base 
                   rounded-xl min-w-[180px] max-w-[240px]
                   transition-shadow group-hover:shadow-[0_0_0_4px_rgba(0,0,0,0.2)]"
        style={{
          backgroundColor: buttonBgColor,
          color: buttonText ? buttonTextColor : "#FFFFFF66",
        }}
      >
        <span className="flex-1 break-words text-left text-lg font-semibold font-['Pretendard'] leading-tight">
          {buttonText || "텍스트를 입력해 주세요."}
        </span>
        <button
          onClick={onClick}
          className="w-13 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-[#168AFF]" />
        </button>
      </div>
    </div>
  );
}
