"use client";

import { useState, useRef } from "react";
import CreateDemoPopup from "./CreateDemoPopup";

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
        className="px-4 py-2 bg-[#333D4B] text-white rounded-full"
      >
        + New Demo
      </button>

      {showPopup && (
        <div className="absolute left-0 mt-2 z-50">
          <CreateDemoPopup
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}
