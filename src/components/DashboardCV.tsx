'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
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
import { getEnterpriseProjects } from '@/content/projects';
import type { NavProject } from '@/lib/cms/projects-nav';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

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
  /** When provided (e.g. from CMS), sidebar project links use this instead of static list. */
  enterpriseProjects?: NavProject[];
  /** Breadcrumb trail for the header (e.g. Daniel Peters > Projects > Kovon). Last item = current page (no href). */
  breadcrumbs?: BreadcrumbItem[];
  /** Page title shown in header. Defaults to "Dashboard" on home. */
  pageTitle?: string;
};

function SidebarContent({ enterpriseProjects }: { enterpriseProjects?: NavProject[] }) {
  const navProjects =
    enterpriseProjects ??
    getEnterpriseProjects().map((p) => ({ slug: p.slug, title: p.title }));
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          <Image
            src={contact.profileImage}
            alt=""
            fill
            className="object-cover"
            sizes="40px"
          />
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
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Projects
          </p>
          {navProjects.map((project) => {
            const isActive = pathname === `/projects/${project.slug}`;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Box className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{project.title}</span>
              </Link>
            );
          })}
        </div>
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

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Daniel Peters', href: '/' },
  { label: 'Overview' },
];

export function DashboardCV({
  children,
  searchQuery = '',
  onSearchChange,
  enterpriseProjects,
  breadcrumbs = defaultBreadcrumbs,
  pageTitle = 'Dashboard',
}: DashboardCVProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="dark min-h-screen text-foreground">
      <div className="container-wrapper section-soft flex flex-1 flex-col pb-6">
        <div className="theme-container container flex flex-1 scroll-mt-20 flex-col">
          {/* Glassmorphism shell over the animated background */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-background/40 bg-clip-padding backdrop-blur-2xl has-[[data-slot=rtl-components]]:overflow-visible has-[[data-slot=rtl-components]]:border-0 has-[[data-slot=rtl-components]]:bg-transparent md:flex-1 xl:rounded-xl">
            <div className="mx-auto grid min-h-svh w-full max-w-[1400px] gap-0 md:grid-cols-[16rem_1fr]">
              {/* Desktop sidebar */}
              <aside
                className="hidden min-h-[calc(100vh-2rem)] flex-col border-r border-border bg-sidebar p-5 text-sidebar-foreground md:flex"
                aria-label="Main navigation"
              >
                <SidebarContent enterpriseProjects={enterpriseProjects} />
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
                    <SidebarContent enterpriseProjects={enterpriseProjects} />
                  </div>
                </SheetContent>
              </Sheet>

              <main className="flex flex-1 flex-col min-w-0">
                <section className="min-w-0 flex-1 space-y-6 p-4 pt-14 md:p-6 md:pt-6">
                  <header className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Breadcrumbs items={breadcrumbs} />
                      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {pageTitle}
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
