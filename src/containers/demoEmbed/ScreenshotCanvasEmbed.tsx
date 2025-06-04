import BoxStyle from "@/components/DemoStyle/BoxStyle";
import PointStyle from "@/components/DemoStyle/PointStyle";
import { ScreenshotData } from "@/types";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export default function ScreenshotCanvasEmbed({
  screenshot,
  onClick,
  onContactClick,
  children,
}: {
  screenshot: ScreenshotData;
  onClick?: () => void;
  onContactClick?: () => void;
  children?: React.ReactNode;
}) {
  const baseWidth = 1920;
  const baseHeight = 1080;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;

        const containerHeight = window.innerHeight - 50;

        const scaleWidth = width / baseWidth;
        const scaleHeight = containerHeight / baseHeight;
        const newScale = Math.min(scaleWidth, scaleHeight);
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className="w-full flex justify-center items-center overflow-hidden"
      ref={containerRef}
    >
      <div
        className="mx-auto relative shadow-lg overflow-hidden rounded-4xl"
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
            priority
            loading="eager"
            draggable={false}
            className="object-contain"
          />
          {screenshot.buttonStyle === "Point" ? (
            <PointStyle {...screenshot} onClick={onClick} />
          ) : (
            <BoxStyle {...screenshot} onClick={onClick} />
          )}
          {children}
          <button
            className="absolute bottom-6 right-8 bg-[#191F28] text-white px-5 py-4 rounded-lg text-base shadow-lg z-10"
            onClick={() => onContactClick?.()}
          >
            도입 문의
          </button>
        </div>
      </div>
    </div>
  );
}
