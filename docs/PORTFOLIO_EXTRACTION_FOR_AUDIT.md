# Portfolio Extraction for AI Collaborator Audit

> Export of the current portfolio state for deep audit. Includes structure (code), content (text), and styling context.

---

## 1. Main Dashboard Logic

### Landing Page (`src/app/(site)/page.tsx`)

```tsx
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { DashboardCV } from '@/components/DashboardCV';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProofChipsSection } from '@/components/landing/ProofChipsSection';
import { PortfolioSection } from '@/components/landing/PortfolioSection';
import { SectionSkeleton } from '@/components/landing/SectionSkeleton';
import { HeroImagePreload } from '@/components/landing/HeroImagePreload';
import { getEnterpriseProjectsForNav, getEnterpriseProjectsResolved } from '@/lib/cms/projects-nav';
import { getFeaturedProjectSlugs } from '@/content/home';

export const revalidate = 300;

const CareerTransitionSection = dynamic(
  () => import('@/components/landing/CareerTransitionSection').then((m) => ({ default: m.CareerTransitionSection })),
  { loading: () => <SectionSkeleton className="min-h-[340px]" /> }
);

export default async function HomePage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  const [enterpriseProjects, enterpriseProjectsResolved] = await Promise.all([
    getEnterpriseProjectsForNav({ draftMode: isDraft }),
    getEnterpriseProjectsResolved({ draftMode: isDraft }),
  ]);
  const featuredSlugs = getFeaturedProjectSlugs();
  const featuredProjects = featuredSlugs
    .map((slug) => enterpriseProjectsResolved.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <DashboardCV enterpriseProjects={enterpriseProjects} variant="landing">
      <HeroImagePreload />
      <div className="space-y-16 md:space-y-20">
        <HeroSection />
        <ProofChipsSection />
        <section id="featured-projects" className="scroll-mt-20">
          <PortfolioSection projects={featuredProjects.length > 0 ? featuredProjects : enterpriseProjectsResolved.slice(0, 4)} />
        </section>
        <SkillsRadarSection />
        <CareerTransitionSection />
        <ExperienceTimelineSection />
        <EducationSection />
        <FooterSection />
      </div>
    </DashboardCV>
  );
}
```

### Project Grid (`src/components/landing/PortfolioSection.tsx`)

```tsx
'use client';

import Link from 'next/link';
import type { ResolvedProject } from '@/lib/cms/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { getProjectDisplayTitle } from '@/content/home';

type Props = { projects: ResolvedProject[] };

export function PortfolioSection({ projects }: Props) {
  const featured = projects.slice(0, 6);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Featured projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enterprise tools for compliance, diagnostics, and automation.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects">View all</Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <div
            key={project.slug}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <ProjectCard project={project} displayTitle={getProjectDisplayTitle(project.slug)} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Career Transition Chart

**Section wrapper** (`src/components/landing/CareerTransitionSection.tsx`):

```tsx
'use client';

import dynamic from 'next/dynamic';

const CareerAreaChart = dynamic(
  () => import('@/components/CareerAreaChart').then((m) => ({ default: m.CareerAreaChart })),
  { ssr: false }
);

export function CareerTransitionSection() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-border bg-card/90 px-4 py-8 shadow-lg md:px-8 md:py-12"
      aria-label="Career transition"
    >
      <div className="mx-auto max-w-2xl">
        <CareerAreaChart />
      </div>
    </section>
  );
}
```

**Chart component** (`src/components/CareerAreaChart.tsx`):

```tsx
'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, pickSafeTooltipContentProps } from '@/components/ui/chart';
import { careerAreaData } from '@/content/home';

const chartConfig = {
  phase: { label: 'Phase' },
  graphicDesign: { label: 'Graphic design', color: 'hsl(var(--chart-5))' },
  motionWeb: { label: 'Motion / Web', color: 'hsl(var(--chart-2))' },
  productUx: { label: 'Product / UX', color: 'hsl(var(--chart-1))' },
  aiSystems: { label: 'AI / Design systems', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const data = careerAreaData.map((d) => ({ ...d }));

export function CareerAreaChart() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Career transition</CardTitle>
        <p className="text-sm text-muted-foreground">
          From graphic design to enterprise product UX, compliance tools, and AI/automation.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="phase" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={28} />
            <ChartTooltip content={(props) => <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} indicator="line" />} cursor={false} />
            <Area type="monotone" dataKey="graphicDesign" stackId="a" fill="var(--color-graphicDesign)" fillOpacity={0.4} stroke="var(--color-graphicDesign)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="motionWeb" stackId="a" fill="var(--color-motionWeb)" fillOpacity={0.4} stroke="var(--color-motionWeb)" strokeWidth={1.5} strokeDasharray="4 2" />
            <Area type="monotone" dataKey="productUx" stackId="a" fill="var(--color-productUx)" fillOpacity={0.4} stroke="var(--color-productUx)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="aiSystems" stackId="a" fill="var(--color-aiSystems)" fillOpacity={0.4} stroke="var(--color-aiSystems)" strokeWidth={1.5} strokeDasharray="6 3" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

**Chart data source** (`src/content/home.ts`):

```ts
export const careerAreaData = [
  { phase: '2016', graphicDesign: 70, motionWeb: 20, productUx: 8, aiSystems: 0 },
  { phase: '2020', graphicDesign: 30, motionWeb: 45, productUx: 20, aiSystems: 0 },
  { phase: '2022', graphicDesign: 10, motionWeb: 30, productUx: 50, aiSystems: 10 },
  { phase: 'Now', graphicDesign: 0, motionWeb: 20, productUx: 50, aiSystems: 30 },
];
```

---

## 2. Content Audit — Problem, Process, Outcome (4 Automotive Projects)

### KoVoN

**Problem** (projects.ts & caseStudies.ts — realProblem):

> Automotive teams needed a single place to document and prove Conformity of Production (COP). Documentation was scattered; regulation required audit-proof evidence. Teams needed an integrated role, task and regulation concept to scale COP documentation.

**Process** (projects.ts — workflow) / **Approach** (caseStudies.ts):

> Designed and validated KoVoN as a pilot web tool with integrated role, task and regulation concept. Delivered a scalable COP compliance documentation tool to gather insights and prove scalability around Online Conformity of Production. COFON translated the learnings into a maintainable concept and governance model.

**Outcome** (projects.ts — outcomes):

- Delivered holistic COP compliance documentation tool KoVoN as a validated pilot web tool.
- Integrated role, task and regulation concept to support scalable COP documentation.
- Gathered insights and proved scalability around Online Conformity of Production (COP).
- Produced a maintainable concept and governance model for future rollout.

**Outcome** (caseStudies.ts):

> A validated scalable pilot web tool with integrated role, task and regulation concept. Insights and proven scalability around Online Conformity of Production (COP), with a foundation for holistic compliance documentation.

**Do NOT imply:** Company-wide rollout (→ pilot web tool, validated scalability); high adoption (→ validated workflow, proven scalability); permanent solution (→ foundation for holistic compliance documentation).

---

### CAESAR (Car Emission Compliance Dashboard)

**Problem** (projects.ts & caseStudies.ts):

> Too many tables created visual clutter. Experts could not easily see anomalies in test data before reporting—quality suffered. Critical outliers and threshold breaches were buried in flat data.

**Process** (projects.ts — workflow):

> 1) Capture workflows with the department (no direct shadowing): for model year planning, Verified Parts, emission assessment, and data management, describe typical flows, happy paths, and important exceptions so it was clear which information was needed at which step and where Excel fell short. 2) Translate tasks, data fields, and states into UI views: tables remained central but gained clearer hierarchy—e.g. visible limits and normal ranges in the table, consistent status for tests and approvals, better grouping and filtering. 3) Full screen designs in Figma for main tables and detail views; clickable prototypes for flows such as checking and rating emission data, adjusting a configuration, uploading and assigning approvals. 4) Reviews, refinement, and handover: check-ins with stakeholders, iterative refinement of modals, accordions, filters, toasts; stable screen sets and flows handed over as a Figma package.

**Process** (caseStudies.ts — approach):

> Initial exploration of raw emission values. Rapid prototyping (2 high-speed iterations) to find the right visual metaphor.

**Outcome** (projects.ts — outcomes):

- Reduced visual clutter of too many tables.
- Experts could see anomalies in testing before reporting.
- Better quality through earlier anomaly detection.

**Outcome** (caseStudies.ts):

> Implemented design reduced table clutter. Experts could see anomalies in testing before reporting. Better quality through earlier anomaly detection.

---

### SAP Bot (Automation & Ops)

**Year:** 2024

**Problem** (projects.ts & caseStudies.ts):

> Operator pushes a part (e.g. new brake component) → K-level drops across the chain. Support uses bot-set IDs to find wrongly reset items and restores them. Bot saves manual checks; reduces risk of assembly line stop.

**Process** (caseStudies.ts — approach):

> High-level flow, deep dive with standard design process. Investigated AI use cases. Pitched automation potential. Deep-dive shadowing with two experts—spotted bot automation potential. Defined five use cases; prioritized from high-outcome (AI-heavy) to low-hanging fruit. Strict budget led to low-hanging fruit. Developed one of five in three months; Use case 2 concept (higher evaluated for time to market); budget froze before PDD.

**Outcome** (projects.ts — outcomes):

- Use case 1 delivered in three months: Bot flags wrongly reset parts; support restores them. Saves manual checks; reduces risk of assembly line stop.
- ~40–50 experts recovered 2–4 hours/week each—conservative estimate.
- Use case 2 concept developed; budget froze before PDD.

**Outcome** (caseStudies.ts):

> ~40–50 experts recovered 2–4 hours/week each. Bot flags wrongly reset parts; support restores them. Reduces risk of assembly line stop. Use case 2 concept developed; budget froze before PDD.

**Constraints:** Strict budget. Use case 2 did not reach PDD—budget froze after Use case 1 delivery.

**Visualization:** K-level cascade diagram. Flow: Operator pushes part (e.g. brake component) → K-level drops → Support uses bot IDs to restore. Bot flags wrongly reset parts; support restores. Reduces risk of assembly line stop. Volume & false rate. Impact: 40–50 experts, 2–4h/week, 3 months delivery.

---

### FFP Dashboard (Automotive Failure Fingerprint Dashboard)

**Problem** (projects.ts):

> Engineers use a symptom-first mental model (searching by "Engine Whine") but the UI forced Part # lookups. No mental model alignment. Supplier and production data lived in silos with no correlation path to a single Failure Fingerprint. Information overload; similar cases tagged differently with no merge support.

**Problem** (caseStudies.ts — realProblem):

> One tool served three groups with incompatible mental models. Engineers searched by symptom ("Engine Whine") but the UI forced Part # lookups. No mental model alignment. Supplier and production data lived in silos with no correlation path to a single Failure Fingerprint.

**Process** (projects.ts — workflow):

> 1) Understand context via UX shadowing: how staff work with returns, diagnosis data, and fingerprints; which systems they use; document roles, process steps, and where dashboards helped or hindered. 2) Align tasks and role model with functionality: who assesses incoming cases and tags, who merges similar cases and maintains fingerprints, who prepares information for problem management; compare with existing dashboard features to find gaps and redundancy. 3) Prioritize and structure dashboards with the department so each role has a clear entry point, key fields are visible on overview, and tagging/merging/reporting are supported by filters and states—resulting in specialized dashboards (e.g. Diagnosis, DISS, split FFP views). 4) Screen concepts and modular building blocks in Figma: variants for tables, filters, status, detail views; reuse consistent table headers, status areas, and detail blocks. 5) Navigation concept and handover: process from tagging via diagnosis to reporting; overview-to-detail flow; Figma package to development.

**Process** (caseStudies.ts — approach):

> Shadowing: Observed 2 experts in-situ. Interviews: 5 deep-dive user interviews to map "Jobs to be Done" and symptom-first workflows.

**Outcome** (projects.ts — outcomes):

- Symptom-first search with mental model alignment across three user streams.
- Correlation Engine merges supplier and production data into single Failure Fingerprint.
- Clearer information hierarchy; users found their way and saw relevance/status/relations immediately.

**Outcome** (caseStudies.ts):

> Clearer information hierarchy with symptom-first search. Users found their way and saw relevance/status/relations immediately.

---

## 3. Styling Context

### Project Cards

**PortfolioSection wrapper** (per card):

- `overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md`

**ProjectCard** (`src/components/ProjectCard.tsx`):

- Article: `flex h-full flex-col rounded-xl border bg-card shadow-sm`
- Cover slot (no image): `flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted via-muted/90 to-muted/70`
- Placeholder icon: `h-12 w-12 text-muted-foreground/50`
- Category label: `text-[10px] uppercase tracking-widest text-muted-foreground/40`
- Meta line: `text-xs uppercase tracking-wide text-muted-foreground`
- Title: `text-xl font-semibold text-foreground`
- Role line: `text-xs text-muted-foreground`
- One-liner: `text-sm text-muted-foreground`
- Tags: `rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground`
- Primary CTA: `rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring`
- Secondary CTA: `rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent`

### Career Transition Chart

**CareerTransitionSection:**

- `w-full overflow-hidden rounded-2xl border border-border bg-card/90 px-4 py-8 shadow-lg md:px-8 md:py-12`

**CareerAreaChart Card:**

- `overflow-hidden border-border bg-card`

**Chart color mapping** (CSS variables):

- Graphic design: `hsl(var(--chart-5))`
- Motion / Web: `hsl(var(--chart-2))`
- Product / UX: `hsl(var(--chart-1))`
- AI / Design systems: `hsl(var(--chart-3))`

**Light theme** (`:root` in `globals.css`):

```css
--chart-1: 79 75% 62%;
--chart-2: 79 75% 55%;
--chart-3: 79 75% 48%;
--chart-4: 79 75% 72%;
--chart-5: 79 75% 80%;
```

**Dark theme** (`.dark`):

```css
--chart-1: 84 85% 45%;
--chart-2: 190 90% 45%;
--chart-3: 255 85% 65%;
--chart-4: 24 95% 55%;
--chart-5: 220 10% 55%;
```

### Featured Project Display Titles

From `src/content/home.ts`:

| Slug              | Display Title |
|-------------------|---------------|
| kovon             | KoVoN         |
| ffp-dashboard     | FFP Dashboard |
| emission-compliance | CAESAR      |
| automation        | SAP Bot       |
