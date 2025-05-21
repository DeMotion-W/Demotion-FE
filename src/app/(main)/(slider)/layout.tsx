import Sidebar from "@/components/Sidebar";
import { getAuthStatus } from "@/utils/auth";

export default async function SliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = await getAuthStatus();

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar isLoggedIn={isLoggedIn} />
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[1280px] px-[40px]">
          {children}
        </div>
      </main>
    </div>
  );
}
