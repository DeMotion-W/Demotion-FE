export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-w-[1280px] overflow-x-auto">
      {children}
    </div>
  );
}
