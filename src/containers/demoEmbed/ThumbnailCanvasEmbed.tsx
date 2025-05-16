import useWindowSize from "@/hooks/useWindowSize";
import { DemoData } from "@/types";
import Image from "next/image";

export default function ThumbnailCanvasEmbed({
  demo,
  onStartClick,
}: {
  demo: DemoData;
  onStartClick?: () => void;
}) {
  const thumbnail = demo.screenshots[0];
  const { width } = useWindowSize();

  const isLargeScreen = width >= 1800;
  const isMediumScreen = width >= 1400 && width < 1800;

  const titleSize = isLargeScreen
    ? "text-5xl"
    : isMediumScreen
    ? "text-4xl"
    : "text-2xl";

  const descSize = isLargeScreen
    ? "text-[23px]"
    : isMediumScreen
    ? "text-lg"
    : "text-base";

  const buttonSize = isLargeScreen
    ? "text-xl w-110 h-19"
    : isMediumScreen
    ? "text-base w-80 h-16"
    : "text-sm w-60 h-12";

  const buttonPadding = isLargeScreen
    ? "px-10 py-3"
    : isMediumScreen
    ? "px-6 py-2.5"
    : "px-4 py-2";

  const itemsPadding = isLargeScreen
    ? "px-16 pb-16"
    : isMediumScreen
    ? "px-13 pb-13"
    : "px-8 pb-8";

  return (
    <div className="w-full px-4 sm:px-8">
      <div
        className="w-full max-w-[1280px] aspect-[16/9] mx-auto relative rounded-4xl shadow-lg overflow-hidden"
        style={{
          height: "auto",
        }}
      >
        <Image
          src={thumbnail.fileUrl}
          alt="thumbnail preview"
          fill
          draggable={false}
          className="object-contain blur-sm"
        />
        <div
          className={`absolute inset-0 flex items-end ${itemsPadding} text-left`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="flex flex-col items-start gap-2">
            <h2
              className={`mb-2 font-semibold ${titleSize} text-white`}
            >
              {demo.title || "제목을 입력해 주세요."}
            </h2>
            <p className={`${descSize} text-white`}>
              {demo.description ||
                "부제목을 입력해 주세요."}
            </p>
            <button
              className={`mt-4 ${buttonSize} ${buttonPadding} rounded-full font-semibold`}
              style={{
                backgroundColor: thumbnail.buttonBgColor,
                color: thumbnail.buttonTextColor,
              }}
              onClick={onStartClick}
            >
              {thumbnail.buttonText || "Get Started!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
