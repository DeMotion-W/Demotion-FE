import { fetchWithAuth } from "@/actions/api-client";
import AutoLoginHandler from "@/components/AutoLoginHandler";
import DemoDetailView from "@/containers/demo/DemoDetailView";
import { useAuthStore } from "@/lib/store/auth";
import { demoMock } from "@/mock/demo";
import {
  DEMO_VIEW_PATH,
  TOKEN_REFRESH_PATH,
} from "@shared/constants/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const demoData = await fetchWithAuth(
    `${DEMO_VIEW_PATH}/${id}`
  );
  //const res = await getDemoDetail(id);
  // const cookieStore = await cookies();
  // const refreshToken =
  //   cookieStore.get("refreshToken")?.value;

  // if (!refreshToken) {
  //   redirect("/login");
  // }

  // try {
  //   const response = await httpClientForCredentials.post(
  //     TOKEN_REFRESH_PATH,
  //     {},
  //     {
  //       headers: {
  //         Cookie: `refreshToken=${refreshToken}`,
  //       },
  //       withCredentials: true,
  //     }
  //   );

  //   const { accessToken } = response.data;
  //   return accessToken || null;
  // } catch (err) {
  //   console.error("accessToken 발급 실패:", err);
  //   return null;
  // }

  return (
    <>
      <AutoLoginHandler />
      <DemoDetailView initialData={demoData} demoId={id} />
    </>
  );
}
