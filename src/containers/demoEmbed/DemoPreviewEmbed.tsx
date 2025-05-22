"use client";

import { ScreenshotData } from "@/types";
import { useEffect, useState } from "react";
import ThumbnailCanvasEmbed from "./ThumbnailCanvasEmbed";
import ScreenshotCanvasEmbed from "./ScreenshotCanvasEmbed";
import EmailPopup from "../../components/Popup/EmailPopup";
import ContactPopup from "../../components/Popup/ContactPopup";

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
  const [showEmailPopup, setShowEmailPopup] =
    useState(false);
  const [showContactPopup, setShowContactPopup] =
    useState(false);
  const [sessionId, setSessionId] = useState<string | null>(
    null
  );

  const current = screenshots[step];
  const isThumbnail = current?.screenshotId === -1;

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  // const handleNextStep = () => {
  //   if (step < screenshots.length - 1) {
  //     setStep((prev) => prev + 1);
  //   } else {
  //     onEnd?.();
  //   }
  // };

  const handleNextStep = async () => {
    // 현재 스크린샷 정보
    const currentScreenshot = screenshots[step];
    const isThumbnail =
      currentScreenshot?.screenshotId === -1;

    // 세션 ID가 있고 썸네일이 아닌 경우에만 기록 전송
    if (sessionId && !isThumbnail) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/embed/${demoId}/step`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
              screenshotId: currentScreenshot.screenshotId,
              timestampMillis: Date.now(),
            }),
          }
        );

        if (!res.ok) {
          const err = await res.text();
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

      {/* 이메일 입력 팝업 */}
      {showEmailPopup && (
        <EmailPopup
          onClose={() => setShowEmailPopup(false)}
          onSubmit={async (email) => {
            console.log("입력된 이메일:", email);

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
                const errorText = await response.text();
                console.error(
                  "이메일 제출 실패:",
                  errorText
                );
                alert("이메일 제출에 실패했습니다.");
                return;
              }

              const { sessionId } = await response.json();
              console.log("세션 ID:", sessionId);
              setSessionId(sessionId);

              setShowEmailPopup(false);
              handleNextStep(); // 다음 스텝으로 진행
            } catch (error) {
              console.error("API 호출 에러:", error);
              alert("네트워크 오류가 발생했습니다.");
            }
          }}
        />
      )}

      {/* 도입 문의 팝업 */}
      {showContactPopup && (
        <ContactPopup
          onClose={() => setShowContactPopup(false)}
          onConfirm={async () => {
            console.log("문의 접수 완료");

            // try {
            //   const response = await fetch(
            //     `${process.env.NEXT_PUBLIC_API_URL}api/embed/${demoId}/start`,
            //     {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       body: JSON.stringify({ email }),
            //     }
            //   );

            //   if (!response.ok) {
            //     const errorText = await response.text();
            //     console.error(
            //       "이메일 제출 실패:",
            //       errorText
            //     );
            //     alert("이메일 제출에 실패했습니다.");
            //     return;
            //   }

            //   const { sessionId } = await response.json();
            //   console.log("세션 ID:", sessionId);
            //   setSessionId(sessionId);

            //   setShowContactPopup(false);
            //   handleNextStep(); // 다음 스텝으로 진행
            // } catch (error) {
            //   console.error("API 호출 에러:", error);
            //   alert("네트워크 오류가 발생했습니다.");
            // }
          }}
        />
      )}
    </main>
  );
}
