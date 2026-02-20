"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TopNavbar } from "@/components/ffp-prototype/top-navbar";
import { AppSidebar } from "@/components/ffp-prototype/app-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sidebarAndBackdrop = (
    <>
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/10 backdrop-blur-sm"
          onClick={() => setRightSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setRightSidebarOpen(false);
          }}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}
      <AppSidebar open={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar
        onGridToggle={() => setRightSidebarOpen((prev) => !prev)}
        showLogo
      />
      {mounted && typeof document !== "undefined" && createPortal(sidebarAndBackdrop, document.body)}

      <div className="min-h-[calc(100vh-3.5rem)] pt-14">{children}</div>
    </div>
  );
}
