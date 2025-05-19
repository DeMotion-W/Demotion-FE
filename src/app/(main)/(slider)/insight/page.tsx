import NotLoggedInView from "@/components/NotLoggedInView";
import DemoInsightView from "@/containers/insight/DemoInsightView";
import { getAuthStatus } from "@/lib/auth";

export default async function Page() {
  const { isLoggedIn } = await getAuthStatus();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-center justify-start text-[#191F28] text-xl font-semibold font-['Montserrat'] leading-loose">
          Insight
        </h1>
      </div>

      <div className="w-full h-px bg-gray-200 my-6" />

      {!isLoggedIn ? (
        <NotLoggedInView />
      ) : (
        <DemoInsightView />
      )}
    </div>
  );
}
