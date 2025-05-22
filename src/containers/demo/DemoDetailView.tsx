"use client";

import { useEffect, useState } from "react";
import { DemoData, ScreenshotData } from "@/types";
import DemoPreview from "./DemoPreview";
import DemoEditView from "./DemoEditView";
import HeaderBar from "./HeaderBar";
import { DEMO_VIEW_PATH } from "@shared/constants/api";
import { useToast } from "@/components/UI/Toast";

export default function DemoDetailView({
  demo,
  demoId,
  token,
}: {
  demo: DemoData;
  demoId: string;
  token: string;
}) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<"edit" | "preview">(
    "preview"
  );
  const [title, setTitle] = useState(demo.title);
  const [subtitle, setSubtitle] = useState(demo.subtitle);
  const [buttonBgColor, setButtonBgColor] = useState(
    demo.buttonBgColor
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    demo.buttonTextColor
  );
  const [screenshots, setScreenshots] = useState<
    ScreenshotData[]
  >([
    {
      screenshotId: -1,
      fileUrl: demo.screenshots[0].fileUrl,
      buttonText: "",
      buttonBgColor: "#168AFF",
      buttonStyle: "Box",
      buttonTextColor: "#FFFFFF",
      positionX: 0,
      positionY: 0,
    },
    ...demo.screenshots,
  ]);

  useEffect(() => {
    if (mode === "preview") {
      setScreenshots((prev) => {
        if (prev[0]?.screenshotId === -1) return prev;

        return [
          {
            screenshotId: -1,
            fileUrl: prev[0]?.fileUrl || "",
            buttonText: "",
            buttonBgColor: "#168AFF",
            buttonStyle: "Box",
            buttonTextColor: "#FFFFFF",
            positionX: 0,
            positionY: 0,
          },
          ...prev,
        ];
      });
    }
  }, [mode]);

  const handleSave = async () => {
    const dataToSave: DemoData = {
      demoId: demo.demoId,
      title,
      subtitle,
      buttonBgColor,
      buttonTextColor,
      screenshots: screenshots.filter(
        (s) => s.screenshotId !== -1
      ),
    };
    console.log("저장될 데이터:", dataToSave);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${DEMO_VIEW_PATH}/${demoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSave),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("PUT 요청 실패:", error);
      showToast({
        type: "error",
        message: "저장에 실패했습니다.",
      });
      return;
    }

    showToast({
      type: "success",
      message: "저장되었습니다.",
    });
    setMode("preview");
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderBar
        title={title}
        demoId={demoId}
        editable={mode === "edit"}
        onChangeTitle={setTitle}
        onSave={handleSave}
      />
      <div className="flex flex-1 overflow-hidden">
        {mode === "edit" ? (
          <DemoEditView
            title={title}
            subtitle={subtitle}
            buttonBgColor={buttonBgColor}
            buttonTextColor={buttonTextColor}
            screenshots={screenshots}
            setTitle={setTitle}
            setSubtitle={setSubtitle}
            setButtonBgColor={setButtonBgColor}
            setButtonTextColor={setButtonTextColor}
            setScreenshots={setScreenshots}
            setMode={setMode}
          />
        ) : (
          <DemoPreview
            title={title}
            subtitle={subtitle}
            buttonBgColor={buttonBgColor}
            buttonTextColor={buttonTextColor}
            screenshots={screenshots}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}
