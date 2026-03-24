'use client';

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
import { contact } from '@/content/home';
import { getProjectBySlug, type PortfolioProject } from '@/content/portfolio';
import { EducationSection } from '@/components/landing/EducationSection';
import { ExperienceTimelineSection } from '@/components/landing/ExperienceTimelineSection';
import { isRemoteImageSrc } from '@/lib/project-assets';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';
const EASE = [0.16, 1, 0.3, 1] as const;

function coverUnoptimized(src: string) {
  return isRemoteImageSrc(src) || src.toLowerCase().endsWith('.gif');
}

const selectedFeatured = getProjectBySlug('kovon');
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
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="group relative inline-flex cursor-help items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-green-500 transition-colors hover:bg-green-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Available
                <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-max rounded-md border border-border bg-popover px-3 py-2 text-xs normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  Open for Product Design roles in Automotive & Enterprise.
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Automotive</span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Enterprise</span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">UX/UI</span>
            </div>

            <div>
              <motion.h1
                className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15, ease: EASE }}
              >
                {contact.name}.
              </motion.h1>
              <motion.p
                className="mt-4 text-xl font-medium text-primary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.23, ease: EASE }}
              >
                Senior Enterprise Product Designer
              </motion.p>
              <motion.p
                className="mt-1 text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.31, ease: EASE }}
              >
                UX/UI for automotive and enterprise systems
              </motion.p>
            </div>

            <motion.p
              className="max-w-lg text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.39, ease: EASE }}
            >
              I design enterprise products for compliance, diagnostics, and automation, translating complex architecture into clear workflows that teams can execute with confidence.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
            >
              <Link href="#featured-projects" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Explore projects
                <ChevronDown className="h-4 w-4" />
              </Link>
              <Link href="/cv" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                View CV
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full max-w-md shrink-0 lg:w-[420px]"
            initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-border/30 transition-shadow hover:shadow-md">
              <div className="relative aspect-square w-full bg-muted">
                <Image
                  src={contact.profileImage}
                  alt={contact.name}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 420px"
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
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
        >
          {[
            { icon: Package, badge: 'Enterprise', k: 'Enterprise tools shipped', v: '3', d: 'Compliance and diagnostic systems' },
            { icon: Users, badge: '8020', k: 'Websites and apps shipped', v: '30+', d: 'Delivered in consulting teams' },
            { icon: Sparkles, badge: 'Freelance', k: 'Brands elevated', v: '10+', d: 'Branding and design from scratch', hi: true },
            { icon: Zap, badge: 'Focus', k: 'Product direction', v: 'UX/UI', d: 'Product design and delivery ownership' },
          ].map((item) => (
            <motion.div
              key={item.k}
              className={`group flex flex-col gap-2 rounded-xl border p-6 transition-colors ${item.hi ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' : 'border-border bg-muted/20 hover:bg-muted/40'}`}
              variants={{ hidden: { opacity: 0, y: 14, scale: 0.985 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE } } }}
            >
              <div className="flex items-center justify-between">
                <item.icon className={`h-5 w-5 ${item.hi ? 'text-primary' : 'text-muted-foreground transition-colors group-hover:text-primary'}`} />
                <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${item.hi ? 'border-primary/20 bg-background/40 text-primary/80' : 'border-border bg-background/40 text-muted-foreground'}`}>{item.badge}</span>
              </div>
              <p className={`text-xs uppercase tracking-widest ${item.hi ? 'text-primary/70' : 'text-muted-foreground'}`}>{item.k}</p>
              <p className={`text-2xl font-semibold tracking-tight ${item.hi ? 'text-primary' : 'text-foreground'}`}>{item.v}</p>
              <p className={`text-xs ${item.hi ? 'text-primary/70' : 'text-muted-foreground'}`}>{item.d}</p>
            </motion.div>
          ))}
        </motion.section>

        <section className="space-y-6 pt-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Core Capabilities</h2>
            <p className="text-sm text-muted-foreground">End-to-end product strength: from discovery and UX depth to technical execution and delivery leadership.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { icon: Box, title: 'Methodical Thinking', body: 'Discovery and alignment: shadowing, interviews, workflow mapping, requirements, stakeholder alignment, and decision framing.' },
              { icon: Users, title: 'Product-Centric Delivery', body: 'Turn insights into shippable UI: interaction concept, information architecture, prototypes, handoff, and iteration with engineering constraints.' },
              { icon: FileText, title: 'Tools and Systems Fluency', body: 'Fluent across systems: Jira, Confluence, Figma, prototyping, and technical collaboration. Comfortable translating process into automation-ready specs.' },
              { icon: Workflow, title: 'System Thinking', body: 'Translate enterprise complexity into coherent architecture: clear ownership, scalable components, and low-cognitive-load decision paths.' },
            ].map((item) => (
              <motion.article
                key={item.title}
                className="group relative overflow-hidden rounded-full border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE } } }}
              >
                <div className="flex min-h-16 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center rounded-full bg-black/60 px-8 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm leading-relaxed text-white">{item.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <motion.section
          className="space-y-6 pt-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Leadership</h2>
          </div>
          <article className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md sm:flex-row">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Operations & Scale</span>
              </div>
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">Kontrast Festival</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Co-founded and scaled a cultural event. Led cross-functional teams and built operational processes. Grew the event to <strong>4,000+ attendees</strong> and <strong>EUR250k+ revenue</strong>.
              </p>
              <a href="https://instagram.com/kontrastfestival.archive" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-500">
                Kontrast Festival Archive on Instagram
              </a>
            </div>
            <div className="hidden shrink-0 items-center justify-center p-4 sm:flex">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
                <Sparkles className="h-7 w-7" strokeWidth={2} />
              </div>
            </div>
          </article>
        </motion.section>

        <section id="featured-projects" className="scroll-mt-24 space-y-8 pt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Selected Works</h2>
              <p className="mt-1 text-sm text-muted-foreground">Enterprise case studies focused on clarity, control, and delivery impact.</p>
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
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {selectedFeatured ? (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.6, ease: EASE } } }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <Link
                  href={`/projects/${selectedFeatured.slug}`}
                  className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                    <div className="relative aspect-[2.4/1] w-full bg-muted">
                      {selectedFeatured.moodImageUrl ? (
                        <Image
                          src={selectedFeatured.moodImageUrl}
                          alt=""
                          fill
                          sizes="(max-width: 1280px) 100vw, 1024px"
                          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                          unoptimized={coverUnoptimized(selectedFeatured.moodImageUrl)}
                        />
                      ) : (
                        <div className="flex h-full min-h-[140px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                          <FileText className="h-12 w-12 text-muted-foreground/50" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {selectedFeatured.category} · {selectedFeatured.year}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                          <Star className="h-3 w-3 fill-current" />
                          Featured
                        </span>
                      </div>
                      <h3 className="mb-1 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">{selectedFeatured.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedFeatured.oneLiner}</p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-3">
              {selectedGrid.map((item) => (
                <motion.div
                  key={item.slug}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE } } }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                      <div className="relative aspect-video w-full bg-muted">
                        {item.moodImageUrl ? (
                          <Image
                            src={item.moodImageUrl}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                            unoptimized={coverUnoptimized(item.moodImageUrl)}
                          />
                        ) : (
                          <div className="flex h-full min-h-[160px] items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                            <Workflow className="h-10 w-10 text-muted-foreground/50" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {item.category} · {item.year}
                        </p>
                        <h3 className="mb-1 mt-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                        <p className="mb-4 flex-1 text-sm text-muted-foreground">{item.oneLiner}</p>
                        <ul className="mt-auto flex flex-wrap gap-2">
                          {(item.tags ?? []).map((tag) => (
                            <li key={tag} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.section
          id="profile"
          className="scroll-mt-24 space-y-16 pt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
        >
          <ExperienceTimelineSection />
          <EducationSection />
        </motion.section>

        <motion.footer
          className="mt-32 rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm md:px-12 md:py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Let’s connect</h2>
            <p className="text-sm text-muted-foreground">If you want a Product Designer who can handle complex enterprise workflows, I’m happy to talk.</p>
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
