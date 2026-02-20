'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Package,
  Clock,
  Users,
  Mail,
  Sparkles,
  Zap,
  ExternalLink,
  ShieldCheck,
  Box,
  FileText,
  Star,
} from 'lucide-react';
import { contact } from '@/content/home';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

export function NextGenStartPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-background">
      <div className="mx-auto max-w-5xl space-y-24 px-4 py-8 md:px-8 md:py-16">
        {/* Hero */}
        <section
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
          aria-label="Hero"
        >
          <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-wrap items-center gap-2">
              <div className="group relative inline-flex cursor-help items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-green-500 transition-colors hover:bg-green-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Available
                <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-max rounded-md border border-border bg-popover px-3 py-2 text-xs normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  Open for UX Lead & Process roles.
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Enterprise
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                UX/UI
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Process Ops
              </span>
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                {contact.name}.
              </h1>
              <p className="mt-4 text-xl font-medium text-primary">
                Senior Product Designer & Process Analyst
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              I architect scalable enterprise software for highly regulated industries. Translating
              strict compliance and complex data into seamless, human-centered workflows.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#featured-projects"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Selected Work
                <ChevronDown className="h-4 w-4" />
              </Link>
              <Link
                href="/cv"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View CV
              </Link>
            </div>
          </div>

          {/* Widget card: 3D mesh + profile */}
          <div className="w-full max-w-md shrink-0 animate-in fade-in zoom-in-95 duration-1000 delay-150 lg:w-[420px]">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 opacity-80 mix-blend-screen transition-transform duration-[20s] ease-linear hover:scale-110">
                  {/* Optional 3D mesh: add /your-3d-mesh-asset.webp to public for full effect */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/your-3d-mesh-asset.webp"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-border/50 shadow-2xl backdrop-blur-sm transition-transform duration-700 hover:scale-105">
                    <Image
                      src={contact.profileImage}
                      alt={contact.name}
                      fill
                      priority
                      className="object-cover object-center mix-blend-luminosity transition-all duration-700 hover:mix-blend-normal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats grid */}
        <section className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 lg:grid-cols-4">
          <div className="group relative flex cursor-help flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <Package className="mb-2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="text-2xl font-mono font-bold text-foreground">3</span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Enterprise Tools
            </span>
            <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-max rounded-md border border-border bg-popover px-3 py-2 text-[10px] normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              KoVoN, FFP Dashboard, CAESAR.
            </div>
          </div>
          <div className="group relative flex cursor-help flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <Users className="mb-2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="text-2xl font-mono font-bold text-foreground">500+</span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Expert Users
            </span>
          </div>
          <div className="group relative flex cursor-help flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
            <Clock className="mb-2 h-5 w-5 text-primary" />
            <span className="text-2xl font-mono font-bold text-primary">~7k Hrs</span>
            <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
              Saved Annually
            </span>
            <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 w-max rounded-md border border-border bg-popover px-3 py-2 text-[10px] normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
              Calculated ROI via SAP RPA bot deployment.
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <ShieldCheck className="mb-2 h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-mono font-bold text-foreground">0</span>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Audit Failures
            </span>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-6 pt-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Core Capabilities
            </h2>
            <p className="text-sm text-muted-foreground">
              Architectural strengths and operational toolkits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Box className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Product Focus</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Architecting scalable, intuitive systems for complex enterprise environments.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Enterprise UI
                </span>
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Data Viz
                </span>
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Compliance
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Methodologies</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Aligning user needs with technical constraints through rigorous frameworks.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="group/tooltip relative cursor-help rounded border border-border bg-muted/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors hover:border-primary/50">
                  SAFe 6.0 Scrum
                  <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-max -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-[10px] normal-case tracking-normal text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover/tooltip:visible group-hover/tooltip:opacity-100">
                    Certified (Valid thru 2026)
                  </div>
                </span>
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  PDD Specs
                </span>
                <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  As-Is Mapping
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-inner transition-all hover:bg-primary/10">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-background text-primary shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Technical Toolkit</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary/80">
                  From high-fidelity prototyping to production-ready specifications.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Figma
                </span>
                <span className="rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Jira/Conf.
                </span>
                <span className="rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  HTML/CSS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works — 2 cards + View all */}
        <section id="featured-projects" className="scroll-mt-24 space-y-8 pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Selected Works
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enterprise tools for compliance, diagnostics, and automation.
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
                  <p className="mb-2 text-xs text-muted-foreground">Role: UX Lead</p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Symptom-first dashboard with Correlation Engine. Unified Supplier Quality,
                    Production, and Root Cause into a single source of truth.
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

            <Link
              href="/projects/automation"
              className="group block h-full cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <article className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-t-xl bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                  <Zap className="h-12 w-12 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/50" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                    Confidential / No UI
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Enterprise · 2024
                      </p>
                    </div>
                  </div>
                  <h3 className="mb-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    SAP RPA Bot
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Role: Process Analyst & Concept Owner
                  </p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Architected a 36-page Process Design Document (PDD) for an SAP bot, saving
                    ~7,000 manual hours annually and preventing line stoppages.
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      automation
                    </li>
                    <li className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      ops
                    </li>
                  </ul>
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* Leadership */}
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
                Co-founded and scaled a premier cultural event. Directed cross-functional teams,
                established robust operational processes, and turned a Year 1 deficit into a highly
                profitable, <strong>4,000+ attendee</strong> experience driving{' '}
                <strong>€250k+ in revenue</strong>.
              </p>
            </div>
            <div className="hidden shrink-0 items-center justify-center p-4 sm:flex">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
                <Sparkles className="h-7 w-7" strokeWidth={2} />
              </div>
            </div>
          </article>
        </section>

        {/* Footer */}
        <footer className="mt-24 rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm md:px-12 md:py-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ready to build?
            </h2>
            <p className="text-sm text-muted-foreground">
              Currently available for Senior Product Design and Process Architecture roles.
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
              <Link href="/cv" className="transition-colors hover:text-foreground">
                View CV
              </Link>
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
