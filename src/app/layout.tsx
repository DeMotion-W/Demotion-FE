import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Demotion",
  description: "데모 생성 및 데모 관리 B2B SaaS 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-[1280px] overflow-x-auto">
        <div className="flex w-full min-h-screen">
          <Sidebar />
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-[1280px] px-[40px]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
