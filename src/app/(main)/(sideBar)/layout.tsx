import Sidebar from "@/components/UI/Sidebar";

export default async function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[1280px] px-[40px]">
          {children}
        </div>
      </main>
    </div>
  );
}
