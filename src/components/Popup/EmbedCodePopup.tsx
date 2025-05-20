import EmbedCodeViewer from "../../containers/demoEmbed/EmbedCodeViewer";

export default function EmbedCodePopup({
  demoId,
  onClose,
}: {
  demoId: string;
  onClose: () => void;
}) {
  const link = `${process.env.NEXT_PUBLIC_SITE_URL}embed/${demoId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("복사되었습니다."); //추후 디자인
  };

  return (
    <div className="w-[350px] p-5 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-[#191F28] mb-4 font-['Montserrat']">
        Share
      </h3>

      <div className="w-full justify-between inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 mb-4 font-['Pretendard']">
        <div className="text-xs text-gray-800 whitespace-nowrap overflow-x-auto overflow-y-hidden max-w-full scrollbar-hide">
          {link}
        </div>
        <button
          onClick={handleCopy}
          className="ml-4 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-normal text-gray-800 shadow-xs hover:bg-gray-100 active:bg-gray-200 transition"
        >
          Copy
        </button>
      </div>

      <EmbedCodeViewer demoId={demoId} />

      <button
        onClick={onClose}
        className="text-center w-full mt-5 bg-[#369AFF] text-xs font-semibold text-white py-3 rounded-3xl"
      >
        닫기
      </button>
    </div>
  );
}
