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
      'KoVoN created a single COP overview for vehicle projects. Teams could see what was complete, what was missing, what was in progress, and who owned each verification item. This turned audit requirements into a workable day to day flow.',
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
      'Regulation changes are handled through structured ownership and a clear update routine. The system keeps a stable audit trail even when the underlying rules change.',
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
      'KoVoN was designed to support different vehicle programs and component domains. The structure stays consistent, while scope and task packages can be adapted.',
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
      'Roles and handoffs were modeled explicitly. Approvals and bottlenecks became visible, so coordination scaled without duplicate work or unclear responsibility.',
    outcomeBullets: [
      'Ownership and approvals made explicit.',
      'Coordination overhead reduced through clearer handoffs.',
    ],
  },
];

const kovonWhereItLandedBullets: string[] = [
  'Working pilot delivered for one vehicle configuration.',
  'About 80 percent of documentation fields filled in the pilot.',
  'End to end visibility for status and responsibility.',
  'Bottlenecks surfaced for next iterations: ownership load, update cycles, matching effort, complexity.',
  'Governance foundation for a scalable COP documentation approach.',
];

const kovonWhyRolloutStoppedBullets: string[] = [
  'Rollout began, then priorities shifted due to a strategy change.',
  'Audit related rollout activities were paused and the pilot did not scale further.',
];

const kovonConfig: KovonConfig = {
  contentTabs: kovonContentTabs,
  whereItLandedBullets: kovonWhereItLandedBullets,
  whyRolloutStoppedBullets: kovonWhyRolloutStoppedBullets,
};

// --- Shared FFP bento + technical specs ---

const ffpBentoCards: BentoCardItem[] = [
  {
    title: 'Symptom first entry',
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
    title: 'Role based modes',
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
      'Shadowing and deep interviews revealed a symptom first mental model. The legacy UI forced part number lookup first, which added friction during investigation. Three workflows required clear modes and handoffs.',
  },
  {
    title: 'Workflow design and correlation concept',
    body:
      'Supplier quality focuses on external cases. Production testing focuses on internal findings. Root cause synthesis merges signals into a single fingerprint for review. The correlation concept supports moving from symptoms to evidence to root cause.',
  },
  {
    title: 'Design delivery and handoff',
    body:
      'High fidelity prototypes were used in reviews while development ran in parallel. The Figma package served as the reference for building screens consistently and validating decisions with stakeholders.',
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
      'Defined entities for vehicle, system, verification unit, status, ownership, evidence, and outcome. This supports both overview completeness and deep traceability.',
  },
  {
    title: 'Lifecycle and governance',
    body:
      'Verification moves through clear lifecycle states. Ownership rules and rollups make progress visible across system and vehicle levels. Governance supports regulation updates without losing audit clarity.',
  },
  {
    title: 'Pilot delivery',
    body:
      'Delivered as a pilot to validate scalability, workflows, and role concepts. The result was a governance ready foundation that can be scaled when organizational capacity allows it.',
  },
];

// --- Case study sections (keyed by slug) ---

const caseStudyKovon: CaseStudySections = {
  summary:
    'Audit driven pilot that proved how COP documentation can be operated with lifecycle tracking, ownership, and evidence.',
  contextWhyMattered:
    'An internal audit required traceable proof of Conformity of Production documentation. Teams needed a single place to see completeness, progress, and accountability.',
  realProblem:
    'Documentation was scattered and often avoided due to time pressure. Verification work had different paths and outcomes, including production relevance. Regulations and internal rules changed regularly, so the system had to be maintainable.',
  myRole:
    'Product and UX concept. Scrum facilitation. Information model, workflow structure, and prototype screens.',
  approach:
    'Defined the information model and verification lifecycle. Designed ownership rules, status tracking, and evidence handling. Validated the concept through iteration to prove scalability and operational fit.',
  solutionConcept:
    'A pilot web tool with lifecycle states, ownership per evaluation unit, evidence capture, and a governance oriented structure for updates.',
  outcome:
    'A validated pilot concept that made status and ownership visible and provided a maintainable foundation for future rollout when capacity allows it.',
  whatToShowVisually:
    'Lifecycle diagram. Overview of systems with status chips and owners. Detail page with evidence and outcome. Update concept for regulation changes.',
};

const caseStudyAutomation: CaseStudySections = {
  summary:
    'SAP process automation concept plus click by click PDD to reduce recurring manual checks after inheritance events.',
  contextWhyMattered:
    'Inherited updates could reset states in a shared environment. Experts had to repeatedly verify and restore correctness, which increased effort and risk.',
  realProblem:
    'Experts could not trust review state after inheritance events. Manual checks were repetitive, time consuming, and error prone. The solution needed to be safe and implementable in a constrained SAP context.',
  constraints:
    'Strict environment constraints and limited budget. The handoff needed to be precise enough for SAP administrators to implement reliably.',
  myRole:
    'Automation manager and process analyst. Use case clustering, prioritization, PDD creation, stakeholder alignment, and handoff.',
  approach:
    'Clustered use cases with experts, prioritized the highest value path, and documented the workflow step by step. Aligned with SAP administrators for safe implementation.',
  solutionConcept:
    'Automation flags incorrect resets and supports a restoration routine. The PDD serves as the implementation contract for SAP administrators.',
  outcome:
    'Reduced recurring manual checks and improved consistency of handling after inheritance events. Lower operational risk through a defined routine.',
  whatToShowVisually:
    'Parent child inheritance diagram. Before and after workflow. PDD excerpt showing step clarity.',
};

const caseStudyFfp: CaseStudySections = {
  summary:
    'Redesigned an expert tool to support triage, correlation, and root cause synthesis across supplier and production streams.',
  contextWhyMattered:
    'One department performed three different jobs, but the legacy UI mixed everything together. The tool needed clear modes and handoffs.',
  realProblem:
    'Similar cases could not be merged reliably. Data lived in silos without a clear path to one final fingerprint. The UI forced part number first behavior and slowed down investigations.',
  insightAuthor: 'Lead Engineer',
  myRole:
    'UX and UI design. Workflow mapping, information architecture, high fidelity prototype, and handoff collaboration.',
  approach:
    'Shadowing plus deep interviews to map jobs to be done and mental models. Defined role based modes, table and detail patterns, and navigation. Iterated while development ran in parallel and used prototypes in reviews as the implementation reference.',
  solutionConcept:
    'Symptom first information hierarchy and a correlation concept that merges signals into one fingerprint. Dedicated entry points per workflow and clear handoffs between steps.',
  outcome:
    'Faster triage and improved ability to find similar cases. Tagging consistency improved. The workflow supported correlation into a single root cause view.',
  whatToShowVisually:
    'Workflow map showing three modes that merge into one review flow. Before and after IA. Key screens: intake, triage, correlation, review.',
};

const caseStudyCaesar: CaseStudySections = {
  summary:
    'Visual and interaction concept that reduced table clutter and helped experts spot outliers and threshold breaches earlier.',
  contextWhyMattered:
    'Data was visible but not readable at speed. Experts needed consistent threshold rules across list and chart views.',
  realProblem:
    'Too many tables created clutter. Outliers and breaches were buried in flat data. Threshold logic was present but not interpretable at a glance.',
  myRole:
    'UX and UI design. Visual concept, interaction rules, and high fidelity prototype exploration.',
  approach:
    'Explored raw values, produced rapid prototype iterations, and defined clear rules for threshold encoding and outlier highlighting. Validated through reviews and handed off as a stable design package.',
  solutionConcept:
    'Clear hierarchy for table heavy screens plus consistent encoding rules. Threshold settings concept aligned with list level highlighting.',
  outcome:
    'Outliers became visible earlier and threshold interpretation became clearer. Scan speed improved and ambiguity decreased before reporting.',
  whatToShowVisually:
    'Before and after table hierarchy. Outlier highlighting rules. Threshold settings panel. One example of consistent encoding across list and chart.',
};

const caseStudyTracklistify: CaseStudySections = {
  summary:
    'Indie tool that turns a DJ set into a track list and wishlist flow, designed around analysis first and minimal source retention.',
  contextWhyMattered:
    'Manual track identification is slow and unstructured. DJs need a workflow from set input to a usable list and wishlist.',
  realProblem:
    'Many solutions either do not support rescans or mix source ingestion and storage in unclear ways. A clean workflow was missing.',
  myRole:
    'Concept and indie developer. Workflow design and prototyping.',
  approach:
    'Defined the end to end flow and built a prototype. Input set or audio, analyze, store scan results and pointers for rescans, then present tracks for saving and wishlist.',
  solutionConcept:
    'Analysis first pipeline. Store results and pointers for rescanning rather than keeping the original source. UI focuses on review and saving decisions.',
  outcome:
    'A clear workflow from ingest to wishlist. Rescan support without re ingesting and a clean separation of source and results.',
  whatToShowVisually:
    'Flow diagram. Track review screen. Wishlist screen. One example of a rescan state.',
};

const caseStudyFixundfertig: CaseStudySections = {
  summary:
    'Python based automation app that ingests invoices and receipts from email, runs OCR and semantic extraction, and stores structured JSON.',
  contextWhyMattered:
    'Invoices and receipts arrive in many formats. Manual entry creates friction and errors.',
  realProblem:
    'There was no single pipeline from email attachment to reliable structured data. Many tools required heavy correction or did not fit the workflow.',
  myRole:
    'Indie developer and automation. Pipeline design, integration, and UI for reviewing extracted data.',
  approach:
    'Built an email ingestion flow, OCR extraction, semantic parsing to JSON, and API ingestion. Added a lightweight UI for review and correction.',
  solutionConcept:
    'Automation pipeline from email to structured JSON. Clear separation between ingestion, extraction, and storage, with a minimal review surface.',
  outcome:
    'Less manual entry and fewer formatting errors. A repeatable pipeline that turns attachments into structured data.',
  whatToShowVisually:
    'Pipeline diagram. Example JSON output. Review UI. One email intake example with status steps.',
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
      desc: 'Observed experts to understand real workflows and investigation habits.',
    },
    {
      number: '02',
      title: 'Interviews',
      desc: 'Deep interviews to define jobs to be done across supplier, production, and root cause work.',
    },
    {
      number: '03',
      title: 'Workflow mapping',
      desc: 'Defined modes, entry points, handoffs, and information hierarchy for symptom first investigation.',
    },
    {
      number: '04',
      title: 'Prototype and handoff',
      desc: 'Delivered a high fidelity prototype package as implementation reference for development reviews.',
    },
  ],
  featureItems: [
    {
      icon: 'Layout',
      title: 'Role based modes',
      desc: 'Separate views for supplier work, production work, and root cause synthesis.',
    },
    {
      icon: 'Database',
      title: 'Correlation concept',
      desc: 'Merge signals into one fingerprint view for review.',
    },
    {
      icon: 'Search',
      title: 'Symptom first entry',
      desc: 'Start from symptoms and navigate to correlated evidence.',
    },
  ],
};

const portfolioKitCaesar: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Exploration', desc: 'Explored raw values and where interpretation breaks in table heavy views.' },
    { number: '02', title: 'Rapid prototyping', desc: 'Iterated visual and interaction concepts for thresholds and outliers.' },
    { number: '03', title: 'Handoff', desc: 'Delivered high fidelity screens plus consistent encoding rules.' },
  ],
  featureItems: [
    { icon: 'Layout', title: 'Reduced clutter', desc: 'Clearer hierarchy and scan patterns in table heavy screens.' },
    { icon: 'BarChart3', title: 'Outlier visibility', desc: 'Outliers and breaches become readable at a glance.' },
    { icon: 'Sliders', title: 'Threshold rules', desc: 'Consistent encoding plus a clear settings concept for thresholds.' },
  ],
};

const portfolioKitAutomation: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Process mapping', desc: 'Mapped inheritance events and manual checking routines.' },
    { number: '02', title: 'Expert sessions', desc: 'Clustered and prioritized use cases with domain experts.' },
    { number: '03', title: 'PDD', desc: 'Wrote click by click documentation for SAP administrators.' },
    { number: '04', title: 'Handoff', desc: 'Aligned implementation and safe automation behavior.' },
  ],
  featureItems: [
    { icon: 'Zap', title: 'Automation intervention', desc: 'Reduce recurring manual checks after inheritance events.' },
    { icon: 'FileCheck', title: 'Implementation PDD', desc: 'Step level document as a safe handoff to SAP admins.' },
    { icon: 'ShieldCheck', title: 'Operational safety', desc: 'Repeatable routine with lower risk of errors.' },
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
      desc: 'Status tracking with evidence and outcomes.',
      problem: 'Teams could not see completeness and progress reliably across systems.',
      solution: 'Lifecycle states plus evidence handling and clear ownership per unit.',
      impact: 'Faster audit readiness and less ambiguity in daily operations.',
    },
    {
      icon: 'UserCog',
      title: 'Ownership model',
      desc: 'One accountable owner per evaluation unit with clear delegation.',
      problem: 'Shared responsibility led to unclear accountability and missing follow through.',
      solution: 'Explicit ownership rules and rollups across system and vehicle levels.',
      impact: 'Clear responsibilities and predictable execution.',
    },
    {
      icon: 'RefreshCw',
      title: 'Update handling',
      desc: 'Regulation updates stay traceable.',
      problem: 'Rules changed regularly and broke static documentation setups.',
      solution: 'Governance concept with update visibility and stable evaluation structure.',
      impact: 'Maintainable compliance operation instead of ad hoc rework.',
    },
  ],
  processSteps: [
    {
      number: '01',
      title: 'Define scope',
      desc: 'Set up vehicle and system scope for COP documentation.',
      icon: 'Database',
      output: 'Scope visible in overview.',
    },
    {
      number: '02',
      title: 'Assign ownership',
      desc: 'Delegate verification units to accountable owners.',
      icon: 'UserCog',
      output: 'Ownership assigned and trackable.',
    },
    {
      number: '03',
      title: 'Document and resolve',
      desc: 'Update status, attach evidence, apply outcomes where relevant.',
      icon: 'FileBadge',
      output: 'Evidence and status updated with audit trail.',
    },
    {
      number: '04',
      title: 'Review and snapshot',
      desc: 'Roll up status and generate a review ready view.',
      icon: 'FileCheck',
      output: 'Readable snapshot for review and audit.',
    },
    {
      number: '05',
      title: 'Maintain updates',
      desc: 'Handle regulation changes without losing traceability.',
      icon: 'RefreshCw',
      output: 'Stable audit trail through updates.',
    },
  ],
};

const portfolioKitTracklistify: PortfolioKitData = {
  featureItems: [
    { icon: 'Upload', title: 'Ingest', desc: 'Input a set or audio and start analysis.' },
    { icon: 'Waveform', title: 'Analyze', desc: 'Extract tracks into a structured list for review.' },
    { icon: 'Repeat', title: 'Rescan', desc: 'Store scan results and pointers to support rescanning.' },
    { icon: 'Bookmark', title: 'Wishlist', desc: 'Save tracks and keep purchase intent organized.' },
  ],
};

const portfolioKitFixundfertig: PortfolioKitData = {
  featureItems: [
    { icon: 'Mail', title: 'Email intake', desc: 'Attachments are ingested and classified automatically.' },
    { icon: 'Scan', title: 'OCR to JSON', desc: 'OCR plus semantic extraction produces structured fields.' },
    { icon: 'Database', title: 'API storage', desc: 'JSON is stored through the app API for workflows.' },
    { icon: 'CheckCircle', title: 'Review UI', desc: 'Lightweight review and correction surface for extracted data.' },
  ],
  technicalSpecs: [
    {
      title: 'Stack and pipeline',
      body:
        'Python only. NiceGUI frontend. n8n automation for email and attachments. OCR plus semantic extraction to JSON. JSON pushed into the API.',
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
    subtitle: 'Audit driven verification tracking for COP documentation.',
    oneLiner:
      'Pilot web tool that tracks verification status, ownership, and evidence across vehicle parts and systems.',
    category: 'Enterprise',
    year: '2022 to 2024',
    client: 'Automotive (Konzern)',
    roles: ['Product Designer', 'Scrum Master'],
    roleLine: 'Product and UX concept. Scrum facilitation.',
    teamSize: '4 to 6 devs, 2 designers',
    customerAbout: 'Automotive product development. Internal compliance workflows.',
    context:
      'An internal audit required traceable proof of Conformity of Production documentation. Teams needed one place to see completeness, progress, and ownership.',
    problem:
      'Documentation was scattered and often avoided due to time pressure. Verification paths differed by type and regulations changed regularly. The process needed lifecycle tracking, ownership, and a structure that stays maintainable.',
    solution:
      'Designed a pilot web tool with lifecycle states, ownership per evaluation unit, evidence capture, and a governance oriented structure for updates.',
    outcomes: [
      'Validated a pilot concept for COP documentation and verification tracking.',
      'Defined ownership and responsibilities per evaluation unit.',
      'Established lifecycle states for status, evidence, and outcomes.',
      'Provided a governance foundation for regulation and rule updates.',
    ],
    metrics: [],
    highlights: [
      'Role based dashboards and a management area for vehicle projects, tasks, and users.',
      'Clear separation of status, evidence, ownership, and outcome.',
      'Update concept for regulation structure and operational structure.',
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
      'Automation concept plus click by click PDD to reduce recurring manual checks after inheritance events.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Automation Manager', 'Process Analyst'],
    roleLine: 'Automation concept owner. Process definition and handoff.',
    context:
      'In a shared group environment, inherited changes could reset states in the child database. Experts had to repeatedly verify and restore correctness after propagation events.',
    problem:
      'Review state could not be trusted after inheritance events. Manual checks were repetitive and time consuming, and errors increased operational risk.',
    solution:
      'Clustered use cases with experts, prioritized the highest value path, and delivered a detailed PDD so SAP admins could implement a safe automation task.',
    outcomes: [
      'Use cases clustered and prioritized with domain experts.',
      'Implementation ready PDD delivered for SAP administrators.',
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
      'Implementation ready documentation for SAP administrators.',
      'Safe automation focus in a constrained environment.',
    ],
    tools: ['SAP', 'Figma', 'Docs'],
    methods: ['Process mapping', 'Expert workshops', 'Use case clustering', 'Handoff documentation'],
    links: [{ label: 'Case study', href: '/projects/automation' }],
    metaCards: [
      { label: 'Experts', value: '~20', icon: 'users' },
      { label: 'Time saved', value: '~4 h/week', icon: 'impact' },
      { label: 'Environment', value: 'SAP enterprise', icon: 'stack' },
      { label: 'Deliverable', value: 'PDD, click by click', icon: 'deliverable' },
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
        'Less error prone operational routine',
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
    subtitle: 'Workflow based redesign for expert triage, correlation, and root cause synthesis.',
    oneLiner:
      'Redesigned an expert tool to separate supplier, production, and root cause workflows and support symptom first investigation.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX/UI Designer'],
    roleLine: 'UX/UI Designer. Workflow mapping and high fidelity prototype.',
    teamSize: '2 to 3',
    customerAbout: 'Automotive internal expert tool for diagnostics and failure analysis.',
    context:
      'The department handled three different jobs: supplier issues, production issues, and root cause correlation. The legacy UI mixed everything in one interface.',
    problem:
      'Different tasks shared the same screens, data was hard to correlate, and symptom first reasoning was blocked by part number centric flows.',
    solution:
      'Mapped roles and workflows through shadowing and interviews, designed a workflow based structure, and delivered a concept plus high fidelity prototype for implementation.',
    outcomes: [
      'Separated workflows into role based modes and clear entry points.',
      'Improved information hierarchy for symptom first investigation.',
      'Enabled correlation across streams for root cause synthesis.',
    ],
    metrics: [],
    highlights: [
      'Workflow based navigation and mode separation.',
      'Clear handoffs between intake, triage, correlation, and review.',
      'Prototypes used directly as implementation reference in reviews.',
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
      { value: 'Role based', label: 'Modes' },
      { value: 'Symptom first', label: 'Search model' },
      { value: 'Correlation', label: 'Root cause support' },
    ],
    metaCards: [
      { label: 'Experts', value: '10 to 20', icon: 'users' },
      { label: 'Duration', value: 'Over 6 months', icon: 'timeline' },
      { label: 'Methods', value: 'Shadowing, interviews, workflow mapping', icon: 'stages' },
      { label: 'Deliverable', value: 'Concept and high fidelity prototype', icon: 'deliverable' },
    ],
    deliveryImpact: {
      delivery: [
        'Workflow based IA and modes',
        'Screen designs per role and task',
        'Interaction concept and high fidelity prototype',
      ],
      impact: [
        'Reduced cognitive load',
        'Better findability and continuity',
        'Improved correlation and root cause workflow support',
      ],
    },
    tags: ['enterprise', 'automotive', 'diagnostics', 'workflow'],
    impactCards: [
      { label: 'Modes', value: 'Role based' },
      { label: 'Search model', value: 'Symptom first' },
      { label: 'Correlation', value: 'Merged view' },
      { label: 'Deliverable', value: 'High fidelity prototype' },
    ],
    caseStudy: caseStudyFfp,
    portfolioKit: portfolioKitFfp,
  },

  'emission-compliance': {
    id: '8',
    slug: 'emission-compliance',
    title: 'Car Emission Compliance Dashboard',
    subtitle: 'Visual concept and interaction exploration for thresholds, outliers, and table clarity.',
    oneLiner:
      'Designed a visual concept to reduce table clutter and help experts spot anomalies and threshold breaches before reporting.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX Designer', 'UI Designer'],
    roleLine: 'UX/UI Designer. Visual concept and high fidelity prototypes.',
    teamSize: '2 to 3',
    context:
      'Emission data lived in many tables. Visual clutter made it hard to identify anomalies early. Threshold logic existed but was not readable.',
    problem:
      'Outliers and breaches were buried in flat data. Experts needed a consistent way to scan, compare, and adjust thresholds without losing trust in the rules.',
    solution:
      'Explored chart and table concepts, defined clear threshold interaction rules, and delivered high fidelity prototypes for implementation.',
    outcomes: [
      'Reduced visual clutter in table heavy views.',
      'Made anomalies and threshold breaches visible at a glance.',
      'Improved confidence through consistent encoding rules.',
    ],
    metrics: [],
    impact: [
      { value: 'Earlier', label: 'Anomaly detection' },
      { value: 'Clearer', label: 'Table hierarchy' },
      { value: 'Visible', label: 'Threshold logic' },
    ],
    highlights: [
      'List level color coding aligned with chart thresholds.',
      'Threshold settings concept with consistent rules.',
      'Exploration focused on fast expert interpretation.',
    ],
    tools: ['Figma'],
    methods: ['Workflow capture', 'Interaction concept', 'High fidelity prototyping', 'Reviews and handoff'],
    links: [{ label: 'Case study', href: '/projects/emission-compliance' }],
    metaCards: [
      { label: 'Users', value: '10 to 15', icon: 'users' },
      { label: 'Deliverable', value: 'Visual concept and high fidelity prototypes', icon: 'deliverable' },
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
      { label: 'Deliverable', value: 'High fidelity concept' },
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
      'Side project that ingests a DJ set, analyzes audio to extract tracks, and supports a wishlist flow without storing the original source.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Concept and indie developer.',
    context:
      'DJs often want to rebuild or study sets. Manual track identification is slow and unstructured.',
    problem:
      'There was no clean flow from set input to a structured track list and wishlist. Many approaches do not support rescans or blur the line between source and results.',
    solution:
      'Built a workflow concept and prototype: ingest audio for analysis, store scan results and pointers for rescans, present extracted tracks, and support wishlist decisions.',
    outcomes: [
      'Defined an end to end workflow from ingest to wishlist.',
      'Prototype focuses on analysis results and rescans rather than storing sources.',
    ],
    metrics: [],
    highlights: [
      'Clear separation between results and source handling.',
      'Rescan support through stored pointers and scan results.',
      'UI optimized for quick reviewing and saving tracks.',
    ],
    tools: ['Python', 'Next.js'],
    methods: ['Rapid prototyping', 'Flow design', 'Iteration'],
    links: [
      { label: 'Live demo', href: 'http://tracklistify.untitled-ux.de/' },
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
        'No original source storage, analysis first design',
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
      'Python based pipeline that ingests documents from email, extracts fields via OCR and semantics, and stores structured JSON for invoicing workflows.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Indie developer, automation.',
    context:
      'Invoices and receipts arrive through different channels and formats. Manual entry wastes time and creates errors.',
    problem:
      'There was no single pipeline from attachment to reliable structured data. Many tools required heavy correction or did not fit the workflow.',
    solution:
      'Built a Python only system with NiceGUI and n8n automation. Attachments are classified, OCR is run, fields are extracted into JSON, and pushed into the app API.',
    outcomes: [
      'Automated intake and extraction pipeline from email to structured data.',
      'Reduced manual copying and formatting work.',
    ],
    metrics: [],
    impact: [
      { value: 'Email to JSON', label: 'Automated pipeline' },
      { value: 'OCR and semantics', label: 'Extraction steps' },
    ],
    highlights: [
      'NiceGUI frontend for fast internal workflows.',
      'n8n automation for email and attachment handling.',
      'Structured JSON output into the application API.',
    ],
    tools: ['Python', 'NiceGUI', 'n8n', 'OCR pipeline'],
    methods: ['Workflow automation', 'Incremental builds', 'Debug driven iteration'],
    links: [
      { label: 'Live demo', href: 'https://app.untitled-ux.de/share/read/af9759caf9e54b09982d69987c516b95' },
      { label: 'GitHub', href: 'https://github.com/example/fixundfertig' },
    ],
    notes:
      'Pipeline: email attachment intake via n8n. OCR plus semantic extraction to JSON. JSON pushed into the API. Python only stack with NiceGUI.',
    metaCards: [
      { label: 'Timeline', value: 'Feb 2026', icon: 'timeline' },
      { label: 'Stack', value: 'Python, NiceGUI, n8n, OCR', icon: 'stack' },
      { label: 'Deliverable', value: 'Automated document processing pipeline', icon: 'deliverable' },
      { label: 'Role', value: 'Indie developer, automation', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Python only stack with NiceGUI',
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