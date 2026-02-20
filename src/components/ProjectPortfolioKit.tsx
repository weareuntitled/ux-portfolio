'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layout,
  Database,
  Lock,
  FileCheck,
  ShieldCheck,
  Zap,
  Search,
  Activity,
  Server,
  RefreshCw,
  Users,
  ArrowLeft,
  Rocket,
  CalendarClock,
  Cloud,
  UserCog,
  FileBadge,
  Copy,
  FileDiff,
  GitFork,
  Workflow,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import type { CaseStudySections } from '@/content/caseStudies';
import { getBentoCards, type PortfolioKitData, type FeatureItemData } from '@/content/caseStudies';
import {
  BrowserMockup,
  InsightCard,
  ProcessSteps,
  FeatureItem,
} from '@/components/PortfolioKit';
import { CaseStudyBentoSection } from '@/components/CaseStudyBentoSection';
import { ProjectPrototypeButton } from '@/components/ProjectPrototypeButton';
import { AutomationProjectCharts } from '@/components/AutomationProjectCharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FadeIn, HeroParallax, StaggerContainer, StaggerItem } from '@/components/motion';
import {
  FadeItem,
  HoverCard,
  IconSquare,
} from '@/components/portfolio/PortfolioPrimitives';
import { VSystemDiagram } from '@/components/kovon/VSystemDiagram';
import { KLevelsDiagram } from '@/components/kovon/KLevelsDiagram';
import { KovonContentTabs } from '@/components/kovon/KovonContentTabs';
import { KovonDeliverySection } from '@/components/kovon/KovonDeliverySection';
import { KovonProcessStepper } from '@/components/kovon/KovonProcessStepper';
import { QuoteCard } from '@/components/kovon/QuoteCard';
const iconMap: Record<string, LucideIcon> = {
  Layout,
  Database,
  Lock,
  FileCheck,
  ShieldCheck,
  Zap,
  Search,
  Activity,
  Server,
  RefreshCw,
  Users,
  Rocket,
  CalendarClock,
  Cloud,
  UserCog,
  FileBadge,
  Copy,
  FileDiff,
  GitFork,
  Workflow,
  CheckCircle2,
};

/** Projects that keep the legacy hero (image first, blockquote, impact cards). */
const EXCLUDE_FROM_UNIFIED_HERO_LAYOUT = ['automation', 'tracklistify', 'fixundfertig'] as const;

/** Single-row pills for hero: User scale · POC→Beta · 3y · Angular */
const KOVON_HERO_STATS = [
  { short: 'User scale', value: '500 to 1,000' },
  { short: 'Maturity', value: 'POC→Beta' },
  { short: 'Timeline', value: '3y' },
  { short: 'Stack', value: 'Angular, AWS' },
] as const;

type Props = {
  project: ResolvedProject;
  caseStudy: CaseStudySections | null;
  portfolioKit: PortfolioKitData | null;
  className?: string;
  /** When true, skip rendering the hero block (used when layout already renders ProjectCaseStudyHero). */
  skipHero?: boolean;
};

function getPrototypeLink(project: ResolvedProject): string | undefined {
  const proto = project.prototype;
  if (proto?.prototypeType === 'in-app' && proto?.inAppPrototypeHref) {
    return proto.inAppPrototypeHref;
  }
  if (proto?.figmaEmbedUrl) return '#prototype';
  const liveLink = project.links?.find((l) => l.label === 'Live demo');
  return liveLink?.href;
}

export function ProjectPortfolioKit({
  project,
  caseStudy,
  portfolioKit,
  className,
  skipHero = false,
}: Props) {
  const prototypeLink = getPrototypeLink(project);
  const role = project.roles?.[0] ?? '—';
  const tags = project.tags?.slice(0, 5) ?? [];
  const impact = project.impact ?? [];
  const processSteps = portfolioKit?.processSteps ?? [];
  const featureItems = portfolioKit?.featureItems ?? [];
  const insightAuthor = portfolioKit?.insightAuthor;
  const realProblem = caseStudy?.realProblem;
  const problemOneLine = (realProblem ?? project.problem)?.split(/[.!?]/)[0]?.trim();
  const hasLocalImage = project.moodImageUrl && !project.moodImageUrl.startsWith('http');
  const screenshotSrc =
    project.moodImageUrl ?? 'https://placehold.co/1200x675/171717/404040?text=Project+Screenshot';
  const useNextImage = Boolean(hasLocalImage);
  const inAppHref = project.prototype?.prototypeType === 'in-app' && project.prototype?.inAppPrototypeHref;

  const useUnifiedHeroLayout = !(
    EXCLUDE_FROM_UNIFIED_HERO_LAYOUT as readonly string[]
  ).includes(project.slug);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    }),
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={cn('space-y-24', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!skipHero && (
        <>
          {/* Hero: unified layout (kovon, ffp-dashboard, emission-compliance, etc.) vs legacy (automation, tracklistify, fixundfertig) */}
          <FadeIn
            className={cn(
              'space-y-6',
              useUnifiedHeroLayout && 'relative rounded-xl bg-background/80 bg-clip-padding px-6 py-8 md:px-8 md:py-10'
            )}
            style={
              useUnifiedHeroLayout && screenshotSrc
                ? {
                    backgroundImage: `url(${screenshotSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              {tags.slice(0, 5).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-border bg-muted/50 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
              <Badge variant="outline" className="border-border font-mono text-xs text-muted-foreground">
                {project.year}
              </Badge>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
              {project.oneLiner}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </div>
                <div className="font-medium text-foreground">{role}</div>
              </div>
              <ProjectPrototypeButton project={project} />
            </div>
            {useUnifiedHeroLayout &&
              (project.slug === 'kovon' || impact.length > 0) && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
                  {project.slug === 'kovon'
                    ? KOVON_HERO_STATS.map((s, i) => (
                        <span key={s.short} className="flex items-center gap-x-2">
                          {i > 0 && <span className="text-muted-foreground/60">·</span>}
                          <Badge
                            variant="secondary"
                            className="border-border bg-muted/40 font-normal text-muted-foreground"
                          >
                            {s.short} {s.value}
                          </Badge>
                        </span>
                      ))
                    : impact.slice(0, 4).map((item, i) => (
                        <span key={item.label} className="flex items-center gap-x-2">
                          {i > 0 && <span className="text-muted-foreground/60">·</span>}
                          <Badge
                            variant="secondary"
                            className="border-border bg-muted/40 font-normal text-muted-foreground"
                          >
                            {item.label} {item.value}
                          </Badge>
                        </span>
                      ))}
                </div>
              )}
          </FadeIn>
        </>
      )}

      {useUnifiedHeroLayout ? (
        <>
          {realProblem && (
            <QuoteCard
              quote={realProblem}
              attribution={insightAuthor}
              avatarInitials="DP"
            />
          )}
          <HeroParallax className="overflow-hidden rounded-xl border border-border shadow-2xl">
            <BrowserMockup
              src={screenshotSrc}
              alt={project.title}
              urlBar={project.client ? `https://${project.client.toLowerCase().replace(/\s/g, '')}.com` : undefined}
              useNextImage={useNextImage}
              iframeSrc={project.galleryUrls?.length ? undefined : inAppHref || undefined}
              screens={project.galleryUrls}
              autoAdvanceMs={5000}
            />
          </HeroParallax>
        </>
      ) : (
        <>
          {project.slug === 'automation' ? (
            <div className="overflow-hidden rounded-xl border border-border bg-card/50 p-6 shadow-xl">
              <AutomationProjectCharts />
            </div>
          ) : (
            <HeroParallax className="overflow-hidden rounded-xl border border-border shadow-2xl">
              <BrowserMockup
                src={screenshotSrc}
                alt={project.title}
                urlBar={project.client ? `https://${project.client.toLowerCase().replace(/\s/g, '')}.com` : undefined}
                useNextImage={useNextImage}
                iframeSrc={project.galleryUrls?.length ? undefined : inAppHref || undefined}
                screens={project.galleryUrls}
                autoAdvanceMs={5000}
              />
            </HeroParallax>
          )}
          {realProblem && (
            <FadeIn>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-lg text-foreground">
                &ldquo;{realProblem}&rdquo;
                {insightAuthor && (
                  <footer className="mt-4 not-italic text-sm text-muted-foreground">
                    — {insightAuthor}
                  </footer>
                )}
              </blockquote>
            </FadeIn>
          )}
          {impact.length > 0 && (
            <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {impact.slice(0, 4).map((item) => (
                <StaggerItem key={item.label}>
                  <Card className="border-zinc-800/80 bg-zinc-900/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
                      {item.value}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </>
      )}

      {/* SAP Automation only: V-System vs K-Levels — context for why the bot matters */}
      {project.slug === 'automation' && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6 flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                SAP Automation · Context
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                V-Systems vs K-Levels
              </h2>
            </div>
            <p className="max-w-2xl text-[13px] leading-relaxed text-zinc-400">
              Top-down V-System templates define how data should behave; bottom-up K-Levels
              block releases when a single part fails. This combination leads to many
              errors being built into the bot system and creates substantial manual
              effort—including in tools like KoVoN—to correct and reconcile. The
              automation project addresses this by restoring deleted K-level reviews
              and reducing that manual burden.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <VSystemDiagram />
            <KLevelsDiagram status="blocked" />
          </div>
        </section>
      )}

      {getBentoCards(project.slug).length > 0 && (
        <CaseStudyBentoSection slug={project.slug} />
      )}

      {project.slug === 'kovon' && (
        <section className="space-y-6 py-2">
          <KovonContentTabs />
        </section>
      )}

      {/* Process: KoVoN uses ProcessStepper (tooltips only); others use full Process + Tech */}
      {project.slug === 'kovon' && (
        <section className="space-y-14 py-2">
          <KovonProcessStepper />
        </section>
      )}
      {project.slug !== 'kovon' && (
        (processSteps.length > 0 || featureItems.length > 0) && (
          <section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {processSteps.length > 0 && (
              <div className="max-w-2xl space-y-12">
                <div>
                  <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
                    The Process
                  </h2>
                  <div className="rounded-xl border border-border bg-muted/30 p-6">
                    <ProcessSteps
                      steps={processSteps.map((s) => ({
                        number: s.number,
                        title: s.title,
                        desc: s.desc,
                        icon:
                          s.icon && iconMap[s.icon]
                            ? iconMap[s.icon]
                            : undefined,
                        output: s.output,
                      }))}
                      stagger
                    />
                  </div>
                </div>
              </div>
            )}
            {featureItems.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Tech &amp; approach
                </h2>
                <StaggerContainer className="space-y-4">
                  {featureItems.map((item: FeatureItemData) => {
                    const Icon =
                      item.icon && iconMap[item.icon]
                        ? iconMap[item.icon]!
                        : Layout;
                    return (
                      <StaggerItem key={item.title}>
                        <FeatureItem
                          icon={Icon}
                          title={item.title}
                          desc={item.desc}
                          problem={item.problem}
                          solution={item.solution}
                          impact={item.impact}
                        />
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            )}
          </section>
        )
      )}

      {/* KoVoN only: Section 3 — Scope map, Cadence + Working circle, Good Scrum tiles, Where it landed */}
      {project.slug === 'kovon' && <KovonDeliverySection />}

      {caseStudy?.outcome && !realProblem && project.slug !== 'kovon' && (
        <FadeIn>
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-lg text-foreground">
            &ldquo;{caseStudy.outcome}&rdquo;
          </blockquote>
        </FadeIn>
      )}
    </motion.div>
  );
}
