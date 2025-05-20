"use client";

import { useState, useRef } from "react";
import CreateDemoPopup from "../../components/Popup/CreateDemoPopup";

export default function NewDemoButton() {
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
        className="px-4 py-2 bg-[#333D4B] text-xs font-normal font-['Montserrat'] leading-tight text-white rounded-full cursor-pointer"
      >
        + New Demo
      </button>

      {showPopup && (
        <div className="absolute right-0 mt-2 z-50">
          <CreateDemoPopup
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}
