import { getDemoDetail } from "@/api/demo/embed";
import DemoPreviewEmbed from "@/containers/demoEmbed/DemoPreviewEmbed";
import { demoMock } from "@/mock/demo";
import { ScreenshotData } from "@/types";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // 공유 시 캐싱 방지용

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { title } = await getDemoDetail(id);
  return {
    title: `${title} - Demo Preview`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const {
    title,
    subtitle,
    buttonBgColor,
    buttonTextColor,
    screenshots,
  } = await getDemoDetail(id);

  const expandScreenshots: ScreenshotData[] = [
    {
      screenshotId: -1,
      fileUrl: screenshots[0].fileUrl,
      buttonText: "",
      buttonBgColor: buttonBgColor,
      buttonStyle: "Box",
      buttonTextColor: buttonTextColor,
      positionX: 0,
      positionY: 0,
    },
    ...screenshots,
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <DemoPreviewEmbed
        title={title}
        subtitle={subtitle}
        buttonBgColor={buttonBgColor}
        buttonTextColor={buttonTextColor}
        screenshots={expandScreenshots}
      />
    </div>
  );
}
