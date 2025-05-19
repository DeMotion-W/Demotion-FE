"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart2, Users } from "lucide-react";
import { user } from "@/mock/user";

const NAV_ITEMS = [
  {
    href: "/demotions",
    label: "Demotions",
    icon: LayoutGrid,
  },
  { href: "/insight", label: "Insight", icon: BarChart2 },
  { href: "/leads", label: "Leads", icon: Users },
];

export default function Sidebar({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-[240px] bg-[#191F28] text-white min-h-screen">
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="p-4 flex items-center justify-start mt-4 ml-4">
            <Image
              src="/images/logo.png"
              alt="Demotion Logo"
              width={121}
              height={24}
            />
          </div>
          <nav className="mt-6 m-4 flex flex-col">
            {NAV_ITEMS.map(
              ({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold font-['Montserrat'] leading-tight transition-colors
                ${
                  isActive
                    ? "bg-[#1F2A37] text-[#3182F6]"
                    : "text-[#9CA3AF] hover:text-white"
                }
              `}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span>{label}</span>
                  </Link>
                );
              }
            )}
          </nav>
        </div>
        <Link
          href={isLoggedIn ? "/mypage" : "/login"}
          className="mt-auto mb-2 px-4 py-3 flex items-center justify-between hover:bg-[#1F2A37] cursor-pointer"
        >
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#374151] rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
              <span className="text-xs font-medium text-[#E2E6EB] font-['Pretendard'] leading-tight">
                {user.name}
              </span>
            </div>
          ) : (
            <span className="ml-4 text-xs font-medium text-[#E2E6EB] font-['Pretendard'] leading-tight">
              로그인/회원가입
            </span>
          )}
          <span className="text-[#8B95A1] font-medium mr-2">{`>`}</span>
        </Link>
      </div>
    </aside>
  );
}
