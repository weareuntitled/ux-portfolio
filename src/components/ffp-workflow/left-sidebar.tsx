"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart3, MessageCircle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const topItems: NavItem[] = [
  { href: "/prototypes/ffp", icon: LayoutGrid, label: "Dashboard" },
  { href: "/prototypes/ffp-review", icon: BarChart3, label: "Reporting" },
  { href: "#", icon: MessageCircle, label: "SAGA" },
];

const bottomItems: NavItem[] = [{ href: "#", icon: Globe, label: "Global" }];

interface LeftSidebarProps {
  open?: boolean;
}

export function LeftSidebar({ open = true }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] w-14 flex-col justify-between border-r border-border bg-background transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="flex flex-col items-center gap-1 pt-3" aria-label="Side navigation">
        {topItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>
      <nav className="flex flex-col items-center gap-1 pb-4" aria-label="Secondary navigation">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
