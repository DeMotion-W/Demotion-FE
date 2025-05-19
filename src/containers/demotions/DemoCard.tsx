import DemoCardMenu from "@/components/Button/DemoCardMenu";
import { DemoCardWithMenuProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DemoCard({
  id,
  title,
  date,
  thumbnailUrl,
  isMenuOpen,
  onToggleMenu,
}: DemoCardWithMenuProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (!isMenuOpen) {
      router.push(`/demo/${id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full rounded-2xl border border-gray-200 overflow-hidden shadow-xs bg-white cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform duration-200 ease-in-out"
    >
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMenu();
          }}
          className="absolute top-3 right-3 w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200"
        >
          <span className="text-xl leading-none text-gray-500">
            ⋯
          </span>
        </button>
        {isMenuOpen && <DemoCardMenu />}
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col justify-between h-[100px]">
        <p className="text-xs text-gray-900 font-semibold line-clamp-2 break-words">
          {title}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          {date}
        </p>
      </div>
    </div>
  );
}
