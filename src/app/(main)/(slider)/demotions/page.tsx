import DemoListView from "@/containers/demotions/DemoListView";
import EmptyDemoView from "@/containers/demotions/EmptyDemoView";
import NewDemoButton from "@/containers/demotions/NewDemoButton";
import NotLoggedInView from "@/components/NotLoggedInView";
import { demoList } from "@/mock/demoList";
import { getAuthStatus } from "@/lib/auth";

export default async function Page() {
  const { isLoggedIn } = await getAuthStatus();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
          Demotions
        </h1>
        <NewDemoButton />
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      {!isLoggedIn ? (
        <NotLoggedInView />
      ) : demoList.length === 0 ? (
        <EmptyDemoView />
      ) : (
        <DemoListView demoList={demoList} />
      )}
    </div>
  );
}
