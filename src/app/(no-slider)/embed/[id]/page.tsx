import { getDemoDetail } from "@/api/demo/embed";
import DemoPreviewEmbed from "@/containers/demo/DemoPreviewEmbed";
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

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { title, description, screenshots } =
    await getDemoDetail(id);

  return (
    <html>
      <body className="m-0 p-0 overflow-hidden bg-white">
        <DemoPreviewEmbed
          title={title}
          description={description}
          screenshots={screenshots}
        />
      </body>
    </html>
  );
}
