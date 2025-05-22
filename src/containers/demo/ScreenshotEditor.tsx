import ColorPickerBox from "@/components/UI/ColorPickerBox";
import StyleSelector from "@/components/UI/StyleSelector";
import { ScreenshotData } from "@/types";
import { useState } from "react";

type Props = {
  screenshot: ScreenshotData;
  onChange: (updated: ScreenshotData) => void;
};

export default function ScreenshotEditor({ screenshot, onChange }: Props) {
  const [openPickerId, setOpenPickerId] = useState<string | null>(null);
  return (
    <aside className="flex flex-col w-full gap-8">
      <div>
        <label className="self-stretch justify-center block mt-6 mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Text
        </label>
        <textarea
          id={screenshot.buttonText}
          value={screenshot.buttonText}
          onChange={(e) =>
            onChange({
              ...screenshot,
              buttonText: e.target.value,
            })
          }
          placeholder="텍스트를 입력해 주세요."
          className={`h-28 w-full border border-[#E2E7EB] px-4 py-3 rounded-lg text-xs font-normal font-['Pretendard'] leading-snug ${
            screenshot.buttonText ? "text-[#191F28]" : "text-[#B0B8C1]"
          } resize-none`}
        />
      </div>

      <div>
        <label className="self-stretch justify-center block mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Style
        </label>
        <div className="flex gap-2">
          <StyleSelector
            selected={screenshot.buttonStyle}
            onSelect={(style) =>
              onChange({
                ...screenshot,
                buttonStyle: style,
              })
            }
          />
        </div>
      </div>

      <div>
        <label className="self-stretch justify-center block mb-2 text-[#191F28] text-sm font-semibold font-['Montserrat'] leading-normal">
          Color
        </label>
        <div className="flex w-full gap-2">
          <ColorPickerBox
            id="bg-color-picker"
            label="Background"
            color={screenshot.buttonBgColor}
            isOpen={openPickerId === "bg-color-picker"}
            onOpen={() => setOpenPickerId("bg-color-picker")}
            onClose={() => setOpenPickerId(null)}
            onChange={(newColor) =>
              onChange({
                ...screenshot,
                buttonBgColor: newColor,
              })
            }
          />
          <ColorPickerBox
            id="text-color-picker"
            label="Text"
            color={screenshot.buttonTextColor}
            isOpen={openPickerId === "text-color-picker"}
            onOpen={() => setOpenPickerId("text-color-picker")}
            onClose={() => setOpenPickerId(null)}
            onChange={(newColor) =>
              onChange({
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
