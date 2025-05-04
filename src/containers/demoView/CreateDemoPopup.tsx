import Image from "next/image";

export default function CreateDemoPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="w-[360px] p-6 bg-white rounded-[20px] shadow-xl border border-gray-200">
      <div className="mb-5">
        <Image
          src="/image/demo.png"
          alt="Demotion Logo"
          width={37}
          height={33}
        />
      </div>
      <div className="mb-4 justify-center text-black text-xl font-semibold font-['Montserrat'] leading-7">
        Create
        <br />
        Demotion Process!
      </div>
      <div className="space-y-4 mt-4">
        {[
          "캡처하고자 하는 URL로 이동",
          "확장 프로그램 실행",
          "녹화 중인 화면 클릭",
          "‘Complete Capture’ 버튼을 클릭하여 종료",
        ].map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-lg border border-[#E2E6EB] flex items-center justify-center text-sm font-semibold font-['Montserrat'] leading-tight text-[#191F28]">
              {index + 1}
            </div>
            <p className="text-center justify-center text-[#191F28] text-sm font-normal font-['Pretendard'] leading-snug">
              {step}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="text-center w-full mt-4 bg-[#369AFF] text-sm font-semibold font-['Montserrat'] leading-tight text-white py-3 rounded-3xl"
      >
        Got it!
      </button>
      <p className="text-center justify-center text-xs font-normal text-gray-500 mt-2 font-['Pretendard'] leading-tight">
        아직 확장 프로그램이 없나요?{" "}
        <a
          href="/download"
          className="text-blue-500 underline leading-none"
        >
          다운로드하기
        </a>
      </p>
    </div>
  );
}
