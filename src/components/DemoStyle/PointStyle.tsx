import { toRgbaWithAlpha } from "@/lib/color";
import { ScreenshotButtonProps } from "@/types";

export default function PointStyle({
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

  return (
    <div>
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${left}%`,
          top: `${top + 2}%`,
          transform: "translate(-50%, 0)",
        }}
      >
        <div
          className="w-3 h-3 rotate-45 mb-[-6px] z-0"
          style={{
            backgroundColor: buttonBgColor,
          }}
        />
        <div
          className="px-5 py-4 text-base rounded-xl max-w-[240px] text-center z-10 transition-shadow hover:shadow-[var(--tw-shadow)]"
          style={
            {
              backgroundColor: buttonBgColor,
              color: buttonText
                ? buttonTextColor
                : "#FFFFFF66",
              "--tw-shadow": `0 0 0 8px ${shadowColor}`,
            } as React.CSSProperties
          }
        >
          {buttonText || "텍스트를 입력해 주세요."}
        </div>
      </div>
      <div className="group">
        <button
          onClick={onClick}
          className="absolute w-5 h-5 rounded-full z-20 group-hover:animate-none animate-scale-on-hover"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: buttonBgColor,
              cursor: "pointer",
              "--pulse-color": `${buttonBgColor}66`,
            } as React.CSSProperties
          }
        >
          <span className="animate-pulse-ring" />
        </button>
      </div>
    </div>
  );
}
