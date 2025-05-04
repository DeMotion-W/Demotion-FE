import DemoListView from "@/containers/demoView/DemoListView";
import EmptyDemoView from "@/containers/demoView/EmptyDemoView";
import NewDemoButton from "@/containers/demoView/NewDemoButton";
import NotLoggedInView from "@/containers/demoView/NotLoggedInView";
import { demoList } from "@/mock/demoList";

const isLoggedIn = true;

export default function Home() {
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
