"use client";

import { useEffect, useState } from "react";
import { DemoData, ScreenshotData } from "@/types";
import DemoPreview from "./DemoPreview";
import DemoEditView from "./DemoEditView";
import HeaderBar from "./HeaderBar";

export default function DemoDetailView({
  initialData,
}: {
  initialData: DemoData;
}) {
  const [mode, setMode] = useState<"edit" | "preview">(
    "preview"
  );
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(
    initialData.description
  );
  const [screenshots, setScreenshots] = useState<
    ScreenshotData[]
  >([
    {
      screenshotId: -1,
      fileUrl: initialData.screenshots[0].fileUrl,
      order: 0,
      buttonText: "",
      buttonBgColor: "#168AFF",
      buttonStyle: "Box",
      buttonTextColor: "FFFFFF",
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
            order: 0,
            buttonText: "",
            buttonBgColor: "#168AFF",
            buttonStyle: "Box",
            buttonTextColor: "FFFFFF",
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
      description,
      screenshots: screenshots.filter(
        (s) => s.screenshotId !== -1
      ),
    };
    console.log("💾 저장될 데이터:", dataToSave);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar
        title={title}
        editable={mode === "edit"}
        onChangeTitle={setTitle}
        onSave={handleSave}
      />
      <div className="flex-1">
        {mode === "edit" ? (
          <DemoEditView
            title={title}
            description={description}
            screenshots={screenshots}
            setTitle={setTitle}
            setDescription={setDescription}
            setScreenshots={setScreenshots}
            setMode={setMode}
          />
        ) : (
          <DemoPreview
            title={title}
            description={description}
            screenshots={screenshots}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}
