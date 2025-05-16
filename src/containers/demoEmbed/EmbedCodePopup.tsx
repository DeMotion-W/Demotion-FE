import EmbedCodeViewer from "./EmbedCodeViewer";

export default function EmbedCodePopup({
  demoId,
  onClose,
}: {
  demoId: string;
  onClose: () => void;
}) {
  return (
    <div className="w-[420px] p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h3 className="text-xl font-semibold text-[#191F28] mb-4">
        임베드 코드 복사
      </h3>
      <EmbedCodeViewer demoId={demoId} />

      <button
        onClick={onClose}
        className="text-center w-full mt-5 bg-[#369AFF] text-sm font-semibold text-white py-3 rounded-3xl"
      >
        닫기
      </button>
    </div>
  );
}
