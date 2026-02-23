/**
 * Single source of truth for all project data: core, case study, portfolio kit, impact cards, KoVoN config.
 * Consumers use getters; payload and pages read from here when CMS has no data.
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
    title: 'What the tool delivered',
    body:
      'KoVoN delivered a consolidated COP overview ("Gesamtzusammenschau") so teams had one place to document and prove Conformity of Production. Integrated role, task and regulation concept enabled audit-proof evidence and scalable documentation.',
    outcomeBullets: [
      'Pilot validated workflow, roles, and regulation concept.',
      'Scalable COP compliance documentation tool with governance model.',
    ],
  },
  {
    id: 'regulation',
    label: 'Regulation updates',
    icon: 'FileText',
    title: 'How updates are handled',
    body:
      'Regulation content is structured and kept up to date with clear ownership. Who needs clarification and how amendments flow into the tool is defined so that audit trails stay consistent when regulations change.',
    outcomeBullets: [
      'Clear process for regulation updates and responsibility.',
      'Audit-proof evidence chain when regulations change.',
    ],
  },
  {
    id: 'adaptability',
    label: 'Adaptability',
    icon: 'Layers',
    title: 'Task packages and compliance',
    body:
      'Miscellaneous task packages and compliance scope are handled through a flexible structure. Teams can adapt the tool to different vehicle programs and component domains while keeping documentation consistent.',
    outcomeBullets: [
      'Maintainable concept for different programs and domains.',
      'Foundation for holistic compliance documentation.',
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'Users',
    title: 'Responsibilities and approvals',
    body:
      'Responsibilities, approvals, and bottlenecks are explicitly modeled. Roles and handoffs are clear so that coordination and sign-off scale without creating duplicate work or unclear ownership.',
    outcomeBullets: [
      'Integrated role and task concept reduced coordination overhead.',
      'Bottlenecks (responsibility, update cycles, matching) identified for future iteration.',
    ],
  },
];

const kovonWhereItLandedBullets: string[] = [
  'Working tool delivered for 1 vehicle (pilot scale).',
  '~80% documentation filled; audit prep faster.',
  'End-to-end visibility and scale learnings.',
  'Bottlenecks identified: responsibility, update cycles, matching, complexity.',
  'Foundation for holistic COP documentation and governance model.',
];

const kovonWhyRolloutStoppedBullets: string[] = [
  'Rollout started; client made a drastic strategy change.',
  'Audit-related projects paused; rollout stopped.',
];

const kovonConfig: KovonConfig = {
  contentTabs: kovonContentTabs,
  whereItLandedBullets: kovonWhereItLandedBullets,
  whyRolloutStoppedBullets: kovonWhyRolloutStoppedBullets,
};

// --- Shared FFP bento + technical specs (from caseStudies) ---

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

// --- Case study sections (keyed by slug) ---

const caseStudyKovon: CaseStudySections = {
  summary:
    'Pilot validated workflow, roles, and regulation concept; rollout blocked by workload and change resistance. Proved scalability and audit readiness for COP documentation; produced a maintainable concept and governance model for future scale.',
  realProblem:
    'Automotive teams needed a single place to document and prove Conformity of Production (COP). Documentation was scattered; regulation required audit-proof evidence. Teams needed an integrated role, task and regulation concept to scale COP documentation.',
  approach:
    'Designed and validated KoVoN as a pilot web tool with integrated role, task and regulation concept. Delivered a scalable COP compliance documentation tool to gather insights and prove scalability around Online Conformity of Production. COFON translated the learnings into a maintainable concept and governance model.',
  outcome:
    'A validated scalable pilot web tool with integrated role, task and regulation concept. Insights and proven scalability around Online Conformity of Production (COP), with a foundation for holistic compliance documentation.',
};

const caseStudyAutomation: CaseStudySections = {
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

const caseStudyFfp: CaseStudySections = {
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

const caseStudyCaesar: CaseStudySections = {
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

const caseStudyTracklistify: CaseStudySections = {
  summary: 'User inputs YouTube set or audio file; app ingests audio for analysis, then removes source data (not a YouTube downloader). Stores pointers and scan results for rescanning. Shows tracks; user can wishlist and buy.',
  approach:
    'User inputs YouTube set or audio file → App ingests audio for analysis, then removes source data (not a YouTube downloader) → Stores pointers and scan results for rescanning → Shows tracks; user can wishlist and buy.',
};

// --- Portfolio kit data (keyed by slug) ---

const portfolioKitFfp: PortfolioKitData = {
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
};

const portfolioKitCaesar: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Exploration', desc: 'Initial exploration of raw emission values and table clutter.' },
    { number: '02', title: 'Rapid Prototyping', desc: '2 high-speed iterations to find the right visual metaphor.' },
    { number: '03', title: 'Implementation', desc: 'Design exploration implemented to reduce clutter and surface anomalies before reporting.' },
  ],
  featureItems: [
    { icon: 'Layout', title: 'Reduced Clutter', desc: 'Fewer tables, clearer hierarchy—experts spot anomalies before reporting' },
    { icon: 'Search', title: 'Threshold Overrides', desc: 'Lasso-selection and Global vs. Local for bulk adjustment' },
  ],
};

const portfolioKitAutomation: PortfolioKitData = {
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
};

const portfolioKitKovon: PortfolioKitData = {
  insightAuthor: 'Product Owner',
  featureItems: [
    {
      icon: 'FileDiff',
      title: 'Regulation Delta Engine',
      desc: "White Matching algorithm: ingest new PDF regulations and highlight only the changed paragraphs.",
      problem: 'Regulation updates (e.g. ECE R10.05 → .06) forced engineers to re-read hundreds of pages, risking missed clauses.',
      solution: "We built a 'White Matching' algorithm that ingests new PDF regulations and highlights only the changed paragraphs.",
      impact: 'Cuts review scope to the changed paragraphs only.',
    },
    {
      icon: 'GitFork',
      title: 'Knowledge Inheritance',
      desc: 'Template & Duplication: clone an existing vehicle project; validated parts inherit their Approved status automatically.',
      problem: 'Every new vehicle project started from scratch, wasting effort on parts that had not changed since the last model.',
      solution: 'A Template & Duplication system. Managers clone an existing vehicle project; validated parts inherit their Approved status automatically.',
      impact: 'Teams validate only the delta between model years.',
    },
    {
      icon: 'ShieldCheck',
      title: '6-Role Governance Model',
      desc: 'Strict RBAC with 6 personas (e.g. COP Owner, Technical Expert, Auditor), each with a dedicated dashboard.',
      problem: '"Shared responsibility" meant no accountability. Audits failed because ownership was vague.',
      solution: 'A strict Role-Based Access Control (RBAC) system with 6 distinct personas, each with a dedicated dashboard view.',
      impact: 'Every chapter has a clear owner and audit trail.',
    },
  ],
  processSteps: [
    { number: '01', title: 'Ingest & Configure', desc: 'Project Leads initialize a new vehicle configuration (e.g. SUV 2026). The system automatically pulls the latest UN-ECE regulations and sets the global SOP - 1 Year deadline.', icon: 'Database', output: 'Vehicle config created; regulation set mapped; deadline set.' },
    { number: '02', title: 'Granular Delegation', desc: 'Managers use the Bulk Assign tool to route tasks. Complex systems are split: a System Owner (e.g. Brakes) delegates specific chapters to Part Owners (e.g. Calipers).', icon: 'UserCog', output: 'Tasks created; owners assigned.' },
    { number: '03', title: 'The Evaluation Loop', desc: 'Experts receive tasks on their dashboard. They evaluate the delta, upload evidence (PDFs, test reports), and mark items as Resolved.', icon: 'RefreshCw', output: 'Evidence uploaded; items resolved.' },
    { number: '04', title: 'Audit & Approval', desc: 'Once all child tasks are green, the System status flips to Approved. The system generates a read-only Compliance Snapshot for external auditors.', icon: 'FileBadge', output: 'System approved; compliance snapshot generated.' },
    { number: '05', title: 'Cycle & Inherit', desc: 'For the next model year, the team does not start over. They clone the project template. Unchanged parts inherit their Approved status instantly.', icon: 'Copy', output: 'Project cloned; inherited status applied.' },
  ],
  technicalSpecs: [
    { title: "The 'White Matching' Algorithm", body: "Built a delta-engine to handle regulation updates (e.g., ECE R10.05 -> .06). Instead of re-reading the whole law, the system highlights only the text differences ('White Match'), allowing engineers to focus solely on the new requirements." },
    { title: 'Granularity Engine (1:1 vs. 1:N)', body: "Designed a flexible ownership model. A 'System Lead' (e.g., Brakes) can own an entire Regulation (R13), or delegate specific Chapters (Annex 4) to sub-specialists. The status rolls up automatically to the vehicle level." },
    { title: 'Knowledge Inheritance & Read-Only API', body: "Knowledge Inheritance Templates let engineers learn from one vehicle and duplicate verification structures for others. Stakeholder Read-Only Link (read-only API) enables cross-departmental transparency without edit access. Deployed on AWS with secure onboarding for COP Testing Lifecycle management." },
  ],
};

const portfolioKitTracklistify: PortfolioKitData = {
  featureItems: [
    { icon: 'Server', title: 'Next.js + Node', desc: 'Full-stack architecture' },
    { icon: 'Database', title: 'PostgreSQL', desc: 'High-performance metadata storage' },
    { icon: 'Zap', title: 'Sub-2s Runtime', desc: 'Optimized analysis engine' },
  ],
};

const portfolioKitFixundfertig: PortfolioKitData = {
  featureItems: [
    { icon: 'Database', title: 'Supabase', desc: 'Real-time backend' },
    { icon: 'Zap', title: 'Lightweight', desc: 'Issue management for households' },
  ],
  technicalSpecs: [
    {
      title: 'Stack and pipeline',
      body: 'Python only; NiceGUI frontend; n8n email attachment automation; OCR and semantic extraction to JSON; JSON into API for app; automated build system.',
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
    subtitle: 'Audit driven compliance documentation and verification tracking.',
    oneLiner:
      'Audit driven web tool pilot to track verification status, ownership, and evidence across vehicle parts and systems.',
    category: 'Enterprise',
    year: '2022 to 2024',
    client: 'Automotive (Konzern)',
    roles: ['Product Designer', 'Scrum Master'],
    roleLine: 'Product and UX concept. Scrum facilitation.',
    teamSize: '4 to 6 devs, 2 designers',
    customerAbout: 'Automotive product development. Internal compliance workflows.',
    context:
      'An internal audit required traceable proof of Conformity of Production documentation. Teams needed one system to see what exists, what is missing, what is in progress, and who owns each verification.',
    problem:
      'Documentation was scattered and often avoided due to time pressure. Verification outcomes differed by type, and regulations changed regularly. The process needed lifecycle tracking, ownership, and a structure that could evolve with updates.',
    solution:
      'Designed a pilot web tool with a verification lifecycle, ownership model, and regulation aware structure. The concept proved scalability and defined governance for future rollout.',
    outcomes: [
      'Delivered a validated pilot web tool for COP documentation and verification tracking.',
      'Defined roles, responsibilities, and ownership per evaluation unit.',
      'Established a lifecycle model for verification status and outcomes.',
      'Created a governance and update concept to handle regulation changes.',
    ],
    metrics: [],
    highlights: [
      'Role based dashboards and a management area for vehicle projects, tasks, and users.',
      'Clear separation of status, evidence, ownership, and outcome.',
      'Update concept for regulation structure and operational work structure.',
    ],
    tools: ['Angular', 'AWS'],
    methods: ['Stakeholder interviews', 'Workflow definition', 'User tests', 'Scrum facilitation'],
    links: [{ label: 'Case study', href: '/projects/kovon' }],
    cardCoverUrl: '/projects/kovon_gallery_04.jpg',
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
      { label: 'Role', value: 'Product and UX concept. Scrum facilitation.' },
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
      'Designed a SAP bot concept and a click by click PDD to reduce recurring manual checks in a shared automotive parts environment.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Automation Manager', 'Process Analyst'],
    roleLine: 'Automation concept owner. Process definition and handoff.',
    context:
      'In a shared group environment, inherited changes could reset or degrade states in the child database. Experts had to repeatedly check and restore correctness after propagation events.',
    problem:
      'Experts could not trust review state after inheritance events. Manual checks were repetitive and time consuming, and errors increased operational risk.',
    solution:
      'Clustered use cases with experts, prioritized the highest value path, and delivered a detailed PDD so SAP admins could implement a safe automation task.',
    outcomes: [
      'Defined and prioritized use cases for automation with domain experts.',
      'Delivered a detailed PDD for SAP admins as implementation handoff.',
      'Reduced recurring manual checking effort for the expert group.',
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
      'Focus on safe automation in a highly constrained environment.',
    ],
    tools: ['SAP', 'Figma', 'Docs'],
    methods: ['Process mapping', 'Expert workshops', 'Use case clustering', 'Handoff documentation'],
    links: [{ label: 'Case study', href: '/projects/automation' }],
    cardCoverUrl: '/projects/sap_automation_bot_hero.png',
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
      { label: 'Experts Relieved', value: '40–50' },
      { label: 'Recovered Time', value: '2–4h / week' },
      { label: 'Delivery Timeline', value: '3 Months' },
      { label: 'Accuracy (UC1)', value: '100%' },
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
      'Users had to work against the tool. Different tasks shared the same screens, data was hard to correlate, and symptom first reasoning was blocked by part number centric flows.',
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
    cardCoverUrl: '/projects/ffp_gallery_04.png',
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
      { label: 'Correlation Latency', value: '1:1' },
      { label: 'Merge Bottlenecks', value: 'Eliminated' },
      { label: 'Beginner to Expert UI', value: 'Adaptive' },
      { label: 'Symptom-First Search', value: 'Search by symptom, not Part #' },
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
      'Critical outliers and breaches were buried in flat data. Experts needed a consistent way to scan, compare, and adjust thresholds without losing trust in the rules.',
    solution:
      'Explored chart and table concepts, defined clear threshold interaction rules, and delivered high fidelity prototypes for fast implementation.',
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
    cardCoverUrl: '/projects/ceasar_gallery_05.png',
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
      { label: 'Anomaly Detection', value: 'Pre-Report' },
      { label: 'Threshold Visibility', value: 'Clear' },
      { label: 'Lasso Adjustments', value: 'Bulk' },
      { label: 'Reporting Quality', value: 'Higher' },
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
      'Side project that ingests a DJ set, analyzes audio to extract tracks, and supports a wishlist and buy flow without storing the original source.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Concept and indie developer.',
    context:
      'DJs often have sets they want to analyze and rebuild. Manual track ID is slow, and workflows are messy.',
    problem:
      'There was no simple flow from set to track list to a structured wishlist. Many tools mix ingestion and storage in a way that feels unsafe or unclear.',
    solution:
      'Built a workflow concept and prototype: ingest audio for analysis, store scan results and pointers for rescans, show extracted tracks, and support wishlist and purchase intent.',
    outcomes: [
      'Defined an end to end workflow from ingest to wishlist.',
      'Built a prototype that focuses on scanning and rescanning, not storing original sources.',
    ],
    metrics: [],
    highlights: [
      'Clear separation between analysis results and source storage.',
      'Rescan support through stored pointers and scan results.',
      'UI optimized for quick reviewing and saving tracks.',
    ],
    tools: ['Python', 'Next.js'],
    methods: ['Rapid prototyping', 'Flow design', 'Iteration'],
    links: [
      { label: 'Live demo', href: 'http://tracklistify.untitled-ux.de/' },
      { label: 'GitHub', href: 'https://github.com/example/tracklistify' },
    ],
    cardCoverUrl: '/projects/ffp_gallery_08.png',
    prototype: {
      prototypeType: 'figma',
      figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/TracklistifyPrototype',
      figmaFileUrl: 'https://www.figma.com/file/TracklistifyPrototype',
      hints: ['Paste a set link or upload audio', 'Review detected tracks', 'Save to wishlist'],
    },
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
      { label: 'Role', value: 'Concept and indie developer' },
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
      'Python based app that automates document intake from email, runs OCR and semantic extraction, and stores structured JSON for invoicing workflows.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Indie developer, automation.',
    context:
      'Invoices and receipts arrive through different channels and formats. Manual data entry wastes time and causes errors.',
    problem:
      'There was no single pipeline from email attachment to clean structured data. Tools were either too heavy or required too much manual correction.',
    solution:
      'Built a Python only system with NiceGUI plus n8n automation. Attachments are classified, OCR is run, fields are extracted into JSON, and pushed into the app API.',
    outcomes: [
      'Automated intake and extraction pipeline from email to structured data.',
      'Reduced manual copying and formatting work.',
    ],
    metrics: [],
    impact: [
      { value: 'Email to JSON', label: 'Automated pipeline' },
      { value: 'OCR + semantics', label: 'Extraction steps' },
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
    prototype: {
      hints: ['Open the app to see the pipeline flow and extracted JSON fields'],
    },
    moodImageUrl: '/projects/ffp_gallery_08.png',
    cardCoverUrl: '/projects/ffp_gallery_08.png',
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
      { label: 'Stack', value: 'Python, NiceGUI, n8n, OCR' },
      { label: 'Deliverable', value: 'Automated pipeline' },
      { label: 'Role', value: 'Indie developer' },
    ],
    caseStudy: {},
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

/** Returns project core + impactCards for use as Project-compatible shape (e.g. for payload fallback). */
export function getProjectCoreBySlug(slug: string): (Project & { impactCards: ImpactCardItem[] }) | null {
  const p = portfolio[slug];
  if (!p) return null;
  const { caseStudy: _cs, portfolioKit: _pk, kovon: _k, ...core } = p;
  return { ...core, impactCards: p.impactCards };
}
