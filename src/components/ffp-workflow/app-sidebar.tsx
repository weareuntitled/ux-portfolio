"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Fingerprint, Activity, Shield, MessageCircle, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Workflow", icon: LayoutGrid, href: "/prototypes/ffp/fingerprints" },
  { label: "FFP", icon: Fingerprint, href: "/prototypes/ffp/fingerprints" },
  { label: "Comparison", icon: BarChart3, href: "/prototypes/ffp-review" },
  { label: "Diagnose", icon: Activity, href: "#" },
  { label: "DISS", icon: Shield, href: "#" },
  { label: "SAGA", icon: MessageCircle, href: "#" },
  { label: "Forum", icon: Users, href: "#" },
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
        "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-l border-border bg-background shadow-lg transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex flex-col py-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-secondary",
                isActive ? "font-semibold text-primary" : "text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
