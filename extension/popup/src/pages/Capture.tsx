import { useContext, useEffect, useRef, useState } from "react";
import { CaptureData } from "@/type";
import {
  AuthDispatchContext,
  AuthStateContext,
} from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadAndCreateDemo } from "@utils/uploadAndCreateDemo";
import { httpClientForCredentials } from "@api/httpClientForCredentials";
import { clearAccessToken } from "@utils/auth";
import { LOG_OUT_PATH } from "@shared/constants/api";
import CapturedImageList from "@components/CapturedImageList";
import axios from "axios";

export default function Capture() {
  const dispatch = useContext(AuthDispatchContext);
  const auth = useContext(AuthStateContext);
  const nav = useNavigate();
  const [captures, setCaptures] = useState<CaptureData[]>([]);
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

    try {
      await httpClientForCredentials.post(
        LOG_OUT_PATH,
        {},
        { withCredentials: true }
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        throw new Error(message);
      }
    }

    clearAccessToken();
    dispatch?.({ type: "LOGOUT" });
    nav("/");
  };

  useEffect(() => {
    if (!chrome?.runtime?.onMessage?.addListener) return;

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "captured-image") {
        const { image, x, y, vw, vh } = msg.data;
        setCaptures((prev) => [
          ...prev,
          {
            image,
            x,
            y,
            viewportWidth: vw,
            viewportHeight: vh,
          },
        ]);
      }
    });
  }, []);

  // 캡쳐 시작
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
        // 주의 문구 뜨도록
        // 크롬 시작화면이나 설정화면처럼 캡처 못하는 화면들 처리
      }
    });
  };

  // 캡쳐 완료
  const completeCapture = async () => {
    try {
      await uploadAndCreateDemo(
        captures,
        auth?.email,
        auth?.password
      );

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

  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-[#1F2937] text-xl font-semibold font-['Montserrat']">
          Capture
        </h2>
        <button
          className="px-3 py-2 bg-[#9398a0] hover:bg-[#757981] text-xs text-white rounded-lg font-medium font-['Montserrat']"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
      <div className="w-full h-px bg-gray-200" />
      <button
        className="w-full p-2 bg-[#369AFF] hover:bg-[#197bde] text-sm text-white rounded-lg font-['Montserrat']"
        onClick={startCapture}
      >
        화면 캡처 시작
      </button>
      <CapturedImageList
        captures={captures}
        imgRefs={imgRefs}
        setCaptures={setCaptures}
      />
      {captures.length > 0 && (
        <button
          className="w-full p-2 bg-[#333D4B] hover:bg-[#2b313a] text-sm text-white rounded-lg font-['Montserrat']"
          onClick={completeCapture}
        >
          데모 생성
        </button>
      )}
    </div>
  );
}
