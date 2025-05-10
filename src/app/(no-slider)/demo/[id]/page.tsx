import DemoDetailView from "@/containers/demo/DemoDetailView";
import { demoMock } from "@/mock/demo";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //const res = await getDemoDetail(id);
  return (
    <>
      <DemoDetailView initialData={demoMock} />
    </>
  );
}
