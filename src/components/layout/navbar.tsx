"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Wrench,
  Package,
  GitCompareArrows,
  Newspaper,
  BookOpen,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/skills", label: "工具箱", icon: Wrench },
  { href: "/packs", label: "Skill", icon: Package },
  { href: "/models", label: "模型", icon: GitCompareArrows },
  { href: "/news", label: "资讯", icon: Newspaper },
  { href: "/about", label: "使用指南", icon: BookOpen },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 glass border-b border-slate-400/10 bg-slate-50/[0.02] backdrop-blur-2xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-6 max-w-6xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Clapperboard className="h-5 w-5 text-foreground/70 transition-colors group-hover:text-foreground" />
            <span className="font-display text-lg font-medium tracking-wide text-foreground">
              AIGC 片场
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm transition-colors",
                  isNavActive(pathname, item.href)
                    ? "text-foreground bg-slate-50/[0.08] border border-slate-400/12 backdrop-blur-md shadow-glass"
                    : "text-muted-foreground hover:text-zinc-200 hover:bg-slate-50/[0.04]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-slate-400/10 bg-slate-50/[0.02] backdrop-blur-2xl safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg transition-colors min-w-[56px]",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
