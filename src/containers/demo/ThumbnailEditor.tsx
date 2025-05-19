import ColorPickerBox from "@/components/ColorPickerBox";
import { ScreenshotData } from "@/types";
import { useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  screenshot: ScreenshotData;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onChangeScreenshot: (value: ScreenshotData) => void;
};

export default function ThumbnailEditor({
  title,
  subtitle,
  screenshot,
  onTitleChange,
  onSubtitleChange,
  onChangeScreenshot,
}: Props) {
  const [openPickerId, setOpenPickerId] = useState<
    string | null
  >(null);

  return (
    <aside className="flex flex-col w-full gap-8">
      <div>
        <label className="self-stretch justify-center block mt-6 mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Title
        </label>
        <textarea
          id={title}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력해 주세요."
          className={`h-28 w-full border border-[#E2E7EB] px-4 py-3 rounded-lg text-xs font-normal font-['Pretendard'] leading-snug ${
            title ? "text-[#191F28]" : "text-[#B0B8C1]"
          } resize-none`}
        />
      </div>

      <div>
        <label className="self-stretch justify-center block mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Subtitle
        </label>
        <textarea
          id={subtitle}
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="부제목을 입력해 주세요."
          className={`h-28 w-full border border-[#E2E7EB] px-4 py-3 rounded-lg text-xs font-normal font-['Pretendard'] leading-snug ${
            subtitle ? "text-[#191F28]" : "text-[#B0B8C1]"
          } resize-none`}
        />
      </div>

      <div>
        <label className="self-stretch justify-center block mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Color
        </label>
        <div className="flex w-full gap-2 relative overflow-visible z-10">
          <ColorPickerBox
            id="bg-color-picker"
            label="Button"
            color={screenshot.buttonBgColor}
            isOpen={openPickerId === "bg-color-picker"}
            onOpen={() =>
              setOpenPickerId("bg-color-picker")
            }
            onClose={() => setOpenPickerId(null)}
            onChange={(newColor) =>
              onChangeScreenshot({
                ...screenshot,
                buttonBgColor: newColor,
              })
            }
          />

          <ColorPickerBox
            id="text-color-picker"
            label="Button Text"
            color={screenshot.buttonTextColor}
            isOpen={openPickerId === "text-color-picker"}
            onOpen={() =>
              setOpenPickerId("text-color-picker")
            }
            onClose={() => setOpenPickerId(null)}
            onChange={(newColor) =>
              onChangeScreenshot({
                ...screenshot,
                buttonTextColor: newColor,
              })
            }
          />
        </div>
      </div>
    </aside>
  );
}
