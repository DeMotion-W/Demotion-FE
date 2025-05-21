import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvas from "./ThumbnailCanvas";
import ScreenshotCanvas from "./ScreenshotCanvas";

export default function DemoPreview({
  title,
  subtitle,
  buttonBgColor,
  buttonTextColor,
  screenshots,
  setMode,
}: {
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
  setMode: (mode: "edit" | "preview") => void;
}) {
  const [step, setStep] = useState(0);
  const current = screenshots[step];

  // useEffect(() => {
  //   const handleClick = () => {
  //     if (step < screenshots.length - 1) {
  //       setStep((prev) => prev + 1);
  //     }
  //   };
  //   window.addEventListener("click", handleClick);
  //   return () =>
  //     window.removeEventListener("click", handleClick);
  // }, [step, screenshots.length]);

  useEffect(() => {
    setStep(0);
  }, []);

  if (!current) return null;

  const isThumbnail = current.screenshotId === -1;

  return (
    <main className="w-full px-20 py-8 flex flex-col items-center h-screen overflow-hidden">
      <div className="w-[1120px] pl-20 pr-30 mb-6 flex justify-center">
        <div className="flex gap-4 bg-[#EEF0F2] p-1.5 rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => setMode("edit")}
            className="px-3 py-2 rounded-full text-[#8B95A1] text-xs font-semibold font-['Montserrat'] leading-tight"
          >
            Edit
          </button>
          <button
            onClick={() => setMode("preview")}
            className="px-3 py-2 rounded-full bg-[#FFFFFF] text-[#369AFF] text-xs font-semibold font-['Montserrat'] leading-tight"
          >
            Preview
          </button>
        </div>
      </div>
      {isThumbnail ? (
        <ThumbnailCanvas
          title={title}
          subtitle={subtitle}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
          fileUrl={screenshots[0].fileUrl}
          onStartClick={() => {
            if (step < screenshots.length - 1) {
              setStep(step + 1);
            }
          }}
        />
      ) : (
        <ScreenshotCanvas
          screenshot={screenshots[step]}
          onClick={() => {
            if (step < screenshots.length - 1) {
              setStep(step + 1);
            }
          }}
        />
      )}
    </main>
  );
}
