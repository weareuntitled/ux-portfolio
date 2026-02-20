"use client";

import * as React from "react";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Laptop,
  Building2,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Zap,
  Film,
  type LucideIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import {
  credentialsTimeline,
  credentialsEducation,
  specializationChipsWithIcons,
} from "@/content/home";
import { Badge } from "@/components/ui/badge";

const thiLogo = "/icons/Technische_Hochschule_Ingolstadt_logo.png";

const iconMap = {
  building: Building2,
  shield: ShieldCheck,
  "bar-chart": BarChart3,
  zap: Zap,
  film: Film,
} as const;

type PhaseCategory = "education" | "experience" | "specialization";

/** Merged career phases with credentials data — ordered recent to earliest */
const careerStations: Array<{
  id: string;
  category: PhaseCategory;
  title: string;
  detail: string;
  icon: LucideIcon;
  showThiLogo: boolean;
  company?: string;
  role?: string;
  proof?: string;
  tags?: readonly string[];
  isNow?: boolean;
}> = [
  /* Experience — recent first */
  {
    id: "8020",
    category: "experience",
    title: "8020 Oct 2022 – Nov 2025",
    detail: "Management Consultant. Product UX, Scrum, automation, enterprise tools. KoVoN, FFP, CAESAR, SAP.",
    icon: Building2,
    showThiLogo: false,
    company: credentialsTimeline[0].company,
    role: credentialsTimeline[0].role,
    proof: credentialsTimeline[0].proof,
    tags: credentialsTimeline[0].tags,
    isNow: credentialsTimeline[0].isNow,
  },
  {
    id: "untitled",
    category: "experience",
    title: "Freelance untitled ux Feb 2020 – heute",
    detail: "UX, motion design, branding, web delivery. Client-facing ownership.",
    icon: Laptop,
    showThiLogo: false,
    company: credentialsTimeline[1].company,
    role: credentialsTimeline[1].role,
    proof: credentialsTimeline[1].proof,
    tags: credentialsTimeline[1].tags,
  },
  {
    id: "danep",
    category: "experience",
    title: "Freelance DanEP 2016 – 2019",
    detail: "Graphic design, branding, restaurants, PM, motion. Overlap with Bachelor.",
    icon: Briefcase,
    showThiLogo: false,
  },
  {
    id: "smartpatient",
    category: "experience",
    title: "UX internship Aug 2016 – Jan 2017",
    detail: "Product and marketing team, Munich.",
    icon: Briefcase,
    showThiLogo: false,
    company: "smartpatient",
    role: "UX internship",
    proof: credentialsTimeline[2].proof,
    tags: credentialsTimeline[2].tags,
  },
  /* Education — recent first */
  {
    id: "master",
    category: "education",
    title: "Master Mar 2022 – Mar 2024",
    detail: "MSc UX Design, TH Ingolstadt. Thesis: Environment Design, Attention & Learning in VR. Design systems peak.",
    icon: GraduationCap,
    showThiLogo: true,
    company: "THI",
    role: "MSc User Experience Design",
    proof: credentialsEducation[0]?.thesis,
  },
  {
    id: "bachelor",
    category: "education",
    title: "Bachelor Oct 2014 – Mar 2019",
    detail: "BSc UX Design, TH Ingolstadt. Foundation in UX research, design, and human-computer interaction.",
    icon: GraduationCap,
    showThiLogo: true,
    company: "THI",
    role: "BSc User Experience Design",
  },
  /* Specialization */
  {
    id: "kontrast",
    category: "specialization",
    title: "Kontrast Festival 2021 – 2024",
    detail: "Co-Founder & Design Lead. Culture brand, design, communication, creative team.",
    icon: Sparkles,
    showThiLogo: false,
  },
];

const categoryLabels: Record<PhaseCategory, string> = {
  education: "Education",
  experience: "Experience",
  specialization: "Specialization",
};

/** Career phases accordion - exported for use in ProfileCardSection */
export function CareerPhasesPanel({ inCard }: { inCard?: boolean }) {
  return (
    <div
      className={
        inCard
          ? "lg:min-h-[300px]"
          : "rounded-lg border border-border bg-muted/20 lg:min-h-[340px]"
      }
    >
      <Accordion type="multiple" className="w-full">
        <div className="border-b border-border/60 px-3 py-2">
          <p className="text-xs font-medium text-muted-foreground">
            Career phases · click to expand
          </p>
        </div>
        {(["experience", "education", "specialization"] as const).map(
          (category) => {
            const stations = careerStations.filter(
              (s) => s.category === category
            );
            if (stations.length === 0) return null;
            return (
              <div key={category} className="border-b border-border/60 last:border-0">
                <p className="px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {categoryLabels[category]}
                </p>
                {stations.map((station) => {
                  const Icon = station.icon;
                  return (
                    <AccordionItem
                      key={station.id}
                      value={station.id}
                      className="border-0"
                    >
                          <AccordionTrigger className="py-1.5 px-3 text-xs font-medium hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <span className="flex items-center gap-2 text-left">
                          {station.isNow && (
                            <Badge variant="default" className="text-[9px] font-medium uppercase px-1 py-0">
                              Now
                            </Badge>
                          )}
                          <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          {station.showThiLogo && (
                            <Image
                              src={thiLogo}
                              alt="TH Ingolstadt"
                              width={16}
                              height={16}
                              className="h-4 w-4 shrink-0 object-contain"
                              unoptimized
                            />
                          )}
                          <span className="truncate">{station.title}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-2 text-xs text-muted-foreground">
                        <div className="space-y-1.5">
                          {station.company && (
                            <p className="font-medium text-foreground">{station.company}</p>
                          )}
                          <p>{station.detail}</p>
                          {station.proof && (
                            <p className="text-muted-foreground">{station.proof}</p>
                          )}
                          {station.tags && station.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {station.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-[10px] font-normal"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </div>
            );
          }
            )}
          </Accordion>
          {/* Specialization chips */}
          <div className="border-t border-border/60 px-3 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Specialization
            </p>
            <div className="flex flex-wrap gap-1.5">
              {specializationChipsWithIcons.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Building2;
                return (
                  <Badge
                    key={item.label}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium"
                  >
                    <Icon className="h-2.5 w-2.5" aria-hidden />
                    {item.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      );
}

type SkillKey =
  | "product"
  | "scrum"
  | "motion"
  | "branding"
  | "graphic"
  | "ai"
  | "automation"
  | "systems";

const skills: { key: SkillKey; label: string }[] = [
  { key: "product", label: "Product Design (UX/UI)" },
  { key: "scrum", label: "Agile Delivery" },
  { key: "motion", label: "Motion" },
  { key: "branding", label: "Branding" },
  { key: "graphic", label: "Graphic" },
  { key: "ai", label: "AI Strategy" },
  { key: "automation", label: "Automation" },
  { key: "systems", label: "Design Systems" },
];

/**
 * Baseline Werte 0 bis 10.
 * Abgeleitet aus deinem CV plus deinen Aussagen:
 * - Bachelor Oct 2014 bis Mar 2019
 * - Freelance DanEP 2016 bis 2019, viel Graphic und Branding, Restaurants, PM, Motion
 * - Freelance untitled ux ab Feb 2020
 * - Kontrast Festival 2021 bis 2024
 * - Master Mar 2022 bis Mar 2024, Design Systems Peak 2022 bis 2024
 * - 8020 Oct 2022 bis Nov 2025, Product, Scrum, Automation, Motion
 * - AI und Automation Shift ab 2024 bis jetzt
 *
 * Du kannst jede Zahl direkt hier feinjustieren.
 */
const data: Array<
  { year: string } & Record<SkillKey, number>
> = [
  {
    year: "2014",
    product: 2,
    scrum: 0,
    motion: 1,
    branding: 6,
    graphic: 7,
    ai: 0,
    automation: 0,
    systems: 0,
  },
  {
    year: "2015",
    product: 2,
    scrum: 0,
    motion: 2,
    branding: 6,
    graphic: 7,
    ai: 0,
    automation: 0,
    systems: 0,
  },
  {
    year: "2016",
    product: 3,
    scrum: 1,
    motion: 3,
    branding: 8,
    graphic: 8,
    ai: 0,
    automation: 0,
    systems: 0,
  },
  {
    year: "2017",
    product: 3,
    scrum: 1,
    motion: 4,
    branding: 8,
    graphic: 8,
    ai: 0,
    automation: 0,
    systems: 0,
  },
  {
    year: "2018",
    product: 4,
    scrum: 2,
    motion: 4,
    branding: 7,
    graphic: 7,
    ai: 0,
    automation: 1,
    systems: 1,
  },
  {
    year: "2019",
    product: 4,
    scrum: 2,
    motion: 5,
    branding: 6,
    graphic: 6,
    ai: 0,
    automation: 1,
    systems: 1,
  },
  {
    year: "2020",
    product: 5,
    scrum: 3,
    motion: 6,
    branding: 5,
    graphic: 5,
    ai: 2,
    automation: 3,
    systems: 2,
  },
  {
    year: "2021",
    product: 5,
    scrum: 4,
    motion: 7,
    branding: 4,
    graphic: 4,
    ai: 3,
    automation: 4,
    systems: 3,
  },
  {
    year: "2022",
    product: 7,
    scrum: 5,
    motion: 7,
    branding: 3,
    graphic: 3,
    ai: 4,
    automation: 5,
    systems: 6,
  },
  {
    year: "2023",
    product: 8,
    scrum: 6,
    motion: 7,
    branding: 2,
    graphic: 2,
    ai: 5,
    automation: 6,
    systems: 8,
  },
  {
    year: "2024",
    product: 9,
    scrum: 7,
    motion: 8,
    branding: 1,
    graphic: 1,
    ai: 7,
    automation: 8,
    systems: 8,
  },
  {
    year: "2025",
    product: 9,
    scrum: 8,
    motion: 8,
    branding: 1,
    graphic: 0,
    ai: 8,
    automation: 9,
    systems: 6,
  },
  {
    year: "2026",
    product: 9,
    scrum: 7,
    motion: 7,
    branding: 0,
    graphic: 0,
    ai: 9,
    automation: 9,
    systems: 5,
  },
];

const chartConfig = {
  product: { label: "Product Design (UX/UI)", color: "hsl(var(--chart-1))" },
  scrum: { label: "Agile Delivery", color: "hsl(var(--chart-2))" },
  motion: { label: "Motion", color: "hsl(var(--chart-3))" },
  branding: { label: "Branding", color: "hsl(var(--chart-4))" },
  graphic: { label: "Graphic", color: "hsl(var(--chart-5))" },
  ai: { label: "AI Strategy", color: "hsl(var(--chart-6))" },
  automation: { label: "Automation", color: "hsl(var(--chart-7))" },
  systems: { label: "Design Systems", color: "hsl(var(--chart-8))" },
} as const;

const PRESETS = {
  all: skills.map((s) => s.key),
  core: ["product", "scrum", "systems"] as SkillKey[],
  aiShift: ["ai", "automation", "product"] as SkillKey[],
  creative: ["branding", "graphic", "motion"] as SkillKey[],
} as const;

function SkillLine({ k, visible }: { k: SkillKey; visible: boolean }) {
  if (!visible) return null;
  return (
    <Line
      type="monotone"
      dataKey={k}
      stroke={`var(--color-${k})`}
      strokeWidth={2.25}
      dot={false}
      activeDot={{ r: 4 }}
    />
  );
}

type SkillJourneyChartProps = {
  /** When true, omit outer Card for embedding in ProfileCardSection */
  embedded?: boolean;
  /** Custom content for right panel. false = hide (full-width chart), undefined = career phases */
  rightContent?: React.ReactNode | false;
};

export function SkillJourneyChart({ embedded, rightContent }: SkillJourneyChartProps) {
  const [visible, setVisible] = React.useState<Record<SkillKey, boolean>>(() => {
    const init: Record<SkillKey, boolean> = {} as Record<SkillKey, boolean>;
    skills.forEach((s) => (init[s.key] = true));
    return init;
  });

  const toggle = (key: SkillKey) => {
    setVisible((v) => ({ ...v, [key]: !v[key] }));
  };

  const selectAll = () => {
    setVisible((v) => {
      const next = { ...v };
      skills.forEach((s) => (next[s.key] = true));
      return next;
    });
  };

  const deselectAll = () => {
    setVisible((v) => {
      const next = { ...v };
      skills.forEach((s) => (next[s.key] = false));
      return next;
    });
  };

  const applyPreset = (preset: keyof typeof PRESETS) => {
    const keys = PRESETS[preset];
    setVisible((v) => {
      const next = { ...v };
      skills.forEach((s) => (next[s.key] = keys.includes(s.key)));
      return next;
    });
  };

  const visibleCount = Object.values(visible).filter(Boolean).length;

  const inner = (
    <div className="space-y-4">
      {/* Toolbox */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Presets
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-amber-500/70 bg-transparent text-xs text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
            onClick={() => applyPreset("all")}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-amber-500/70 bg-transparent text-xs text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
            onClick={() => applyPreset("core")}
          >
            Core UX
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-amber-500/70 bg-transparent text-xs text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
            onClick={() => applyPreset("aiShift")}
          >
            AI Shift
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-amber-500/70 bg-transparent text-xs text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
            onClick={() => applyPreset("creative")}
          >
            Creative
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={selectAll}
          >
            Select all
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={deselectAll}
          >
            Deselect all
          </Button>
        </div>
      </div>

      {/* Checkbox legend */}
      <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {skills.map((s) => {
            const isChecked = visible[s.key];
            const color = chartConfig[s.key].color;
            return (
              <label
                key={s.key}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm transition-colors hover:bg-muted/50",
                  !isChecked && "opacity-50"
                )}
              >
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(s.key)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "block h-4 w-4 rounded border-2 border-current transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                      isChecked ? "bg-current" : "bg-transparent"
                    )}
                    style={
                      isChecked
                        ? { borderColor: color, backgroundColor: color }
                        : { borderColor: "hsl(var(--muted-foreground))" }
                    }
                  />
                  {isChecked && (
                    <svg
                      className="absolute inset-0 m-auto h-2.5 w-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className="truncate"
                  style={isChecked ? { color } : undefined}
                >
                  {s.label}
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {visibleCount} of {skills.length} skills visible · Toggle to show/hide
        </p>
      </div>

      {/* Chart (+ optional right panel) */}
      <div
        className={
          rightContent === false
            ? "w-full"
            : "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]"
        }
      >
        <ChartContainer config={chartConfig} className="h-[340px] w-full min-w-0 aspect-auto">
          <LineChart data={data} margin={{ left: 10, right: 10, top: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ReferenceArea
              x1="2024"
              x2="2025"
              fill="hsl(var(--muted))"
              fillOpacity={0.25}
            />

            {["2014", "2016", "2020", "2022", "2024", "2025"].map((x) => (
              <ReferenceLine
                key={x}
                x={x}
                stroke="hsl(var(--border))"
                strokeOpacity={0.8}
              />
            ))}

            <ChartTooltip
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              content={<ChartTooltipContent />}
            />

            {skills.map((s) => (
              <SkillLine key={s.key} k={s.key} visible={visible[s.key]} />
            ))}
          </LineChart>
        </ChartContainer>

        {rightContent === false ? null : rightContent ? (
          <div className="rounded-lg border border-border bg-muted/20 lg:min-h-[340px] overflow-y-auto">
            {rightContent}
          </div>
        ) : (
          <CareerPhasesPanel />
        )}
      </div>
    </div>
  );

  if (embedded) {
    return inner;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill development 2014 to 2026</CardTitle>
        <CardDescription>
          Skala 0 bis 10. Toggle skills via checkboxes. Presets: All, Core UX,
          AI Shift, Creative.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{inner}</CardContent>
    </Card>
  );
}

export default SkillJourneyChart;
