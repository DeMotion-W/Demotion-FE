import DemoListView from "@/containers/demotions/DemoListView";
import EmptyDemoView from "@/containers/demotions/EmptyDemoView";
import NewDemoButton from "@/containers/demotions/NewDemoButton";
import NotLoggedInView from "@/containers/demotions/NotLoggedInView";
import { useAuthStore } from "@/lib/store/auth";
import { demoList } from "@/mock/demoList";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  // const loggedIn = !!refreshToken;

  const loggedIn = true;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-2xl font-semibold font-['Montserrat'] leading-loose">
          Demotions
        </h1>
        <NewDemoButton />
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      {!loggedIn ? (
        <NotLoggedInView />
      ) : demoList.length === 0 ? (
        <EmptyDemoView />
      ) : (
        <DemoListView demoList={demoList} />
      )}
    </div>
  );
}
