import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  demoId: string;
  editable?: boolean;
  onChangeTitle?: (value: string) => void;
  onSave?: () => void;
};

export default function HeaderBar({
  title,
  demoId,
  editable = false,
  onChangeTitle,
  onSave,
}: Props) {
  const router = useRouter();

  const handleShare = async () => {
    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/embed/${demoId}" width="100%" height="700" style="border:none;" allowfullscreen></iframe>`;
    try {
      await navigator.clipboard.writeText(embedCode);
      alert("임베드 코드가 복사되었습니다!");
    } catch (err) {
      alert("복사에 실패하였습니다.");
    }
  };

  return (
    <header className="w-full h-20 px-8 py-5 flex items-center justify-between bg-[#191F28] text-[#FFFFFF]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
        <span className="text-2xl font-semibold font-['Pretendard'] leading-loose text-[#FFFFFF]">
          {title}
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={handleShare}
          className="h-10 px-4 py-1 rounded-full text-sm font-semibold border border-[#4E5968] bg-[#191F28] font-['Montserrat'] leading-tight cursor-pointer"
        >
          Share
        </button>
        <button
          onClick={onSave}
          className="h-10 px-4 py-1 rounded-full text-sm font-semibold bg-white text-black font-['Montserrat'] leading-tight cursor-pointer"
        >
          Save
        </button>
      </div>
    </header>
  );
}
