import useWindowSize from "@/hooks/useWindowSize";
import { DemoData } from "@/types";
import Image from "next/image";

export default function ThumbnailCanvas({
  demo,
  onStartClick,
}: {
  demo: DemoData;
  onStartClick?: () => void;
}) {
  const thumbnail = demo.screenshots[0];
  const { width, height } = useWindowSize();

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
    <div className="w-full px-10">
      <div
        className="w-full min-w-[680px] aspect-[1920/1080] mx-auto relative rounded-4xl shadow-lg overflow-hidden"
        style={{
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <Image
          src={thumbnail.fileUrl}
          alt="thumbnail preview"
          fill
          draggable={false}
          className="object-cover blur-sm"
        />
        <div
          className={`absolute inset-0 flex items-end ${itemsPadding} text-left`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="flex flex-col items-start gap-2">
            <div>
              <h2
                className={`cursor-default mb-2 font-semibold font-['Pretendard'] leading-normal ${
                  demo.title
                    ? "text-[#FFFFFF]"
                    : "text-[#FFFFFFB2]"
                } ${titleSize}`}
              >
                {demo.title || "제목을 입력해 주세요."}
              </h2>
              <p
                className={`cursor-default text-3xl font-semibold font-['Pretendard'] leading-normal ${
                  demo.description
                    ? "text-[#FFFFFF]"
                    : "text-[#FFFFFFB2]"
                } ${descSize}`}
              >
                {demo.description ||
                  "부제목을 입력해 주세요."}
              </p>
            </div>

            <button
              className={`cursor-pointer mt-4 ${buttonSize} ${buttonPadding} font-semibold font-['Pretendard'] leading-tight font-semibold rounded-full`}
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
