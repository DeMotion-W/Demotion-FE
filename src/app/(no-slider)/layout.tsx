export default function NoSliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[1280px] w-full min-h-screen bg-white">
      {children}
    </div>
  );
}
