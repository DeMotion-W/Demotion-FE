import {
  CaptureData,
  PresignedResponse,
  ScreenshotMetadata,
} from "../type";
import { getAccessToken } from "../utils/auth";
import { httpClientForCredentials } from "../api";
import axios from "axios";
import {
  DEMO_CREATE_PATH,
  PRESIGNED_URL_PATH,
} from "../../../../shared/constants/api";

export async function uploadAndCreateDemo(
  captures: CaptureData[]
) {
  try {
    const filenames = captures.map(
      (_, i) => `uuid-step${i + 1}.png`
    );

    const { data: presigned }: { data: PresignedResponse } =
      await httpClientForCredentials.post(
        PRESIGNED_URL_PATH,
        { fileNames: filenames },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

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
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

    const demoId = demoRes.demoId;
    chrome.tabs.create({
      url: `https://localhost:3000/${demoId}`,
    });
  } catch (error) {
    console.error("❌ uploadAndCreateDemo error:", error);
    alert("데모 생성 중 오류가 발생했습니다.");
  }
}
