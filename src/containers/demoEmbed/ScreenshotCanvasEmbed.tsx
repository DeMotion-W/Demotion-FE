import BoxStyle from "@/components/DemoStyle/BoxStyle";
import PointStyle from "@/components/DemoStyle/PointStyle";
import { ScreenshotData } from "@/types";
import Image from "next/image";

export default function ScreenshotCanvasEmbed({
  screenshot,
  onClick,
}: {
  screenshot: ScreenshotData;
  onClick?: () => void;
}) {
  return (
    <div className="w-full px-4 sm:px-8">
      <div
        className="w-full max-w-[1280px] aspect-[16/9] mx-auto relative shadow-lg rounded-4xl overflow-hidden"
        style={{
          height: "auto",
        }}
      >
        <Image
          src={screenshot.fileUrl}
          alt="ScreenShot"
          fill
          draggable={false}
          className="object-contain"
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
