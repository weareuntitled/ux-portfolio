'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, FolderKanban, ArrowUpRight, Mail, Phone, Star, FileText, Zap, KeyRound } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';

import { HeroSection } from '@/components/landing/HeroSection';
import { CareerSection } from '@/components/landing/CareerSection';
import { ClientLogos } from '@/components/landing/ClientLogos';
import { KontrastBanner } from '@/components/landing/KontrastBanner';
import { AboutToolsSection } from '@/components/landing/AboutToolsSection';
import { TextMarqueeSection } from '@/components/landing/TextMarqueeSection';
import { getAllProjects, getProjectCoverImage, getProjectBySlug } from '@/content/portfolio';
import type { PortfolioProject } from '@/content/portfolio.types';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { cn } from '@/lib/utils';
import { contact } from '@/content/home';

const gswinFeatured = getProjectBySlug('gswin-erp-migration');
const gswinFeaturedCover = gswinFeatured ? getProjectCoverImage(gswinFeatured) : null;
const diggrFeatured = getProjectBySlug('diggr');
const diggrFeaturedCover = diggrFeatured ? getProjectCoverImage(diggrFeatured) : null;

const jobHunter = getProjectBySlug('job-hunter');

const ENTERPRISE_SLUGS = ['kovon', 'ffp-dashboard', 'automation', 'emission-compliance'];

function FeaturedCard({ project, cover, index }: { project: PortfolioProject; cover: string | null; index: number }) {
  return (
    <motion.div
      className="sm:col-span-2 lg:col-span-2"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-sm transition-all duration-300 group-hover:border-black group-hover:shadow-lg">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            {cover ? (
              <Image
                src={cover}
                alt={`${project.title} cover`}
                fill
                quality={75}
                fetchPriority="low"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                unoptimized={shouldUnoptimizeImage(cover)}
              />
            ) : (
              <div className="flex h-full min-h-[100px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                <FileText className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {project.category} · {project.year}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-white">
                <Star className="h-2.5 w-2.5 fill-current" />
                Featured
              </span>
              {project.accountRequestEndpoint && (
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-primary"
                  title="Live demo available — request access on the project page"
                >
                  <KeyRound className="h-2.5 w-2.5" />
                  Live demo · request access
                </span>
              )}
            </div>
            <h3 className="mb-1 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-black">
              {project.title}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {project.oneLiner}
            </p>
            {project.impactCards && project.impactCards.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3 border-t border-border/40 pt-2">
                {project.impactCards.slice(0, 2).map((card: { label: string; value: string }) => (
                  <div key={card.label} className="flex flex-col">
                    <span className="font-mono text-sm font-semibold tabular-nums text-black">{card.value}</span>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70">{card.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const reduceMotion = useReducedMotion();
  const isMotion = project.category === 'Motion & 3D';
  const Icon = isMotion ? Film : FolderKanban;
  const cover = getProjectCoverImage(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE, delay: Math.min(0.03, 0.25) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          'group block overflow-hidden rounded-lg border border-neutral-300 bg-white',
          'transition-all duration-400 ease-card-hover',
          'hover:border-black hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} cover`}
              fill
              className="object-cover transition-transform duration-400 ease-card-hover group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={shouldUnoptimizeImage(cover)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <Icon className="h-6 w-6" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 ease-card-hover group-hover:opacity-100">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span>{project.category}</span>
            {project.year ? <span className="ml-auto font-normal tracking-normal">{project.year}</span> : null}
          </div>

          <h3 className="mt-2 text-base font-semibold tracking-[-0.04em]">{project.title}</h3>
          {project.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p> : null}
          {project.oneLiner ? <p className="mt-2 text-sm text-muted-foreground">{project.oneLiner}</p> : null}
        </div>
      </Link>
    </motion.div>
  );
}

function ContactFooterSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Subtle radial wash in white for depth */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 md:py-32">
        {/* Status badge */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {contact.status}
          </span>
        </motion.div>

        {/* Profile + Identity */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
        >
          <div className="relative mb-6 h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/10 ring-offset-2 ring-offset-black md:h-24 md:w-24">
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              className="object-cover grayscale-[20%]"
              sizes="96px"
            />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">
            {contact.name}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            M.Sc. UX Design (1.3) · Certified Scrum Master
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="mb-5 text-center font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white md:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Let&apos;s build
          <br />
          <span className="text-accent">something real.</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="mx-auto mb-12 max-w-xl text-center text-base leading-relaxed text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
        >
          {contact.tagline}
        </motion.p>

        {/* Contact links grid */}
        <motion.div
          className="mb-10 grid gap-3 sm:grid-cols-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.15, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-white/30 hover:bg-white/[0.06]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors group-hover:bg-white group-hover:text-black">
              <Mail className="h-4 w-4" />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Email
              </span>
              <span className="truncate text-sm font-medium text-white">{contact.email}</span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>

          <a
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-white/30 hover:bg-white/[0.06]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors group-hover:bg-white group-hover:text-black">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Phone
              </span>
              <span className="truncate text-sm font-medium text-white">{contact.phone}</span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-white/30 hover:bg-white/[0.06] sm:col-span-2"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors group-hover:bg-white group-hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                LinkedIn
              </span>
              <span className="truncate text-sm font-medium text-white">linkedin.com/in/daniel-peters-055296203</span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.2, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}?subject=Project%20inquiry%20%E2%80%94%20let%27s%20talk`}
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_50px_-10px_rgba(255,255,255,0.5)] active:scale-[0.99]"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Augsburg · Hybrid Munich area · Remote-first
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();
  const allProjects = getAllProjects();
  const enterpriseProjects = allProjects.filter(p => ENTERPRISE_SLUGS.includes(p.slug));

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 1b. Career — Matt-style flat list (decision #15: after Hero, before ClientLogos) */}
      <CareerSection />

      {/* 2. Client Logos — Full width, seamless from hero */}
      <ClientLogos />

      {/* 3. Job Hunter Band — Side Project Hero-Strip */}
      {jobHunter && (
        <section className="py-12 md:py-16">
          <div className="w-full px-4 sm:px-6">
            <Link
              href={`/projects/${jobHunter.slug}`}
              className="group block overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-sm transition-all duration-300 hover:border-black hover:shadow-lg"
            >
              <div className="relative h-[220px] md:h-[260px]">
                <Image
                  src="/projects/job-hunter_hero.jpg"
                  alt="Job Hunter"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1280px) 100vw, 1400px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                      <Zap className="h-3 w-3" />
                      AI Automation
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                      Side Project · 2026
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    Job Hunter
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground/80">
                    Autonomous Application Agent.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-6">
                    {jobHunter.impactCards?.slice(0, 3).map((card) => (
                      <div key={card.label} className="flex flex-col">
                        <span className="font-mono text-xl font-semibold tabular-nums text-primary md:text-2xl">
                          {card.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                          {card.label}
                        </span>
                      </div>
                    ))}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      How it works
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 4. Selected Work — Enterprise project thumbnails */}
      <section className="py-20 md:py-28">
        <div className="w-full px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            className="mb-16 flex items-end justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">Selected Work</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Enterprise Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              View all →
            </Link>
          </motion.div>

          {/* Project thumbnails grid — 2 featured (Gswin + DIGGR), then enterprise projects */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gswinFeatured && (
              <FeaturedCard project={gswinFeatured} cover={gswinFeaturedCover} index={0} />
            )}
            {diggrFeatured && (
              <FeaturedCard project={diggrFeatured} cover={diggrFeaturedCover} index={1} />
            )}
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIGGR — access request band lives on the detail page now. */}

      {/* 6. Kontrast Festival — Light emphasis */}
      <KontrastBanner />

      {/* 7. Marquee — Motion */}
      <TextMarqueeSection
        words={['MOTION', 'PROJECTS', 'SYSTEMS', 'DESIGN', 'PRODUCT', 'STRATEGY', 'SHIP', 'BUILD']}
      />

      {/* 8. About + Tools — Inverse dark */}
      <AboutToolsSection />

      {/* 9. Contact Footer */}
      <ContactFooterSection />
    </main>
  );
}
