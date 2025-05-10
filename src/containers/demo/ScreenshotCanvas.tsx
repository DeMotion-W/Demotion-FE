import BoxStyle from "@/components/DemoStyle/BoxStyle";
import PointStyle from "@/components/DemoStyle/PointStyle";
import { ScreenshotData } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ScreenshotCanvas({
  screenshot,
  onClick,
}: {
  screenshot: ScreenshotData;
  onClick?: () => void;
}) {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const leftPercent =
    (screenshot.positionX / baseWidth) * 100;
  const topPercent =
    (screenshot.positionY / baseHeight) * 100;

  return (
    <div className="w-full px-10">
      <div
        className="w-full min-w-[680px] aspect-[1920/1080] mx-auto relative shadow-lg rounded-4xl overflow-hidden"
        style={{
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <Image
          src={screenshot.fileUrl}
          alt="ScreenShot"
          fill
          draggable={false}
          className="w-full h-auto object-contain"
        />

        {screenshot.buttonStyle === "Point" ? (
          <PointStyle
            positionX={screenshot.positionX}
            positionY={screenshot.positionY}
            buttonText={screenshot.buttonText}
            buttonBgColor={screenshot.buttonBgColor}
            buttonTextColor={screenshot.buttonTextColor}
            onClick={onClick}
          />
        ) : (
          <BoxStyle
            positionX={screenshot.positionX}
            positionY={screenshot.positionY}
            buttonText={screenshot.buttonText}
            buttonBgColor={screenshot.buttonBgColor}
            buttonTextColor={screenshot.buttonTextColor}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
}
