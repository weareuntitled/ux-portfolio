'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, FolderKanban, ArrowUpRight, Mail, Phone, Sparkles, Star, FileText, Zap } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';

import { HeroSection } from '@/components/landing/HeroSection';
import { ClientLogos } from '@/components/landing/ClientLogos';
import { KontrastBanner } from '@/components/landing/KontrastBanner';
import { AboutToolsSection } from '@/components/landing/AboutToolsSection';
import { TextMarqueeSection } from '@/components/landing/TextMarqueeSection';
import { AccountRequestBand } from '@/components/project/AccountRequestBand';
import { getAllProjects, getProjectCoverImage, getProjectBySlug } from '@/content/portfolio';
import type { PortfolioProject } from '@/content/portfolio.types';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { cn } from '@/lib/utils';
import { contact } from '@/content/home';

const gswinFeatured = getProjectBySlug('gswin-erp-migration');
const gswinFeaturedCover = gswinFeatured ? getProjectCoverImage(gswinFeatured) : null;

const jobHunter = getProjectBySlug('job-hunter');

const ENTERPRISE_SLUGS = ['kovon', 'ffp-dashboard', 'automation', 'emission-compliance'];

function ProjectCard({ project }: { project: PortfolioProject }) {
  const reduceMotion = useReducedMotion();
  const isMotion = project.category === 'Motion';
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
          'group block overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f12] backdrop-blur-2xl',
          'transition-all duration-400 ease-card-hover',
          'hover:border-primary/40 hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
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
    <section className="relative overflow-hidden bg-[#0f0f12]">
      {/* Inner padding container */}
      <div className="mx-auto max-w-2xl py-20 px-4 text-white md:py-28 md:px-6">
        {/* Gradient wash */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        {/* Noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
          className="mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
        >
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-white/5 bg-muted ring-2 ring-primary/20 md:h-28 md:w-28">
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        </motion.div>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Let&apos;s build something.
        </motion.h2>

        <motion.p
          className="mb-8 text-base leading-relaxed text-white/60"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
        >
          {contact.tagline}
        </motion.p>

        <motion.div
          className="mb-8 space-y-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.15, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="group mx-auto inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-primary"
          >
            {contact.email}
            <ArrowUpRight className="h-4 w-4 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
          <div className="flex items-center justify-center gap-6 text-sm text-white/50">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {contact.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.2, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}?subject=Hello%20%E2%80%94%20project%20inquiry`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send a message
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();
  const allProjects = getAllProjects();
  const enterpriseProjects = allProjects.filter(p => ENTERPRISE_SLUGS.includes(p.slug));
  const tracklistify = getProjectBySlug('tracklistify');

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 2. Client Logos — Full width, seamless from hero */}
      <ClientLogos />

      {/* 3. Job Hunter Band — Side Project Hero-Strip */}
      {jobHunter && (
        <section className="py-12 md:py-16">
          <div className="w-full px-4 sm:px-6">
            <Link
              href={`/projects/${jobHunter.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative h-[220px] md:h-[260px]">
                <Image
                  src="/projects/job-hunter_hero.jpg"
                  alt="Job Hunter"
                  fill
                  className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                  sizes="(max-width: 1280px) 100vw, 1400px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
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

          {/* Project thumbnails grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gswinFeatured && (
              <motion.div
                className="sm:col-span-2 lg:col-span-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
              >
                <Link
                  href={`/projects/${gswinFeatured.slug}`}
                  className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                    <div className="relative aspect-[2.4/1] w-full bg-muted">
                      {gswinFeaturedCover ? (
                        <Image
                          src={gswinFeaturedCover}
                          alt={`${gswinFeatured.title} cover`}
                          fill
                          quality={75}
                          fetchPriority="low"
                          sizes="(max-width: 1280px) 100vw, 1024px"
                          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                          unoptimized={shouldUnoptimizeImage(gswinFeaturedCover)}
                        />
                      ) : (
                        <div className="flex h-full min-h-[140px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                          <FileText className="h-12 w-12 text-muted-foreground/50" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {gswinFeatured.category} · {gswinFeatured.year}
                        </p>
                        {gswinFeatured.ribbonLabel && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                            <Sparkles className="h-3 w-3" />
                            {gswinFeatured.ribbonLabel}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      </div>
                      <h3 className="mb-1 text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{gswinFeatured.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{gswinFeatured.oneLiner}</p>
                      {gswinFeatured.impactCards && gswinFeatured.impactCards.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3 border-t border-border/40 pt-3">
                          {gswinFeatured.impactCards.slice(0, 3).map((card: { label: string; value: string }) => (
                            <div key={card.label} className="flex flex-col">
                              <span className="font-mono text-lg font-semibold tabular-nums text-primary">{card.value}</span>
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">{card.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </motion.div>
            )}
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Side Project — Tracklistify set curation banner */}
      {tracklistify?.accountRequestEndpoint && (
        <AccountRequestBand
          variant="compact"
          endpoint={tracklistify.accountRequestEndpoint}
          coverUrl={getProjectCoverImage(tracklistify) ?? undefined}
          projectUrl={`/projects/${tracklistify.slug}`}
        />
      )}

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
