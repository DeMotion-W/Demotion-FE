"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function EmbedCodeViewer({
  demoId,
}: {
  demoId: string;
}) {
  const [activeTab, setActiveTab] = useState<
    "html" | "react"
  >("html");
  const [copied, setCopied] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // HTML 버전
  const rawHTML = `<!-- DEMOTION EMBED START --><div style="position: relative; padding-bottom: 56.25%; height: 0; width: 100%;"><iframe src="${siteUrl}embed/${demoId}" title="Demotion Demo" loading="lazy" allow="clipboard-write" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; color-scheme: light;"></iframe></div><!-- DEMOTION EMBED END -->`;

  const formattedHTML = `<!-- DEMOTION EMBED START -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; width: 100%;">
  <iframe
    src="${siteUrl}embed/${demoId}"
    title="Demotion Embed"
    loading="lazy"
    allow="clipboard-write"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; color-scheme: light;"
  ></iframe>
</div>
<!-- DEMOTION EMBED END -->`;

  // React 버전
  const rawReact = `export function DemotionEmbed() {return (<div style={{ position: "relative", paddingBottom: "56.25%", height: 0, width: "100%" }}><iframe src="${siteUrl}embed/${demoId}" title="Demotion Demo" loading="lazy" allow="clipboard-write" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", colorScheme: "light" }} /></div>)}`;

  const formattedReact = `export function DemotionEmbed() {
  return (
    <div style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      width: "100%",
    }}>
      <iframe
        src="${siteUrl}embed/${demoId}"
        title="Demotion Demo"
        loading="lazy"
        allow="clipboard-write"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          colorScheme: "light",
        }}
      />
    </div>
  );
}`;

  const handleCopy = async () => {
    const code = activeTab === "html" ? rawHTML : rawReact;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("복사를 실패하였습니다.");
    }
  };

  return (
    <div className="relative bg-[#f9f9f9] text-black rounded-xl p-4 font-mono text-sm border border-gray-300 shadow-sm">
      {/* 탭 영역 */}
      <div className="flex gap-2 mb-3 text-xs font-semibold">
        <button
          className={`px-2.5 py-1 rounded-md ${
            activeTab === "html"
              ? "bg-white border border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("html")}
        >
          HTML
        </button>
        <button
          className={`px-2.5 py-1 rounded-md ${
            activeTab === "react"
              ? "bg-white border border-gray-300"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("react")}
        >
          React
        </button>
      </div>

      {/* 코드 뷰 */}
      <pre className="whitespace-pre overflow-x-auto text-gray-800 font-['Pretendard']">
        {activeTab === "html"
          ? formattedHTML
          : formattedReact}
      </pre>

      {/* 복사 버튼 */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center gap-1 text-gray-600 hover:text-blue-600 text-xs"
      >
        <Copy size={14} />
        {copied ? "Copied!" : "Copy code"}
      </button>
    </div>
  );
}
