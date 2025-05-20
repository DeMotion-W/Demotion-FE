import {
  CaptureData,
  PresignedResponse,
  ScreenshotMetadata,
} from "../type";
import { getAccessToken } from "../utils/auth";
import { httpClientForCredentials } from "../api/httpClientForCredentials";
import axios from "axios";
import {
  DEMO_CREATE_PATH,
  PRESIGNED_URL_PATH,
} from "../../../../shared/constants/api";

export async function uploadAndCreateDemo(
  captures: CaptureData[],
  email?: string,
  password?: string
) {
  try {
    const filenames = captures.map(
      (_, i) => `uuid-step${i + 1}.png`
    );

    // const { data: presigned }: { data: PresignedResponse } =
    const res = await httpClientForCredentials.post(
      PRESIGNED_URL_PATH,
      { fileNames: filenames },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );

    console.log("🔥 API 응답 구조:", res.data);

    const presigned = res.data as PresignedResponse;

    await Promise.all(
      presigned.files.map(async (file, i) => {
        const blob = await fetch(captures[i].image).then(
          (res) => res.blob()
        );
        await axios.put(file.uploadUrl, blob, {
          headers: {
            "Content-Type": "image/png",
          },
        });
      })
    );

    const screenshots: ScreenshotMetadata[] =
      presigned.files.map((file, i) => ({
        fileUrl: file.fileUrl,
        buttonText: "",
        buttonColor: "#168AFF",
        buttonTextColor: "#FFFFFF",
        buttonStyle: "Point",
        positionX: captures[i].x,
        positionY: captures[i].y,
      }));

    const payload = {
      title: "",
      subtitle: "",
      screenshots,
    };

    const { data: demoRes } =
      await httpClientForCredentials.post(
        DEMO_CREATE_PATH,
        payload,
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      );

    const demoId = demoRes.demoId;
    const siteUrl = import.meta.env.VITE_SITE_URL;
    chrome.tabs.create({
      url: `${siteUrl}demo/${demoId}?email=${email}&password=${password}`,
    });
  } catch (error) {
    console.error("❌ uploadAndCreateDemo error:", error);
    alert("데모 생성 중 오류가 발생했습니다.");
  }
}
