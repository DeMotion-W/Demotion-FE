import { useContext, useEffect, useState } from "react";
import { CaptureData } from "../type";
import { AuthDispatchContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Capture() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();
  const [captures, setCaptures] = useState<CaptureData[]>(
    []
  );

  const handleLogout = () => {
    dispatch?.({ type: "LOGOUT" });
    nav("/");
  };

  const startCapture = async () => {
    const tabs = await chrome.tabs.query({});

    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });

        chrome.tabs.sendMessage(tab.id, {
          type: "start-capture",
        });
      }
    });
  };

  useEffect(() => {
    if (!chrome?.runtime?.onMessage?.addListener) return;

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "captured-image") {
        setCaptures((prev) => [...prev, msg.data]);
      }
    });
  }, []);

  const completeCapture = async () => {
    const res = await fetch(
      "https://e459c8ba-203e-4e58-b6a3-9efa401c5f18.mock.pstmn.io/image",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(captures),
      }
    );
    const data = await res.json();
    console.log("서버 응답:", data);

    const tabs = await chrome.tabs.query({});

    tabs.forEach((tab) => {
      if (tab.id && !tab.url?.startsWith("chrome://")) {
        chrome.tabs.sendMessage(tab.id, {
          type: "start-capture",
        });
      }
    });

    alert("캡처 데이터 업로드 완료!");
    setCaptures([]);
  };

  return (
    <div className="flex flex-col p-4 space-y-2">
      <h2 className="text-center text-blue-600 text-lg">
        📸 캡처 기능 페이지
      </h2>
      <button
        className="p-2 bg-red-500 text-white rounded"
        onClick={handleLogout}
      >
        로그아웃
      </button>
      <button
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={startCapture}
      >
        화면 캡처 시작!
      </button>
      <div className="relative w-full max-h-[300px] overflow-y-auto space-y-2">
        {captures.map((c, i) => (
          <div
            key={i}
            className="border rounded overflow-hidden flex justify-center items-center bg-white"
          >
            <img
              src={c.image}
              className="max-h-[200px] object-contain"
            />
            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full"
              style={{
                top: `${(c.y / 1080) * 100}%`,
                left: `${(c.x / 1920) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}
      </div>
      {captures.length > 0 && (
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={completeCapture}
        >
          ✅ 완료 (서버 전송)
        </button>
      )}
    </div>
  );
}
