"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  LayoutGrid,
  Fingerprint,
  Activity,
  Shield,
  MessageCircle,
  BarChart3,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const BASE = "/prototypes/kovon";

const pageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  [BASE]: LayoutGrid,
  [`${BASE}/reporting`]: BarChart3,
  [`${BASE}/diss`]: Shield,
  [`${BASE}/saga`]: MessageCircle,
  [`${BASE}/diagnose`]: Activity,
  [`${BASE}/ffp`]: Fingerprint,
  [`${BASE}/forum`]: Users,
};

interface TopNavbarProps {
  onGridToggle?: () => void;
  showLogo?: boolean;
  onMenuToggle?: () => void;
}

export function TopNavbar({ onGridToggle, showLogo }: TopNavbarProps) {
  const pathname = usePathname();
  const CurrentIcon = pageIcons[pathname] || LayoutGrid;

  return (
    <motion.header
      initial={{ opacity: 0, y: -24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
      }}
      className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4"
    >
      <div className="flex items-center gap-3">
        <Link
          href="/projects/kovon"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Back to portfolio"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to portfolio</span>
        </Link>
        {showLogo && (
          <div className="flex items-center gap-2">
            <LogoIcon />
            <div className="hidden flex-col leading-none md:flex">
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary">SMART</span>
              <span className="text-[8px] font-semibold tracking-[0.12em] text-primary">QUALITY</span>
              <span className="text-[8px] font-semibold tracking-[0.12em] text-primary">ANALYTICS</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center px-4 md:px-16">
        <div className="relative flex w-full max-w-md items-center">
          <Input
            type="search"
            placeholder="Search"
            className="h-9 rounded-l-md rounded-r-none border-r-0 bg-background pr-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-10 rounded-l-none border-l-0 bg-transparent text-muted-foreground hover:bg-secondary"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="text-foreground hover:bg-secondary"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://i.pravatar.cc/32?img=12" alt="User avatar" />
          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
            ML
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={onGridToggle}
          aria-label="Navigation"
          className="text-foreground hover:bg-secondary"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </div>
    </motion.header>
  );
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="18" width="5" height="8" rx="1" fill="hsl(var(--primary))" />
      <rect x="9" y="12" width="5" height="14" rx="1" fill="hsl(var(--primary))" />
      <rect x="16" y="6" width="5" height="20" rx="1" fill="hsl(var(--primary))" />
      <rect x="23" y="2" width="5" height="24" rx="1" fill="hsl(var(--primary))" opacity="0.5" />
    </svg>
  );
}
