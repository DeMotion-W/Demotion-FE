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
    <div className="w-full h-full flex">
      <aside className="w-[240px] h-full shrink-0 overflow-y-auto bg-[#FFFFFF] border-r border-[#E2E6EB]">
        <div className="px-5 py-2 mt-4">
          <ScreenshotSidebar
            screenshots={screenshots}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>
      </aside>

      <main className="min-w-[680px] flex-1 bg-white px-10 py-8 mx-auto overflow-hidden">
        <div className="mx-auto min-w-0">
          <div className="flex justify-center mb-6">
            <div className="flex gap-4 bg-[#EEF0F2] p-1.5 rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] gap-1">
              <button
                onClick={() => setMode("edit")}
                className="px-3 py-2 rounded-full bg-[#FFFFFF] text-[#369AFF] text-xs font-semibold font-['Montserrat'] leading-tight"
              >
                Edit
              </button>
              <button
                onClick={() => setMode("preview")}
                className="px-3 py-2 rounded-full text-[#8B95A1] text-xs font-semibold font-['Montserrat'] leading-tight"
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

      <aside className="w-[280px] shrink-0 bg-[#FFFFFF] border-l border-[#E2E6EB] p-4 overflow-y-auto">
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
