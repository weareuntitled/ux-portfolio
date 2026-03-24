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
  Star,
  Workflow,
} from 'lucide-react';
import { contact } from '@/content/home';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

export function NextGenStartPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto max-w-5xl space-y-24 px-4 py-10 md:px-8 md:py-16">
        {/* Hero */}
        <section
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
          aria-label="Hero"
        >
          {/* Left side builds after the picture card */}
          <div
            className="flex-1 space-y-6"
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
              <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                {contact.name}.
              </h1>
              <p className="mt-4 text-xl font-medium text-primary">Senior Enterprise Product Designer</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                UX/UI for automotive and enterprise systems
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              I design enterprise products for compliance, diagnostics, and automation, translating complex
              architecture into clear workflows that teams can execute with confidence.
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
          </div>

          {/* Picture card opens first, from above, scaling up */}
          <div
            className="w-full max-w-md shrink-0 lg:w-[420px]"
          >
            <div className="rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-muted via-muted/90 to-muted/70">

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div
                    className="relative h-full w-full max-h-[280px] max-w-[280px] overflow-hidden rounded-full border border-border/50 shadow-2xl backdrop-blur-sm"
                  >
                    <Image
                      src={contact.profileImage}
                      alt={contact.name}
                      fill
                      priority
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof cards pop one after another */}
        <section
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          <div className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Package className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Enterprise
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Enterprise tools shipped</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Compliance and diagnostic systems</p>
          </div>

          <div className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                8020
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Websites and apps shipped</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">30+</p>
            <p className="text-xs text-muted-foreground">Delivered in consulting teams</p>
          </div>

          <div className="group flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
            <div className="flex items-center justify-between">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="rounded-full border border-primary/20 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary/80">
                Freelance
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-primary/70">Brands elevated</p>
            <p className="text-2xl font-semibold tracking-tight text-primary">10+</p>
            <p className="text-xs text-primary/70">Branding and design from scratch</p>
          </div>

          <div className="group flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Zap className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Focus
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Product direction</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">UX/UI</p>
            <p className="text-xs text-muted-foreground">Product design and delivery ownership</p>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-6 pt-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Core Capabilities
            </h2>
            <p className="text-sm text-muted-foreground">
              End-to-end product strength: from discovery and UX depth to technical execution and delivery leadership.
            </p>
          </div>



          <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              I combine <span className="font-medium text-foreground">deep product UX/UI expertise</span> with
              <span className="font-medium text-foreground"> technical fluency</span> and
              <span className="font-medium text-foreground"> process leadership</span> — so ideas become shippable outcomes.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs">
              <li className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">Research → Concept → Delivery</li>
              <li className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">AI-assisted execution</li>
              <li className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">Cross-functional collaboration</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="group relative overflow-hidden rounded-full border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex min-h-16 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Box className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Methodical Thinking</h3>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center rounded-full bg-black/60 px-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm leading-relaxed text-white">
                  Discovery and alignment: shadowing, interviews, workflow mapping, requirements, stakeholder alignment, and decision framing.
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-full border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex min-h-16 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Product-Centric Delivery</h3>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center rounded-full bg-black/60 px-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm leading-relaxed text-white">
                  Turn insights into shippable UI: interaction concept, information architecture, prototypes, handoff, and iteration with engineering constraints.
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-full border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex min-h-16 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Tools and Systems Fluency</h3>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center rounded-full bg-black/60 px-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm leading-relaxed text-white">
                  Fluent across systems: Jira, Confluence, Figma, prototyping, and technical collaboration. Comfortable translating process into automation-ready specs.
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-full border border-border bg-card px-6 py-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex min-h-16 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">System Thinking</h3>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center rounded-full bg-black/60 px-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm leading-relaxed text-white">
                  Translate enterprise complexity into coherent architecture: clear ownership, scalable components, and low-cognitive-load decision paths.
                </p>
              </div>
            </article>
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
              <a
                href="https://instagram.com/kontrastfestival.archive"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
              >
                Kontrast Festival Archive on Instagram
              </a>
            </div>
            <div className="hidden shrink-0 items-center justify-center p-4 sm:flex">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
                <Sparkles className="h-7 w-7" strokeWidth={2} />
              </div>
            </div>
          </article>
        </section>

        {/* Selected Works — now KoVoN + FFP */}
        <section
          id="featured-projects"
          className="scroll-mt-24 space-y-8 pt-8"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Selected Works
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enterprise case studies focused on clarity, control, and delivery impact.
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
              className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <article className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-t-xl bg-gradient-to-br from-muted via-muted/90 to-muted/70">
                  <FileText
                    className="h-12 w-12 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/50"
                    strokeWidth={1.5}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Enterprise · 2022–2024
                  </p>
                  <h3 className="mb-1 mt-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    KoVoN
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Role: Product and UX concept, Scrum facilitation
                  </p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Audit-driven system to track verification status, ownership, and evidence across parts and vehicle systems.
                  </p>
                  <div className="mt-auto flex items-center gap-2 pb-3 text-xs font-medium text-primary/90 transition-transform duration-300 group-hover:translate-x-0.5">
                    Open case study
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                  <ul className="flex flex-wrap gap-2">
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
              className="group block h-full cursor-pointer rounded-xl ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <article className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/40">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
                  <Image
                    src="/images/cap-delivery.jpg"
                    alt="FFP Dashboard"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
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
                    FFP
                  </h3>
                  <p className="mb-2 text-xs text-muted-foreground">Role: UX UI Designer</p>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    Multi-workflow expert tool to connect supplier issues, production findings, and root-cause correlation in one dashboard.
                  </p>
                  <div className="mt-auto flex items-center gap-2 pb-3 text-xs font-medium text-primary/90 transition-transform duration-300 group-hover:translate-x-0.5">
                    Open case study
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                  <ul className="flex flex-wrap gap-2">
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
