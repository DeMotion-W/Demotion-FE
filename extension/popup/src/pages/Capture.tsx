import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CaptureData } from "../type";
import { AuthDispatchContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Capture() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();
  const [captures, setCaptures] = useState<CaptureData[]>(
    []
  );
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleLogout = async () => {
    const tabs = await chrome.tabs.query({});

    tabs.forEach((tab) => {
      if (tab.id && !tab.url?.startsWith("chrome://")) {
        chrome.tabs.sendMessage(tab.id, {
          type: "stop-capture",
        });
      }
    });

    dispatch?.({ type: "LOGOUT" });
    nav("/");
  };

  const startCapture = async () => {
    const tabs = await chrome.tabs.query({});

    tabs.forEach((tab) => {
      if (tab.id && !tab.url?.startsWith("chrome://")) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tab.id!, {
              type: "start-capture",
            });
          }
        );
      } else {
        //주의 문구 뜨도록
        //크롬 시작화면이나 설정화면처럼 캡처 못하는 화면들 처리
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
          type: "stop-capture",
        });
      }
    });

    alert("캡처 데이터 업로드 완료!");
    setCaptures([]);
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-[#1F2937] text-lg">
          캡처 기능 페이지
        </h2>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
      <button
        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={startCapture}
      >
        📸 화면 캡처 시작!
      </button>
      <div className="w-full overflow-y-auto space-y-2">
        {captures.map((c, i) => (
          <div
            key={i}
            className="relative border rounded overflow-hidden flex justify-center items-center bg-white"
          >
            <img
              ref={(el: HTMLImageElement | null) => {
                imgRefs.current[i] = el;
              }}
              src={c.image}
              onLoad={(e) => {
                const img = e.currentTarget;
                setCaptures((prev) =>
                  prev.map((cap, idx) =>
                    idx === i
                      ? {
                          ...cap,
                          width: img.naturalWidth,
                          height: img.naturalHeight,
                        }
                      : cap
                  )
                );
              }}
              className="max-h-[200px] object-contain"
            />
            {c.width && c.height && imgRefs.current[i] && (
              <div
                className="absolute w-3 h-3 bg-red-500 rounded-full"
                style={{
                  top: `${
                    c.y *
                    (imgRefs.current[i]!.offsetHeight /
                      c.height)
                  }px`,
                  left: `${
                    c.x *
                    (imgRefs.current[i]!.offsetWidth /
                      c.width)
                  }px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
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
