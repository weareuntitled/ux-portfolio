"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TopNavbar } from "@/components/kovon-ffp-dashboard/top-navbar";
import { AppSidebar } from "@/components/kovon-ffp-dashboard/app-sidebar";
import { LeftSidebar } from "@/components/kovon-ffp-dashboard/left-sidebar";

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

      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1,
        }}
        className={
          showLeftSidebar
            ? leftSidebarOpen
              ? "pl-14 transition-[padding] duration-300 ease-in-out"
              : "pl-0 transition-[padding] duration-300 ease-in-out"
            : ""
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
