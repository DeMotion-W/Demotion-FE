import { CaptureData, ScreenshotMetadata } from "../type";
import { getAccessToken } from "../utils/auth";
import { httpClientForCredentials } from "../api/httpClientForCredentials";
import { DEMO_CREATE_PATH } from "../../../../shared/constants/api";

export async function uploadAndCreateDemoTestMode(
  captures: CaptureData[]
) {
  try {
    // 테스트용 이미지 경로 3개
    const imageUrls = [
      "/screenshot_1.png",
      "/screenshot_2.png",
      "/screenshot_3.png",
    ];

    // 기존 클릭 위치 그대로 사용, 파일 URL만 바꿔치기
    const screenshots: ScreenshotMetadata[] = imageUrls.map(
      (fileUrl, i) => ({
        fileUrl,
        buttonText: "",
        buttonColor: "#168AFF",
        buttonTextColor: "#FFFFFF",
        buttonStyle: "Point",
        positionX: captures[i]?.x || 0,
        positionY: captures[i]?.y || 0,
      })
    );

    const payload = {
      title: "테스트 데모",
      subtitle: "public 이미지로 생성됨",
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
    chrome.tabs.create({
      url: `http://localhost:3000/demo/${demoId}`,
    });
  } catch (error) {
    console.error(
      "❌ uploadAndCreateDemoTestMode error:",
      error
    );
    alert("데모 생성 중 오류가 발생했습니다.");
  }
}
