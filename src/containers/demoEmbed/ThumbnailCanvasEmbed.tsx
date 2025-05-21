import { DemoData } from "@/types";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export default function ThumbnailCanvasEmbed({
  title,
  subtitle,
  buttonBgColor,
  buttonTextColor,
  fileUrl,
  onStartClick,
}: {
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  fileUrl: string;
  onStartClick?: () => void;
}) {
  const baseWidth = 1920;
  const baseHeight = 1080;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.clientWidth;
        const containerHeight = window.innerHeight - 100;

        const scaleWidth = containerWidth / baseWidth;
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
      ref={containerRef}
      className="w-full flex justify-center items-center overflow-hidden p-2"
    >
      <div
        className="mx-auto relative rounded-4xl shadow-lg overflow-hidden"
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
            src={fileUrl}
            alt="thumbnail preview"
            fill
            draggable={false}
            className="object-contain blur-sm"
          />
          <div
            className="absolute inset-0 flex items-end px-16 pb-16 text-left"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="flex flex-col items-start gap-2">
              <h2 className="mb-2 text-white font-semibold text-5xl">
                {title || "제목을 입력해 주세요."}
              </h2>
              <p className="text-white text-xl">
                {subtitle || "부제목을 입력해 주세요."}
              </p>
              <button
                className="mt-4 text-xl w-96 h-16 px-10 py-3 rounded-full font-semibold cursor-pointer"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                }}
                onClick={onStartClick}
              >
                Get Started!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
