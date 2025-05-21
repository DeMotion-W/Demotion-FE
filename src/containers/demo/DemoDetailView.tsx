"use client";

import { useEffect, useState } from "react";
import { DemoData, ScreenshotData } from "@/types";
import DemoPreview from "./DemoPreview";
import DemoEditView from "./DemoEditView";
import HeaderBar from "./HeaderBar";

export default function DemoDetailView({
  initialData,
  demoId,
}: {
  initialData: DemoData;
  demoId: string;
}) {
  const [mode, setMode] = useState<"edit" | "preview">(
    "preview"
  );
  const [title, setTitle] = useState(initialData.title);
  const [subtitle, setSubtitle] = useState(
    initialData.subtitle
  );
  const [buttonBgColor, setButtonBgColor] = useState(
    initialData.buttonBgColor
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    initialData.buttonTextColor
  );
  const [screenshots, setScreenshots] = useState<
    ScreenshotData[]
  >([
    {
      screenshotId: -1,
      fileUrl: initialData.screenshots[0].fileUrl,
      buttonText: "",
      buttonBgColor: "#168AFF",
      buttonStyle: "Box",
      buttonTextColor: "#FFFFFF",
      positionX: 0,
      positionY: 0,
    },
    ...initialData.screenshots,
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
      demoId: initialData.demoId,
      title,
      subtitle,
      buttonBgColor,
      buttonTextColor,
      screenshots: screenshots.filter(
        (s) => s.screenshotId !== -1
      ),
    };
    console.log("저장될 데이터:", dataToSave);
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
