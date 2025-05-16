export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full min-w-[1280px] overflow-x-auto">
        {children}
      </body>
    </html>
  );
}
