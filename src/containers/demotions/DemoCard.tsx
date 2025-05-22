import DemoCardMenu from "@/components/Button/DemoCardMenu";
import Image from "next/image";
import { DemoCardWithMenuProps } from "@/types";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/UI/Toast";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default function DemoCard({
  demoId,
  title,
  createdAt,
  firstScreenshotUrl,
  token,
  isMenuOpen,
  onToggleMenu,
}: DemoCardWithMenuProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const handleCardClick = () => {
    if (!isMenuOpen) {
      router.push(`/demo/${demoId}`);
    }
  };

  const handleEdit = () => {
    router.push(`/demo/${demoId}`);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/embed/${demoId}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast({
        type: "success",
        message: "공유 링크가 복사되었습니다.",
      });
    });
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${DEMO_VIEW_PATH}/${demoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        showToast({
          type: "error",
          message: "삭제에 실패했습니다.",
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        message: "에러가 발생했습니다.",
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full rounded-2xl border border-gray-200 overflow-hidden shadow-xs bg-white cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform duration-200 ease-in-out"
    >
      <div className="relative h-[130px] bg-gray-50 flex items-center justify-center">
        <Image
          src={firstScreenshotUrl}
          alt="Demo Thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          draggable={false}
          className="object-cover"
        />

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
        {isMenuOpen && (
          <DemoCardMenu
            onEdit={handleEdit}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col justify-between h-[100px]">
        <p className="text-xs text-gray-900 font-semibold line-clamp-2 break-words">
          {title}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}
