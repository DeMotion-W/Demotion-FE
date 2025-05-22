import { fetchWithAuth } from "@/actions/api-client";
import DemoPreviewEmbed from "@/containers/demoEmbed/DemoPreviewEmbed";
import { ScreenshotData } from "@/types";
import { DEMO_VIEW_PATH } from "@shared/constants/api";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // 공유 시 캐싱 방지용

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const demoData = await fetchWithAuth(
    `${DEMO_VIEW_PATH}/${id}`
  );

  return {
    title: `${demoData.title} - Demo Preview`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const demoData = await fetchWithAuth(
    `${DEMO_VIEW_PATH}/${id}`
  );

  const expandScreenshots: ScreenshotData[] = [
    {
      screenshotId: -1,
      fileUrl: demoData.screenshots[0].fileUrl,
      buttonText: "",
      buttonBgColor: demoData.buttonBgColor,
      buttonStyle: "Box",
      buttonTextColor: demoData.buttonTextColor,
      positionX: 0,
      positionY: 0,
    },
    ...demoData.screenshots,
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <DemoPreviewEmbed
        demoId={id}
        title={demoData.title}
        subtitle={demoData.subtitle}
        buttonBgColor={demoData.buttonBgColor}
        buttonTextColor={demoData.buttonTextColor}
        screenshots={expandScreenshots}
      />
    </div>
  );
}
