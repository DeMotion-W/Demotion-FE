import NewDemoButton from "@/containers/demotions/NewDemoButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DemoListSkeleton() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-xl font-semibold font-['Montserrat'] leading-loose">
          Demotions
        </h1>
        <NewDemoButton />
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      <div className="flex gap-2 items-center h-[60px] mb-2 justify-center text-sm text-[#6B7280] font-medium font-['Pretendard'] leading-normal">
        <p>총 항목</p>
        <p className="text-[#3E82F6]">-</p>
      </div>

      <div className="w-full grid grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full rounded-2xl border border-gray-200 bg-white p-4">
            <Skeleton height={130} />
            <div className="mt-3">
              <Skeleton height={16} width="80%" />
              <Skeleton height={12} width="60%" className="mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
