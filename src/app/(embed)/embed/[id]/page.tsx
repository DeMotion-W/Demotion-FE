import DemoPreviewEmbed from "@/containers/demoEmbed/DemoPreviewEmbed";
import { ScreenshotData } from "@/types";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // 공유 시 캐싱 방지용

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/public/demos/${id}`
  );

  if (!response.ok) {
    return {
      title: `Demo Not Found`,
    };
  }

  const demoData = await response.json();

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
  let demoData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/public/demos/${id}`
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("데모 데이터 로드 실패:", err);
      throw new Error("Demo not found");
    }

    demoData = await res.json();
  } catch (err) {
    console.error("API 에러:", err);
    return (
      <div>데모를 불러오는 중 오류가 발생했습니다.</div>
    );
  }

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
    <div className="w-full h-full flex items-center justify-center">
      <DemoPreviewEmbed
        demoId={demoData.demoId}
        title={demoData.title}
        subtitle={demoData.subtitle}
        buttonBgColor={demoData.buttonBgColor}
        buttonTextColor={demoData.buttonTextColor}
        screenshots={expandScreenshots}
      />
    </div>
  );
}
