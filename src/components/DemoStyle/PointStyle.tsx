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

  return (
    <>
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${left}%`,
          top: `${top + 3}%`,
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
          className="px-5 py-4 text-base rounded-xl max-w-[240px] text-center z-10"
          style={{
            backgroundColor: buttonBgColor,
            color: buttonText
              ? buttonTextColor
              : "#FFFFFF66",
          }}
        >
          {buttonText || "텍스트를 입력해 주세요."}
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute w-6 h-6 rounded-full z-20"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          transform: "translate(-50%, -50%)",
          backgroundColor: buttonBgColor,
          cursor: "pointer",
        }}
      />
    </>
  );
}
