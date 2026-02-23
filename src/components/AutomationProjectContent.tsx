'use client';

import {
  FileText,
  Globe,
  Clock,
  Bot,
  LayoutGrid,
  Map,
  Search,
  Scissors,
  GitBranch,
  UsersRound,
  FileJson,
  Zap,
} from 'lucide-react';
import { VsystemKlevelsSection } from '@/components/automation/VsystemKlevelsSection';
import { ScopeAndOperationSection } from '@/components/project/ScopeAndOperationSection';

const AUTOMATION_SCOPE = {
  headerIcon: Bot,
  title: 'My Scope & Operation',
  subtitle: 'Process Analyst & Automation Concept Owner',
  intro:
    'I led the discovery and automation strategy, acting as the bridge between 40+ subject matter experts and the SAP development team. I deconstructed manual workflows to deliver a flawless technical blueprint.',
  setup: {
    title: 'The Setup',
    description:
      'Operating in agile sprints, we moved from an initial business pain point to a fully documented, unblocked SAP development handoff in just 3 months.',
    rows: [
      { label: 'Roles', value: 'Process, UX, Automation' },
      { label: 'Cadence', value: '2-Week Sprints' },
      { label: 'Timeline', value: '3 Months (Idea to PDD)' },
      { label: 'Team', value: '1 Biz, 1 Consultant, 2 SMEs' },
      { label: 'Deliverable', value: 'Technical SAP PDD', highlight: true },
    ],
  },
  setupIcon: LayoutGrid,
  focusGroups: [
    {
      label: 'Discovery & UX Research',
      items: [
        {
          title: 'Process Mapping',
          description:
            'Mapped the exact manual workflow in FigJam before writing any technical rules.',
          tags: ['FigJam', 'As-Is Flow'],
          icon: Map,
        },
        {
          title: 'In-Situ Shadowing',
          description:
            'Sat with 2 experts to observe exact clicks, Excel usage, and mechanical friction.',
          tags: ['Interviews', 'Observation'],
          icon: Search,
        },
        {
          title: 'Scope Definition',
          description:
            'Aggressively cut edge-cases to isolate the most reliable "low-hanging fruit."',
          tags: ['Scope Trimming', 'Prioritization'],
          icon: Scissors,
        },
      ],
    },
    {
      label: 'Automation Architecture',
      items: [
        {
          title: 'Deterministic Rules',
          description:
            'Defined the deterministic logic: if a part has historical K-levels, safely restore it.',
          tags: ['Bot Logic', 'ID Matching'],
          icon: GitBranch,
        },
        {
          title: 'Human-in-the-Loop',
          description:
            'Established routing for edge cases so the bot hands complex issues back to humans.',
          tags: ['Exceptions', 'Routing'],
          icon: UsersRound,
        },
        {
          title: 'Technical Blueprint',
          description:
            'Authored the 36-page PDD, aligning the exact scope for SAP backend developers.',
          tags: ['PDD Specs', 'Handoff'],
          icon: FileJson,
        },
      ],
    },
  ],
};
import { ResultImpactCard } from '@/components/project/ResultImpactCard';

const AUTOMATION_RESULT_IMPACT = {
  title: 'The 36-Page PDD',
  description:
    'Instead of handing over vague user stories, we delivered a comprehensive 36-page PDD for Use Case 1. It eliminated all guesswork for the IT team, detailing the "As-Is" manual state and the "To-Be" automated logic.',
  metrics: [
    {
      value: '36 Pages',
      label: 'Technical Spec',
      description:
        'A complete architectural blueprint bridging business needs and SAP execution.',
      icon: FileText,
    },
    {
      value: '100%',
      label: 'Clicks & Screens',
      description:
        'Documented every single click, edge-case, and SAP screenshot required for UC1.',
      icon: Globe,
    },
    {
      value: '1 Hour',
      label: 'Dev Handoff',
      description:
        'The document was so precise, we aligned and overhanded the entire logic to SAP devs in a single 60-minute appointment.',
      icon: Clock,
    },
    {
      value: '~7,000h',
      label: 'Saved Annually',
      description:
        'Calculated ROI: 45 experts recovering ~3 hours per week over a 52-week production cycle.',
      icon: Zap,
      highlight: true,
    },
  ],
};

export function AutomationProjectContent() {
  return (
    <div className="space-y-24">
      {/* Quote */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-lg text-zinc-200">
            &ldquo;Operator pushes a part (e.g. new brake component) → K-level
            drops across the chain. Support uses bot-set IDs to find wrongly
            reset items and restores them. The bot saves manual checks and
            reduces the risk of an assembly line stop.&rdquo;
            <footer className="mt-4 not-italic text-sm text-zinc-500">
              — Project Core Logic
            </footer>
          </blockquote>
        </div>

        {/* V-Systems vs. K-Levels — exactly as reference (SAP) */}
        <VsystemKlevelsSection />

        {/* My Scope & Operation — reusable section */}
        <ScopeAndOperationSection {...AUTOMATION_SCOPE} />

        {/* Result / Impact — single card + 4 metrics only */}
        <section className="mx-auto w-full max-w-5xl py-12">
          <ResultImpactCard {...AUTOMATION_RESULT_IMPACT} />
        </section>
    </div>
  );
}
