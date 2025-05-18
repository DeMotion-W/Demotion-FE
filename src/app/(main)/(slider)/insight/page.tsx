import DemoInsight from "@/containers/insight/DemoInsight";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
          Insight
        </h1>
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      <DemoInsight />
    </div>
  );
}
