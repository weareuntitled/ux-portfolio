"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/ffp-prototype/top-navbar";
import { AppSidebar } from "@/components/ffp-prototype/app-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNavbar
        onGridToggle={() => setRightSidebarOpen((prev) => !prev)}
        showLogo
      />
      <AppSidebar open={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />

      {rightSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/10"
          onClick={() => setRightSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setRightSidebarOpen(false);
          }}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      <div>{children}</div>
    </div>
  );
}
