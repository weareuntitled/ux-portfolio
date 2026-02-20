"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Fingerprint,
  Activity,
  Shield,
  MessageCircle,
  BarChart3,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: { label: string; icon: typeof LayoutGrid; href: string; comingSoon?: boolean }[] = [
  { label: "Dashboard Übersicht", icon: LayoutGrid, href: "/prototypes/ffp" },
  { label: "FFP", icon: Fingerprint, href: "/prototypes/ffp/fingerprints" },
  { label: "Reporting", icon: BarChart3, href: "/prototypes/ffp/reporting" },
  { label: "Diagnose", icon: Activity, href: "/prototypes/ffp/diagnose" },
  { label: "DISS", icon: Shield, href: "/prototypes/ffp/diss" },
  { label: "SAGA", icon: MessageCircle, href: "/prototypes/ffp/saga" },
  { label: "Forum", icon: Users, href: "#", comingSoon: true },
];

interface AppSidebarProps {
  open: boolean;
  onClose?: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-l border-border bg-card shadow-lg transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex flex-col overflow-y-auto py-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isComingSoon = "comingSoon" in item && item.comingSoon;
          const content = (
            <>
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground",
                  isComingSoon && "opacity-60"
                )}
              />
              <span className={cn("truncate", isComingSoon && "text-muted-foreground")}>
                {item.label}
                {isComingSoon && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                    (Coming soon)
                  </span>
                )}
              </span>
            </>
          );
          if (isComingSoon) {
            return (
              <span
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 px-5 py-3 text-left text-sm text-muted-foreground"
                aria-disabled="true"
              >
                {content}
              </span>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-secondary",
                isActive
                  ? "font-semibold text-primary"
                  : "text-foreground"
              )}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
