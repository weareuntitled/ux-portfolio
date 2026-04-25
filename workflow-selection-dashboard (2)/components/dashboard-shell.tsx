"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/top-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { LeftSidebar } from "@/components/left-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  showLeftSidebar?: boolean;
}

export function DashboardShell({ children, showLeftSidebar = false }: DashboardShellProps) {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNavbar
        onMenuToggle={() => setLeftSidebarOpen((prev) => !prev)}
        onGridToggle={() => setRightSidebarOpen((prev) => !prev)}
        showLogo={showLeftSidebar}
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

      {showLeftSidebar && <LeftSidebar open={leftSidebarOpen} />}

      <div
        className={
          showLeftSidebar
            ? leftSidebarOpen
              ? "pl-14 transition-[padding] duration-300 ease-in-out"
              : "pl-0 transition-[padding] duration-300 ease-in-out"
            : ""
        }
      >
        {children}
      </div>
    </div>
  );
}
