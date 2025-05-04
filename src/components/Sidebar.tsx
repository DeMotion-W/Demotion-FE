"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart2, Users } from "lucide-react";
import Image from "next/image";
import { user } from "@/mock/user";

const NAV_ITEMS = [
  { href: "/", label: "Demotions", icon: LayoutGrid },
  { href: "/insight", label: "Insight", icon: BarChart2 },
  { href: "/leads", label: "Leads", icon: Users },
];

export default function Sidebar() {
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
                flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold font-['Montserrat'] leading-tight transition-colors
                ${
                  isActive
                    ? "bg-[#1F2A37] text-[#3182F6]"
                    : "text-[#9CA3AF] hover:text-white"
                }
              `}
                  >
                    <Icon size={20} strokeWidth={3} />
                    <span>{label}</span>
                  </Link>
                );
              }
            )}
          </nav>
        </div>
        <Link
          href={user.isLoggedIn ? "/mypage" : "/login"}
          className="mt-auto mb-4 px-4 py-3 flex items-center justify-between hover:bg-[#1F2A37] cursor-pointer"
        >
          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#374151] rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <span className="text-sm font-semibold text-[#E2E6EB] font-['Pretendard'] leading-tight">
                {user.name}
              </span>
            </div>
          ) : (
            <span className="ml-4 text-sm font-semibold text-[#E2E6EB] font-['Pretendard'] leading-tight">
              로그인/회원가입
            </span>
          )}
          <span className="text-[#8B95A1] font-semibold mr-4">{`>`}</span>
        </Link>
      </div>
    </aside>
  );
}
