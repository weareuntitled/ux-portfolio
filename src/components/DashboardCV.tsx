'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
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
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { contact, identityName, identityRole } from '@/content/home';
import { getAllProjects } from '@/content/portfolio';
import type { NavProjectWithImage } from '@/lib/cms/projects-nav';

import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs';
import type { LucideIcon } from 'lucide-react';

const MotionLink = motion(
  Link as React.ComponentType<{ href: string; className?: string; children?: React.ReactNode }>
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

function SidebarContent({ navProjects: navProjectsProp }: { navProjects?: NavProjectWithImage[] }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const navProjects: NavProjectWithImage[] = useMemo(() => {
    if (navProjectsProp?.length) return navProjectsProp;
    return getAllProjects().map((p) => ({
      slug: p.slug,
      title: p.title,
      moodImageUrl: p.moodImageUrl ?? null,
      category: p.category,
    }));
  }, [navProjectsProp]);

  const { enterprise, side } = useMemo(() => {
    const enterprise = navProjects.filter((p) => p.category === 'Enterprise');
    const side = navProjects.filter((p) => p.category === 'Side');
    return { enterprise, side };
  }, [navProjects]);

  const EASE = [0.16, 1, 0.3, 1] as const;

  const vWrap = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.25, when: 'beforeChildren', staggerChildren: 0.05, ease: EASE },
    },
  };

  const vItem = {
    hidden: { opacity: 0, x: -10 },
    show: reduceMotion
      ? { opacity: 1, x: 0, transition: { duration: 0 } }
      : { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
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
        whileHover={reduceMotion ? undefined : { x: 2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-rail"
              className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-1 rounded-full bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE }}
            />
          )}
        </AnimatePresence>

        {leading ? (
          leading
        ) : (
          <motion.span
            className="grid h-6 w-6 place-items-center"
            animate={isActive && !reduceMotion ? { scale: 1.05 } : { scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE }}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
          </motion.span>
        )}

        <span className="truncate">{label}</span>
      </MotionLink>
    );
  }

  function ProjectLeading({ moodImageUrl }: { moodImageUrl: string | null }) {
    if (!moodImageUrl) {
      return (
        <motion.span className="grid h-6 w-6 place-items-center" whileHover={reduceMotion ? undefined : { rotate: -3 }}>
          <Box className="h-4 w-4 shrink-0" aria-hidden />
        </motion.span>
      );
    }

    return (
      <motion.div
        className="relative h-6 w-6 shrink-0 overflow-hidden rounded border border-border bg-muted"
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE }}
      >
        <Image src={moodImageUrl} alt="" fill className="object-cover" sizes="24px" />
      </motion.div>
    );
  }

  function ProjectSection({ title, items }: { title: string; items: NavProjectWithImage[] }) {
    if (!items.length) return null;

    return (
      <motion.div variants={vItem} className="mt-4 border-t border-border pt-3">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className="space-y-1">
          {items.map((project) => {
            const href = `/projects/${project.slug}`;
            const isActive = pathname === href;
            return (
              <NavRow
                key={project.slug}
                label={project.title}
                href={href}
                icon={Box}
                isActive={isActive}
                leading={<ProjectLeading moodImageUrl={project.moodImageUrl ?? null} />}
              />
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="flex h-full flex-col" variants={vWrap} initial="hidden" animate="show" key={pathname}>
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(600px 350px at 20% 10%, rgba(132,204,22,0.18), transparent 60%), radial-gradient(700px 500px at 70% 70%, rgba(132,204,22,0.10), transparent 60%)',
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        />
      )}

      <motion.div variants={vItem} className="border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE }}
          >
            <Image src={contact.profileImage} alt="" fill className="object-cover" sizes="40px" />
          </motion.div>
          <div>
            <p className="font-semibold text-foreground">{identityName}</p>
            <p className="text-xs text-muted-foreground">{identityRole}</p>
          </div>
        </div>
      </motion.div>

      <motion.nav variants={vItem} className="mt-5 space-y-1" aria-label="Sidebar navigation">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
          return <NavRow key={label} label={label} href={href} icon={icon} isActive={isActive} />;
        })}

        <ProjectSection title="Enterprise" items={enterprise} />
        <ProjectSection title="Side projects" items={side} />
      </motion.nav>

      <motion.div variants={vItem} className="mt-auto border-t border-border pt-5 text-sm">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </Link>
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <Mail className="h-4 w-4" aria-hidden />
          {contact.email}
        </a>
      </motion.div>
    </motion.div>
  );
}

const defaultBreadcrumbs: BreadcrumbItem[] = [{ label: 'Daniel Peters', href: '/' }, { label: 'Overview' }];

function DashboardCVImpl({
  children,
  searchQuery = '',
  onSearchChange,
  navProjects,
  breadcrumbs = defaultBreadcrumbs,
  pageTitle = 'Dashboard',
  variant = 'default',
  rightRail,
  headerRight,
  showSearch = true,
}: DashboardCVProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const isLanding = variant === 'landing';
  const isProject = variant === 'project';
  const renderSearch = Boolean(onSearchChange) && showSearch;

  return (
    <div className="min-h-screen text-foreground">
      <div className="container-wrapper section-soft flex flex-1 flex-col pb-6">
        <div className="theme-container container flex flex-1 scroll-mt-20 flex-col">
          <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-background/40 bg-clip-padding backdrop-blur-2xl md:flex-1 xl:rounded-xl">
            <div className="mx-auto grid min-h-svh w-full max-w-[1400px] gap-0 md:grid-cols-[16rem_1fr]">
              <motion.aside
                className="relative hidden min-h-[calc(100vh-2rem)] flex-col border-r border-border bg-sidebar p-5 text-sidebar-foreground md:flex"
                aria-label="Main navigation"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <SidebarContent navProjects={navProjects} />
              </motion.aside>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger
                  className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="left" className="relative w-64 border-border bg-background p-5">
                  <div className="flex min-h-full flex-col pt-8">
                    <SidebarContent navProjects={navProjects} />
                  </div>
                </SheetContent>
              </Sheet>

              <main className="flex min-w-0 flex-1 flex-col">
                <section
                  className={cn('min-w-0 flex-1 space-y-6 p-4 md:p-6', isLanding ? 'pt-6 md:pt-8' : 'pt-14 md:pt-6')}
                >
                  {!isLanding && (
                    <header
                      className={cn(
                        'flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between',
                        isProject && 'sm:flex-row sm:items-center'
                      )}
                      style={{ backgroundColor: 'rgba(21, 24, 30, 0)', borderColor: 'rgba(40, 44, 51, 0)' }}
                    >
                      <div>
                        <Breadcrumbs items={breadcrumbs} />
                        {!isProject && (
                          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{pageTitle}</h1>
                        )}
                      </div>

                      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                        {renderSearch && (
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
                        )}
                        {headerRight}
                      </div>
                    </header>
                  )}

                  <div className={cn('min-w-0', rightRail && 'grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]')} >
                    <div className="min-w-0">{children}</div>
                    {rightRail ? <aside className="min-w-0 space-y-4">{rightRail}</aside> : null}
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DashboardCV = DashboardCVImpl;
export default DashboardCVImpl;