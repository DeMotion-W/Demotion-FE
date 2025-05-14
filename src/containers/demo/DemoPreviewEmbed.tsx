import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvas from "./ThumbnailCanvas";
import ScreenshotCanvas from "./ScreenshotCanvas";

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
    <main className="w-full px-20 py-8 flex flex-col items-center">
      {isThumbnail ? (
        <ThumbnailCanvas
          demo={{
            demoId: -1,
            title,
            description,
            screenshots,
          }}
          onStartClick={handleNextStep}
        />
      ) : (
        <ScreenshotCanvas
          screenshot={current}
          onClick={handleNextStep}
        />
      )}
    </main>
  );
}
