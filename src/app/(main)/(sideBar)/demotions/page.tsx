import DemoListView from "@/containers/demotions/DemoListView";
import EmptyDemoView from "@/containers/demotions/EmptyDemoView";
import NewDemoButton from "@/containers/demotions/NewDemoButton";
import NotLoggedInView from "@/components/NotLoggedInView";
import { getAuthStatus } from "@/utils/authServer";
import { fetchWithAuth } from "@/actions/api-client";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default async function Page() {
  const { isLoggedIn, token } = await getAuthStatus();

  if (!isLoggedIn) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mt-10 mb-4">
          <h1 className="text-center justify-start text-[#191F28] text-xl font-semibold font-['Montserrat'] leading-loose">
            Demotions
          </h1>
          <NewDemoButton />
        </div>
        <div className="w-full h-px bg-gray-200 my-6" />
        <NotLoggedInView />
      </div>
    );
  }

  const demos = await fetchWithAuth(DEMO_VIEW_PATH);

  if (!demos) {
    return (
      <div className="text-center text-sm text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-xl font-semibold font-['Montserrat'] leading-loose">
          Demotions
        </h1>
        <NewDemoButton />
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      {demos.length === 0 ? (
        <EmptyDemoView />
      ) : (
        <DemoListView demoList={demos} token={token} />
      )}
    </div>
  );
}
