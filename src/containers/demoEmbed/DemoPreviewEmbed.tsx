"use client";

import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvasEmbed from "./ThumbnailCanvasEmbed";
import ScreenshotCanvasEmbed from "./ScreenshotCanvasEmbed";
import ThumbnailCanvas from "../demo/ThumbnailCanvas";
import ScreenshotCanvas from "../demo/ScreenshotCanvas";

type Props = {
  title: string;
  description: string;
  screenshots: ScreenshotData[];
  initialStep?: number;
  onEnd?: () => void;
};

export default function DemoPreviewEmbed({
  title,
  description,
  screenshots,
  initialStep = 0,
  onEnd,
}: Props) {
  const [step, setStep] = useState(initialStep);
  const current = screenshots[step];
  const isThumbnail = current?.screenshotId === -1;

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  if (!current) return null;

  const handleNextStep = () => {
    if (step < screenshots.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onEnd?.();
    }
  };

  return (
    <main className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-8 flex flex-col items-center">
      {isThumbnail ? (
        <ThumbnailCanvasEmbed
          demo={{
            demoId: -1,
            title,
            description,
            screenshots,
          }}
          onStartClick={handleNextStep}
        />
      ) : (
        <ScreenshotCanvasEmbed
          screenshot={current}
          onClick={handleNextStep}
        />
      )}
    </main>
  );
}
