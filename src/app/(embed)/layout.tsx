export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-screen overflow-hidden bg-white">
        {children}
      </body>
    </html>
  );
}
