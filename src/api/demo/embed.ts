import { ScreenshotData } from "@/types";
import { httpClientForCredentials } from "../httpClientForCredentials";

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
    `/api/demos/${demoId}`
  );
  return response.data;
}
