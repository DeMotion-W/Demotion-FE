export default function NoSliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full min-w-[1280px]">
      <aside className="w-[240px] bg-gray-50 border-r"></aside>
      <main className="flex-1 px-4 py-6 bg-white flex justify-center">
        <div className="w-full max-w-[680px]">
          {children}
        </div>
      </main>
      <aside className="w-[280px] bg-gray-50 border-l"></aside>
    </div>
  );
}
