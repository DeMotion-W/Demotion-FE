import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import DemoShareButton from "@/components/Button/DemoShareButton";

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

  return (
    <header className="w-full h-18 px-8 py-5 flex items-center justify-between bg-[#191F28] text-[#FFFFFF]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ChevronLeft size={30} strokeWidth={1} />
        </button>
        <span className="text-xl font-medium font-['Pretendard'] leading-loose text-[#FFFFFF]">
          {title}
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <DemoShareButton demoId={demoId} />
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
