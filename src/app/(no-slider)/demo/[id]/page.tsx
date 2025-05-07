import DemoDetailView from "@/containers/demo/DemoDetailView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-semibold px-6 pt-8">
        데모 제목
      </h1>
      <DemoDetailView />
    </div>
  );
}
