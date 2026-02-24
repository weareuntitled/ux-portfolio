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
    title: 'A usable COP hub built as an Angular pilot app',
    body:
      'KoVoN is a working Angular pilot that digitizes COP documentation for a vehicle project. It connects regulation structure, working structure, and the evaluation itself. The result is a snapshot view that makes a complex system scannable, with clear ownership and evidence per evaluation.',
    outcomeBullets: [
      'Beta pilot validated the core model and the workflows.',
      'Teams could review progress and gaps without hunting through files.',
    ],
  },
  {
    id: 'model',
    label: 'Model',
    icon: 'Layers',
    title: 'Regulations, work packages, evaluations',
    body:
      'The system starts from regulation structure, turns requirements into work packages, and maps them to responsible roles. Evaluation is the core unit. It carries status, responsibility, evidence, and outcome so progress can roll up cleanly.',
    outcomeBullets: [
      'Clear mapping from regulation to tasks to responsibility.',
      'Evaluation as the single unit of work across roles.',
    ],
  },
  {
    id: 'updates',
    label: 'Updates',
    icon: 'FileText',
    title: 'Governance for regulation change',
    body:
      'Regulations change and static files break. KoVoN introduced a governance routine so updates stay traceable and previous decisions remain understandable. That prevents rework loops caused by silent changes.',
    outcomeBullets: [
      'Defined review steps and responsibilities for updates.',
      'History stays readable through rule changes.',
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'Users',
    title: 'Mixed roles, clean handoffs',
    body:
      'Technical leads, responsible persons, and assistant team leads work in the same system, but with different responsibilities. KoVoN makes handoffs visible, so ownership gaps become obvious and fewer items fall through.',
    outcomeBullets: [
      'Ownership gaps reduced through explicit handoffs.',
      'Snapshot view supports review and alignment across roles.',
    ],
  },
];

const kovonWhereItLandedBullets: string[] = [
  'Working beta pilot delivered for one vehicle project context.',
  'About 80 percent of documentation fields filled in the pilot.',
  'Snapshot view for status, ownership, evidence, and outcomes.',
  'Rollout paused due to a strategy shift during scale-up.',
  'Insights gathered on how to digitize COP documentation in practice.',
];

const kovonWhyRolloutStoppedBullets: string[] = [
  'Rollout began, then priorities shifted due to a strategy change.',
  'The pilot did not scale to a full production rollout.',
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
  Evaluation: {
    label: 'Evaluation',
    short: 'Core unit of work that links requirement, ownership, evidence, and outcome.',
    detail:
      'An Evaluation is the central unit. It is derived from regulation structure, mapped through the working structure to responsible roles, and stores status, evidence, and outcomes for roll-ups and snapshots.',
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
      'Inheritance works like a template. The derivative starts with reused evaluations and evidence; experts only review deltas.',
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
      'Status and freshness were hard to trust; updates caused rework.',
    ],
    diagram: { type: 'chaos' as const },
  },
  {
    id: 'v2',
    title: 'Ownership mismatch',
    subtitle: 'Org ownership did not map cleanly to vehicle scope.',
    icon: 'Network',
    bullets: [
      '[[OE]] teams optimize for internal delivery, not a 1:1 vehicle mapping.',
      'One expert often covers multiple vehicle contexts.',
      'Handovers created gaps without a single shared snapshot.',
    ],
    diagram: { type: 'orgVsVehicle' as const },
  },
  {
    id: 'v3',
    title: 'Regulation churn',
    subtitle: 'Updates triggered rework because deltas were unclear.',
    icon: 'Scale',
    bullets: [
      'Regulatory hierarchy flows from [[Annex]] to [[Regulation]] to [[Chapter]].',
      'Changes forced re-checks without a clear “what changed” view.',
      'Governance is needed so history stays readable.',
    ],
    diagram: { type: 'regTree' as const },
  },
  {
    id: 'v4',
    title: 'Evaluation as the core unit',
    subtitle: 'One unit that ties requirement, work package, and responsibility together.',
    icon: 'Layers3',
    bullets: [
      'Evaluations are derived from regulation structure.',
      'Working structure maps evaluations to responsible roles.',
      'Status, evidence, and outcome roll up into a snapshot view.',
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
    { id: 'techLead', label: 'Technical Lead', icon: 'Wrench' },
    { id: 'assistantLead', label: 'Assistant Team Lead', icon: 'CircleDot' },
    { id: 'responsible', label: 'Responsible Person', icon: 'ShieldCheck' },
    { id: 'sysAdmin', label: 'System Administrator', icon: 'Settings' },
    { id: 'review', label: 'Review Body', icon: 'Users' },
  ],
  tasks: [
    { id: 'deriveWork', label: 'Derive work packages from regulations', cells: { techLead: 'R', assistantLead: 'S' } },
    { id: 'assign', label: 'Assign evaluations to responsible roles', cells: { assistantLead: 'R', sysAdmin: 'S' } },
    { id: 'document', label: 'Document evidence and outcomes', cells: { responsible: 'R' } },
    { id: 'review', label: 'Review completeness and snapshot', cells: { review: 'R', techLead: 'A', sysAdmin: 'S' } },
    { id: 'updates', label: 'Apply regulation updates with governance', cells: { sysAdmin: 'R', techLead: 'S' } },
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
    subtitle: 'Start from what failed, not from part numbers.',
    visual: 'switcher',
    colSpan: 2,
  },
  {
    title: 'Correlation',
    subtitle: 'Merge signals into one fingerprint.',
    visual: 'metric',
    value: '1 view',
  },
  {
    title: 'Root cause focus',
    subtitle: 'Designed for synthesis, not only intake.',
    icon: 'Search',
    visual: 'bars',
  },
  {
    title: 'Clickable prototype',
    subtitle: 'A working flow you can click through.',
    visual: 'chips',
    colSpan: 2,
    items: ['Triage', 'Correlation', 'Synthesis', 'Review'],
  },
];

const ffpTechnicalSpecs: TechnicalSpecItem[] = [
  {
    title: 'Mental model',
    body:
      'Experts reason from symptoms to cause. The legacy UI forced part numbers first, which slowed triage and broke correlation across cases.',
  },
  {
    title: 'Workflow reshape',
    body:
      'Restructured the flow around root cause intent. The design supports triage, correlation, and synthesis as one continuous story instead of scattered screens.',
  },
  {
    title: 'Handoff',
    body:
      'Delivered a high-fidelity, clickable prototype as the build reference so developers and stakeholders could validate the logic quickly.',
  },
];

// --- KoVoN bento + technical specs ---

const kovonBentoCards: BentoCardItem[] = [
  {
    title: 'Snapshot view',
    subtitle: 'See progress and gaps at a glance.',
    visual: 'chips',
    colSpan: 2,
    items: ['Missing', 'Planned', 'In progress', 'Reviewed', 'Closed'],
  },
  {
    title: 'Evaluation as the unit',
    subtitle: 'One unit ties requirement, owner, evidence, outcome.',
    visual: 'metric',
    value: '1 unit',
  },
  {
    title: 'Mixed role system',
    subtitle: 'Technical leads and responsible roles in one workflow.',
    icon: 'ShieldCheck',
    visual: 'bars',
  },
  {
    title: 'Governed updates',
    subtitle: 'Keep history readable when regulations change.',
    visual: 'switcher',
    colSpan: 2,
  },
];

const kovonTechnicalSpecs: TechnicalSpecItem[] = [
  {
    title: 'Three-layer model',
    body:
      'Built around regulation structure, working structure, and the evaluation itself. Evaluations roll up into snapshots for review and coordination across roles.',
  },
  {
    title: 'Ownership and handoffs',
    body:
      'Mapped evaluations to responsible roles with clear handoffs. This reduced ownership gaps and made next steps visible.',
  },
  {
    title: 'Beta pilot, real insights',
    body:
      'Delivered a working Angular beta pilot and gathered concrete insights on what COP digitization needs in daily practice. Rollout paused after a strategy shift.',
  },
];

// --- Case study sections (keyed by slug) ---

const caseStudyKovon: CaseStudySections = {
  summary:
    'Angular beta pilot app that digitizes COP documentation with a snapshot view, clear ownership, and evidence per evaluation.',
  contextWhyMattered:
    'COP documentation spans multiple roles and complex regulation structures. Without one shared system, teams lose time and create gaps when audits and updates hit.',
  realProblem:
    'Status, evidence, and responsibility were spread across files and threads. Updates broke traceability. Teams could not reliably answer what is missing and who owns the next step.',
  myRole:
    'Product and UX concept. Scrum facilitation. Information architecture, workflow mapping, and prototype design.',
  approach:
    'Modeled regulation structure, working structure, and evaluation as the core unit. Iterated with technical leads and responsible roles to validate the pilot workflows.',
  solutionConcept:
    'A working Angular pilot that maps requirements to work packages, assigns ownership, tracks status, and stores evidence and outcomes, with governance for updates.',
  outcome:
    'Beta pilot delivered and used by about 200 active users. Enabled snapshots with fewer gaps and generated concrete insights for a potential rollout, which paused due to strategy shift.',
  whatToShowVisually:
    'Snapshot overview. Evaluation detail with ownership and evidence. Mapping from regulation to work packages. Governance view for updates.',
};

const caseStudyAutomation: CaseStudySections = {
  summary:
    'Automation concept and PDD that removes recurring manual checks after SAP inheritance events.',
  contextWhyMattered:
    'Inheritance updates reset states in shared SAP environments. Experts lost time re-checking correctness instead of doing domain work.',
  realProblem:
    'A faulty rule caused repeated resets and manual validation loops. The routine was error-prone and wasted expert hours.',
  constraints:
    'Strict SAP constraints. The solution had to be safe, predictable, and implementable by SAP administrators.',
  myRole:
    'Automation manager and process analyst. Use case clustering, prioritization, PDD creation, and stakeholder alignment.',
  approach:
    'Mapped the failure pattern with experts, clustered use cases, picked the highest-value intervention, then documented decision rules and steps as a PDD.',
  solutionConcept:
    'Remove the faulty rule, define a controlled automation routine, and hand it over as a click-by-click PDD so implementation stays safe in SAP.',
  outcome:
    'Recurring manual checks reduced with a measurable impact. The expert group regained time and reduced risk caused by repeated resets.',
  whatToShowVisually:
    'Inheritance reset diagram. Before and after routine. PDD excerpt showing decision rules and steps.',
};

const caseStudyFfp: CaseStudySections = {
  summary:
    'Clickable high-fidelity prototype that reshapes an expert workflow around root cause investigation, from symptom-first triage to correlation and synthesis.',
  contextWhyMattered:
    'Experts need to move fast from symptom signals to a credible root cause hypothesis. A mixed, cluttered UI blocks correlation and slows synthesis.',
  realProblem:
    'The legacy flow forced part-number-first behavior and made cross-case correlation unreliable. Root cause work suffered from context switching and weak handoffs.',
  insightAuthor: 'Lead Engineer',
  myRole:
    'UX and UI design. Workflow mapping, information architecture, and high-fidelity prototyping.',
  approach:
    'Shadowed and interviewed experts, then redesigned the workflow and information hierarchy. Validated the logic through a clickable prototype.',
  solutionConcept:
    'A symptom-first entry with a correlation layer that merges signals into one fingerprint, supporting the full story from triage to synthesis.',
  outcome:
    'Improved workflow clarity and supported root cause synthesis with fewer breaks and less mental load. Delivered as a prototype stakeholders could click through.',
  whatToShowVisually:
    'Triage entry. Correlation view. Fingerprint detail. Key states and transitions in the clickable prototype.',
};

const caseStudyCaesar: CaseStudySections = {
  summary:
    'Prototype dashboard and interaction concept that makes thresholds and outliers readable fast in dense emission reporting.',
  contextWhyMattered:
    'Under reporting pressure, experts need scan speed and adjustable thresholds they can trust. If outliers are hidden, decisions get delayed and risk increases.',
  realProblem:
    'Table clutter buried anomalies. Threshold logic was not adjustable in a consistent way, which made interpretation slower and less reliable.',
  myRole:
    'UX and UI design. Visual hierarchy, interaction rules, and high-fidelity prototype delivery.',
  approach:
    'Analyzed real table patterns, tested visual encodings for breaches, and designed a threshold interaction concept that stays consistent across views.',
  solutionConcept:
    'A strict table hierarchy plus consistent breach encoding, paired with a threshold settings concept users can adapt to their measurement values.',
  outcome:
    'Better scan speed and clearer decisions. Outliers surfaced earlier, and thresholds became easier to adjust and interpret.',
  whatToShowVisually:
    'Before and after table density. Outlier encoding rules. Threshold settings flow. Dashboard prototype screens.',
};

const caseStudyTracklistify: CaseStudySections = {
  summary:
    'Side project in beta that uses AI-assisted analysis to turn DJ sets into a review list and a wishlist flow.',
  contextWhyMattered:
    'Manual track identification is slow. DJs need a workflow that turns listening into an actionable list, without messy iterations.',
  realProblem:
    'Existing solutions mix scanning, storage, and results. That makes rescans and review inconsistent.',
  myRole:
    'Concept and indie developer. Workflow design and prototyping.',
  approach:
    'Designed the flow from ingest to review and wishlist. Built it around repeatable scanning so results stay actionable.',
  solutionConcept:
    'An analysis-first workflow that helps generate a clean list, supports iteration, and drives saving and wishlist actions.',
  outcome:
    'Beta stage with a clear end-to-end flow. Set up for fast iteration and feature growth as the AI pipeline improves.',
  whatToShowVisually:
    'Review list. Wishlist flow. Rescan concept. Example set analysis output.',
};

const caseStudyFixundfertig: CaseStudySections = {
  summary:
    'Personal invoicing tool that creates and sends invoices, plus automated OCR intake for receipts and expenses.',
  contextWhyMattered:
    'Invoices and receipts come in endless formats. Manual entry kills momentum and introduces formatting errors.',
  realProblem:
    'A holistic workflow was missing: create invoices, send them, and also automate intake of incoming documents into structured data.',
  myRole:
    'Indie developer. Product concept, pipeline design, and UI implementation.',
  approach:
    'Designed a single workflow that covers invoice creation and sending, plus an intake pipeline for receipts. Built a review surface for quick corrections.',
  solutionConcept:
    'Create and send invoices in one tool, ingest incoming documents via automation, extract fields via OCR, and store structured data for reuse.',
  outcome:
    'Reduced manual copying and improved consistency across outgoing invoices and incoming expense data.',
  whatToShowVisually:
    'Invoice creation flow. Sent invoice view. Intake pipeline. OCR result review UI.',
};

// --- Portfolio kit data (keyed by slug) ---

const portfolioKitFfp: PortfolioKitData = {
  insightAuthor: 'Lead Engineer',
  bentoCards: ffpBentoCards,
  technicalSpecs: ffpTechnicalSpecs,
  processSteps: [
    { number: '01', title: 'Shadowing', desc: 'Observed real expert workflows and root cause reasoning patterns.' },
    { number: '02', title: 'Interviews', desc: 'Validated pain points and clarified what blocks correlation and synthesis.' },
    { number: '03', title: 'Workflow redesign', desc: 'Reshaped the flow around triage, correlation, and synthesis.' },
    { number: '04', title: 'Clickable prototype', desc: 'Delivered a high-fidelity prototype stakeholders could click through.' },
  ],
  featureItems: [
    { icon: 'Search', title: 'Symptom-first intake', desc: 'Start from what failed, then narrow down.' },
    { icon: 'Database', title: 'Correlation layer', desc: 'Merge signals into one fingerprint for synthesis.' },
    { icon: 'Layout', title: 'End-to-end flow', desc: 'Triage to correlation to synthesis without breaking context.' },
  ],
};

const portfolioKitCaesar: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Data scan', desc: 'Reviewed dense reporting tables and identified scan blockers.' },
    { number: '02', title: 'Encoding rules', desc: 'Defined consistent outlier and threshold encoding across views.' },
    { number: '03', title: 'Prototype delivery', desc: 'Delivered a dashboard prototype plus interaction concept for thresholds.' },
  ],
  featureItems: [
    { icon: 'Layout', title: 'Less clutter', desc: 'Stronger hierarchy for faster scanning.' },
    { icon: 'BarChart3', title: 'Outliers visible', desc: 'Breaches stand out immediately.' },
    { icon: 'Sliders', title: 'Adjustable thresholds', desc: 'Users can adapt threshold values to their measurement needs.' },
  ],
};

const portfolioKitAutomation: PortfolioKitData = {
  processSteps: [
    { number: '01', title: 'Process mapping', desc: 'Traced inheritance events and recurring validation loops.' },
    { number: '02', title: 'Expert workshops', desc: 'Clustered pain points and selected the best automation target.' },
    { number: '03', title: 'PDD creation', desc: 'Documented decision rules and click-by-click steps for SAP admins.' },
    { number: '04', title: 'Safety alignment', desc: 'Aligned feasibility and boundaries inside SAP constraints.' },
  ],
  featureItems: [
    { icon: 'Zap', title: 'Automation concept', desc: 'Targets recurring checks after inheritance resets.' },
    { icon: 'FileCheck', title: 'Implementation PDD', desc: 'A build-ready spec for SAP administrators.' },
    { icon: 'ShieldCheck', title: 'Measured reduction', desc: 'Reduced manual checks with a hard metric in the expert group.' },
  ],
};

const portfolioKitKovon: PortfolioKitData = {
  insightAuthor: 'Product Owner',
  bentoCards: kovonBentoCards,
  technicalSpecs: kovonTechnicalSpecs,
  featureItems: [
    {
      icon: 'ShieldCheck',
      title: 'Snapshot over complexity',
      desc: 'One view for gaps, progress, and responsibility.',
      problem: 'Teams could not reliably see what is missing and who owns it.',
      solution: 'Snapshot view that rolls up evaluations with ownership and status.',
      impact: 'Fewer gaps and faster review readiness.',
    },
    {
      icon: 'UserCog',
      title: 'Ownership mapped to evaluations',
      desc: 'Responsible roles are tied to the unit of work.',
      problem: 'Mixed roles and handoffs caused ownership gaps.',
      solution: 'Working structure mapping evaluations to responsible roles and handoffs.',
      impact: 'Clear next steps and less coordination noise.',
    },
    {
      icon: 'RefreshCw',
      title: 'Governed updates',
      desc: 'Regulation changes stay traceable.',
      problem: 'Updates broke static documentation and triggered rework.',
      solution: 'Governance routine for updates, with review steps and responsibilities.',
      impact: 'Less rework and a readable history.',
    },
  ],
  processSteps: [
    {
      number: '01',
      title: 'Model the structures',
      desc: 'Define regulation structure, working structure, and evaluation as the core unit.',
      icon: 'Database',
      output: 'A model that supports roll-ups and snapshots.',
    },
    {
      number: '02',
      title: 'Map ownership',
      desc: 'Assign evaluations to responsible roles and define handoffs.',
      icon: 'UserCog',
      output: 'Clear next steps per role.',
    },
    {
      number: '03',
      title: 'Track evidence and outcomes',
      desc: 'Store status, evidence, and outcome on the evaluation.',
      icon: 'FileBadge',
      output: 'Traceable decisions, not scattered files.',
    },
    {
      number: '04',
      title: 'Create snapshots',
      desc: 'Roll up progress into a review-ready view.',
      icon: 'FileCheck',
      output: 'Fewer gaps and faster review cycles.',
    },
    {
      number: '05',
      title: 'Handle updates',
      desc: 'Apply regulation changes through governance steps.',
      icon: 'RefreshCw',
      output: 'Readable history through updates.',
    },
  ],
};

const portfolioKitTracklistify: PortfolioKitData = {
  featureItems: [
    { icon: 'Upload', title: 'Ingest', desc: 'Upload a set or provide an audio link to start analysis.' },
    { icon: 'Waveform', title: 'Analyze', desc: 'AI-assisted extraction into a reviewable track list.' },
    { icon: 'Repeat', title: 'Iterate', desc: 'Support rescans and refinement as detection improves.' },
    { icon: 'Bookmark', title: 'Wishlist', desc: 'Save favorites and build an actionable wishlist flow.' },
  ],
};

const portfolioKitFixundfertig: PortfolioKitData = {
  featureItems: [
    { icon: 'FileText', title: 'Create invoices', desc: 'Create invoices with structured fields and templates.' },
    { icon: 'Mail', title: 'Send', desc: 'Send invoices from the same tool, with consistent output.' },
    { icon: 'Scan', title: 'OCR intake', desc: 'Ingest receipts and expenses via automation and extract fields.' },
    { icon: 'CheckCircle', title: 'Review', desc: 'Fast correction UI for extracted fields and exceptions.' },
  ],
  technicalSpecs: [
    {
      title: 'Stack and flow',
      body:
        'Personal tool built in Python with a UI layer, automation for intake, and OCR extraction for incoming documents. Designed as one end-to-end invoicing and expense workflow.',
    },
  ],
};

// --- Single source: all projects keyed by slug ---

export const portfolio: PortfolioSource = {
  kovon: {
    id: '1',
    slug: 'kovon',
    title: 'KoVoN COP Pilot App',
    navTitle: 'KoVoN COP pilot',
    subtitle: 'Angular beta pilot for COP snapshots, ownership, and evidence.',
    oneLiner:
      'Working Angular beta pilot that digitizes COP documentation and produces snapshot visibility with fewer gaps.',
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
      'COP documentation involves mixed roles and complex regulation structures. The pilot needed one system that makes progress, responsibility, and evidence visible.',
    problem:
      'Status, evidence, and ownership lived in scattered files. Updates broke traceability. Teams struggled to produce a reliable snapshot and close gaps consistently.',
    solution:
      'Delivered a working Angular beta pilot that connects regulation structure, working structure, and evaluations, with ownership mapping, evidence handling, and governed updates.',
    outcomes: [
      'Beta pilot delivered and used by about 200 active users.',
      'Snapshot view made gaps and ownership visible across roles.',
      'Evaluation model established as the core unit of work.',
      'Governance approach defined for regulation updates.',
      'Insights gathered on how COP digitization needs to work in practice.',
    ],
    metrics: ['About 200 active users (pilot)'],
    highlights: [
      'Snapshot overview for fast review and alignment.',
      'Clear mapping from regulation to work packages to responsibility.',
      'Evaluation detail view with status, evidence, and outcome.',
      'Governed update routine to keep history readable.',
    ],
    tools: ['Angular', 'AWS'],
    methods: ['Stakeholder interviews', 'Workflow definition', 'User tests', 'Scrum facilitation'],
    links: [{ label: 'Case study', href: '/projects/kovon' }],
    impact: [
      { value: 'about 200', label: 'Active users' },
      { value: 'POC, MVP, Beta', label: 'Stages' },
      { value: '2.5 years', label: 'Timeline' },
      { value: 'Angular, AWS', label: 'Stack' },
    ],
    metaCards: [
      { label: 'Active users', value: 'about 200', icon: 'users', hint: 'Pilot usage before rollout paused.' },
      { label: 'Timeline', value: '2.5 years', icon: 'timeline' },
      { label: 'Stages', value: 'POC, MVP, Beta', icon: 'stages' },
      { label: 'Primary roles', value: 'Tech leads, responsible roles', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Angular beta pilot app',
        'Model: regulation structure, working structure, evaluation',
        'Snapshot overview plus evaluation detail views',
        'Governance routine for regulation updates',
      ],
      impact: [
        'Snapshot visibility with fewer gaps',
        'Clear ownership per evaluation',
        'Less manual searching and fewer handoff failures',
      ],
    },
    tags: ['compliance', 'enterprise', 'automotive', 'product'],
    impactCards: [
      { label: 'Active users', value: 'about 200' },
      { label: 'Timeline', value: '2.5 years' },
      { label: 'Stages', value: 'POC, MVP, Beta' },
      { label: 'Deliverable', value: 'Angular beta pilot app' },
    ],
    caseStudy: caseStudyKovon,
    portfolioKit: portfolioKitKovon,
    kovon: kovonConfig,
  },

  automation: {
    id: '6',
    slug: 'automation',
    title: 'SAP inheritance validation automation',
    navTitle: 'SAP automation',
    subtitle: 'Automation concept and PDD for recurring inheritance resets.',
    oneLiner:
      'Automation concept plus PDD that reduces recurring manual checks by removing a faulty rule and defining a safe routine.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Automation Manager', 'Process Analyst'],
    roleLine: 'Automation concept owner. Process definition and handoff.',
    context:
      'Inheritance updates in SAP reset states in shared environments. Experts repeatedly verified and restored correctness by hand.',
    problem:
      'A faulty rule caused repeated resets and recurring manual checks. The routine was time-consuming and risked human error.',
    solution:
      'Clustered use cases with experts, selected the highest-value intervention, removed the faulty rule conceptually, and delivered a build-ready PDD for SAP admins.',
    outcomes: [
      'Use cases clustered and prioritized with domain experts.',
      'Implementation-ready PDD delivered for SAP administrators.',
      'Recurring manual checks reduced with a measurable impact.',
    ],
    metrics: ['10 to 20 experts', 'Hard metric measured in the expert group'],
    impact: [
      { value: '10 to 20', label: 'Experts impacted' },
      { value: 'Measured', label: 'Time saved' },
      { value: 'SAP', label: 'Environment' },
      { value: 'PDD', label: 'Deliverable' },
    ],
    highlights: [
      'Clear automation target: recurring inheritance resets.',
      'Build-ready PDD with decision rules and steps.',
      'Safety-first approach inside SAP constraints.',
    ],
    tools: ['SAP', 'Figma', 'Docs'],
    methods: ['Process mapping', 'Expert workshops', 'Use case clustering', 'Handoff documentation'],
    links: [{ label: 'Case study', href: '/projects/automation' }],
    cardCoverUrl: '/projects/sap_automation_bot_hero.png',
    metaCards: [
      { label: 'Experts', value: '10 to 20', icon: 'users' },
      { label: 'Metric', value: 'Hard metric', icon: 'impact' },
      { label: 'Environment', value: 'SAP enterprise', icon: 'stack' },
      { label: 'Deliverable', value: 'PDD, click-by-click', icon: 'deliverable' },
    ],
    deliveryImpact: {
      delivery: [
        'Use case clustering with experts',
        'Automation concept and decision rules',
        'PDD specification and handoff',
      ],
      impact: [
        'Reduced recurring manual checks',
        'More consistent handling after inheritance events',
        'Lower error risk through a repeatable routine',
      ],
      document: { label: 'Implementation PDD', href: '/docs/automation-pdd.pdf' },
    },
    coverFallback: 'icon',
    tags: ['automation', 'ops', 'enterprise'],
    impactCards: [
      { label: 'Experts impacted', value: '10 to 20' },
      { label: 'Metric', value: 'Hard metric' },
      { label: 'Deliverable', value: 'Implementation PDD' },
      { label: 'Environment', value: 'SAP enterprise' },
    ],
    caseStudy: caseStudyAutomation,
    portfolioKit: portfolioKitAutomation,
  },

  'ffp-dashboard': {
    id: '7',
    slug: 'ffp-dashboard',
    title: 'Failure Fingerprint Dashboard',
    subtitle: 'Root cause workflow redesign as a clickable prototype.',
    oneLiner:
      'High-fidelity, clickable prototype that reshapes expert work around symptom-first triage, correlation, and root cause synthesis.',
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
    roleLine: 'UX/UI design. Workflow mapping and high-fidelity prototype.',
    teamSize: '2 to 3',
    customerAbout: 'Automotive internal expert tool for diagnostics and failure analysis.',
    context:
      'Experts needed to move from symptoms to root cause fast. The legacy UI blocked correlation and created context switching.',
    problem:
      'Part-number-first flows slowed investigations and made cross-case matching unreliable. The system did not support a clean synthesis story.',
    solution:
      'Reshaped the workflow around root cause intent and delivered a clickable high-fidelity prototype that stakeholders could validate end to end.',
    outcomes: [
      'Symptom-first entry supports real investigation behavior.',
      'Correlation merges signals into one fingerprint.',
      'Clickable prototype proves the end-to-end workflow and handoffs.',
    ],
    metrics: [],
    highlights: [
      'Full click-through prototype for stakeholder validation.',
      'Information hierarchy optimized for triage and synthesis.',
      'Clear transitions across key investigation steps.',
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
      { value: 'Symptom-first', label: 'Entry' },
      { value: 'Correlation', label: 'Matching' },
      { value: 'Synthesis', label: 'Root cause' },
    ],
    metaCards: [
      { label: 'Experts', value: '10 to 20', icon: 'users' },
      { label: 'Duration', value: 'Over 6 months', icon: 'timeline' },
      { label: 'Proof', value: 'Clickable prototype', icon: 'stages' },
      { label: 'Deliverable', value: 'High-fidelity concept', icon: 'deliverable' },
    ],
    deliveryImpact: {
      delivery: [
        'Workflow redesign around root cause intent',
        'High-fidelity screen designs and states',
        'Clickable prototype for end-to-end validation',
      ],
      impact: [
        'Better scan and flow continuity during investigations',
        'Improved correlation support for matching similar cases',
        'Clearer synthesis story and fewer context breaks',
      ],
    },
    tags: ['enterprise', 'automotive', 'diagnostics', 'workflow'],
    impactCards: [
      { label: 'Entry', value: 'Symptom-first' },
      { label: 'Matching', value: 'Correlation view' },
      { label: 'Proof', value: 'Clickable prototype' },
      { label: 'Deliverable', value: 'High-fidelity concept' },
    ],
    caseStudy: caseStudyFfp,
    portfolioKit: portfolioKitFfp,
  },

  'emission-compliance': {
    id: '8',
    slug: 'emission-compliance',
    title: 'Emission Compliance Dashboard',
    subtitle: 'Prototype that makes outliers and thresholds readable fast.',
    oneLiner:
      'Dashboard prototype and interaction concept that reduces table clutter, improves scan speed, and makes thresholds easy to adjust to measurement values.',
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
    roleLine: 'UX/UI design. Visual concept and prototype delivery.',
    teamSize: '2 to 3',
    context:
      'Emission reporting is table-heavy and time-critical. Experts need scan speed and threshold logic they can adjust and trust.',
    problem:
      'Table clutter buried anomalies. Threshold logic was hard to interpret and not adjustable in a consistent way.',
    solution:
      'Delivered a prototype dashboard plus visual and interaction concept for outliers and adjustable thresholds.',
    outcomes: [
      'Reduced visual clutter in dense reporting tables.',
      'Outliers and breaches surfaced faster.',
      'Threshold logic became easier to adjust and interpret.',
    ],
    metrics: [],
    impact: [
      { value: 'Faster', label: 'Scan speed' },
      { value: 'Visible', label: 'Outliers' },
      { value: 'Adjustable', label: 'Thresholds' },
    ],
    highlights: [
      'Prototype dashboard for rapid stakeholder alignment.',
      'Consistent encoding rules for breaches and thresholds.',
      'Threshold settings concept adaptable to measurement values.',
    ],
    tools: ['Figma'],
    methods: ['Workflow capture', 'Interaction concept', 'High-fidelity prototyping', 'Reviews and handoff'],
    links: [{ label: 'Case study', href: '/projects/emission-compliance' }],
    metaCards: [
      { label: 'Users', value: '10 to 15', icon: 'users' },
      { label: 'Deliverable', value: 'Prototype and rule concept', icon: 'deliverable' },
      { label: 'Focus', value: 'Outliers and thresholds', icon: 'stages' },
      { label: 'Role', value: 'UX/UI Designer', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Dashboard prototype',
        'Outlier and threshold visual encoding rules',
        'Threshold interaction concept and settings pattern',
      ],
      impact: [
        'Better scan speed in table-heavy reporting',
        'Earlier visibility of anomalies and breaches',
        'More confident decisions through adjustable thresholds',
      ],
    },
    tags: ['enterprise', 'automotive', 'emission', 'compliance'],
    impactCards: [
      { label: 'Users', value: '10 to 15' },
      { label: 'Focus', value: 'Outliers and thresholds' },
      { label: 'Deliverable', value: 'Prototype dashboard' },
      { label: 'Outcome', value: 'Faster scanning' },
    ],
    caseStudy: caseStudyCaesar,
    portfolioKit: portfolioKitCaesar,
  },

  tracklistify: {
    id: '4',
    slug: 'tracklistify',
    title: 'Tracklistify Studio',
    subtitle: 'AI-assisted set analysis with review and wishlist flows.',
    oneLiner:
      'Beta side project that analyzes DJ sets, generates a clean review list, and supports a wishlist flow for saved tracks.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Concept and indie developer.',
    context:
      'DJs study sets, but manual track identification is slow and unstructured.',
    problem:
      'Many tools make iteration messy. Results, rescans, and review are inconsistent, which blocks a clean wishlist flow.',
    solution:
      'Built a beta workflow that uses AI-assisted analysis to generate a review list and drive saving and wishlist actions.',
    outcomes: [
      'Defined an end-to-end flow from ingest to review to wishlist.',
      'Set up a structure for iteration as the detection pipeline improves.',
    ],
    metrics: [],
    highlights: [
      'Review flow designed for fast decisions.',
      'Beta stage with clear feature growth path.',
      'Workflow optimized for iteration and saved outcomes.',
    ],
    tools: ['Python', 'Next.js'],
    methods: ['Rapid prototyping', 'Flow design', 'Iteration'],
    links: [
      {
        label: 'Live demo',
        href: 'http://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.aZxIdQ.-CQMXtrCxrMpTC0SgrVOn3I5XDk',
      },
      { label: 'GitHub', href: 'https://github.com/example/tracklistify' },
    ],
    metaCards: [
      { label: 'Stage', value: 'Beta', icon: 'timeline' },
      { label: 'Deliverable', value: 'Workflow and prototype', icon: 'deliverable' },
      { label: 'Core flow', value: 'Analyze, review, wishlist', icon: 'stages' },
      { label: 'Role', value: 'Indie developer', icon: 'role' },
    ],
    coverFallback: 'initials',
    deliveryImpact: {
      delivery: [
        'AI-assisted set analysis into a review list',
        'Review and save decisions',
        'Wishlist flow as a structured output',
      ],
      impact: [
        'Faster track identification workflow',
        'Cleaner output and repeatable iteration',
      ],
    },
    tags: ['side', 'audio', 'dj', 'workflow'],
    impactCards: [
      { label: 'Stage', value: 'Beta' },
      { label: 'Deliverable', value: 'Prototype workflow' },
      { label: 'Core flow', value: 'Analyze, review, wishlist' },
      { label: 'Role', value: 'Indie developer' },
    ],
    caseStudy: caseStudyTracklistify,
    portfolioKit: portfolioKitTracklistify,
  },

  fixundfertig: {
    id: '5',
    slug: 'fixundfertig',
    title: 'Fix und Fertig',
    subtitle: 'Personal invoicing tool with OCR intake for expenses.',
    oneLiner:
      'Holistic personal invoicing tool: create and send invoices, plus automated OCR intake and structured expense extraction.',
    category: 'Side',
    year: '2026',
    roles: ['Indie developer'],
    roleLine: 'Indie developer, automation.',
    context:
      'A single tool should cover outgoing invoices and incoming receipts, without manual copying and formatting errors.',
    problem:
      'Invoice creation and expense intake often live in separate tools. Manual entry and inconsistent formats slow everything down.',
    solution:
      'Built a personal end-to-end workflow: create and send invoices, ingest receipts via automation, extract fields via OCR, and review exceptions quickly.',
    outcomes: [
      'Unified invoice creation, sending, and expense intake in one workflow.',
      'Reduced manual copying and improved consistency across documents.',
    ],
    metrics: [],
    impact: [
      { value: 'Invoices', label: 'Create and send' },
      { value: 'OCR', label: 'Expense intake' },
    ],
    highlights: [
      'Single workflow for outgoing and incoming documents.',
      'Automation reduces manual admin overhead.',
      'Fast review surface for corrections and exceptions.',
    ],
    tools: ['Python', 'NiceGUI', 'n8n', 'OCR pipeline'],
    methods: ['Workflow automation', 'Incremental builds', 'Debug-driven iteration'],
    links: [
      { label: 'Live demo', href: 'https://app.untitled-ux.de/share/read/4ba7659247a84340afdec6b0f852718c' },
      { label: 'GitHub', href: 'https://github.com/example/fixundfertig' },
    ],
    notes:
      'Personal tool: invoice creation and sending plus automated intake for receipts. OCR extraction into structured fields. Fast review UI for exceptions.',
    metaCards: [
      { label: 'Type', value: 'Personal tool', icon: 'timeline' },
      { label: 'Stack', value: 'Python, NiceGUI, n8n, OCR', icon: 'stack' },
      { label: 'Scope', value: 'Invoices and expenses', icon: 'deliverable' },
      { label: 'Role', value: 'Indie developer', icon: 'role' },
    ],
    deliveryImpact: {
      delivery: [
        'Invoice creation and sending flow',
        'Automated receipt intake',
        'OCR extraction into structured fields',
        'Review UI for exceptions',
      ],
      impact: [
        'Less manual admin work',
        'More consistent document handling end to end',
      ],
    },
    tags: ['side', 'automation', 'ops', 'python'],
    impactCards: [
      { label: 'Type', value: 'Personal tool' },
      { label: 'Stack', value: 'Python and OCR pipeline' },
      { label: 'Deliverable', value: 'Invoices plus OCR intake' },
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
  const { caseStudy: _cs, portfolioKit: _pk, kovon: _kv, ...core } = p;
  return { ...core, impactCards: p.impactCards };
}