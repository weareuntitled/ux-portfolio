'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown,
  Package,
  Users,
  Mail,
  Sparkles,
  Zap,
  ExternalLink,
  Box,
  FileText,
  Star,
  Workflow,
} from 'lucide-react';
import { contact, identityRolePrimary, identityRoleSecondary } from '@/content/home';
import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import { getProjectBySlug, getProjectCoverImage, type PortfolioProject } from '@/content/portfolio';
// Central landing copy lives in src/content/landing-copy.json
import landingCopy from '@/content/landing-copy.json';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { EASE, DUR } from '@/lib/motion';

/** Below-fold sections: separate JS chunks + defer parse on slow connections */
function BelowFoldSkeleton() {
  return (
    <div
      className="min-h-[200px] animate-pulse rounded-2xl border border-border bg-muted/20"
      aria-hidden
    />
  );
}

const ExperienceTimelineSection = dynamic(
  () =>
    import('@/components/landing/ExperienceTimelineSection').then((m) => ({
      default: m.ExperienceTimelineSection,
    })),
  { loading: () => <BelowFoldSkeleton /> },
);

const EducationSection = dynamic(
  () => import('@/components/landing/EducationSection').then((m) => ({ default: m.EducationSection })),
  { loading: () => <BelowFoldSkeleton /> },
);

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';
const iconMap: Record<string, React.ElementType> = {
  Package,
  Users,
  Sparkles,
  Zap,
  Box,
  FileText,
  Workflow
};

const selectedFeatured = getProjectBySlug('kovon');
const selectedFeaturedCover = selectedFeatured ? getProjectCoverImage(selectedFeatured) : null;
const kontrastProject = getProjectBySlug('kontrast-festival');
const kontrastCover = kontrastProject ? getProjectCoverImage(kontrastProject) : null;
const selectedGrid = (['ffp-dashboard', 'emission-compliance', 'automation'] as const)
  .map((slug) => getProjectBySlug(slug))
  .filter((p): p is PortfolioProject => p != null);

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
        <section className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between" aria-label="Hero">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-2">
              {/* AVAILABLE: filled status pill — visually distinct from skill chips */}
              <div className="group relative inline-flex cursor-help items-center gap-2 rounded-full bg-green-500 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm shadow-green-500/25 transition-colors hover:bg-green-600">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Available
                <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 max-w-[min(90vw,320px)] rounded-md border border-border bg-popover px-3 py-2 text-xs normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {landingCopy.hero.availableTooltip}
                </div>
              </div>
              {/* Skill chips: outlined gray pills */}
              {landingCopy.hero.chips.map((chip) => (
                <span key={chip} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {chip}
                </span>
              ))}
            </div>

            {/* Mobile-only: photo between chips and name so users see a face first */}
            <motion.div
              className="block lg:hidden"
              initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: reduceMotion ? 0 : DUR.xl, ease: EASE }}
            >
              <div className="mx-auto max-w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-border/30">
                <div className="relative aspect-square w-full bg-muted">
                  <Image
                    src={contact.profileImage}
                    alt={contact.name}
                    fill
                    priority
                    fetchPriority="high"
                    quality={80}
                    className="object-cover object-center"
                    sizes="280px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent dark:from-background/40" aria-hidden />
                </div>
              </div>
            </motion.div>

            <div>
              <motion.h1
                className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.12, ease: EASE }}
              >
                {contact.name}.
              </motion.h1>
              <motion.p
                className="mt-4 text-pretty text-xl font-medium leading-tight text-primary sm:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.22, ease: EASE }}
              >
                {identityRolePrimary}
              </motion.p>
              <motion.p
                className="mt-2 text-pretty text-sm font-medium leading-relaxed text-muted-foreground sm:text-base"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.32, ease: EASE }}
              >
                {identityRoleSecondary}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.44, ease: EASE }}
            >
              <Link href="#featured-projects" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Explore projects
                <ChevronDown className="h-4 w-4" />
              </Link>
              <Link href="/cv" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                View CV
              </Link>
            </motion.div>

            <motion.p
              className="max-w-lg text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.56, ease: EASE }}
            >
              {landingCopy.hero.description}
            </motion.p>
          </motion.div>

          {/* Desktop-only: large photo on the right */}
          <motion.div
            className="hidden lg:block w-full max-w-md shrink-0 lg:w-[420px]"
            initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0 : DUR.xl, ease: EASE }}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-border/30 transition-shadow hover:shadow-md">
              <div className="relative aspect-square w-full bg-muted">
                <Image
                  src={contact.profileImage}
                  alt={contact.name}
                  fill
                  priority
                  fetchPriority="high"
                  quality={80}
                  className="object-cover object-center"
                  sizes="420px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent dark:from-background/40"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]" aria-hidden />
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="grid grid-cols-2 gap-4 pt-20 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {landingCopy.stats.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.k}
                className={`group flex flex-col gap-2 rounded-xl border p-6 transition-colors ${item.hi ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' : 'border-border bg-muted/20 hover:bg-muted/40'}`}
                variants={{ hidden: { opacity: 0, y: 14, scale: 0.985 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : DUR.md, ease: EASE } } }}
              >
                <div className="flex items-center justify-between">
                  {Icon && <Icon className={`h-5 w-5 ${item.hi ? 'text-primary' : 'text-muted-foreground transition-colors group-hover:text-primary'}`} />}
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${item.hi ? 'border-primary/20 bg-background/40 text-primary/80' : 'border-border bg-background/40 text-muted-foreground'}`}>{item.badge}</span>
                </div>
                <p className={`text-xs uppercase tracking-widest ${item.hi ? 'text-primary/70' : 'text-muted-foreground'}`}>{item.k}</p>
                <p className={`text-2xl font-semibold tracking-tight ${item.hi ? 'text-primary' : 'text-foreground'}`}>{item.v}</p>
                <p className={`text-xs ${item.hi ? 'text-primary/70' : 'text-muted-foreground'}`}>{item.d}</p>
              </motion.div>
            );
          })}
        </motion.section>

        <section className="space-y-6 pt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl mb-3">{landingCopy.coreCapabilities.title}</h2>
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">{landingCopy.coreCapabilities.subtitle}</p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {landingCopy.coreCapabilities.items.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-sm ring-1 ring-border/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:ring-primary/30"
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : DUR.md, ease: EASE } } }}
                >
                  <div className="relative h-40 w-full overflow-hidden sm:h-44">
                    <Image
                      src={item.img}
                      alt=""
                      fill
                      quality={75}
                      fetchPriority="low"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  </div>
                  <div className="relative z-10 p-8 pt-0 -mt-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border transition-transform duration-500 group-hover:scale-110" style={{ rotate: i % 2 === 0 ? '0deg' : '0deg' }}>
                      {Icon && <Icon className="h-6 w-6 text-foreground" />}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold leading-snug tracking-tight text-foreground">{item.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80">
                      {item.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <motion.section
          className="space-y-6 pt-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">{landingCopy.leadership.title}</h2>
          </div>
          <article className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-sm ring-1 ring-border/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:ring-primary/30">
            <div className="relative h-48 w-full overflow-hidden sm:h-64">
              {kontrastCover && (
                <Image
                  src={kontrastCover}
                  alt="Kontrast Festival background"
                  fill
                  quality={75}
                  fetchPriority="low"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  unoptimized={shouldUnoptimizeImage(kontrastCover)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
            </div>
            <div className="relative z-10 p-8 pt-0 -mt-12">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border transition-transform duration-500 group-hover:scale-110">
                <BrandLogoMark id="kontrastFestival" label="Kontrast Festival Logo" size={40} className="h-8 w-auto text-foreground" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{landingCopy.leadership.badge}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{landingCopy.leadership.projectTitle}</h3>
              <p 
                className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: landingCopy.leadership.bodyHtml }}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/projects/kontrast-festival"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Case study
                </Link>
                <a
                  href="https://instagram.com/kontrastfestival.archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Instagram archive
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </a>
              </div>
            </div>
          </article>
        </motion.section>

        <section id="featured-projects" className="scroll-mt-24 space-y-8 pt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">{landingCopy.selectedWorks.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{landingCopy.selectedWorks.subtitle}</p>
            </div>
            <Link href="/projects" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View all
            </Link>
          </div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          >
            {selectedFeatured ? (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : DUR.md, ease: EASE } } }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <Link
                  href={`/projects/${selectedFeatured.slug}`}
                  className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                    <div className="relative aspect-[2.4/1] w-full bg-muted">
                      {selectedFeaturedCover ? (
                        <Image
                          src={selectedFeaturedCover}
                          alt={`${selectedFeatured.title} cover`}
                          fill
                          quality={75}
                          fetchPriority="low"
                          sizes="(max-width: 1280px) 100vw, 1024px"
                          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                          unoptimized={shouldUnoptimizeImage(selectedFeaturedCover)}
                        />
                      ) : (
                        <div className="flex h-full min-h-[140px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                          <FileText className="h-12 w-12 text-muted-foreground/50" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {selectedFeatured.category} · {selectedFeatured.year}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      </div>
                      <h3 className="mb-1 text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{selectedFeatured.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{selectedFeatured.oneLiner}</p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-3">
              {selectedGrid.map((item) => {
                const cover = getProjectCoverImage(item);
                return (
                  <motion.div
                    key={item.slug}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : DUR.md, ease: EASE } } }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <Link
                      href={`/projects/${item.slug}`}
                      className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                        <div className="relative aspect-video w-full bg-muted">
                          {cover ? (
                            <Image
                              src={cover}
                              alt={`${item.title} cover`}
                              fill
                              quality={75}
                              fetchPriority="low"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                              unoptimized={shouldUnoptimizeImage(cover)}
                            />
                          ) : (
                            <div className="flex h-full min-h-[160px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                              <Workflow className="h-10 w-10 text-muted-foreground/50" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            {item.category} · {item.year}
                          </p>
                          <h3 className="mb-1 mt-2 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.oneLiner}</p>
                          <ul className="mt-auto flex flex-wrap gap-2">
                            {(item.tags ?? []).map((tag) => (
                              <li key={tag} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">{tag}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <motion.section
          id="profile"
          className="scroll-mt-24 space-y-16 pt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <ExperienceTimelineSection />
          <EducationSection />
        </motion.section>

        <motion.footer
          className="mt-32 rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm md:px-12 md:py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{landingCopy.footer.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{landingCopy.footer.subtitle}</p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <a href={`mailto:${contact.email}`} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto">
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm font-medium text-muted-foreground">
              <a className="transition-colors hover:text-foreground" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://instagram.com/contrastfestival.archive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-foreground">
                Instagram
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
              <a href={MOTION_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 transition-colors hover:text-foreground">
                Motion Portfolio
                <ExternalLink className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
