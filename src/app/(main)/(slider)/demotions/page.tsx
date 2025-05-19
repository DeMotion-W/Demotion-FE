import DemoListView from "@/containers/demotions/DemoListView";
import EmptyDemoView from "@/containers/demotions/EmptyDemoView";
import NewDemoButton from "@/containers/demotions/NewDemoButton";
import NotLoggedInView from "@/components/NotLoggedInView";
import { demoList } from "@/mock/demoList";
import { getAuthStatus } from "@/lib/auth";
import {
  fetchWithAuth,
  tryFetchWithAuth,
} from "@/lib/api-client";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default async function Page() {
  const { isLoggedIn } = await getAuthStatus();

  if (!isLoggedIn) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mt-10 mb-4">
          <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
            Demotions
          </h1>
          <NewDemoButton />
        </div>
        <div className="w-full h-px bg-gray-200 my-6" />
        <NotLoggedInView />
      </div>
    );
  }

  // // 로그인된 경우만 데이터 요청
  // const demos = await tryFetchWithAuth(DEMO_VIEW_PATH);

  // // 예외: fetch 실패하면 fallback 처리 (optional)
  // if (!demos) {
  //   return (
  //     <div className="text-center text-sm text-red-500">
  //       데이터를 불러오지 못했습니다.
  //     </div>
  //   );
  // }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
          Demotions
        </h1>
        <NewDemoButton />
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      {demoList.length === 0 ? (
        <EmptyDemoView />
      ) : (
        <DemoListView demoList={demoList} />
      )}
    </div>
  );
}
