import BoxStyle from "@/components/DemoStyle/BoxStyle";
import PointStyle from "@/components/DemoStyle/PointStyle";
import { ScreenshotData } from "@/types";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export default function ScreenshotCanvas({
  screenshot,
  onClick,
}: {
  screenshot: ScreenshotData;
  onClick?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const baseWidth = 1920;
  const baseHeight = 1080;

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const newScale = width / baseWidth;
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full px-10">
      <div
        className="mx-auto relative shadow-lg rounded-4xl overflow-hidden"
        style={{
          maxHeight: "calc(100vh - 200px)",
          aspectRatio: "1920 / 1080",
        }}
      >
        {/* 고정 사이즈 컨텐츠를 스케일로 줄이기 */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            position: "relative",
          }}
        >
          <Image
            src={screenshot.fileUrl}
            alt="ScreenShot"
            width={baseWidth}
            height={baseHeight}
            draggable={false}
            className="absolute inset-0 object-contain"
          />

          {screenshot.buttonStyle === "Point" ? (
            <PointStyle {...screenshot} onClick={onClick} />
          ) : (
            <BoxStyle {...screenshot} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
    // <div className="w-full px-10">
    //   <div
    //     className="aspect-[1920/1080] mx-auto relative shadow-lg rounded-4xl overflow-hidden"
    //     style={{
    //       maxHeight: "calc(100vh - 200px)",
    //     }}
    //   >
    //     <Image
    //       src={screenshot.fileUrl}
    //       alt="ScreenShot"
    //       fill
    //       draggable={false}
    //       className="object-contain"
    //     />

    //     {screenshot.buttonStyle === "Point" ? (
    //       <PointStyle
    //         positionX={screenshot.positionX}
    //         positionY={screenshot.positionY}
    //         buttonText={screenshot.buttonText}
    //         buttonBgColor={screenshot.buttonBgColor}
    //         buttonTextColor={screenshot.buttonTextColor}
    //         onClick={onClick}
    //       />
    //     ) : (
    //       <BoxStyle
    //         positionX={screenshot.positionX}
    //         positionY={screenshot.positionY}
    //         buttonText={screenshot.buttonText}
    //         buttonBgColor={screenshot.buttonBgColor}
    //         buttonTextColor={screenshot.buttonTextColor}
    //         onClick={onClick}
    //       />
    //     )}
    //   </div>
    // </div>
  );
}
