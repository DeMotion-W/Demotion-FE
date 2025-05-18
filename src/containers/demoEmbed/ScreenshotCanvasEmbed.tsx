import BoxStyle from "@/components/DemoStyle/BoxStyle";
import PointStyle from "@/components/DemoStyle/PointStyle";
import { ScreenshotData } from "@/types";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export default function ScreenshotCanvasEmbed({
  screenshot,
  onClick,
}: {
  screenshot: ScreenshotData;
  onClick?: () => void;
}) {
  const baseWidth = 1920;
  const baseHeight = 1080;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;

        const containerHeight = window.innerHeight - 100; // 상단 여백 등 감안

        const scaleWidth = width / baseWidth;
        const scaleHeight = containerHeight / baseHeight;
        const newScale = Math.min(scaleWidth, scaleHeight);
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className="w-full flex justify-center items-center overflow-hidden p-2"
      ref={containerRef}
    >
      <div
        className="mx-auto relative shadow-lg rounded-4xl"
        style={{
          width: baseWidth * scale,
          height: baseHeight * scale,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: baseWidth,
            height: baseHeight,
            position: "relative",
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
            <PointStyle {...screenshot} onClick={onClick} />
          ) : (
            <BoxStyle {...screenshot} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}
