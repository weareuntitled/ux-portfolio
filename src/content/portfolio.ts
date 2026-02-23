/**
 * Single source of truth for all project data: core, case study, portfolio kit, impact cards, KoVoN config.
 * Consumers use getters. Payload and pages read from here when CMS has no data.
 *
 * Writing and UX rules applied
 * - One clear message per field. No repeated phrases across summary, problem, solution.
 * - Short, scannable sentences. Strong verbs. Recruiter friendly.
 * - Consistent numbers. Use "about" for estimates. Avoid long dash characters in visible text.
 * - Remove speculative feature claims. Keep only what you can stand behind.
 */

import type {
  PortfolioSource,
  PortfolioProject,
  Project,
  ImpactCardItem,
  CaseStudySections,
  PortfolioKitData,
  BentoCardItem,
  TechnicalSpecItem,
  KovonConfig,
  ContentTabItem,
} from './portfolio.types';

// --- KoVoN page config (migrated from kovonPage.config.ts) ---

const kovonContentTabs: ContentTabItem[] = [
  {
    id: 'solution',
    label: 'Solution',
    icon: 'Layout',
    title: 'One place for COP status, ownership, and evidence',
    body:
      'KoVoN created a single COP overview for vehicle projects. Teams could see what was complete, missing, or in progress, alongside exact ownership. This turned audit requirements into a workable day-to-day flow.',
    outcomeBullets: [
      'Pilot validated the workflow and ownership model.',
      'Clear lifecycle states for verification items and evidence.',
    ],
  },
  {
    id: 'regulation',
    label: 'Regulation updates',
    icon: 'FileText',
    title: 'Updates without breaking traceability',
    body:
      'Structured ownership and a clear routine handle regulation changes. The system keeps a stable audit trail even when the underlying rules shift.',
    outcomeBullets: [
      'Defined responsibilities for regulation changes.',
      'Audit trail stays readable through updates.',
    ],
  },
  {
    id: 'adaptability',
    label: 'Adaptability',
    icon: 'Layers',
    title: 'Works across programs and domains',
    body:
      'KoVoN supports different vehicle programs and component domains. The structure stays consistent while scope and task packages adapt to specific needs.',
    outcomeBullets: [
      'Reusable structure across projects.',
      'Consistent documentation without reinvention.',
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'Users',
    title: 'Clear handoffs and approvals',
    body:
      'Explicitly modeled roles and handoffs. Approvals and bottlenecks became visible, scaling coordination without duplicate work or unclear responsibilities.',
    outcomeBullets: [
      'Ownership and approvals made explicit.',
      'Coordination overhead reduced through clearer handoffs.',
    ],
  },
];

const kovonWhereItLandedBullets: string[] = [
  'Working pilot delivered for one vehicle configuration.',
  'About 80 percent of documentation fields filled in the pilot.',
  'End-to-end visibility for status and responsibility.',
  'Bottlenecks surfaced for next iterations: ownership load, update cycles, matching effort, complexity.',
  'Governance foundation for a scalable COP documentation approach.',
];

const kovonWhyRolloutStoppedBullets: string[] = [
  'Rollout began, then priorities shifted due to a strategy change.',
  'Audit-related rollout activities paused; the pilot did not scale further.',
];

const kovonFeaturedCaseGlossary = {
  OE: {
    label: 'Organizational Unit (OE)',
    short: 'Internal org structure bucket, not equal to vehicle components.',
    detail:
      'OE is short for the German term Organisationseinheit. It describes how teams are grouped inside the company. One OE can cover multiple vehicle projects and component domains.',
    icon: 'Building2',
  },
  'UN-ECE': {
    label: 'UN-ECE',
    short: 'United Nations Economic Commission for Europe regulations framework.',
    detail:
      'UN-ECE regulations define requirements for vehicle type approval. We use UN-ECE consistently over UNECE.',
    icon: 'Scale',
  },
  CoP: {
    label: 'COP',
    short: 'Conformity of Production. Ongoing proof that production stays compliant.',
    detail:
      'COP means proving that series production matches the approved type and regulatory requirements. This includes documentation, checks, and audit readiness.',
    icon: 'ShieldCheck',
  },
  EC: {
    label: 'EC',
    short: 'European Community, shorthand used in EU type approval context.',
    detail:
      'EC acts as shorthand for EU-level type approval rules. In this context, it represents the legal layer connected to COP requirements.',
    icon: 'Landmark',
  },
  Verdict: {
    label: 'Verdict',
    short: 'A documented compliance decision for a scope item, backed by evidence.',
    detail:
      'A Verdict links a vehicle scope item to a regulation item. It stores status, responsibility, evidence, and review state. It serves as the primary unit of work.',
    icon: 'BadgeCheck',
  },
  Annex: {
    label: 'Annex',
    short: 'Top-level part of a regulation set.',
    detail:
      'Regulatory content is structured top-down. An Annex is a top-level container holding requirements and references.',
    icon: 'FolderTree',
  },
  Regulation: {
    label: 'Regulation',
    short: 'A specific regulatory document within UN-ECE.',
    detail:
      'A Regulation contains chapters and requirements. Teams evaluate either at the chapter level or deliver one package per regulation.',
    icon: 'FileText',
  },
  Chapter: {
    label: 'Chapter',
    short: 'Granular requirement unit inside a regulation.',
    detail:
      'A Chapter serves as a finer unit evaluated directly. Some chapters require multiple documents or evaluations.',
    icon: 'ListChecks',
  },
  Derivative: {
    label: 'Derivative',
    short: 'A variant of a vehicle project sharing most of the base scope.',
    detail:
      'Example: base model vs sport version. The delta might be small, but regulatory impact still exists.',
    icon: 'Car',
  },
  Inheritance: {
    label: 'Inheritance',
    short: 'Reuse approved work from a base project with identical scope.',
    detail:
      'Inheritance works like a template. The derivative starts with reused verdicts and evidence; experts only review deltas.',
    icon: 'GitMerge',
  },
  'Multi-Assignment': {
    label: 'Multi-assignment',
    short: 'Shared ownership with more than one responsible party per item.',
    detail:
      'Production, engineering, suppliers, and compliance roles all contribute. Multi-assignment prevents ownership gaps.',
    icon: 'Users',
  },
  RACI: {
    label: 'RACI-style roles',
    short: 'A lightweight ownership map per task and role.',
    detail:
      'We use R (Responsible), A (Accountable), and S (Supporting) to map ownership clearly.',
    icon: 'Table2',
  },
};

const kovonFeaturedCaseVisuals = [
  {
    id: 'v1',
    title: 'Fragmented evidence',
    subtitle: 'Proof lived in PDFs, spreadsheets, SharePoint, and mail threads.',
    icon: 'FileStack',
    bullets: [
      'Tasks depended on [[UN-ECE]] and [[EC]] requirements but lived in scattered files.',
      'Ownership lived in [[OE]] structures, not in vehicle components.',
      'Status and freshness were untrustworthy; updates created rework.',
    ],
    diagram: { type: 'chaos' as const },
  },
  {
    id: 'v2',
    title: 'Ownership mismatch',
    subtitle: 'OE ownership did not map to vehicle systems and parts.',
    icon: 'Network',
    bullets: [
      '[[OE]] teams optimized for internal delivery, not a 1:1 vehicle mapping.',
      'One expert often handled multiple vehicle projects.',
      'Shared ownership and handovers lacked a single source of truth.',
    ],
    diagram: { type: 'orgVsVehicle' as const },
  },
  {
    id: 'v3',
    title: 'Regulation churn',
    subtitle: 'Updates created rework because nobody saw what changed.',
    icon: 'Scale',
    bullets: [
      'Regulatory hierarchy flows from [[Annex]] to [[Regulation]] to [[Chapter]].',
      'Each mapped item produces a [[Verdict]]; catalog changes forced re-reviews.',
      'Affected tasks re-entered review with no clear delta view.',
    ],
    diagram: { type: 'regTree' as const },
  },
  {
    id: 'v4',
    title: 'Mixed granularity',
    subtitle: 'Work existed at system and paragraph levels with no roll-up.',
    icon: 'Layers3',
    bullets: [
      'Teams evaluated per [[Chapter]] or delivered one package per [[Regulation]].',
      'Both modes had to coexist without breaking reporting.',
      '[[Multi-Assignment]] was essential to support cross-functional contributions.',
    ],
    diagram: { type: 'granularity' as const },
  },
];

const kovonRaciMini = {
  legend: [
    { key: 'R', label: 'Responsible', hint: 'Does the work' },
    { key: 'A', label: 'Accountable', hint: 'Owns the outcome' },
    { key: 'S', label: 'Supporting', hint: 'Supports or signs off' },
  ],
  roles: [
    { id: 'techEvalOwner', label: 'Technical Evaluation Owner', icon: 'Wrench' },
    { id: 'tc', label: 'Technical Circle (TC)', icon: 'CircleDot' },
    { id: 'typeApproval', label: 'Type Approval Body', icon: 'ShieldCheck' },
    { id: 'sysAdmin', label: 'System Administrator', icon: 'Settings' },
    { id: 'teamLead', label: 'System Team Lead', icon: 'Users' },
  ],
  tasks: [
    { id: 'tldDoc', label: 'Document TLD sheets per part number', cells: { techEvalOwner: 'R' } },
    { id: 'assignWork', label: 'Assign work packages to evaluators', cells: { teamLead: 'R' } },
    { id: 'copFeatures', label: 'Define and document COP test characteristics', cells: { typeApproval: 'R' } },
    { id: 'releaseReport', label: 'Release conformity report version', cells: { tc: 'R', sysAdmin: 'S' } },
    { id: 'configureProject', label: 'Configure project in the tool', cells: { sysAdmin: 'R' } },
    {
      id: 'checkCompleteness',
      label: 'Check evaluation completeness',
      cells: { teamLead: 'R', tc: 'A', sysAdmin: 'S' },
    },
  ],
};

const kovonConfig: KovonConfig = {
  contentTabs: kovonContentTabs,
  whereItLandedBullets: kovonWhereItLandedBullets,
  whyRolloutStoppedBullets: kovonWhyRolloutStoppedBullets,
  featuredCase: {
    glossary: kovonFeaturedCaseGlossary,
    featuredVisuals: kovonFeaturedCaseVisuals,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raciMini: kovonRaciMini as any,
  },
};

// --- Shared FFP bento + technical specs ---

const ffpBentoCards: BentoCardItem[] = [
  {
    title: 'Symptom-first entry',
    subtitle: 'Start from symptoms instead of part numbers.',
    visual: 'switcher',
    colSpan: 2,
  },
  {
    title: 'Correlation',
    subtitle: 'Merge signals into one fingerprint.',
    visual: 'metric',
    value: '1:1',
  },
  {
    title: 'Three workflows',
    subtitle: 'Supplier, production, root cause.',
    icon: 'Search',
    visual: 'bars',
  },
  {
    title: 'Role-based modes',
    subtitle: 'Clear entry points and handoffs.',
    visual: 'chips',
    colSpan: 2,
    items: ['Supplier quality', 'Production testing', 'Root cause synthesis'],
  },
];

const ffpTechnicalSpecs: TechnicalSpecItem[] = [
  {
    title: 'Research and mental models',
    body:
      'Shadowing and deep interviews revealed a symptom-first mental model. The legacy UI forced part number lookup first, adding friction to investigations. Three distinct workflows required clear modes and handoffs.',
  },
  {
    title: 'Workflow design and correlation',
    body:
      'Supplier quality tackles external cases. Production testing handles internal findings. Root cause synthesis merges these signals into a single fingerprint. This supports moving smoothly from symptom to evidence to root cause.',
  },
  {
    title: 'Design delivery and handoff',
    body:
      'High-fidelity prototypes drove reviews while development ran in parallel. The Figma package served as the direct reference for building screens and validating logic.',
  },
];

// --- KoVoN bento + technical specs (Tier A) ---

const kovonBentoCards: BentoCardItem[] = [
  {
    title: 'Verification lifecycle',
    subtitle: 'Status, evidence, and outcomes in one flow.',
    visual: 'chips',
    colSpan: 2,
    items: ['Missing', 'Planned', 'In progress', 'Verified', 'Applied'],
  },
  {
    title: 'Ownership model',
    subtitle: 'One accountable owner per verification unit.',
    visual: 'metric',
    value: '1 owner',
  },
  {
    title: 'Audit readiness',
    subtitle: 'Readable snapshots for review and audit.',
    icon: 'ShieldCheck',
    visual: 'bars',
  },
  {
    title: 'Update handling',
    subtitle: 'Regulation changes stay traceable.',
    visual: 'switcher',
    colSpan: 2,
  },
];

const kovonTechnicalSpecs: TechnicalSpecItem[] = [
  {
    title: 'Information model',
    body:
      'Defined entities for vehicle, system, verification unit, status, ownership, evidence, and outcome. This guarantees overview completeness and deep traceability.',
  },
  {
    title: 'Lifecycle and governance',
    body:
      'Verification moves through strict lifecycle states. Rollups make progress visible across the entire vehicle. Governance handles regulation updates without corrupting the audit trail.',
  },
  {
    title: 'Pilot delivery',
    body:
      'Delivered to validate scalability, workflows, and role assignments. Provided a governance-ready foundation waiting for organizational capacity to scale.',
  },
];

// --- Case study sections (keyed by slug) ---

const caseStudyKovon: CaseStudySections = {
  summary:
    'Audit-driven pilot proving how COP documentation operates safely with lifecycle tracking, ownership mapping, and verifiable evidence.',
  contextWhyMattered:
    'An internal audit demanded traceable proof of Conformity of Production documentation. Teams lacked a single source to check completeness, progress, and accountability.',
  realProblem:
    'Scattered documentation caused compliance panic under time pressure. Regulations and internal rules updated constantly, immediately outdating static files.',
  myRole:
    'Product and UX concept. Scrum facilitation. Information architecture, workflow mapping, and prototype design.',
  approach:
    'Mapped the information model and verification lifecycle. Designed distinct ownership rules, status tracking, and evidence handling, validating the concept through iterative pilot reviews.',
  solutionConcept:
    'A central dashboard enforcing lifecycle states, assigning one owner per evaluation unit, and securing evidence via a governance-oriented update structure.',
  outcome:
    'Validated a scalable operational fit. The pilot successfully made status visible and established a robust foundation for future enterprise rollout.',
  whatToShowVisually:
    'Lifecycle diagram. Overview of systems with status chips and owners. Detail page with evidence and outcome. Update concept for regulation changes.',
};

const caseStudyAutomation: CaseStudySections = {
  summary:
    'SAP process automation concept and step-by-step PDD reducing recurring manual validation after inheritance events.',
  contextWhyMattered:
    'Inherited database updates often reset states in shared environments. Experts wasted time repeatedly verifying and restoring correctness.',
  realProblem:
    'Manual checks were repetitive, time-consuming, and error-prone. Experts could not trust review states after updates. The fix had to be safe and implementable within strict SAP constraints.',
  constraints:
    'Strict environment constraints and zero budget for custom software. Required a precise handoff for internal SAP administrators to execute safely.',
  myRole:
    'Automation manager and process analyst. Use case clustering, prioritization, PDD creation, and stakeholder alignment.',
  approach:
    'Clustered use cases alongside experts, prioritized the highest-value path, and documented the exact workflow. Aligned with SAP administrators to ensure feasibility.',
  solutionConcept:
    'Automated flagging for incorrect resets and a supported restoration routine. The PDD acted as the strict implementation contract.',
  outcome:
    'Eliminated recurring manual checks and lowered operational risk through a predictable, automated routine.',
  whatToShowVisually:
    'Parent-child inheritance diagram. Before and after workflow. PDD excerpt showing step clarity.',
};

const caseStudyFfp: CaseStudySections = {
  summary:
    'Redesigned a diagnostic tool to support triage, correlation, and root cause synthesis across siloed expert streams.',
  contextWhyMattered:
    'One department executed three distinct jobs (supplier, production, correlation), but the legacy UI crammed everything into one view, lacking clear handoffs.',
  realProblem:
    'Experts could not merge similar cases reliably. The UI forced a part-number-first behavior, slowing down symptom-driven investigations.',
  insightAuthor: 'Lead Engineer',
  myRole:
    'UX and UI design. Workflow mapping, information architecture, and high-fidelity prototyping.',
  approach:
    'Shadowed experts to map real-world jobs and mental models. Designed role-based modes and iterated high-fidelity prototypes as exact development references.',
  solutionConcept:
    'A symptom-first information hierarchy merging disparate signals into one cohesive fingerprint, complete with dedicated entry points per workflow.',
  outcome:
    'Sped up triage and case-matching capabilities. Drastically improved tagging consistency and supported clear root-cause synthesis.',
  whatToShowVisually:
    'Workflow map showing three modes merging into one flow. Before and after IA. Key screens: intake, triage, correlation, review.',
};

const caseStudyCaesar: CaseStudySections = {
  summary:
    'Visual and interaction redesign that cuts table clutter, helping experts spot outliers and threshold breaches instantly.',
  contextWhyMattered:
    'Data existed but wasn’t readable at speed. Analysts required immediate, trustworthy threshold rules across lists and charts.',
  realProblem:
    'Severe UI clutter buried outliers. Threshold logic existed in the backend but remained invisible to the user at a glance.',
  myRole:
    'UX and UI design. Visual hierarchy, interaction rules, and high-fidelity prototype exploration.',
  approach:
    'Explored raw data models, built rapid visual iterations, and standardized threshold encoding. Handed off a stable, tested design package.',
  solutionConcept:
    'A strict visual hierarchy for dense tables paired with consistent color-encoding rules for breaches and a unified settings panel.',
  outcome:
    'Outliers surfaced immediately. Scan speed accelerated and ambiguity dropped prior to mandatory reporting.',
  whatToShowVisually:
    'Before and after table hierarchy. Outlier highlighting rules. Threshold settings panel. Consistent list-to-chart encoding example.',
};

const caseStudyTracklistify: CaseStudySections = {
  summary:
    'Indie pipeline turning DJ sets into actionable track lists and wishlists, built strictly around analysis-first principles.',
  contextWhyMattered:
    'Manual track identification is painfully slow. DJs lack a clean pipeline from audio input to a functional, saved wishlist.',
  realProblem:
    'Existing solutions mix source storage with scan results unpredictably and often fail to support iterative rescans.',
  myRole:
    'Concept and indie developer. Workflow design and front-end prototyping.',
  approach:
    'Mapped the ingest-to-wishlist flow. Built a pipeline to analyze audio, discard the source file, store pointers, and present clean UI decisions for the user.',
  solutionConcept:
    'Analysis-first architecture. It stores results and rescan pointers instead of hoarding audio files, driving users straight to review and save actions.',
  outcome:
    'A seamless flow from ingest to cart. Clean separation of source and results with native rescan support.',
  whatToShowVisually:
    'Flow diagram. Track review screen. Wishlist screen. Example rescan state.',
};

const caseStudyFixundfertig: CaseStudySections = {
  summary:
    'Python-driven automation pipeline ingesting receipts via email, extracting data via OCR, and storing structured JSON.',
  contextWhyMattered:
    'Invoices arrive in infinite formats. Manual data entry guarantees friction and formatting errors.',
  realProblem:
    'No single pipeline bridged email attachments to reliable API data. Heavy manual correction defeated the purpose of existing tools.',
  myRole:
    'Indie developer. Pipeline architecture, API integration, and review UI creation.',
  approach:
    'Linked n8n email intake to an OCR extraction script, mapped output to JSON, and built a lightweight NiceGUI surface for quick human review.',
  solutionConcept:
    'Strictly separated ingestion, extraction, and storage phases. Only unresolved data hits the human review UI.',
  outcome:
    'Drastically lowered manual entry time and effectively eliminated formatting errors through repeatable structured pipelines.',
  whatToShowVisually:
    'Pipeline diagram. Example JSON output. NiceGUI review surface. Email intake status steps.',
};

// --- Portfolio kit data (keyed by slug) ---

const portfolioKitFfp: PortfolioKitData = {
  insightAuthor: 'Lead Engineer',
  bentoCards: ffpBentoCards,
  technicalSpecs: ffpTechnicalSpecs,
  processSteps: [
    {
      number: '01',
      title: 'Shadowing',
      desc: 'Observed experts to capture real workflows and unwritten investigation habits.',
    },
    {
      number: '02',
      title: 'Interviews',
      desc: 'Mapped out distinct jobs to be done across supplier, production, and correlation tasks.',
    },
    {
      number: '03',
      title: 'Workflow mapping',
      desc: 'Defined handoffs and restructured the information hierarchy for a symptom-first approach.',
    },
    {
      number: '04',
      title: 'Prototype and handoff',
      desc: 'Shipped a high-fidelity prototype as the strict reference point for development.',
    },
  ],
  featureItems: [
    {
      icon: 'Layout',
      title: 'Role-based modes',
      desc: 'Isolated views separating supplier work, production testing, and correlation synthesis.',
    },
    {
      icon: 'Database',
      title: 'Correlation concept',
      desc: 'Merge scattered signals into a unified fingerprint profile.',
    },
    {
      icon: 'Search',
      title: 'Symptom-first entry',
      desc: 'Search natively by failure symptoms before requiring hard part numbers.',
    },
  ],
};

const portfolioKitCaesar: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Exploration', desc: 'Analyzed raw data views to pinpoint where human interpretation broke down.' },
    { number: '02', title: 'Rapid prototyping', desc: 'Tested visual encoding rules for thresholds and critical outliers.' },
    { number: '03', title: 'Handoff', desc: 'Delivered finalized screens and a strict UI encoding rulebook.' },
  ],
  featureItems: [
    { icon: 'Layout', title: 'Reduced clutter', desc: 'Stripped visual noise to enhance scannability in dense tables.' },
    { icon: 'BarChart3', title: 'Outlier visibility', desc: 'Breaches and critical drops catch the eye immediately.' },
    { icon: 'Sliders', title: 'Threshold rules', desc: 'Consistent logic panel governing list and chart highlighting.' },
  ],
};

const portfolioKitAutomation: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Process mapping', desc: 'Traced inheritance events and the resulting manual validation loops.' },
    { number: '02', title: 'Expert sessions', desc: 'Clustered and prioritized pain points with core domain users.' },
    { number: '03', title: 'PDD creation', desc: 'Drafted click-by-click implementation logic for SAP engineers.' },
    { number: '04', title: 'Handoff', desc: 'Secured alignment on automation safety limits prior to build.' },
  ],
  featureItems: [
    { icon: 'Zap', title: 'Automation intervention', desc: 'Intercepts and handles recurring manual checks automatically.' },
    { icon: 'FileCheck', title: 'Implementation PDD', desc: 'Bulletproof documentation for safe SAP handoff.' },
    { icon: 'ShieldCheck', title: 'Operational safety', desc: 'Executes a repeatable, error-free restoration routine.' },
  ],
};

const portfolioKitKovon: PortfolioKitData = {
  insightAuthor: 'Product Owner',
  bentoCards: kovonBentoCards,
  technicalSpecs: kovonTechnicalSpecs,
  featureItems: [
    {
      icon: 'ShieldCheck',
      title: 'Verification lifecycle',
      desc: 'Strict status tracking linked to evidence and final outcomes.',
      problem: 'Teams lacked a trustworthy view of completeness across vehicle systems.',
      solution: 'Enforced lifecycle states and attached evidence to specific accountable owners.',
      impact: 'Drove faster audit readiness and killed operational ambiguity.',
    },
    {
      icon: 'UserCog',
      title: 'Ownership model',
      desc: 'Assigns one accountable expert per evaluation unit.',
      problem: 'Shared multi-party responsibility caused gaps and dropped follow-ups.',
      solution: 'Explicit mapping rolled up across system and vehicle levels.',
      impact: 'Created predictable execution and clear accountability.',
    },
    {
      icon: 'RefreshCw',
      title: 'Update handling',
      desc: 'Preserves traceability during major regulation shifts.',
      problem: 'Rule changes consistently broke static documentation setups.',
      solution: 'Built a governance engine that updates rules without erasing the audit trail.',
      impact: 'Maintains compliance effortlessly instead of triggering panic rework.',
    },
  ],
  processSteps: [
    {
      number: '01',
      title: 'Define scope',
      desc: 'Establish vehicle and system parameters for COP documentation.',
      icon: 'Database',
      output: 'Scope locked and visible in the overview.',
    },
    {
      number: '02',
      title: 'Assign ownership',
      desc: 'Delegate discrete verification units to specific experts.',
      icon: 'UserCog',
      output: 'Responsibility assigned and actively tracked.',
    },
    {
      number: '03',
      title: 'Document and resolve',
      desc: 'Log status, attach proofs, and register compliance outcomes.',
      icon: 'FileBadge',
      output: 'Evidence secured with an unalterable audit trail.',
    },
    {
      number: '04',
      title: 'Review and snapshot',
      desc: 'Roll up granular status data into a finalized review view.',
      icon: 'FileCheck',
      output: 'Clean, readable snapshot ready for auditors.',
    },
    {
      number: '05',
      title: 'Maintain updates',
      desc: 'Process regulatory changes without corrupting history.',
      icon: 'RefreshCw',
      output: 'Stable, long-term audit trail.',
    },
  ],
};

const portfolioKitTracklistify: PortfolioKitData = {
  featureItems: [
    { icon: 'Upload', title: 'Ingest', desc: 'Upload a set or audio link to kick off analysis.' },
    { icon: 'Waveform', title: 'Analyze', desc: 'Extract identified tracks into a clean UI list.' },
    { icon: 'Repeat', title: 'Rescan', desc: 'Retain pointers and text results to enable rapid future rescans.' },
    { icon: 'Bookmark', title: 'Wishlist', desc: 'Save favorites and build a targeted purchase intent list.' },
  ],
};

const portfolioKitFixundfertig: PortfolioKitData = {
  featureItems: [
    { icon: 'Mail', title: 'Email intake', desc: 'Auto-ingest and classify arriving attachments.' },
    { icon: 'Scan', title: 'OCR to JSON', desc: 'Extract semantic structures natively into JSON formatting.' },
    { icon: 'Database', title: 'API storage', desc: 'Push validated JSON payloads directly into application APIs.' },
    { icon: 'CheckCircle', title: 'Review UI', desc: 'Provide a fast, lightweight dashboard for human corrections.' },
  ],
  technicalSpecs: [
    {
      title: 'Stack and pipeline',
      body:
        'Built entirely in Python. Utilizes n8n for email transport, an OCR engine for extraction, and NiceGUI for the front-end review surface.',
    },
  ],
};

// --- Single source: all projects keyed by slug ---

export const portfolio: PortfolioSource = {
  kovon: {
    id: '1',
    slug: 'kovon',
    title: 'KoVoN',
    navTitle: 'Automotive compliance documentation tool',
    subtitle: 'Audit-driven verification tracking for COP documentation.',
    oneLiner:
      'Pilot web tool that tracks verification status, ownership, and evidence across vehicle parts and systems.',
    category: 'Enterprise',
    year: '2022 to 2024',
    client: 'Automotive (Konzern)',
    moodImageUrl: '/projects/kovon_hero.jpg',
    galleryUrls: [
      '/projects/kovon_gallery_01.jpg',
      '/projects/kovon_gallery_03.jpg',
      '/projects/kovon_gallery_04.jpg',
      '/projects/kovon_gallery_05.jpg',
      '/projects/kovon_gallery_06.jpg',
      '/projects/kovon_gallery_07.jpg',
    ],
    roles: ['Product Designer', 'Scrum Master'],
    roleLine: 'Product and UX concept. Scrum facilitation.',
    teamSize: '4 to 6 devs, 2 designers',
    customerAbout: 'Automotive product development. Internal compliance workflows.',
    context:
      'An internal audit required traceable proof of Conformity of Production documentation. Teams needed one place to see completeness, progress, and ownership.',
    problem:
      'Documentation was scattered and avoided due to time pressure. Verification paths differed heavily, and regular regulation updates broke static tracking files.',
    solution:
      'Delivered a digital workflow mapping explicit lifecycle states and governance structures to handle regulatory updates gracefully.',
    outcomes: [
      'Validated a pilot concept for COP documentation and verification tracking.',
      'Defined ownership and responsibilities per evaluation unit.',
      'Established lifecycle states for status, evidence, and outcomes.',
      'Provided a governance foundation for regulation and rule updates.',
    ],
    metrics: [],
    highlights: [
      'Role-based dashboards governing vehicle projects, tasks, and users.',
      'Clear separation of status, evidence, ownership, and outcome.',
      'Robust update engine for regulation structure changes.',
    ],
    tools: ['Angular', 'AWS'],
    methods: ['Stakeholder interviews', 'Workflow definition', 'User tests', 'Scrum facilitation'],
    links: [{ label: 'Case study', href: '/projects/kovon' }],
    impact: [
      { value: '~500 users', label: 'Scale' },
      { value: 'POC to Beta', label: 'Maturity' },
      { value: '2.5 years', label: 'Timeline' },
      { value: 'Angular, AWS', label: 'Stack' },
    ],
    metaCards: [
      { label: 'Users', value: '~500', icon: 'users', hint: 'Estimated user group size around the pilot.' },
      { label: 'Timeline', value: '2.5 years', icon: 'timeline' },
      { label: 'Stages', value: 'POC, MVP, Beta', icon: 'stages' },
      { label: 'Role', value: 'Product and UX concept. Scrum facilitation.', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Compliance documentation concept and information model',
        'Verification lifecycle and ownership model',
        'Prototype screens and governance for updates',
      ],
      impact: [
        'Central visibility of status across parts and systems',
        'Clear ownership per evaluation unit',
        'Less manual searching and ambiguity',
      ],
    },
    tags: ['compliance', 'enterprise', 'automotive', 'product'],
    impactCards: [
      { label: 'Users', value: '~500' },
      { label: 'Timeline', value: '2.5 years' },
      { label: 'Stages', value: 'POC, MVP, Beta' },
      { label: 'Role', value: 'Product and UX concept' },
    ],
    caseStudy: caseStudyKovon,
    portfolioKit: portfolioKitKovon,
    kovon: kovonConfig,
  },

  automation: {
    id: '6',
    slug: 'automation',
    title: 'SAP process automation',
    navTitle: 'SAP process automation',
    subtitle: 'Automation concept and PDD for a recurring SAP validation workflow.',
    oneLiner:
      'Automation concept and step-by-step PDD reducing recurring manual checks after database inheritance events.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Automation Manager', 'Process Analyst'],
    roleLine: 'Automation concept owner. Process definition and handoff.',
    context:
      'In a shared group environment, inherited changes reset states in the child database. Experts continually verified and restored correctness manually.',
    problem:
      'Review states could not be trusted after inheritance updates. Manual checks wasted time and spiked operational risk through human error.',
    solution:
      'Clustered use cases alongside experts, prioritized the highest-value path, and delivered a precise PDD for SAP admins to implement safely.',
    outcomes: [
      'Use cases clustered and prioritized with domain experts.',
      'Implementation-ready PDD delivered for SAP administrators.',
      'Recurring manual checking effort reduced for the expert group.',
    ],
    metrics: ['About 20 experts', 'About 4 hours per week saved'],
    impact: [
      { value: '~20', label: 'Experts impacted' },
      { value: '~4 h/week', label: 'Time saved' },
      { value: 'SAP', label: 'Environment' },
      { value: 'PDD', label: 'Deliverable' },
    ],
    highlights: [
      'Use case clustering and prioritization with experts.',
      'Implementation-ready documentation for SAP administrators.',
      'Safe automation focus in a highly constrained environment.',
    ],
    tools: ['SAP', 'Figma', 'Docs'],
    methods: ['Process mapping', 'Expert workshops', 'Use case clustering', 'Handoff documentation'],
    links: [{ label: 'Case study', href: '/projects/automation' }],
    cardCoverUrl: '/projects/sap_automation_bot_hero.png',
    metaCards: [
      { label: 'Experts', value: '~20', icon: 'users' },
      { label: 'Time saved', value: '~4 h/week', icon: 'impact' },
      { label: 'Environment', value: 'SAP enterprise', icon: 'stack' },
      { label: 'Deliverable', value: 'PDD, click-by-click', icon: 'deliverable' },
    ],
    deliveryImpact: {
      delivery: [
        'Use case clustering with experts',
        'PDD documentation and handoff',
        'Automation pitch and alignment with SAP admins',
      ],
      impact: [
        'Reduced recurring manual checks',
        'More consistent handling after inheritance events',
        'Less error-prone operational routine',
      ],
    },
    coverFallback: 'icon',
    tags: ['automation', 'ops', 'enterprise'],
    impactCards: [
      { label: 'Experts impacted', value: '~20' },
      { label: 'Time saved', value: '~4 h/week' },
      { label: 'Deliverable', value: 'Implementation PDD' },
      { label: 'Environment', value: 'SAP enterprise' },
    ],
    caseStudy: caseStudyAutomation,
    portfolioKit: portfolioKitAutomation,
  },

  'ffp-dashboard': {
    id: '7',
    slug: 'ffp-dashboard',
    title: 'Automotive Failure Fingerprint Dashboard',
    subtitle: 'Workflow-based redesign for expert triage, correlation, and root cause synthesis.',
    oneLiner:
      'Redesigned an expert tool to separate siloed workflows and support symptom-first root cause investigations.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    moodImageUrl: '/projects/ffp_dashboard_hero.jpg',
    galleryUrls: [
      '/projects/ffp_gallery_01.png',
      '/projects/ffp_gallery_02.png',
      '/projects/ffp_gallery_03.png',
      '/projects/ffp_gallery_04.png',
      '/projects/ffp_gallery_05.png',
      '/projects/ffp_gallery_06.png',
      '/projects/ffp_gallery_07.png',
      '/projects/ffp_gallery_08.png',
      '/projects/ffp_gallery_09.png',
      '/projects/ffp_gallery_10.png',
      '/projects/ffp_gallery_11.png',
      '/projects/ffp_gallery_12.png',
    ],
    roles: ['UX/UI Designer'],
    roleLine: 'UX/UI Designer. Workflow mapping and high-fidelity prototype.',
    teamSize: '2 to 3',
    customerAbout: 'Automotive internal expert tool for diagnostics and failure analysis.',
    context:
      'The department handled three conflicting jobs: supplier issues, production issues, and root cause correlation. The legacy UI mashed them into a single interface.',
    problem:
      'Symptom-first reasoning was completely blocked by part-number-centric flows, preventing experts from merging similar cases effectively.',
    solution:
      'Mapped distinct roles through expert shadowing and delivered a workflow-separated prototype specifically referencing development targets.',
    outcomes: [
      'Separated workflows into role-based modes and clear entry points.',
      'Improved information hierarchy for symptom-first investigation.',
      'Enabled cross-stream correlation for rapid root cause synthesis.',
    ],
    metrics: [],
    highlights: [
      'Workflow-based navigation isolating supplier and production modes.',
      'Clear handoffs between intake, triage, and final review.',
      'Figma prototypes acting as immediate implementation references.',
    ],
    tools: ['Figma', 'Jira', 'Confluence', 'Miro'],
    methods: ['Shadowing', 'Interviews', 'Workflow mapping', 'Iterative prototyping'],
    links: [{ label: 'Live demo', href: '/prototypes/ffp/fingerprints' }],
    prototype: {
      prototypeType: 'in-app',
      inAppPrototypeHref: '/prototypes/ffp/fingerprints',
      hints: [
        'Diagnosis dashboard: assess and group cases',
        'DISS: untagged errors to be classified',
        'Correlation: merge signals into one fingerprint',
        'Detail view: case data and impact',
      ],
    },
    prototypeButtonLabel: 'Live demo',
    impact: [
      { value: 'Role-based', label: 'Modes' },
      { value: 'Symptom-first', label: 'Search model' },
      { value: 'Correlation', label: 'Root cause support' },
    ],
    metaCards: [
      { label: 'Experts', value: '10 to 20', icon: 'users' },
      { label: 'Duration', value: 'Over 6 months', icon: 'timeline' },
      { label: 'Methods', value: 'Shadowing, interviews, workflow mapping', icon: 'stages' },
      { label: 'Deliverable', value: 'Concept and high-fidelity prototype', icon: 'deliverable' },
    ],
    deliveryImpact: {
      delivery: [
        'Workflow-based IA and modes',
        'Screen designs per role and task',
        'Interaction concept and high-fidelity prototype',
      ],
      impact: [
        'Reduced cognitive load',
        'Better findability and continuity',
        'Improved correlation and root cause workflow support',
      ],
    },
    tags: ['enterprise', 'automotive', 'diagnostics', 'workflow'],
    impactCards: [
      { label: 'Modes', value: 'Role-based' },
      { label: 'Search model', value: 'Symptom-first' },
      { label: 'Correlation', value: 'Merged view' },
      { label: 'Deliverable', value: 'High-fidelity prototype' },
    ],
    caseStudy: caseStudyFfp,
    portfolioKit: portfolioKitFfp,
  },

  'emission-compliance': {
    id: '8',
    slug: 'emission-compliance',
    title: 'Car Emission Compliance Dashboard',
    subtitle: 'Visual interaction concept solving table clarity and outlier visibility.',
    oneLiner:
      'Visual redesign stripping table clutter to help experts instantly spot anomalies and threshold breaches.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    moodImageUrl: '/projects/emission_compliance_hero.jpg',
    galleryUrls: [
      '/projects/ceasar_gallery_01.png',
      '/projects/ceasar_gallery_02.png',
      '/projects/ceasar_gallery_03.png',
      '/projects/ceasar_gallery_04.png',
      '/projects/ceasar_gallery_05.png',
      '/projects/ceasar_gallery_06.png',
      '/projects/ceasar_gallery_07.png',
      '/projects/ceasar_gallery_08.png',
      '/projects/ceasar_gallery_09.png',
      '/projects/ceasar_gallery_010.png',
      '/projects/ceasar_gallery_011.png',
    ],
    roles: ['UX Designer', 'UI Designer'],
    roleLine: 'UX/UI Designer. Visual concept and high-fidelity prototypes.',
    teamSize: '2 to 3',
    context:
      'Emission data lived in flat tables. Visual noise made it painfully slow to identify critical threshold drops before mandatory reporting.',
    problem:
      'Experts missed outliers buried in text-heavy views. The UI required a consistent way to encode and adjust thresholds reliably.',
    solution:
      'Standardized threshold interaction rules and stripped non-essential visual noise, delivering high-fidelity prototypes for rapid implementation.',
    outcomes: [
      'Reduced visual clutter in table-heavy reporting views.',
      'Made anomalies and threshold breaches visible at a glance.',
      'Improved confidence through consistent color-encoding rules.',
    ],
    metrics: [],
    impact: [
      { value: 'Earlier', label: 'Anomaly detection' },
      { value: 'Clearer', label: 'Table hierarchy' },
      { value: 'Visible', label: 'Threshold logic' },
    ],
    highlights: [
      'List-level color coding flawlessly mapped to chart thresholds.',
      'Unified threshold settings conceptualization.',
      'Design strictly focused on high-speed expert interpretation.',
    ],
    tools: ['Figma'],
    methods: ['Workflow capture', 'Interaction concept', 'High-fidelity prototyping', 'Reviews and handoff'],
    links: [{ label: 'Case study', href: '/projects/emission-compliance' }],
    metaCards: [
      { label: 'Users', value: '10 to 15', icon: 'users' },
      { label: 'Deliverable', value: 'Visual concept and high-fidelity prototypes', icon: 'deliverable' },
      { label: 'Testing', value: 'Tested, implemented fast', icon: 'stages' },
      { label: 'Role', value: 'UX/UI Designer, visual concept focus', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Explorative visualization drafts',
        'Threshold and outlier interaction concept',
        'List color coding plus settings concept',
      ],
      impact: [
        'Faster outlier detection',
        'Clearer thresholds and actions',
        'Consistent encoding across views',
      ],
    },
    tags: ['enterprise', 'automotive', 'emission', 'compliance'],
    impactCards: [
      { label: 'Users', value: '10 to 15' },
      { label: 'Focus', value: 'Outliers and thresholds' },
      { label: 'Deliverable', value: 'High-fidelity concept' },
      { label: 'Outcome', value: 'Earlier anomaly detection' },
    ],
    caseStudy: caseStudyCaesar,
    portfolioKit: portfolioKitCaesar,
  },

  tracklistify: {
    id: '4',
    slug: 'tracklistify',
    title: 'Tracklistify Studio',
    subtitle: 'Tooling for DJs to analyze sets and build track wishlists.',
    oneLiner:
      'Side project analyzing DJ sets to extract track metadata and support wishlist creation without hoarding audio files.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Concept and indie developer.',
    context:
      'DJs frequently study sets but manual track identification is tedious and entirely unstructured.',
    problem:
      'Existing solutions blend audio storage with analysis poorly, failing to provide a clean path from ingest to a purchasable wishlist.',
    solution:
      'Built a prototype pipeline that ingests audio for analysis, stores pointers instead of heavy files, and immediately pushes tracks to review and wishlist flows.',
    outcomes: [
      'Defined an end-to-end workflow from ingest to wishlist.',
      'Architected an analysis-first prototype focusing strictly on metadata rescans rather than source storage.',
    ],
    metrics: [],
    highlights: [
      'Clean architectural separation between results and raw source handling.',
      'Rescan functionality powered by stored pointers.',
      'UI highly optimized for fast track review and saving.',
    ],
    tools: ['Python', 'Next.js'],
    methods: ['Rapid prototyping', 'Flow design', 'Iteration'],
    links: [
      { label: 'Live demo', href: 'http://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.aZxIdQ.-CQMXtrCxrMpTC0SgrVOn3I5XDk' },
      { label: 'GitHub', href: 'https://github.com/example/tracklistify' },
    ],
    metaCards: [
      { label: 'Timeline', value: 'Jan 2026', icon: 'timeline' },
      { label: 'Deliverable', value: 'Prototype and workflow concept', icon: 'deliverable' },
      { label: 'Core flow', value: 'Ingest, analyze, rescan, wishlist', icon: 'stages' },
      { label: 'Role', value: 'Concept and indie developer', icon: 'role' },
    ],
    coverFallback: 'initials',
    deliveryImpact: {
      delivery: [
        'Ingest and analyze audio, then remove source data',
        'Store scan results and pointers for rescanning',
        'Track list, wishlist, and buy intent flow',
      ],
      impact: [
        'Clean workflow from ingest to wishlist',
        'No original source storage, analysis-first design',
      ],
    },
    tags: ['side', 'audio', 'dj', 'workflow'],
    impactCards: [
      { label: 'Timeline', value: 'Jan 2026' },
      { label: 'Deliverable', value: 'Prototype and workflow concept' },
      { label: 'Core flow', value: 'Ingest, rescan, wishlist' },
      { label: 'Role', value: 'Indie developer' },
    ],
    caseStudy: caseStudyTracklistify,
    portfolioKit: portfolioKitTracklistify,
  },

  fixundfertig: {
    id: '5',
    slug: 'fixundfertig',
    title: 'Fix und Fertig',
    subtitle: 'Invoice and expense automation with OCR and structured extraction.',
    oneLiner:
      'Python pipeline utilizing OCR and semantic extraction to turn email attachments into structured API JSON.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Indie developer, automation.',
    context:
      'Invoices and receipts flood inboxes in infinite formats, making manual data entry a guaranteed bottleneck.',
    problem:
      'Heavy manual correction defeated the purpose of existing OCR tools. We needed a reliable bridge from raw email attachment to structured data.',
    solution:
      'Linked n8n email intake to an OCR extraction script, mapping output to JSON, and presenting it in a lightweight NiceGUI surface for rapid review.',
    outcomes: [
      'Automated intake and extraction pipeline from raw email to structured data.',
      'Drastically reduced manual copying and routine formatting errors.',
    ],
    metrics: [],
    impact: [
      { value: 'Email to JSON', label: 'Automated pipeline' },
      { value: 'OCR and semantics', label: 'Extraction steps' },
    ],
    highlights: [
      'NiceGUI frontend for hyper-fast internal reviews.',
      'n8n automation handling email and raw attachment logistics.',
      'Clean JSON payloads delivered straight to application APIs.',
    ],
    tools: ['Python', 'NiceGUI', 'n8n', 'OCR pipeline'],
    methods: ['Workflow automation', 'Incremental builds', 'Debug-driven iteration'],
    links: [
      { label: 'Live demo', href: 'https://app.untitled-ux.de/share/read/4ba7659247a84340afdec6b0f852718c' },
      { label: 'GitHub', href: 'https://github.com/example/fixundfertig' },
    ],
    notes:
      'Pipeline: email attachment intake via n8n. OCR plus semantic extraction to JSON. JSON pushed into the API. Python-only stack with NiceGUI.',
    metaCards: [
      { label: 'Timeline', value: 'Feb 2026', icon: 'timeline' },
      { label: 'Stack', value: 'Python, NiceGUI, n8n, OCR', icon: 'stack' },
      { label: 'Deliverable', value: 'Automated document processing pipeline', icon: 'deliverable' },
      { label: 'Role', value: 'Indie developer, automation', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Python-only stack with NiceGUI',
        'n8n automation for email and attachments',
        'OCR and semantic extraction into JSON',
        'JSON into API plus automated build',
      ],
      impact: [
        'Single pipeline from attachment to structured data',
        'Less manual entry and fewer formatting errors',
      ],
    },
    tags: ['side', 'automation', 'ops', 'python'],
    impactCards: [
      { label: 'Timeline', value: 'Feb 2026' },
      { label: 'Stack', value: 'Python and OCR pipeline' },
      { label: 'Deliverable', value: 'Email to JSON automation' },
      { label: 'Role', value: 'Indie developer' },
    ],
    caseStudy: caseStudyFixundfertig,
    portfolioKit: portfolioKitFixundfertig,
  },
};

// --- Getters ---

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return portfolio[slug] ?? null;
}

export function getAllProjects(): PortfolioProject[] {
  return Object.values(portfolio);
}

export function getCaseStudySections(slug: string): CaseStudySections | null {
  const p = portfolio[slug];
  return p?.caseStudy ?? null;
}

export function getPortfolioKit(slug: string): PortfolioKitData | null {
  const p = portfolio[slug];
  return p?.portfolioKit ?? null;
}

export function getKovonConfig(): KovonConfig | null {
  const p = portfolio['kovon'];
  return p?.kovon ?? null;
}

export function getKovonFeaturedCaseConfig() {
  return getKovonConfig()?.featuredCase ?? null;
}

export function getBentoCards(slug: string): BentoCardItem[] {
  return portfolio[slug]?.portfolioKit?.bentoCards ?? [];
}

export function getTechnicalSpecs(slug: string): TechnicalSpecItem[] {
  return portfolio[slug]?.portfolioKit?.technicalSpecs ?? [];
}

/** Returns project core + impactCards for use as Project compatible shape (for payload fallback). */
export function getProjectCoreBySlug(
  slug: string
): (Project & { impactCards: ImpactCardItem[] }) | null {
  const p = portfolio[slug];
  if (!p) return null;
  const { caseStudy: _cs, portfolioKit: _pk, kovon: _k, ...core } = p;
  return { ...core, impactCards: p.impactCards };
}