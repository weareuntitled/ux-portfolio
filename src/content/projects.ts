export type ProjectLink = {
  label: 'Live demo' | 'Case study' | 'GitHub';
  href: string;
};

export type ProjectPrototype = {
  prototypeType?: 'in-app' | 'figma';
  inAppPrototypeHref?: string;
  figmaEmbedUrl?: string;
  figmaFileUrl?: string;
  hints: string[];
};

export type ProjectImpactItem = {
  label: string;
  value: string;
  /** 'up' = positive (e.g. adoption), 'down' = positive for effort reduction */
  trend?: 'up' | 'down';
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  oneLiner: string;
  category: 'Enterprise' | 'Side';
  year: string;
  client?: string;
  roles: string[];
  context: string;
  problem: string;
  solution: string;
  outcomes: string[];
  metrics: string[];
  highlights: string[];
  tools: string[];
  methods: string[];
  links?: ProjectLink[];
  prototype?: ProjectPrototype;
  prototypeButtonLabel?: string;
  moodImageUrl?: string;
  teamSize?: string;
  customerAbout?: string;
  workflow?: string;
  notes?: string;
  impact?: ProjectImpactItem[];
  galleryUrls?: string[];
  tags: string[];
};

class BaseProject implements Project {
  id!: string;
  slug!: string;
  title!: string;
  oneLiner!: string;
  category!: 'Enterprise' | 'Side';
  year!: string;
  client?: string | undefined;
  roles!: string[];
  context!: string;
  problem!: string;
  solution!: string;
  outcomes!: string[];
  metrics!: string[];
  highlights!: string[];
  tools!: string[];
  methods!: string[];
  links?: ProjectLink[] | undefined;
  prototype?: ProjectPrototype | undefined;
  tags!: string[];

  constructor(config: Project) {
    Object.assign(this, config);
  }
}

class EnterpriseProject extends BaseProject {
  constructor(config: Omit<Project, 'category'>) {
    super({ ...config, category: 'Enterprise' });
  }
}

class SideProject extends BaseProject {
  constructor(config: Omit<Project, 'category'>) {
    super({ ...config, category: 'Side' });
  }
}

export const projects: Project[] = [
  new EnterpriseProject({
    id: '1',
    slug: 'kovon',
    title: 'KoVoN',
    oneLiner:
      'Holistic COP compliance documentation tool KoVoN. Validated scalable pilot web tool, with integrated role, task and regulation concept. To gather insights and prove scalability around Online Conformity of Production (COP).',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Product Designer', 'Scrum Master'],
    teamSize: '4–6 devs, 2 designers',
    customerAbout: 'Konzern (corporate). Product development, automotive.',
    context:
      'Automotive teams needed a single place to document and prove Conformity of Production (COP). Documentation was scattered; regulation required audit-proof evidence. KoVoN was conceived as a holistic COP compliance documentation tool.',
    problem:
      'Automotive teams were overloaded. Documentation work was avoided, but regulation required audit proof. Teams needed an integrated role, task and regulation concept to scale COP documentation and prove conformity.',
    workflow:
      'Designed and validated KoVoN as a pilot web tool with integrated role, task and regulation concept. Delivered a scalable COP compliance documentation tool to gather insights and prove scalability around Online Conformity of Production. COFON translated the learnings into a maintainable concept and governance model.',
    solution:
      'A validated scalable pilot web tool with integrated role, task and regulation concept. The work gathered insights and proved scalability around Online Conformity of Production (COP), providing a foundation for holistic compliance documentation.',
    outcomes: [
      'Delivered holistic COP compliance documentation tool KoVoN as a validated pilot web tool.',
      'Integrated role, task and regulation concept to support scalable COP documentation.',
      'Gathered insights and proved scalability around Online Conformity of Production (COP).',
      'Produced a maintainable concept and governance model for future rollout.',
    ],
    metrics: [],
    highlights: [
      'Holistic COP compliance documentation tool KoVoN; validated scalable pilot web tool.',
      '6 role concepts with their own dashboards; evaluation concept; management site for vehicle projects, tasks (regulations), users.',
      'Documentation of Conformity; update concept for work & regulation structure.',
    ],
    tools: ['Angular', 'AWS'],
    methods: ['Process definition with client', 'Stakeholder interviews', 'User tests', 'Scrum and product management'],
    links: [
      { label: 'Case study', href: '/projects/kovon' }
    ],
    impact: [
      { value: '500 to 1,000 users', label: 'User Scale' },
      { value: 'POC to Beta', label: 'Maturity' },
      { value: '3 years', label: 'Timeline' },
      { value: 'Angular, AWS', label: 'Stack' },
    ],
    tags: ['compliance', 'enterprise', 'automotive', 'product-management']
  }),
  new SideProject({
    id: '4',
    slug: 'tracklistify',
    title: 'Tracklistify',
    oneLiner: 'Engineering-focused side project that converts playlist metadata into printable set planning cards.',
    year: '2024',
    roles: ['Indie Maker', 'Full-stack Engineer'],
    context:
      'A solo-built utility for DJs and hobbyists to process playlist exports and generate actionable set prep artifacts.',
    problem:
      'Existing music tools handle curation, but not structured planning for energy flow and transitions.',
    solution:
      'Built a parser pipeline and web UI that groups tracks by tempo bands, key compatibility, and transition confidence.',
    outcomes: [
      'Validated demand with recurring usage from local creators.',
      'Proved a compact data model for playlist diagnostics.',
      'Shipped weekly improvements from user feedback.'
    ],
    metrics: ['500+ playlists processed', '42% weekly returning users', 'sub-2s analysis runtime'],
    highlights: [
      'CLI + web upload path for faster ingest.',
      'Transition score model tuned in production.',
      'Printable planning cards optimized for mobile.'
    ],
    tools: ['Next.js', 'Node.js', 'PostgreSQL'],
    methods: ['Rapid prototyping', 'Telemetry review', 'User interviews'],
    links: [
      { label: 'Live demo', href: 'http://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.aZjo5w.kmAFwTEAWeRttLJTiSetI9IaPjk' },
      { label: 'GitHub', href: 'https://github.com/example/tracklistify' }
    ],
    prototype: {
      figmaEmbedUrl:
        'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/TracklistifyPrototype',
      figmaFileUrl: 'https://www.figma.com/file/TracklistifyPrototype',
      hints: ['Upload CSV sample', 'Inspect tempo flow chart']
    },
    tags: ['side-project', 'audio', 'engineering']
  }),
  new SideProject({
    id: '5',
    slug: 'fixundfertig',
    title: 'FixundFertig',
    oneLiner: 'Engineering side project for tracking household repairs with lightweight issue management.',
    year: '2023',
    roles: ['Indie Maker', 'Frontend Engineer'],
    context:
      'Built as a practical experiment in low-friction task systems for apartments and shared homes.',
    problem:
      'Home repair tasks get lost in messaging apps without ownership, evidence, or completion state.',
    solution:
      'Implemented ticket-style flows, photo proof uploads, and simple status transitions tailored for non-technical users.',
    outcomes: [
      'Improved completion rates for recurring maintenance tasks.',
      'Reduced confusion around repair ownership.',
      'Demonstrated reusable patterns for micro-SaaS workflows.'
    ],
    metrics: ['180+ completed tasks', '3.1x faster assignment', '71% monthly active households'],
    impact: [
      { value: '3.1x', label: 'Faster Assignment' },
      { value: '71%', label: 'Active Households' },
    ],
    highlights: [
      'Kanban-like board simplified prioritization.',
      'Photo timeline improved trust in completion status.',
      'Notification digest reduced noisy reminders.'
    ],
    tools: ['TypeScript', 'Supabase', 'React'],
    methods: ['Problem interviews', 'Usability walkthroughs', 'Iterative releases'],
    links: [
      { label: 'Live demo', href: 'https://app.untitled-ux.de/share/read/af9759caf9e54b09982d69987c516b95' },
      { label: 'GitHub', href: 'https://github.com/example/fixundfertig' }
    ],
    prototype: {
      hints: ['Open the app for ticket-style flows and photo proof uploads']
    },
    moodImageUrl: '/projects/fixundfertig_preview.jpg',
    tags: ['side-project', 'ops', 'engineering']
  }),
  new EnterpriseProject({
    id: '6',
    slug: 'automation',
    title: 'Automation & Ops',
    oneLiner:
      'SAP Bot: Flags wrongly reset parts so support can restore them—saves manual checks and reduces risk of assembly line stop. ~40–50 experts recovered 2–4 hours/week each.',
    year: '2024',
    client: 'Internal & 8020',
    roles: ['Process Analyst', 'Automation Concept Owner'],
    context:
      'SAP Bot addressed a Parent-Child inheritance conflict in a shared automotive database. When Parent pushes to Child, inheritance overwrites as single source of truth—completed values reset. Highly confidential—working with parts and car-building processes; no screenshots available.',
    problem:
      'Operator pushes a part (e.g. new brake component) → K-level drops across the chain. Support uses bot-set IDs to find wrongly reset items and restores them. Bot saves manual checks; reduces risk of assembly line stop.',
    workflow:
      '1) High-level flow, deep dive with standard design process. Investigated AI use cases (manual to half-automated). 2) Pitched automation potential. 3) Deep-dive shadowing with two experts—spotted bot automation potential. 4) Defined five use cases; prioritized from high-outcome (AI-heavy) to low-hanging fruit. Strict budget led to low-hanging fruit. 5) Developed one of five in three months; Use case 2 concept (higher evaluated—time to market, ~100 people × 1h/week or ~50 × 2h/week); budget froze before PDD.',
    solution:
      'Bot flags wrongly reset parts; support restores them. Saves manual checks; reduces risk of assembly line stop. Technical PDD handed to SAP development. Use case 1 delivered; Use case 2 concept developed but budget froze before PDD.',
    outcomes: [
      'Use case 1 delivered in three months: Bot flags wrongly reset parts; support restores them. Saves manual checks; reduces risk of assembly line stop.',
      '~40–50 experts (3–4 per system) recovered 2–4 hours/week each—conservative estimate.',
      'Use case 2 concept (higher evaluated for time to market); budget froze before PDD.',
    ],
    metrics: ['40–50 experts', '2–4 hrs/week saved each', '5 use cases defined', '1 delivered in 3 months'],
    impact: [
      { value: '40–50', label: 'Experts Affected' },
      { value: '2–4h', label: 'Hours/Week Recovered Each' },
      { value: '3 mo', label: 'Use Case 1 Delivery' },
    ],
    highlights: [
      'Five use cases defined; one delivered in three months with Technical PDD.',
      'Use case 2 concept: higher evaluated for time to market (~100 × 1h/week or ~50 × 2h/week); budget froze.',
      'Investigated AI use cases; chose low-hanging fruit due to strict budget.'
    ],
    tools: ['TypeScript', 'Python', 'LLM APIs', 'React', 'Figma'],
    methods: ['Process mapping', 'Automation design', 'Stakeholder workshops'],
    links: [{ label: 'Case study', href: '/projects/automation' }],
    tags: ['automation', 'ops', 'enterprise', 'ai']
  }),
  new EnterpriseProject({
    id: '7',
    slug: 'ffp-dashboard',
    title: 'Automotive Failure Fingerprint Dashboard',
    oneLiner: 'Symptom-first Failure Fingerprint Dashboard with Correlation Engine for Supplier Quality, Production Testing, and Root Cause Synthesis.',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX Lead'],
    teamSize: '2–3',
    customerAbout: 'Konzern. Product development, automotive.',
    context:
      'The Failure Fingerprint Dashboard served three distinct user streams: Supplier Quality, Production Testing, and Root Cause Synthesis. Multiple data sources fed in—diagnosis data, DISS errors, internally created fingerprints—yet the UI forced Part # lookups instead of symptom-first search.',
    problem:
      'Three user groups with incompatible needs. No ordering and merging structure possible—similar cases tagged differently with no merge support. Data silos with no correlation path to a single Failure Fingerprint. System limitations meant many computes took time.',
    workflow:
      '1) Understand context via UX shadowing: how staff work with returns, diagnosis data, and fingerprints; which systems they use; document roles, process steps, and where dashboards helped or hindered. 2) Align tasks and role model with functionality: who assesses incoming cases and tags, who merges similar cases and maintains fingerprints, who prepares information for problem management; compare with existing dashboard features to find gaps and redundancy. 3) Prioritize and structure dashboards with the department so each role has a clear entry point, key fields are visible on overview, and tagging/merging/reporting are supported by filters and states—resulting in specialized dashboards (e.g. Diagnosis, DISS, split FFP views). 4) Iterative screen design in Figma while development ran in parallel: variants for tables, filters, status, detail views; in every review, the new screen designs were used as concepts for the new screens. 5) Navigation concept and handover: process from tagging via diagnosis to reporting; overview-to-detail flow; Figma package to development.',
    solution:
      'Symptom-first information hierarchy. A Correlation Engine that merges supplier and production data into a single Failure Fingerprint (Root Cause). Dedicated entry points for Supplier Quality, Production Testing, and Root Cause Synthesis. Mental model alignment—search by "Engine Whine" not Part #. Modular UI building blocks.',
    outcomes: [
      'Faster triage and finding similar cases; users could identify issues much faster—like a sentinel.',
      'Tagging consistency improved across streams.',
      'Clearer information hierarchy; Correlation Engine merges supplier and production data into single Failure Fingerprint.',
    ],
    metrics: [],
    highlights: [
      'Split dashboards by role; merge and tagging became core.',
      'Diagnosis dashboard with focus on assessing and grouping cases.',
      'DISS dashboard as source for untagged errors to be classified; detail screen combining diagnosis and market impact.',
    ],
    tools: ['Figma', 'Miro', 'PowerPoint', 'Jira', 'Confluence'],
    methods: ['UX shadowing', 'Task and role model', 'Screen variants and reviews', 'Modular design system', 'Handover to development'],
    links: [{ label: 'Live demo', href: '/prototypes/ffp/fingerprints' }],
    prototype: {
      prototypeType: 'in-app',
      inAppPrototypeHref: '/prototypes/ffp/fingerprints',
      hints: [
        'Diagnosis dashboard: assess and group cases',
        'DISS: untagged errors to be classified',
        'FFP dashboards: case status, tags, merges',
        'Detail screen: case data and market impact'
      ]
    },
    prototypeButtonLabel: 'Live demo',
    impact: [
      { value: '1:1', label: 'Correlation into One Fingerprint' },
      { value: '↓', label: 'Reduced Duplicates', trend: 'down' },
      { value: 'Role-based', label: 'Role-Based Dashboards' },
    ],
    tags: ['enterprise', 'automotive', 'diagnostics', 'problem-management']
  }),
  new EnterpriseProject({
    id: '8',
    slug: 'emission-compliance',
    title: 'Car Emission Compliance Dashboard',
    oneLiner: 'CAESAR: Interaction and design exploration, implemented to reduce visual clutter and help experts spot anomalies before reporting—ensuring better quality.',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX Designer', 'UI Designer'],
    teamSize: '2–3',
    customerAbout: 'Konzern. Internal tool, automotive.',
    context:
      'CAESAR was an interaction and design exploration for the Car Emission Compliance Dashboard. Emission data lived in many tables—visual clutter made it hard for experts to spot anomalies before reporting.',
    problem:
      'Too many tables created visual clutter. Experts could not easily see anomalies in test data before reporting—quality suffered. Critical outliers and threshold breaches were buried in flat data.',
    workflow:
      '1) Capture workflows with the department (no direct shadowing): for model year planning, Verified Parts, emission assessment, and data management, describe typical flows, happy paths, and important exceptions so it was clear which information was needed at which step and where Excel fell short. 2) Translate tasks, data fields, and states into UI views: tables remained central but gained clearer hierarchy—e.g. visible limits and normal ranges in the table, consistent status for tests and approvals, better grouping and filtering. 3) Full screen designs in Figma for main tables and detail views; clickable prototypes for flows such as checking and rating emission data, adjusting a configuration, uploading and assigning approvals. 4) Reviews, refinement, and handover: check-ins with stakeholders, iterative refinement of modals, accordions, filters, toasts; stable screen sets and flows handed over as a Figma package.',
    solution:
      'Interaction and design exploration implemented to reduce visual clutter. Lasso-selection for bulk threshold adjustment. Global vs. Local Threshold Overrides. List-wise color coding so experts spot anomalies before reporting—ensuring better quality.',
    outcomes: [
      'Reduced visual clutter of too many tables.',
      'Experts could see anomalies in testing before reporting.',
      'Better quality through earlier anomaly detection.',
    ],
    metrics: [],
    impact: [
      { value: 'Earlier', label: 'Anomaly Detection' },
      { value: 'Clearer', label: 'Table Clarity' },
      { value: 'Visible', label: 'Threshold Visibility' },
      { value: 'Faster', label: 'Faster Pre-Report Review' },
    ],
    highlights: [
      'Interaction and design exploration implemented to reduce table clutter.',
      'Experts spot anomalies before reporting—ensuring better quality.',
      'Lasso-selection and Global vs. Local Threshold Overrides.',
    ],
    tools: ['Figma'],
    methods: ['Structured workflow capture', 'Task and data translation to UI', 'Screen designs and prototypes', 'Reviews and handover'],
    links: [{ label: 'Case study', href: '/projects/emission-compliance' }],
    tags: ['enterprise', 'automotive', 'emission', 'compliance', 'verification']
  })
];

export const findProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

/** Home page: main enterprise product cards (KoVoN, CAESAR, etc.). */
export const enterpriseProjectSlugs = ['kovon', 'emission-compliance', 'ffp-dashboard', 'automation'] as const;

export function getEnterpriseProjects(): Project[] {
  return enterpriseProjectSlugs
    .map((slug) => findProjectBySlug(slug))
    .filter((p): p is Project => p != null);
}
