"use client";

import EmbedCodePopup from "@/containers/demoEmbed/EmbedCodePopup";
import { useState, useRef } from "react";

export default function DemoShareButton({
  demoId,
}: {
  demoId: string;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="h-10 px-4 py-1 rounded-full text-sm font-semibold border border-[#4E5968] bg-[#191F28] font-['Montserrat'] leading-tight cursor-pointer"
      >
        Share
      </button>

      {showPopup && (
        <div className="absolute right-0 mt-2 z-50">
          <EmbedCodePopup
            demoId={demoId}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}
