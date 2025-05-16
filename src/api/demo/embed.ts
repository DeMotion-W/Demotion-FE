import { ScreenshotData } from "@/types";
import { httpClientForCredentials } from "../httpClientForCredentials";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

interface DemoResponse {
  demoId: string;
  title: string;
  description: string;
  screenshots: ScreenshotData[];
}

export async function getDemoDetail(
  demoId: string
): Promise<DemoResponse> {
  const response = await httpClientForCredentials.get(
    DEMO_VIEW_PATH + demoId
  );
  return response.data;
}
