"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Columns, Trophy, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "PRÉSENTATION",
    href: "/",
    icon: Globe,
  },
  {
    title: "PARCOURS",
    href: "/parcours",
    icon: Trophy,
  },
  {
    title: "EFFECTIFS",
    href: "/equipes",
    icon: Users,
  },
  {
    title: "COMPARAISON",
    href: "/comparaison",
    icon: Columns,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0 z-50">
      {/* Multicolor Accent Bar */}
      <div className="h-1.5 w-full multicolor-strip" />
      
      <div className="p-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">FIFA</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[4px]">Archives</p>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
              pathname === item.href
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4 transition-transform duration-500",
              pathname === item.href ? "text-white" : "group-hover:scale-110"
            )} />
            <span className="font-bold text-[11px] tracking-[1px]">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-8 mt-auto">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[9px] text-slate-400 uppercase font-black tracking-[2px] mb-3">VERSION 1.0</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-wc-green" />
            <span className="text-[10px] text-slate-600 font-bold">Base de données certifiée</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
