import { ScreenshotData } from "@/types";
import Image from "next/image";

type Props = {
  screenshots: ScreenshotData[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function ScreenshotSidebar({
  screenshots,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <div className="space-y-2">
      {screenshots.map((s, i) => (
        <div
          key={s.screenshotId}
          onClick={() => onSelect(i)}
          className={`h-32 items-center relative cursor-pointer rounded-xl overflow-hidden border-2 ${
            i === selectedIndex
              ? "border-[#369AFF] shadow-[0_0_0_4px_rgba(54,154,255,0.1)]"
              : "border-[#E2E7EB]"
          }`}
        >
          <span
            className={`absolute rounded-lg top-2 left-2 z-10 w-6 h-6 text-white text-sm font-semibold rounded-full flex items-center justify-center font-['Montserrat'] ${
              i === selectedIndex
                ? "bg-[#369AFF]"
                : "bg-[#000000]/30"
            } `}
          >
            {i + 1}
          </span>
          <Image
            src={s.fileUrl}
            alt={`screenshot-${i}`}
            width={172}
            height={100}
            draggable={false}
            className="w-full h-full aspect-video object-cover rounded-xl"
            style={i === 0 ? { filter: "blur(4px)" } : {}}
          />
        </div>
      ))}
    </div>
  );
}
