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
//import { uploadAndCreateDemo } from "../utils/uploadAndCreateDemo";
import { httpClientForCredentials } from "../api/httpClientForCredentials";
import axios from "axios";
import {
  clearAccessToken,
  getAccessToken,
} from "../utils/auth";
import { LOG_OUT_PATH } from "../../../../shared/constants/api";
import { uploadAndCreateDemoTestMode } from "../utils/uploadAndCreateDemoTestMode";

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

    try {
      await httpClientForCredentials.post(
        LOG_OUT_PATH,
        {},
        { withCredentials: true }
      );
      console.log("로그아웃 성공");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        throw new Error(message);
      }
    }

    clearAccessToken();
    console.log(
      "accessToken after logout:",
      getAccessToken()
    );
    console.log(
      "Authorization header after logout:",
      httpClientForCredentials.defaults.headers.common[
        "Authorization"
      ]
    );

    dispatch?.({ type: "LOGOUT" });
    nav("/");
  };

  useEffect(() => {
    if (!chrome?.runtime?.onMessage?.addListener) return;

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "captured-image") {
        setCaptures((prev) => [...prev, msg.data]);
      }
    });
  }, []);

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
      await uploadAndCreateDemoTestMode(captures);

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
