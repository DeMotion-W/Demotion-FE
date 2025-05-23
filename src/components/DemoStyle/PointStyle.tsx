import { ScreenshotButtonProps } from "@/types";
import { toRgbaWithAlpha } from "@/utils/color";

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
  const openUpward = top > 85;

  return (
    <div>
      {/* 텍스트가 있을 때만 말풍선 + 꼬리 렌더 */}
      {buttonText && (
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${left}%`,
            top: openUpward ? `${top - 2.5}%` : `${top + 2.5}%`,
            transform: `translate(-50%, ${
              openUpward ? "-100%" : "0"
            })`,
          }}
        >
          {/* 꼬리 (아래로) */}
          {!openUpward && (
            <div
              className="w-4 h-4 z-0"
              style={{
                backgroundColor: buttonBgColor,
                transform: "rotate(225deg)",
                marginBottom: "-8px",
              }}
            />
          )}

          {/* 말풍선 박스 */}
          <div
            className="px-5 py-4 text-lg rounded-xl break-words text-center z-10 transition-shadow hover:shadow-[var(--tw-shadow)]"
            style={
              {
                maxWidth: "300px",
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
                "--tw-shadow": `0 0 0 8px ${shadowColor}`,
              } as React.CSSProperties
            }
          >
            {buttonText}
          </div>

          {/* 꼬리 (위로) */}
          {openUpward && (
            <div
              className="w-4 h-4 z-0"
              style={{
                backgroundColor: buttonBgColor,
                transform: "rotate(45deg)",
                marginTop: "-8px",
              }}
            />
          )}
        </div>
      )}

      {/* 항상 표시되는 클릭용 포인트 버튼 */}
      <div className="group">
        <button
          onClick={onClick}
          className="absolute w-7 h-7 rounded-full z-20 group-hover:animate-none animate-scale-on-hover"
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
