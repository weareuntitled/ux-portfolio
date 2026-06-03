'use client';

import {
  Bot,
  LayoutGrid,
  Map,
  Search,
  Scissors,
  GitBranch,
  UsersRound,
  FileJson,
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

export function AutomationProjectContent() {
  return (
    <div className="space-y-24">
      {/* Quote */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-lg text-foreground/90">
            &ldquo;Operator pushes a part (e.g. new brake component) → K-level
            drops across the chain. Support uses bot-set IDs to find wrongly
            reset items and restores them. The bot saves manual checks and
            reduces the risk of an assembly line stop.&rdquo;
            <footer className="mt-4 not-italic text-sm text-muted-foreground">
              — Project Core Logic
            </footer>
          </blockquote>
        </div>

        {/* V-Systems vs. K-Levels — exactly as reference (SAP) */}
        <VsystemKlevelsSection />

        {/* My Scope & Operation — reusable section */}
        <ScopeAndOperationSection {...AUTOMATION_SCOPE} />

      
    </div>
  );
}
