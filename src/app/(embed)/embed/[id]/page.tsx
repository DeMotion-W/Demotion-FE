"use client";

import { getDemoDetail } from "@/api/demo/embed";
import DemoPreviewEmbed from "@/containers/demoEmbed/DemoPreviewEmbed";
import { demoMock } from "@/mock/demo";
import { ScreenshotData } from "@/types";
import { Metadata } from "next";

// export const dynamic = "force-dynamic"; // 공유 시 캐싱 방지용

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const { title } = await getDemoDetail(id);
//   return {
//     title: `${title} - Demo Preview`,
//   };
// }

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //const { id } = await params;
  // const { title, description, screenshots } =
  //   await getDemoDetail(id);

  // const [data, setData] = useState<{
  //   title: string;
  //   description: string;
  //   screenshots: ScreenshotData[];
  // } | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await getDemoDetail(params.id);
  //     setData(res);
  //   }
  //   fetchData();
  // }, [params.id]);

  // if (!data) return <p>로딩 중...</p>;

  const screenshots: ScreenshotData[] = [
    {
      screenshotId: -1,
      fileUrl: demoMock.screenshots[0].fileUrl,
      order: 0,
      buttonText: "",
      buttonBgColor: "#168AFF",
      buttonStyle: "Box",
      buttonTextColor: "#FFFFFF",
      positionX: 0,
      positionY: 0,
    },
    ...demoMock.screenshots,
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <DemoPreviewEmbed
        title={demoMock.title}
        description={demoMock.description}
        screenshots={screenshots}
      />
    </div>
  );
}
