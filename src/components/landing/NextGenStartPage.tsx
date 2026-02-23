'use client';

import Image from 'next/image';
import Link from 'next/link';
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
  Info,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { contact } from '@/content/home';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

function HoverTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      {children}
      <div className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-[260px] rounded-md border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {label}
      </div>
    </div>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  const t = {
    heroCard: reduceMotion ? 0 : 0.85,
    heroImage: reduceMotion ? 0 : 0.9,
    left: reduceMotion ? 0 : 0.75,
    proof: reduceMotion ? 0 : 0.6,
  };

  const vHeroCard = {
    hidden: { opacity: 0, y: -26, scale: 0.965 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: t.heroCard, ease: EASE },
    },
  };

  const vHeroImage = {
    hidden: { opacity: 0.9, x: -12, scale: 1.08, filter: 'blur(2px)' },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: t.heroImage, ease: EASE, delay: reduceMotion ? 0 : 0.12 },
    },
  };

  const vLeft = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: t.left, ease: EASE, delay: reduceMotion ? 0 : 0.22 },
    },
  };

  const vProofWrap = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.62,
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const vProofItem = {
    hidden: { opacity: 0, y: 14, scale: 0.985 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: t.proof, ease: EASE },
    },
  };

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-background">
      <div className="mx-auto max-w-5xl space-y-24 px-4 py-8 md:px-8 md:py-16">
        {/* Hero */}
        <section
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
          aria-label="Hero"
        >
          {/* Left side builds after the picture card */}
          <motion.div
            className="flex-1 space-y-6"
            variants={vLeft}
            initial="hidden"
            animate="show"
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

              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Automotive
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Enterprise
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                UX/UI
              </span>
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                {contact.name}.
              </h1>
              <p className="mt-4 text-xl font-medium text-primary">Product Designer, UX/UI</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                for Automotive & Enterprises
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              I design internal enterprise tools for compliance, diagnostics, and automation. Turning complex
              systems into clear workflows that teams can run daily.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#featured-projects"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore projects
                <ChevronDown className="h-4 w-4" />
              </Link>

              <Link
                href="/cv"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View CV
              </Link>
            </div>
          </motion.div>

          {/* Picture card opens first, from above, scaling up */}
          <motion.div
            className="w-full max-w-md shrink-0 lg:w-[420px]"
            variants={vHeroCard}
            initial="hidden"
            animate="show"
          >
            <div className="rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                {/* Animated background layer inside the picture card */}
                {!reduceMotion && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(800px 400px at 30% 30%, rgba(132,204,22,0.20), transparent 60%), radial-gradient(700px 500px at 70% 70%, rgba(132,204,22,0.10), transparent 60%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0.22, 0.36, 0.22],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'linear',
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <motion.div
                    className="relative h-full w-full max-h-[280px] max-w-[280px] overflow-hidden rounded-full border border-border/50 shadow-2xl backdrop-blur-sm"
                    variants={vHeroImage}
                    initial="hidden"
                    animate="show"
                  >
                    <Image
                      src={contact.profileImage}
                      alt={contact.name}
                      fill
                      priority
                      className="object-cover object-center mix-blend-luminosity"
                    />

                    {/* subtle shine sweep */}
                    {!reduceMotion && (
                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.10) 35%, transparent 70%)',
                          transform: 'translateX(-60%)',
                        }}
                        animate={{ transform: ['translateX(-60%)', 'translateX(60%)'] }}
                        transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Proof cards pop one after another */}
        <motion.section
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          variants={vProofWrap}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={vProofItem} className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Package className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Enterprise
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Enterprise tools shipped</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Compliance and diagnostic systems</p>
          </motion.div>

          <motion.div variants={vProofItem} className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                8020
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Websites and apps shipped</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">30+</p>
            <p className="text-xs text-muted-foreground">Delivered in consulting teams</p>
          </motion.div>

          <motion.div variants={vProofItem} className="group flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
            <div className="flex items-center justify-between">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="rounded-full border border-primary/20 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary/80">
                Freelance
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-primary/70">Brands elevated</p>
            <p className="text-2xl font-semibold tracking-tight text-primary">10+</p>
            <p className="text-xs text-primary/70">Branding and design from scratch</p>
          </motion.div>

          <motion.div variants={vProofItem} className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Zap className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Focus
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Product direction</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">UX/UI</p>
            <p className="text-xs text-muted-foreground">Product design and delivery ownership</p>
          </motion.div>
        </motion.section>

        {/* Core Capabilities — with tooltips */}
        <section className="space-y-6 pt-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Core Capabilities
            </h2>
            <p className="text-sm text-muted-foreground">
              How I work. What teams get from me.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <HoverTooltip label="Discovery and alignment: shadowing, interviews, workflow mapping, requirements, stakeholder alignment, and decision framing.">
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Box className="h-5 w-5" />
                  </div>
                  <Info className="h-4 w-4 text-muted-foreground/70" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Methodical thinking</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Strong UX foundation, structured discovery, alignment, and decisions. User and product centric.
                  </p>
                </div>
              </div>
            </HoverTooltip>

            <HoverTooltip label="Turn insights into shippable UI: interaction concept, information architecture, prototypes, handoff, and iteration with engineering constraints.">
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <Info className="h-4 w-4 text-muted-foreground/70" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Product-centric delivery</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Connect research, interaction concept, and constraints to ship enterprise workflows.
                  </p>
                </div>
              </div>
            </HoverTooltip>

            <HoverTooltip label="Fluent across systems: Jira, Confluence, Figma, prototyping, and technical collaboration. Comfortable translating process into automation-ready specs.">
              <div className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-inner transition-all hover:bg-primary/10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-background text-primary shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <Info className="h-4 w-4 text-primary/70" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Tools and systems fluency</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary/80">
                    Jira, Confluence, Figma, prototyping, technical collaboration, plus automation mindset.
                  </p>
                </div>
              </div>
            </HoverTooltip>
          </div>
        </section>

        {/* Leadership — moved ABOVE Selected Works */}
        <section className="space-y-6 pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Leadership
            </h2>
          </div>

          <article className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md sm:flex-row">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Operations & Scale
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                Kontrast Festival
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Co-founded and scaled a cultural event. Led cross-functional teams and built operational processes.
                Grew the event to <strong>4,000+ attendees</strong> and <strong>€250k+ revenue</strong>.
              </p>
            </div>
            <div className="hidden shrink-0 items-center justify-center p-4 sm:flex">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
                <Sparkles className="h-7 w-7" strokeWidth={2} />
              </div>
            </div>
          </article>
        </section>

        {/* Selected Works — now KoVoN + FFP */}
        <section id="featured-projects" className="scroll-mt-24 space-y-8 pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Selected Works
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Strongest case studies across compliance and diagnostics.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* KoVoN */}
            <Link
              href="/projects/kovon"
              className="group block h-full cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <article className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-t-xl bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                  <FileText
                    className="h-12 w-12 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/50"
                    strokeWidth={1.5}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                    Compliance / Confidential
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Enterprise · 2022–2024
                  </p>
                  <h3 className="mb-1 mt-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    KoVoN Compliance Documentation Tool
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Role: Product and UX concept, Scrum facilitation
                  </p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Audit-driven system to track verification status, ownership, and evidence across parts and vehicle systems.
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      compliance
                    </li>
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      enterprise
                    </li>
                  </ul>
                </div>
              </article>
            </Link>

            {/* FFP */}
            <Link
              href="/projects/ffp-dashboard"
              className="group block h-full cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <article className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
                  <Image
                    src="/projects/ffp_dashboard_hero.jpg"
                    alt="FFP Dashboard"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Enterprise · 2024
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    Failure Fingerprint Dashboard
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">Role: UX UI Designer</p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Multi-workflow expert tool to connect supplier issues, production findings, and root-cause correlation in one dashboard.
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      diagnostics
                    </li>
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      data-viz
                    </li>
                  </ul>
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* Experience removed per request */}

        {/* Footer */}
        <footer className="mt-24 rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm md:px-12 md:py-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Let’s connect
            </h2>
            <p className="text-sm text-muted-foreground">
              If you want a Product Designer who can handle complex enterprise workflows, I’m happy to talk.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm font-medium text-muted-foreground">
              <a
                className="transition-colors hover:text-foreground"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/contrastfestival.archive"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Instagram
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={MOTION_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Motion Portfolio
                <ExternalLink className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}