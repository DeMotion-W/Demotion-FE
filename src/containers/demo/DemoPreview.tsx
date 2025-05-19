import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvas from "./ThumbnailCanvas";
import ScreenshotCanvas from "./ScreenshotCanvas";

export default function DemoPreview({
  title,
  description,
  screenshots,
  setMode,
}: {
  title: string;
  description: string;
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
      <div className="w-[1120px] mb-6 flex justify-center">
        <div className="flex gap-4 bg-[#EEF0F2] p-1.5 rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => setMode("edit")}
            className="px-4 py-2 rounded-full text-[#8B95A1] text-sm font-semibold font-['Montserrat'] leading-tight"
          >
            Edit
          </button>
          <button
            onClick={() => setMode("preview")}
            className="px-4 py-2 rounded-full bg-[#FFFFFF] text-[#369AFF] text-sm font-semibold font-['Montserrat'] leading-tight"
          >
            Preview
          </button>
        </div>
      </div>
      {isThumbnail ? (
        <ThumbnailCanvas
          demo={{
            demoId: -1,
            title,
            description,
            screenshots,
          }}
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
