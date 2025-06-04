"use client";

import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvasEmbed from "./ThumbnailCanvasEmbed";
import ScreenshotCanvasEmbed from "./ScreenshotCanvasEmbed";
import EmailPopup from "../../components/Popup/EmailPopup";
import ContactPopup from "../../components/Popup/ContactPopup";
import useImagePreloader from "@/hooks/useImagePreloader";
import { useToast } from "@/components/UI/Toast";

type Props = {
  demoId: string;
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
  initialStep?: number;
  onEnd?: () => void;
};

export default function DemoPreviewEmbed({
  demoId,
  title,
  subtitle,
  buttonBgColor,
  buttonTextColor,
  screenshots,
  initialStep = 0,
  onEnd,
}: Props) {
  const [step, setStep] = useState(initialStep);
  const [hasContacted, setHasContacted] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(true);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { showToast } = useToast();

  const current = screenshots[step];
  const isThumbnail = current?.screenshotId === -1;

  useImagePreloader(screenshots);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    const nextStep = step + 1;
    if (nextStep < screenshots.length) {
      const img = new Image();
      img.src = screenshots[nextStep].fileUrl;
    }
  }, [step, screenshots]);

  const handleNextStep = async () => {
    // 현재 스크린샷 정보
    const currentScreenshot = screenshots[step];
    const isThumbnail = currentScreenshot?.screenshotId === -1;

    const screenshotIdToSend = isThumbnail
      ? 0
      : currentScreenshot.screenshotId;

    // 세션 ID가 있고 썸네일이 아닌 경우에만 기록 전송
    if (sessionId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/embed/${demoId}/step`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
              screenshotId: screenshotIdToSend,
              timestampMillis: Date.now(),
            }),
          }
        );

        if (!response.ok) {
          const err = await response.text();
          console.error("step 기록 실패:", err);
        }
      } catch (err) {
        console.error("step API 에러:", err);
      }
    }

    // 다음 스텝으로 이동
    if (step < screenshots.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onEnd?.();
    }
  };

  return (
    <main className="w-full sm:px-6 md:px-10 lg:px-20 flex flex-col items-center">
      {isThumbnail ? (
        <ThumbnailCanvasEmbed
          title={title}
          subtitle={subtitle}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
          fileUrl={screenshots[0].fileUrl}
          onStartClick={async () => {
            await handleNextStep();
          }}
        >
          {showEmailPopup && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
              <EmailPopup
                onSubmit={async (email) => {
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}api/embed/${demoId}/start`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                      }
                    );

                    if (!response.ok) {
                      alert("이메일 제출에 실패했습니다.");
                      return;
                    }

                    const { sessionId } = await response.json();
                    setSessionId(sessionId);
                    setShowEmailPopup(false);
                  } catch (err) {
                    alert("네트워크 오류가 발생했습니다.");
                  }
                }}
              />
            </div>
          )}
        </ThumbnailCanvasEmbed>
      ) : (
        <ScreenshotCanvasEmbed
          screenshot={current}
          onClick={handleNextStep}
          onContactClick={() => {
            if (!hasContacted) {
              setShowContactPopup(true);
            }
          }}
        >
          {showContactPopup && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
              <ContactPopup
                onClose={() => setShowContactPopup(false)}
                onConfirm={async () => {
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}api/embed/${demoId}/contact`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ sessionId }),
                      }
                    );

                    if (!response.ok) {
                      alert("도입문의에 실패하였습니다.");
                      return;
                    }

                    setHasContacted(true);
                    setShowContactPopup(false);
                    showToast({
                      type: "success",
                      message: "도입문의가 완료되었습니다.",
                      position: "center",
                    });
                  } catch (error) {
                    alert("네트워크 오류가 발생했습니다.");
                  }
                }}
              />
            </div>
          )}
        </ScreenshotCanvasEmbed>
      )}
    </main>
  );
}
