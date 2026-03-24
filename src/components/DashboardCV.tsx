'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState, useEffect } from 'react';
import {
  Bot,
  Box,
  Fingerprint,
  FileText,
  FolderKanban,
  Github,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
  ChevronDown,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { contact, identityName, identityRole } from '@/content/home';
import { getAllProjects } from '@/content/portfolio';
import type { NavProjectWithImage } from '@/lib/cms/projects-nav';

import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs';
import type { LucideIcon } from 'lucide-react';

type LinkLikeProps = {
  href: string;
  className?: string;
  children?: React.ReactNode;
  prefetch?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const MotionLink = motion.create(
  Link as unknown as React.ComponentType<LinkLikeProps>
);

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'CV', href: '/cv', icon: FileText },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export type DashboardCVProps = {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  navProjects?: NavProjectWithImage[];
  breadcrumbs?: BreadcrumbItem[];
  pageTitle?: string;
  variant?: 'default' | 'landing' | 'project';
  rightRail?: React.ReactNode;
  headerRight?: React.ReactNode;
  showSearch?: boolean;
};

function SidebarContent({
  navProjects: navProjectsProp,
  compact = false,
}: {
  navProjects?: NavProjectWithImage[];
  compact?: boolean;
}) {
  const pathname = usePathname();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Enterprise: true,
    Motion: false,
    Side: false,
    Archive: false,
  });

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navProjects: NavProjectWithImage[] = useMemo(() => {
    if (compact) return [];
    if (navProjectsProp?.length) return navProjectsProp;
    return getAllProjects().map((p) => ({
      slug: p.slug,
      title: p.title,
      moodImageUrl: p.moodImageUrl ?? null,
      category: p.category,
    }));
  }, [compact, navProjectsProp]);

  const { enterprise, motionProjects, side, archive } = useMemo(() => {
    const enterprise = navProjects.filter((p) => p.category === 'Enterprise');
    const motionProjects = navProjects.filter((p) => p.category === 'Motion');
    const side = navProjects.filter((p) => p.category === 'Side');
    const archive = navProjects.filter((p) => p.category === 'Archive');
    return { enterprise, motionProjects, side, archive };
  }, [navProjects]);

  const EASE = [0.16, 1, 0.3, 1] as const;

  const vItem = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  const rowBase = 'relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors';

  function NavRow({
    label,
    href,
    icon: Icon,
    isActive,
    leading,
  }: {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
    leading?: React.ReactNode;
  }) {
    return (
      <MotionLink
        href={href}
        className={cn(
          rowBase,
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        aria-current={isActive ? 'page' : undefined}
        variants={vItem}
        whileHover={{ x: 2 }}
      >
        {isActive && (
          <motion.span
            layoutId="sidebar-active-rail"
            className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-1 rounded-full bg-primary"
          />
        )}
        {leading ? leading : <Icon className="h-4 w-4 shrink-0" />}
        <span className="truncate">{label}</span>
      </MotionLink>
    );
  }

  function ProjectLeading({ moodImageUrl, slug }: { moodImageUrl: string | null; slug: string }) {
    if (!moodImageUrl) {
      const FallbackIcon = slug === 'ffp-dashboard' ? Fingerprint : slug === 'automation' ? Bot : Box;
      return <FallbackIcon className="h-4 w-4 shrink-0" />;
    }
    return (
      <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded border border-border bg-muted">
        <Image src={moodImageUrl} alt="" fill className="object-cover" sizes="20px" />
      </div>
    );
  }

  function ProjectSection({ title, items }: { title: string; items: NavProjectWithImage[] }) {
    if (!items.length) return null;
    const isExpanded = Boolean(expanded[title]);

    return (
      <div className="mt-4 border-t border-border/50 pt-3">
        <button
          onClick={() => toggleSection(title)}
          className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          {title}
          <ChevronDown
            className={cn('h-3 w-3 transition-transform duration-300', isExpanded ? 'rotate-0' : '-rotate-90')}
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-1 py-1">
                {items.map((project) => (
                  <NavRow
                    key={project.slug}
                    label={project.title}
                    href={`/projects/${project.slug}`}
                    icon={Box}
                    isActive={pathname === `/projects/${project.slug}`}
                    leading={<ProjectLeading moodImageUrl={project.moodImageUrl ?? null} slug={project.slug} />}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          <Image src={contact.profileImage} alt="" fill className="object-cover" sizes="40px" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{identityName}</p>
          <p className="text-xs text-muted-foreground">{identityRole}</p>
        </div>
      </div>

      <nav className="space-y-1 overflow-y-auto no-scrollbar" aria-label="Sidebar navigation">
        {navItems.map(({ label, href, icon }) => (
          <NavRow
            key={label}
            label={label}
            href={href}
            icon={icon}
            isActive={pathname === href || (href !== '/' && pathname?.startsWith(href))}
          />
        ))}

        {!compact && (
          <>
            <ProjectSection title="Enterprise" items={enterprise} />
            <ProjectSection title="Motion" items={motionProjects} />
            <ProjectSection title="Side" items={side} />
            <ProjectSection title="Archive" items={archive} />
          </>
        )}
      </nav>

      <div className="mt-auto border-t border-border pt-5 text-sm">
        <Link
          href="https://github.com/weareuntitled"
          target="_blank"
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4" /> GitHub
        </Link>
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <Mail className="h-4 w-4" /> {contact.email}
        </a>
      </div>
    </div>
  );
}

function DashboardCVImpl({
  children,
  searchQuery = '',
  onSearchChange,
  navProjects,
  breadcrumbs = [{ label: 'Daniel Peters', href: '/' }],
  pageTitle = 'Dashboard',
  variant = 'default',
  rightRail,
  headerRight,
  showSearch = true,
}: DashboardCVProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const showHeader = variant !== 'landing';

  return (
    <div className="min-h-screen text-foreground">
      <div className="theme-container container flex flex-1 flex-col py-6">
        <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-background/75">
          <div className="mx-auto grid min-h-screen w-full max-w-[1400px] items-start md:grid-cols-[16rem_1fr]">
            <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar p-5 text-sidebar-foreground overflow-y-auto no-scrollbar md:flex">
              <SidebarContent navProjects={navProjects} compact={variant === 'landing'} />
            </aside>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-md md:hidden">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] border-border bg-background p-5 overflow-y-auto no-scrollbar">
                <div className="h-full pt-8">
                  <SidebarContent navProjects={navProjects} compact={variant === 'landing'} />
                </div>
              </SheetContent>
            </Sheet>

            <main className="min-w-0">
              <section
                className={cn('min-w-0 space-y-6 p-4 md:p-8', variant === 'landing' ? 'pt-6' : 'pt-20 md:pt-8')}
              >
                {showHeader && (
                  <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Breadcrumbs items={breadcrumbs} />
                      {variant !== 'project' && (
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{pageTitle}</h1>
                      )}
                    </div>

                    {Boolean(onSearchChange) && showSearch && (
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search projects..."
                          value={searchQuery}
                          onChange={(e) => onSearchChange?.(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    )}

                    {headerRight}
                  </header>
                )}

                {rightRail ? (
                  <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
                    <div className="min-w-0">{children}</div>
                    <aside className="hidden lg:block">{rightRail}</aside>
                  </div>
                ) : (
                  children
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DashboardCV = DashboardCVImpl;
export default DashboardCVImpl;
