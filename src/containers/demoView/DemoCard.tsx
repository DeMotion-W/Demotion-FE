import { DemoCardProps } from "@/types";
import Image from "next/image";

export default function DemoCard({
  title,
  date,
  thumbnailUrl,
}: DemoCardProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
      <div className="relative h-[140px] bg-gray-50 flex items-center justify-center">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Demo Thumbnail"
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-gray-300 font-semibold text-lg">
            🎬 emotion
          </div>
        )}

        <button className="absolute top-3 right-3 w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <span className="text-xl leading-none text-gray-500">
            ⋯
          </span>
        </button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <p className="text-sm text-gray-900 font-semibold line-clamp-2 break-words">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </div>
  );
}
