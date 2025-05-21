"use client";

import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvasEmbed from "./ThumbnailCanvasEmbed";
import ScreenshotCanvasEmbed from "./ScreenshotCanvasEmbed";
import EmailPopup from "../../components/Popup/EmailPopup";
import ContactPopup from "../../components/Popup/ContactPopup";

type Props = {
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
  initialStep?: number;
  onEnd?: () => void;
};

export default function DemoPreviewEmbed({
  title,
  subtitle,
  buttonBgColor,
  buttonTextColor,
  screenshots,
  initialStep = 0,
  onEnd,
}: Props) {
  const [step, setStep] = useState(initialStep);
  const [showEmailPopup, setShowEmailPopup] =
    useState(false);
  const [showContactPopup, setShowContactPopup] =
    useState(false);

  const current = screenshots[step];
  const isThumbnail = current?.screenshotId === -1;

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

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
          title={title}
          subtitle={subtitle}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
          fileUrl={screenshots[0].fileUrl}
          onStartClick={() => setShowEmailPopup(true)}
        />
      ) : (
        <ScreenshotCanvasEmbed
          screenshot={current}
          onClick={handleNextStep}
          onContactClick={() => setShowContactPopup(true)}
        />
      )}
      {showEmailPopup && (
        <EmailPopup
          onClose={() => setShowEmailPopup(false)}
          onSubmit={(email) => {
            console.log("입력된 이메일:", email);
            setShowEmailPopup(false);
            handleNextStep();
          }}
        />
      )}
      {showContactPopup && (
        <ContactPopup
          onClose={() => setShowContactPopup(false)}
          onConfirm={() => {
            console.log("문의 접수 완료");
            setShowContactPopup(false);
          }}
        />
      )}
    </main>
  );
}
