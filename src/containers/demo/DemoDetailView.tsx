"use client";

import { useState } from "react";

export default function DemoDetailView() {
  const [mode, setMode] = useState<"edit" | "preview">(
    "preview"
  );

  return (
    <div className="px-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("edit")}
          className={`px-4 py-2 rounded-full ${
            mode === "edit"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setMode("preview")}
          className={`px-4 py-2 rounded-full ${
            mode === "preview"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Preview
        </button>
      </div>

      {mode === "edit" ? (
        <div className="border p-4 rounded-lg">
          ✏️ 편집 모드
        </div>
      ) : (
        <div className="border p-4 rounded-lg">
          👁️ 프리뷰 모드
        </div>
      )}
    </div>
  );
}
