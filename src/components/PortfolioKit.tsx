'use client';

/**
 * Universal Portfolio Kit — reusable components for any project type
 * (Fintech, Healthcare, E-commerce, Automotive, etc.).
 *
 * Use design tokens (primary, border, muted-foreground) so layouts stay
 * consistent with the rest of the app. All components accept className.
 *
 * Example:
 *   <ProjectHero title="..." subtitle="..." role="..." year="..." tags={[]} link="#" />
 *   <BrowserMockup src="/screenshot.jpg" alt="Dashboard" />
 *   <BrowserMockup src="/hero.jpg" screens={['/s1.jpg','/s2.jpg']} alt="App" />
 *   <MetricCard value="45" label="Faster Triage" suffix="%" trend="+12% YoY" />
 *   <InsightCard quote="..." author="Lead Engineer" type="problem" />
 *   <ProcessSteps steps={[{ number: "01", title: "...", desc: "..." }]} />
 *   <FeatureItem icon={Layout} title="React Frontend" desc="Modular architecture" />
 */

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StaggerContainer, StaggerItem } from '@/components/animations';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// --- 1. HERO HEADER: Works for any project title ---

export type ProjectHeroProps = {
  title: string;
  subtitle: string;
  role: string;
  year: string;
  tags: string[];
  link?: string;
  className?: string;
};

export function ProjectHero({
  title,
  subtitle,
  role,
  year,
  tags,
  link,
  className,
}: ProjectHeroProps) {
  return (
    <div className={cn('space-y-6 border-b border-border py-10', className)}>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="border-border bg-muted/50 font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
        <Badge
          variant="outline"
          className="border-border font-mono text-xs text-muted-foreground"
        >
          {year}
        </Badge>
      </div>

      <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
        {title}
      </h1>
      <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
        {subtitle}
      </p>

      <div className="flex items-center gap-8 pt-4">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
            Role
          </div>
          <div className="font-medium text-foreground">{role}</div>
        </div>
        {link && (
          <a
            href={link}
            className="flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/90"
          >
            View Live <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

// --- 2. BROWSER FRAME: Makes any screenshot look professional ---

export type BrowserMockupProps = {
  src: string;
  alt?: string;
  /** Optional URL bar text; defaults to derived from alt */
  urlBar?: string;
  /** Kept for API compatibility. This component intentionally uses <img> to allow tall scrollable screenshots. */
  useNextImage?: boolean;
  /** If provided, show muted looping video instead of static image (e.g. Loom/interaction demo) */
  videoSrc?: string;
  /** If provided, embed live demo in iframe (e.g. /prototypes/ffp) — takes precedence over image/video */
  iframeSrc?: string;
  /** Screen design images to slide through like an app (hero not included) */
  screens?: string[];
  /** Auto-advance screens every N ms; 0 = manual only */
  autoAdvanceMs?: number;
  className?: string;
};

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: EASE },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: EASE },
  }),
};

export function BrowserMockup({
  src,
  alt = 'App Screenshot',
  urlBar,
  useNextImage = true,
  videoSrc,
  iframeSrc,
  screens,
  autoAdvanceMs = 5000,
  className,
}: BrowserMockupProps) {
  // keep prop (avoid eslint unused warning) while intentionally using <img> for scrollable screenshots
  void useNextImage;

  const displayUrl = urlBar ?? `https://${alt.toLowerCase().replace(/\s/g, '-')}.com`;

  const allScreens = React.useMemo(() => {
    if (!screens?.length) return null;
    return screens;
  }, [screens]);

  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const total = allScreens?.length ?? 0;

  React.useEffect(() => {
    if (total <= 1 || !autoAdvanceMs) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, autoAdvanceMs);
    return () => clearInterval(t);
  }, [total, autoAdvanceMs]);

  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };

  const showCarousel = allScreens && total >= 1 && !iframeSrc && !videoSrc;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(
        'group relative my-12 overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]',
        className
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/50 px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/20" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
          <div className="h-3 w-3 rounded-full bg-green-500/20" />
        </div>
        <div className="ml-4 flex h-5 max-w-[33%] items-center truncate rounded px-2 font-mono text-[10px] text-muted-foreground">
          {displayUrl}
        </div>
      </div>

      <div className="relative aspect-video w-full max-h-[min(60vh,520px)] overflow-y-auto overflow-x-hidden bg-muted">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title={alt}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : videoSrc ? (
          <video
            src={videoSrc}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            aria-label={alt}
          />
        ) : showCarousel ? (
          <>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex min-h-0 flex-col"
              >
                <div className="min-h-0 min-w-full flex-1 overflow-y-auto overflow-x-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={allScreens[index]!}
                    alt={`${alt} — screen ${index + 1}`}
                    className="block w-full object-contain object-top opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <motion.button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2.5 text-foreground shadow-lg backdrop-blur-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Previous screen"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90 p-2.5 text-foreground shadow-lg backdrop-blur-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Next screen"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </>
            )}

            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {allScreens.map((_, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={cn(
                      'h-1.5 rounded-full transition-colors',
                      i === index
                        ? 'w-5 bg-primary'
                        : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    )}
                    aria-label={`Go to screen ${i + 1}`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0 min-h-0 overflow-y-auto overflow-x-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="block w-full object-contain object-top opacity-95 transition-opacity duration-300 group-hover:opacity-100"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// --- 2b. BEFORE & AFTER SLIDER: Reveal new UI over old (redesigns) ---

export type BeforeAfterSliderProps = {
  oldImg: string;
  newImg: string;
  alt?: string;
  /** Use Next.js Image for images; false = plain img (e.g. external URLs) */
  useNextImage?: boolean;
  className?: string;
};

export function BeforeAfterSlider({
  oldImg,
  newImg,
  alt = 'Before and after',
  useNextImage = true,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const imgClass = 'absolute inset-0 h-full w-full object-cover';

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative my-12 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted',
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Old (background) */}
      <div className="absolute inset-0">
        {useNextImage ? (
          <Image
            src={oldImg}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className={imgClass}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={oldImg} alt={alt} className={imgClass} />
        )}
      </div>

      {/* New (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {useNextImage ? (
          <Image
            src={newImg}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className={imgClass}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={newImg} alt={alt} className={imgClass} />
        )}
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-1 cursor-ew-resize bg-primary"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-md" />
      </div>
    </div>
  );
}

// --- 3. METRIC CARD: Visualizes numbers (Speed, Revenue, Users) ---

export type MetricCardProps = {
  value: string | number;
  label: string;
  trend?: string;
  suffix?: string;
  icon?: LucideIcon;
  className?: string;
};

export function MetricCard({
  value,
  label,
  trend,
  suffix = '',
  icon: Icon = Zap,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        'group flex flex-col justify-between border-border bg-card/50 p-6 transition-colors hover:bg-card',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-lg bg-muted p-2 text-muted-foreground transition-colors group-hover:text-foreground">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="mb-1 text-4xl font-bold tracking-tighter text-foreground">
          {value}
          {suffix && <span className="ml-1 text-2xl text-muted-foreground">{suffix}</span>}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}

// --- 4. INSIGHT CARD: For "The Problem" or "The Quote" ---

export type InsightCardProps = {
  quote: string;
  author?: string;
  type?: 'insight' | 'problem';
  className?: string;
};

export function InsightCard({ quote, author, type = 'insight', className }: InsightCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-8',
        type === 'problem' ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card/30',
        className
      )}
    >
      <div className="relative z-10">
        <MessageSquareQuote
          className={cn('mb-4 h-8 w-8', type === 'problem' ? 'text-destructive' : 'text-primary')}
        />
        <h3
          className={cn(
            'text-2xl font-medium leading-normal',
            type === 'problem' ? 'text-destructive-foreground' : 'text-foreground'
          )}
        >
          &ldquo;{quote}&rdquo;
        </h3>
        {author && (
          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
            <div className="h-6 w-6 rounded-full bg-muted" />
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {author}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 5. PROCESS FLOW: Visualizes Timeline/Steps ---

export type ProcessStepProps = {
  number: string | number;
  title: string;
  desc: string;
  isLast?: boolean;
  className?: string;
  icon?: LucideIcon;
  output?: string;
};

export function ProcessStep({
  number,
  title,
  desc,
  isLast = false,
  className,
  icon: Icon,
  output,
}: ProcessStepProps) {
  return (
    <div className={cn('group flex gap-4', className)}>
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-sm text-primary">
          {number}
        </div>
        {!isLast && <div className="my-2 h-full w-px bg-zinc-800" />}
      </div>
      <div className="pb-12">
        <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-foreground">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
          {title}
        </h4>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{desc}</p>
        {output && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Output: {output}
          </p>
        )}
      </div>
    </div>
  );
}

/** Renders a list of process steps with correct connector lines. */
export function ProcessSteps({
  steps,
  className,
  stagger,
}: {
  steps: Array<{
    number: string | number;
    title: string;
    desc: string;
    icon?: LucideIcon;
    output?: string;
  }>;
  className?: string;
  /** When true, apply a staggered entrance to each step. */
  stagger?: boolean;
}) {
  const content = steps.map((step, i) => {
    const node = <ProcessStep key={step.title} {...step} isLast={i === steps.length - 1} />;
    if (!stagger) return node;
    return <StaggerItem key={step.title}>{node}</StaggerItem>;
  });

  if (stagger) {
    return <StaggerContainer className={className}>{content}</StaggerContainer>;
  }

  return <div className={className}>{content}</div>;
}

// --- 6. FEATURE GRID: For "Tech Stack" or "Key Features" ---

export type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  className?: string;
  problem?: string;
  solution?: string;
  impact?: string;
};

export function FeatureItem({
  icon: Icon,
  title,
  desc,
  className,
  problem,
  solution,
  impact,
}: FeatureItemProps) {
  const isProblemSolution = Boolean(problem && solution && impact);

  return (
    <div
      className={cn(
        'flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-border hover:bg-muted/30',
        isProblemSolution && 'flex-col gap-3 p-6',
        className
      )}
    >
      <div className="flex gap-4">
        <div className="mt-1 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          {!isProblemSolution && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        </div>
      </div>

      {isProblemSolution && (
        <div className="space-y-3 pl-0 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Problem
            </p>
            <p className="mt-1 text-muted-foreground">{problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Solution
            </p>
            <p className="mt-1 text-muted-foreground">{solution}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Impact
            </p>
            <p className="mt-1 text-muted-foreground">{impact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
