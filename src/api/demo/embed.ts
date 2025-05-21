import { ScreenshotData } from "@/types";
import { DEMO_VIEW_PATH } from "@shared/constants/api";
import { httpClient } from "../httpClient";

interface DemoResponse {
  demoId: string;
  title: string;
  subtitle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  screenshots: ScreenshotData[];
}

export async function getDemoDetail(
  demoId: string
): Promise<DemoResponse> {
  const response = await httpClient.get(
    DEMO_VIEW_PATH + demoId
  );
  return response.data;
}
