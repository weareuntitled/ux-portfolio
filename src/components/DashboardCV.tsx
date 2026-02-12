'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronRight,
  FileText,
  FolderKanban,
  Github,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { contact } from '@/content/home';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'CV', href: '/cv', icon: FileText },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Contact', href: '/contact', icon: Mail },
];

type DashboardCVProps = {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

function SidebarContent() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground"
          aria-hidden
        >
          DP
        </div>
        <div>
          <p className="font-medium text-foreground">Daniel Peters</p>
          <p className="text-xs text-muted-foreground">UX/UI & Motion Designer</p>
        </div>
      </div>
      <nav className="mt-5 space-y-1" aria-label="Sidebar navigation">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border pt-5 text-sm">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </Link>
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {contact.email}
        </a>
      </div>
    </>
  );
}

export function DashboardCV({
  children,
  searchQuery = '',
  onSearchChange,
}: DashboardCVProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-6 p-4 md:grid-cols-[16rem_1fr] md:p-6">
        {/* Desktop sidebar */}
        <aside
          className="hidden min-h-[calc(100vh-2rem)] flex-col rounded-xl border border-border bg-background p-5 md:flex"
          aria-label="Main navigation"
        >
          <SidebarContent />
        </aside>

        {/* Mobile: Sheet with sidebar content */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-border bg-background p-5">
            <div className="flex min-h-full flex-col pt-8">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        <section className="min-w-0 space-y-6 pt-14 md:pt-0">
          <header className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <nav
                className="flex items-center gap-1 text-sm text-muted-foreground"
                aria-label="Breadcrumb"
              >
                <span>Daniel Peters</span>
                <ChevronRight className="h-4 w-4" aria-hidden />
                <span className="text-foreground">Overview</span>
              </nav>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Dashboard
              </h1>
            </div>
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-9"
                aria-label="Search projects"
              />
            </div>
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
