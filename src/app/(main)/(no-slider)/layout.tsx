export default async function NoSliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {children}
    </div>
  );
}
