"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart2, Users } from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/", label: "Demotions", icon: LayoutGrid },
  { href: "/insight", label: "Insight", icon: BarChart2 },
  { href: "/leads", label: "Leads", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] bg-[#191F28] text-white min-h-screen">
      <div className="p-4 flex items-center justify-start mt-4 ml-4">
        <Image
          src="/images/logo.png"
          alt="Demotion Logo"
          width={121}
          height={24}
        />
      </div>
      <nav className="mt-6 m-4 flex flex-col">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
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
        })}
      </nav>
    </aside>
  );
}
