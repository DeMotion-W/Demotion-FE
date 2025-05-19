import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
