import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CaptureData } from "../type";
import { AuthDispatchContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CapturedImageList from "../components/CapturedImageList";
import { onSilentRefresh } from "../api/auth/login";
import { uploadAndCreateDemo } from "../utils/uploadAndCreateDemo";

export default function Capture() {
  const dispatch = useContext(AuthDispatchContext);
  const nav = useNavigate();
  const [captures, setCaptures] = useState<CaptureData[]>(
    []
  );
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSilentRefresh(nav);
    }, 3000);

    return () => clearTimeout(timer);
  }, [nav]);

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

  const completeCapture = async () => {
    try {
      await uploadAndCreateDemo(captures);

      const tabs = await chrome.tabs.query({});
      tabs.forEach((tab) => {
        if (tab.id && !tab.url?.startsWith("chrome://")) {
          chrome.tabs.sendMessage(tab.id, {
            type: "stop-capture",
          });
        }
      });

      setCaptures([]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!chrome?.runtime?.onMessage?.addListener) return;

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "captured-image") {
        setCaptures((prev) => [...prev, msg.data]);
      }
    });
  }, []);

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
      <CapturedImageList
        captures={captures}
        imgRefs={imgRefs}
        setCaptures={setCaptures}
      />
      {captures.length > 0 && (
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={completeCapture}
        >
          데모 생성
        </button>
      )}
    </div>
  );
}
