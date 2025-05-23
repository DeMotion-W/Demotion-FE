export default function ContactPopup({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="bg-transparent z-40 flex flex-col items-center justify-center w-full h-full">
      <p className="text-6xl font-bold font-['Pretendard'] text-[#FFFFFF] mb-16 font-['Montserrat']">
        도입 문의를 남기시겠습니까?
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onClose}
          className="w-40 px-4 py-4 text-xl bg-gray-300 font-semibold rounded-md"
        >
          아니오
        </button>
        <button
          onClick={onConfirm}
          className="w-40 px-4 py-4 bg-[#191F28] text-xl text-white font-semibold rounded-md"
        >
          네
        </button>
      </div>
    </div>
  );
}
