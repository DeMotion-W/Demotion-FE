import { fetchWithAuth } from "@/actions/api-client";
import AutoLoginHandler from "@/components/AutoLoginHandler";
import DemoDetailView from "@/containers/demo/DemoDetailView";
import { getAuthStatus } from "@/utils/authServer";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { isLoggedIn, token } = await getAuthStatus();

  // AutoLoginHandler가 로그인 진행 중이므로 일단 빈 화면 보여줌
  if (!isLoggedIn) {
    return (
      <>
        <AutoLoginHandler />
        <div className="h-screen flex items-center justify-center">
          <p>자동 로그인 중...</p>
        </div>
      </>
    );
  }

  const demoData = await fetchWithAuth(`${DEMO_VIEW_PATH}/${id}`);
  console.log(demoData);
  return (
    <>
      <DemoDetailView demo={demoData} demoId={id} token={token} />
    </>
  );
}
