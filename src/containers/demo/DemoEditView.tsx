"use client";

import { ScreenshotData } from "@/types";
import { useState } from "react";
import ScreenshotSidebar from "./ScreenshotSidebar";
import ScreenshotCanvas from "./ScreenshotCanvas";
import ScreenshotEditor from "./ScreenshotEditor";
import ThumbnailCanvas from "./ThumbnailCanvas";
import ThumbnailEditor from "./ThumbnailEditor";

export default function DemoEditView({
  title,
  description,
  screenshots,
  setTitle,
  setDescription,
  setScreenshots,
  setMode,
}: {
  title: string;
  description: string;
  screenshots: ScreenshotData[];
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setScreenshots: (value: ScreenshotData[]) => void;
  setMode: (mode: "edit" | "preview") => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = screenshots[selectedIndex];
  const isThumbnail = selectedIndex === 0;

  const updateScreenshot = (
    updated: Partial<ScreenshotData>
  ) => {
    const updatedList = screenshots.map((s, i) =>
      i === selectedIndex ? { ...s, ...updated } : s
    );
    setScreenshots(updatedList);
  };

  return (
    <div className="flex flex-1 w-full">
      <aside className="w-[240px] min-h-screen bg-[#FFFFFF] px-5 py-2 border-r-2 border-[#E2E6EB] p-2 overflow-y-auto gap-2.5">
        <ScreenshotSidebar
          screenshots={screenshots}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </aside>

      <main className="flex-1 bg-white px-10 py-8">
        <div className="mx-auto w-full min-w-[680px]">
          <div className="flex justify-center mb-6">
            <div className="flex gap-4 bg-[#EEF0F2] p-1.5 rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] gap-1">
              <button
                onClick={() => setMode("edit")}
                className="px-4 py-2 rounded-full bg-[#FFFFFF] text-[#369AFF] text-sm font-semibold font-['Montserrat'] leading-tight"
              >
                Edit
              </button>
              <button
                onClick={() => setMode("preview")}
                className="px-4 py-2 rounded-full text-[#8B95A1] text-sm font-semibold font-['Montserrat'] leading-tight"
              >
                Preview
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            {isThumbnail ? (
              <ThumbnailCanvas
                demo={{
                  demoId: -1,
                  title,
                  description,
                  screenshots,
                }}
              />
            ) : (
              <ScreenshotCanvas screenshot={selected} />
            )}
          </div>
        </div>
      </main>

      <aside className="w-[280px] min-h-screen bg-[#FFFFFF] border-l-2 border-[#E2E6EB] p-4 overflow-y-auto">
        {isThumbnail ? (
          <ThumbnailEditor
            title={title}
            subtitle={description}
            screenshot={screenshots[0]}
            onTitleChange={setTitle}
            onSubtitleChange={setDescription}
            onChangeScreenshot={(value) => {
              const newScreenshots = [...screenshots];
              newScreenshots[0] = value;
              setScreenshots(newScreenshots);
            }}
          />
        ) : (
          <ScreenshotEditor
            screenshot={selected}
            onChange={updateScreenshot}
          />
        )}
      </aside>
    </div>
  );
}
