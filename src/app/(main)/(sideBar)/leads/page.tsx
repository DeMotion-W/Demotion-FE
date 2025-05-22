import { fetchWithAuth } from "@/actions/api-client";
import NotLoggedInView from "@/components/NotLoggedInView";
import DemoLeadsView from "@/containers/leads/DemoLeadsView";
import { getAuthStatus } from "@/utils/auth";
import { DEMO_VIEW_PATH } from "@shared/constants/api";

export default async function Page() {
  const { isLoggedIn } = await getAuthStatus();

  if (!isLoggedIn) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mt-10 mb-4">
          <h1 className="text-center justify-start text-[#191F28] text-xl font-semibold font-['Montserrat'] leading-loose">
            Leads
          </h1>
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
          Leads
        </h1>
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />
      <DemoLeadsView demoList={demos} />
    </div>
  );
}
