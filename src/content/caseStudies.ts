/**
 * Case study copy and Portfolio Kit data for the tiered visualization strategy.
 * Keyed by project slug. Used when CMS does not have extended case study fields.
 *
 * Tier A (Flagships): FFP, KoVoN — full Bento Grid, Process Steps, Technical Specs
 * Tier B (Results): CAESAR, Automation — Metrics-First layout
 * Tier C (Indie): Tracklistify, FixundFertig — compact "Code & Speed" cards
 */

export type CaseStudySections = {
  summary?: string;
  contextWhyMattered?: string;
  realProblem?: string;
  constraints?: string;
  myRole?: string;
  approach?: string;
  solutionConcept?: string;
  outcome?: string;
  whatILearned?: string;
  whatToShowVisually?: string;
  /** Optional author for InsightCard (e.g. "Lead Engineer") */
  insightAuthor?: string;
};

// --- Case Study Copy (The "Story") ---

const ffp: CaseStudySections = {
  summary: 'Unifying three distinct user streams—Supplier Quality, Production Testing, and Root Cause Synthesis—into one cohesive diagnostic tool.',
  realProblem:
    'Three user groups with incompatible needs. No ordering and merging structure possible—similar cases tagged differently with no merge support. Data silos with no correlation path to a single Failure Fingerprint. System limitations meant many computes took time.',
  insightAuthor: 'Lead Engineer',
  approach:
    '5 deep-dive user interviews to map "Jobs to be Done" and symptom-first workflows. Role model, dashboard structure, table and detail patterns, navigation concept. We iteratively designed the UI while development ran in parallel—in every review, the new screen designs were used as concepts for the new screens. Handover to dev.',
  solutionConcept:
    'Symptom-first information hierarchy. A Correlation Engine that merges supplier and production data into a single Failure Fingerprint (Root Cause). Dedicated entry points per stream. Mental model alignment across Supplier Quality, Production Testing, and Root Cause Synthesis.',
  outcome:
    'Faster triage and finding similar cases; users could identify issues much faster—like a sentinel. Tagging consistency improved. Clearer information hierarchy with Correlation Engine merging supplier and production data into single Failure Fingerprint.',
  whatToShowVisually: 'Workflow Map: three paths (Supplier, Production, Root Cause) merging into one final Review screen.',
};

const kovon: CaseStudySections = {
  summary:
    'Pilot validated workflow, roles, and regulation concept; rollout blocked by workload and change resistance. Proved scalability and audit readiness for COP documentation; produced a maintainable concept and governance model for future scale.',
  realProblem:
    'Automotive teams needed a single place to document and prove Conformity of Production (COP). Documentation was scattered; regulation required audit-proof evidence. Teams needed an integrated role, task and regulation concept to scale COP documentation.',
  approach:
    'Designed and validated KoVoN as a pilot web tool with integrated role, task and regulation concept. Delivered a scalable COP compliance documentation tool to gather insights and prove scalability around Online Conformity of Production. COFON translated the learnings into a maintainable concept and governance model.',
  outcome:
    'A validated scalable pilot web tool with integrated role, task and regulation concept. Insights and proven scalability around Online Conformity of Production (COP), with a foundation for holistic compliance documentation.',
};

const automationCaseStudy: CaseStudySections = {
  summary: 'Bot flags wrongly reset parts so support can restore them—saves manual checks and reduces risk of assembly line stop. ~40–50 experts recovered 2–4 hours/week each.',
  realProblem:
    'Operator pushes a part (e.g. new brake component) → K-level drops across the chain. Support uses bot-set IDs to find wrongly reset items and restores them. Bot saves manual checks; reduces risk of assembly line stop.',
  approach:
    'High-level flow, deep dive with standard design process. Investigated AI use cases. Pitched automation potential. Deep-dive shadowing with two experts—spotted bot automation potential. Defined five use cases; prioritized from high-outcome (AI-heavy) to low-hanging fruit. Strict budget led to low-hanging fruit. Developed one of five in three months; Use case 2 concept (higher evaluated for time to market); budget froze before PDD.',
  solutionConcept:
    'Bot flags wrongly reset parts; support restores them. Saves manual checks; reduces risk of assembly line stop. Technical PDD handed to SAP development. Use case 1 delivered; Use case 2 concept (higher evaluated) did not reach PDD.',
  outcome:
    '~40–50 experts recovered 2–4 hours/week each. Bot flags wrongly reset parts; support restores them. Reduces risk of assembly line stop. Use case 2 concept developed; budget froze before PDD.',
  constraints: 'Strict budget. Use case 2 did not reach PDD—budget froze after Use case 1 delivery.',
  whatToShowVisually: 'K-level cascade: Operator pushes part (e.g. brake component) → K-level drops → Support uses bot IDs to restore. Reduces risk of assembly line stop.',
};

// CAESAR (CO2 Dashboard) — Interaction & Design Exploration
const caesar: CaseStudySections = {
  summary: 'Interaction and design exploration—implemented to reduce visual clutter and help experts spot anomalies before reporting.',
  realProblem:
    'Too many tables created visual clutter. Experts could not easily see anomalies in test data before reporting—quality suffered. Critical outliers and threshold breaches were buried in flat data.',
  approach:
    'Initial exploration of raw emission values. Rapid prototyping (2 high-speed iterations) to find the right visual metaphor.',
  solutionConcept:
    'Reduced visual clutter through explorative data viz. Lasso-selection for bulk threshold adjustment. Global vs. Local Threshold Overrides. List-wise color coding so experts spot anomalies before reporting—ensuring better quality.',
  outcome:
    'Implemented design reduced table clutter. Experts could see anomalies in testing before reporting. Better quality through earlier anomaly detection.',
  whatToShowVisually: 'Before & After: gray list vs. color-coded outlier chart with one vibrant "Outlier" bar.',
};

export const caseStudyBySlug: Record<string, CaseStudySections> = {
  'ffp-dashboard': ffp,
  kovon,
  automation: automationCaseStudy,
  'emission-compliance': caesar,
};

export function getCaseStudySections(slug: string): CaseStudySections | null {
  return caseStudyBySlug[slug] ?? null;
}

// --- Apple-style Bento & Technical Specs (per slug) ---

export type BentoCardVisual = 'switcher' | 'metric' | 'bars' | 'chips';

export type BentoCardItem = {
  title: string;
  subtitle: string;
  icon?: string;
  visual?: BentoCardVisual;
  colSpan?: 2;
  /** For metric visual: the displayed value (e.g. "0.2s") */
  value?: string;
  /** For list/chips visual: the items to display */
  items?: string[];
};

export type TechnicalSpecItem = { title: string; body: string };

// --- Portfolio Kit Data (unified: bento, specs, process, features) ---

export type ProcessStepItem = {
  number: string;
  title: string;
  desc: string;
  icon?: string;
  output?: string;
};
export type FeatureItemData = {
  icon: string;
  title: string;
  desc: string;
  problem?: string;
  solution?: string;
  impact?: string;
};

export type BeforeAfterMedia = { oldImg: string; newImg: string };

export type PortfolioKitData = {
  bentoCards?: BentoCardItem[];
  technicalSpecs?: TechnicalSpecItem[];
  processSteps?: ProcessStepItem[];
  featureItems?: FeatureItemData[];
  insightAuthor?: string;
  videoSrc?: string;
  beforeAfter?: BeforeAfterMedia;
};

// TIER A: FFP (The "Apple" Style Project) — full Bento Grid + Technical Specs
const ffpBentoCards: BentoCardItem[] = [
  {
    title: 'Symptom-First Search',
    subtitle: 'Search by "Engine Whine" not Part #.',
    visual: 'switcher',
    colSpan: 2,
  },
  {
    title: 'Correlation Engine',
    subtitle: 'Merges supplier + production → single Failure Fingerprint',
    visual: 'metric',
    value: '1:1',
  },
  {
    title: 'Three Streams',
    subtitle: 'Supplier Quality, Production Testing, Root Cause Synthesis',
    icon: 'Search',
    visual: 'bars',
  },
  {
    title: 'Mental Model Alignment',
    subtitle: 'Dedicated entry points per stream',
    visual: 'chips',
    colSpan: 2,
    items: ['Supplier Quality', 'Production Testing', 'Root Cause Synthesis'],
  },
];

const ffpTechnicalSpecs: TechnicalSpecItem[] = [
  {
    title: 'User Research & Methodology',
    body: 'Shadowed 2 experts in-situ. 5 deep-dive interviews to map "Jobs to be Done." Key discovery: Engineers use a symptom-first mental model (searching by "Engine Whine") but the UI forced Part # lookups. Three distinct streams—Supplier Quality, Production Testing, Root Cause Synthesis—required mental model alignment.',
  },
  {
    title: 'The Three Streams & Correlation Engine',
    body: 'Supplier Quality (external focus). Production Testing (internal/speed focus). Root Cause Synthesis (deep data focus). The Correlation Engine merges supplier and production data into a single Failure Fingerprint. Symptom-first hierarchy with dedicated entry points per stream.',
  },
  {
    title: 'Tech Stack & Handoff',
    body: 'Figma Dev Mode with token annotations. React frontend state management. Design and development ran in parallel—screen designs were iteratively refined and used as concepts for new screens in each review.',
  },
];

// TIER B: CAESAR, Automation (Metrics-First)
// TIER C: Tracklistify, FixundFertig (Code & Speed cards)

export const portfolioKitBySlug: Record<string, PortfolioKitData> = {
  // TIER A: FFP (Automotive Fingerprint — Complex Workflow / User-Centered Design)
  'ffp-dashboard': {
    insightAuthor: 'Lead Engineer',
    bentoCards: ffpBentoCards,
    technicalSpecs: ffpTechnicalSpecs,
    processSteps: [
      { number: '01', title: 'Shadowing', desc: 'Observed 2 experts in-situ to map symptom-first vs. part-number mental models.' },
      { number: '02', title: 'Interviews', desc: '5 deep-dive interviews to map Jobs to be Done across Supplier Quality, Production Testing, Root Cause Synthesis.' },
      { number: '03', title: 'Task-Based IA', desc: 'Symptom-first hierarchy with mental model alignment across three user streams.' },
      { number: '04', title: 'Iterative Design & Reviews', desc: 'Designed the UI iteratively while development ran in parallel. In every review, the new screen designs were used as concepts for the new screens.' },
    ],
    featureItems: [
      { icon: 'Layout', title: 'Symptom-First Entry Points', desc: 'Supplier Quality, Production Testing, Root Cause Synthesis views' },
      { icon: 'Database', title: 'Correlation Engine', desc: 'Merges supplier and production data into single Failure Fingerprint' },
      { icon: 'Lock', title: 'Mental Model Alignment', desc: 'Search by "Engine Whine" not Part #—seamless hand-over between streams' },
    ],
  },

  // CAESAR (CO2 Dashboard) — Interaction & Design Exploration
  'emission-compliance': {
    processSteps: [
      { number: '01', title: 'Exploration', desc: 'Initial exploration of raw emission values and table clutter.' },
      { number: '02', title: 'Rapid Prototyping', desc: '2 high-speed iterations to find the right visual metaphor.' },
      { number: '03', title: 'Implementation', desc: 'Design exploration implemented to reduce clutter and surface anomalies before reporting.' },
    ],
    featureItems: [
      { icon: 'Layout', title: 'Reduced Clutter', desc: 'Fewer tables, clearer hierarchy—experts spot anomalies before reporting' },
      { icon: 'Search', title: 'Threshold Overrides', desc: 'Lasso-selection and Global vs. Local for bulk adjustment' },
    ],
  },

  // SAP BOT (K-Review Automation) — UX Strategy / Process Optimization
  automation: {
    processSteps: [
      { number: '01', title: 'High-Level Flow & Pitch', desc: 'Mapped how the process works. Investigated AI use cases. Pitched automation potential.' },
      { number: '02', title: 'Deep-Dive Shadowing', desc: 'Shadowed two experts in-situ: how they work, problems, how they log in—spotted bot automation potential.' },
      { number: '03', title: 'Five Use Cases', desc: 'Defined five use cases. Prioritized from high-outcome (AI-heavy) to low-hanging fruit. Strict budget led to low-hanging fruit.' },
      { number: '04', title: 'Delivery in 3 Months', desc: 'Use case 1 delivered with Technical PDD. Use case 2 concept (higher evaluated for time to market); budget froze before PDD.' },
    ],
    featureItems: [
      { icon: 'Zap', title: 'Bot Intervention', desc: 'Overrides incorrect K-Level (Production Readiness) downgrades from VW → Audi push' },
      { icon: 'FileCheck', title: 'Technical PDD', desc: 'Click-by-click Process Definition Document for SAP administrators' },
    ],
  },

  // TIER A: KoVoN (Compliance Operating System / COP Testing Lifecycle)
  kovon: {
    insightAuthor: 'Product Owner',
    featureItems: [
      {
        icon: 'FileDiff',
        title: 'Regulation Delta Engine',
        desc: "White Matching algorithm: ingest new PDF regulations and highlight only the changed paragraphs.",
        problem:
          'Regulation updates (e.g. ECE R10.05 → .06) forced engineers to re-read hundreds of pages, risking missed clauses.',
        solution:
          "We built a 'White Matching' algorithm that ingests new PDF regulations and highlights only the changed paragraphs.",
        impact: 'Cuts review scope to the changed paragraphs only.',
      },
      {
        icon: 'GitFork',
        title: 'Knowledge Inheritance',
        desc: 'Template & Duplication: clone an existing vehicle project; validated parts inherit their Approved status automatically.',
        problem: 'Every new vehicle project started from scratch, wasting effort on parts that had not changed since the last model.',
        solution:
          'A Template & Duplication system. Managers clone an existing vehicle project; validated parts inherit their Approved status automatically.',
        impact: 'Teams validate only the delta between model years.',
      },
      {
        icon: 'ShieldCheck',
        title: '6-Role Governance Model',
        desc: 'Strict RBAC with 6 personas (e.g. COP Owner, Technical Expert, Auditor), each with a dedicated dashboard.',
        problem: '"Shared responsibility" meant no accountability. Audits failed because ownership was vague.',
        solution:
          'A strict Role-Based Access Control (RBAC) system with 6 distinct personas, each with a dedicated dashboard view.',
        impact: 'Every chapter has a clear owner and audit trail.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Ingest & Configure',
        desc: 'Project Leads initialize a new vehicle configuration (e.g. SUV 2026). The system automatically pulls the latest UN-ECE regulations and sets the global SOP - 1 Year deadline.',
        icon: 'Database',
        output: 'Vehicle config created; regulation set mapped; deadline set.',
      },
      {
        number: '02',
        title: 'Granular Delegation',
        desc: 'Managers use the Bulk Assign tool to route tasks. Complex systems are split: a System Owner (e.g. Brakes) delegates specific chapters to Part Owners (e.g. Calipers).',
        icon: 'UserCog',
        output: 'Tasks created; owners assigned.',
      },
      {
        number: '03',
        title: 'The Evaluation Loop',
        desc: 'Experts receive tasks on their dashboard. They evaluate the delta, upload evidence (PDFs, test reports), and mark items as Resolved.',
        icon: 'RefreshCw',
        output: 'Evidence uploaded; items resolved.',
      },
      {
        number: '04',
        title: 'Audit & Approval',
        desc: 'Once all child tasks are green, the System status flips to Approved. The system generates a read-only Compliance Snapshot for external auditors.',
        icon: 'FileBadge',
        output: 'System approved; compliance snapshot generated.',
      },
      {
        number: '05',
        title: 'Cycle & Inherit',
        desc: 'For the next model year, the team does not start over. They clone the project template. Unchanged parts inherit their Approved status instantly.',
        icon: 'Copy',
        output: 'Project cloned; inherited status applied.',
      },
    ],
    technicalSpecs: [
      {
        title: "The 'White Matching' Algorithm",
        body: "Built a delta-engine to handle regulation updates (e.g., ECE R10.05 -> .06). Instead of re-reading the whole law, the system highlights only the text differences ('White Match'), allowing engineers to focus solely on the new requirements.",
      },
      {
        title: 'Granularity Engine (1:1 vs. 1:N)',
        body: "Designed a flexible ownership model. A 'System Lead' (e.g., Brakes) can own an entire Regulation (R13), or delegate specific Chapters (Annex 4) to sub-specialists. The status rolls up automatically to the vehicle level.",
      },
      {
        title: 'Knowledge Inheritance & Read-Only API',
        body: "Knowledge Inheritance Templates let engineers learn from one vehicle and duplicate verification structures for others. Stakeholder Read-Only Link (read-only API) enables cross-departmental transparency without edit access. Deployed on AWS with secure onboarding for COP Testing Lifecycle management.",
      },
    ],
  },

  // TIER C: Tracklistify
  tracklistify: {
    featureItems: [
      { icon: 'Server', title: 'Next.js + Node', desc: 'Full-stack architecture' },
      { icon: 'Database', title: 'PostgreSQL', desc: 'High-performance metadata storage' },
      { icon: 'Zap', title: 'Sub-2s Runtime', desc: 'Optimized analysis engine' },
    ],
  },

  // FixundFertig — add featureItems when needed for compact display
  fixundfertig: {
    featureItems: [
      { icon: 'Database', title: 'Supabase', desc: 'Real-time backend' },
      { icon: 'Zap', title: 'Lightweight', desc: 'Issue management for households' },
    ],
  },
};

// --- Getters (read from unified portfolioKit) ---

export function getBentoCards(slug: string): BentoCardItem[] {
  return portfolioKitBySlug[slug]?.bentoCards ?? [];
}

export function getTechnicalSpecs(slug: string): TechnicalSpecItem[] {
  return portfolioKitBySlug[slug]?.technicalSpecs ?? [];
}

export function getPortfolioKit(slug: string): PortfolioKitData | null {
  return portfolioKitBySlug[slug] ?? null;
}
