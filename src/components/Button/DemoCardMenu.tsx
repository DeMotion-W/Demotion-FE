import { Pencil, Share2, Trash2 } from "lucide-react";

export default function DemoCardMenu() {
  return (
    <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-lg border border-gray-200 z-10 mt-2 mr-2">
      <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full">
        <Pencil size={16} />
        편집하기
      </button>
      <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full">
        <Share2 size={16} />
        공유하기
      </button>
      <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-red-500">
        <Trash2 size={16} />
        삭제하기
      </button>
    </div>
  );
}
