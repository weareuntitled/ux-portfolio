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
  Film,
  FolderKanban,
  Github,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';

import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { contact, identityName, identityRole } from '@/content/home';
import uiCopy from '@/content/ui-copy.json';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getAllProjects, getProjectCoverImage } from '@/content/portfolio';
import type { NavProjectWithImage } from '@/lib/cms/projects-nav';
import { MOTION_PROJECTS } from '@/content/motion-projects';

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

const sidebarIconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Film,
  FolderKanban,
  Sparkles,
  Mail,
};
const navItems = uiCopy.sidebar.navItems.map((item) => ({
  ...item,
  icon: sidebarIconMap[item.icon] ?? LayoutDashboard,
}));

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

function SidebarContent({ navProjects: navProjectsProp }: { navProjects?: NavProjectWithImage[] }) {
  const pathname = usePathname();

  const initialExpanded = useMemo(
    () =>
      Object.fromEntries(
        uiCopy.sidebar.projectSections.map((section) => [section, false])
      ) as Record<string, boolean>,
    []
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialExpanded);

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navProjects: NavProjectWithImage[] = useMemo(() => {
    if (navProjectsProp?.length) return navProjectsProp;
    return getAllProjects().map((p) => ({
      slug: p.slug,
      title: p.title,
      moodImageUrl: getProjectCoverImage(p),
      category: p.category,
    }));
  }, [navProjectsProp]);

  // Motion-page projects live under /motion/[slug] and are not part of the portfolio
  // collection, so they need a separate href and are merged in alongside any
  // portfolio projects already categorized as Motion (the showreels).
  const motionPageProjects: NavProjectWithImage[] = useMemo(
    () =>
      MOTION_PROJECTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        moodImageUrl:
          p.thumbnail ??
          (p.youtubeId
            ? `https://img.youtube.com/vi/${p.youtubeId}/mqdefault.jpg`
            : null),
        category: 'Motion' as const,
        href: `/motion/${p.slug}`,
      })),
    []
  );

  const { enterprise, motionProjects, branding, web, side, archive } = useMemo(() => {
    const enterprise = navProjects.filter((p) => p.category === 'Enterprise');
    const portfolioMotion = navProjects.filter((p) => p.category === 'Motion');
    const motionProjects = [...portfolioMotion, ...motionPageProjects];
    const branding = navProjects.filter((p) => p.category === 'Branding');
    const web = navProjects.filter((p) => p.category === 'Web');
    const side = navProjects.filter((p) => p.category === 'Side');
    const archive = navProjects.filter((p) => p.category === 'Archive');
    return { enterprise, motionProjects, branding, web, side, archive };
  }, [navProjects, motionPageProjects]);

  const vItem = {
    hidden: { opacity: 0, x: -10, filter: 'blur(4px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: DUR.sm, ease: EASE } },
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
          className="flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-semibold capitalize tracking-wide text-muted-foreground/70 hover:text-foreground text-left"
        >
          <span>{title}</span>
          <ChevronDown
            className={cn('h-3 w-3 shrink-0 transition-transform duration-300', isExpanded ? 'rotate-0' : '-rotate-90')}
          />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: DUR.xs, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-1 py-1">
                {items.map((project) => {
                  const href = project.href ?? `/projects/${project.slug}`;
                  return (
                    <NavRow
                      key={`${project.category}:${project.slug}`}
                      label={project.title}
                      href={href}
                      icon={Box}
                      isActive={pathname === href}
                      leading={<ProjectLeading moodImageUrl={project.moodImageUrl ?? null} slug={project.slug} />}
                    />
                  );
                })}
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
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{identityName}</p>
          <p className="text-xs font-medium text-foreground/90">{identityRole}</p>
        </div>
      </div>

      <nav className="space-y-1 overflow-y-auto no-scrollbar" aria-label="Sidebar navigation">
        {navItems.map(({ label, href, icon }) => {
          const isActive = (() => {
            if (!pathname) return false;
            if (href === '/') return pathname === '/';
            if (href === '/projects/kontrast-festival') return pathname === href;
            if (href === '/projects') {
              return (
                pathname === '/projects' ||
                (pathname.startsWith('/projects/') && pathname !== '/projects/kontrast-festival')
              );
            }
            return pathname === href || pathname.startsWith(`${href}/`);
          })();
          return (
            <NavRow key={label} label={label} href={href} icon={icon} isActive={isActive} />
          );
        })}

        <>
          <ProjectSection title={uiCopy.sidebar.projectSections[0]} items={enterprise} />
          <ProjectSection title={uiCopy.sidebar.projectSections[1]} items={motionProjects} />
          <ProjectSection title={uiCopy.sidebar.projectSections[2]} items={branding} />
          <ProjectSection title={uiCopy.sidebar.projectSections[3]} items={web} />
          <ProjectSection title={uiCopy.sidebar.projectSections[4]} items={side} />
          <ProjectSection title={uiCopy.sidebar.projectSections[5]} items={archive} />
        </>
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
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">Appearance</span>
          <ThemeToggle />
        </div>
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  // Persist sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open');
    if (saved !== null) setSidebarOpen(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-open', String(sidebarOpen));
  }, [sidebarOpen]);

  const showHeader = variant !== 'landing';

  return (
    <div className="min-h-screen text-foreground">
      {/* Desktop sidebar toggle — always visible */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="fixed top-4 left-4 z-50 hidden h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/95 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent md:flex"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="theme-container flex flex-1 flex-col md:container md:py-6">
        <div className="flex flex-col overflow-hidden border-border bg-background/75 md:rounded-xl md:border md:border-white/10">
          <div
            className="mx-auto grid min-h-screen w-full max-w-[1400px] items-start transition-all duration-300"
            style={{ gridTemplateColumns: sidebarOpen ? '16rem 1fr' : '0fr 1fr' }}
          >
            <aside
              className={cn(
                'sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar p-5 text-sidebar-foreground overflow-y-auto no-scrollbar transition-all duration-300 md:flex',
                sidebarOpen ? 'opacity-100' : 'w-0 overflow-hidden p-0 opacity-0'
              )}
            >
              {sidebarOpen && <SidebarContent navProjects={navProjects} />}
            </aside>

            <main className="flex min-w-0 flex-col">
              {/* Mobile Header */}
              <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur md:hidden">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm">
                    <Menu className="h-5 w-5" />
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] border-border bg-background p-5 overflow-y-auto no-scrollbar">
                    <div className="h-full pt-8">
                      <SidebarContent navProjects={navProjects} />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="text-sm font-semibold">{pageTitle}</span>
                <div className="w-10" /> {/* Spacer for centering */}
              </div>

              <section className="min-w-0 space-y-6 p-4 md:p-8">
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
                          placeholder={uiCopy.sidebar.searchPlaceholder}
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
                    <aside className="lg:sticky lg:top-8">{rightRail}</aside>
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
