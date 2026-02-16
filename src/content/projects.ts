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

export type ProjectImpactItem = { label: string; value: string };

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
    title: 'KoVoN Compliance Tool',
    oneLiner:
      'Online tool for mapping and assessing legal requirements in vehicle projects (UN ECE regulations, COP verification).',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['Product Manager'],
    teamSize: '7+',
    customerAbout: 'Konzern (corporate). Product development, automotive.',
    context:
      'KoVoN was planned as a central verification online tool for legal requirements, based on UN ECE regulations and COP tests that vehicles must pass before market release. In reality, this information was scattered across departments, vehicle projects, and documents—with no shared view on which regulations applied to which project, which evidence existed, or who was responsible. Ownership was often implicit and historically grown; a structured standard process for assessment and documentation was missing.',
    problem:
      'Regulations can be assessed at chapter level or at fine-grained detail; responsibility ranged from whole departments to single persons; evidence and documents lived in different systems and folders. The first MVP closely mirrored the existing database—it represented the data correctly but did not address the core pain: assigning regulations to projects and owners, surfacing gaps, and establishing a consistent way of working. In the corporate context we had to work within a given Angular stack, strict security policies, and internal toolchains, which limited design freedom and kept the solution deliberately functional and pragmatic.',
    workflow:
      '1) Define a standard process for handling regulations and how KoVoN supports it (steps from identification to documented assessment, document storage, role responsibilities). 2) Involve stakeholders in vehicle projects in detail—managers, responsible persons, document creators, system owners. 3) MVP, user tests (e.g. at Audi with end users and managers), and course correction: focus on multi-assignment of regulations/chapters, better views on projects/regulations/evidence, clearer status and gap visualization. 4) Role model and views (project view with regulation status, regulation view with project/department/owner assignment, management view with reporting). 5) Product management and Scrum over several years: backlog, roadmapping, sprint and capacity planning, risk awareness (acceptance, budget, training).',
    solution:
      'A role model and multiple views tailored to user tasks: project view with regulation status and evidence; regulation view with assignment to projects, departments, and owners; management view with reporting on progress against COP requirements. Assessment logic supports both coarse chapter-level and detailed requirements. Despite beta maturity, KoVoN was not rolled out group-wide due to budget cuts, day-to-day workload, and limited uptake of training—risks that were raised early and openly with the client.',
    outcomes: [
      'Shared view on projects, regulations, and evidence.',
      'Role model with aligned views for management, departments, and documentation owners.',
      'Gaps in responsibility and documentation became visible so departments could act on missing assessments, unclear ownership, and missing evidence.'
    ],
    metrics: [],
    highlights: [
      'Standard process for regulation handling defined with the client.',
      'User tests and feedback drove focus on multi-assignment, views, and gap visualization.',
      'Retrospectives after each milestone to improve process; learned how budget cycles and corporate constraints affect product development.'
    ],
    tools: ['Angular', 'Figma', 'SQL'],
    methods: ['Process definition with client', 'Stakeholder interviews', 'User tests', 'Scrum and product management'],
    links: [
      { label: 'Case study', href: '/projects/kovon' }
    ],
    tags: ['compliance', 'enterprise', 'automotive', 'product-management']
  }),
  new EnterpriseProject({
    id: '3',
    slug: 'cesa-dashboard',
    title: 'CESA Dashboard',
    oneLiner: 'Enterprise executive cockpit for cross-entity service agreement performance.',
    year: '2022',
    client: 'Mobility Services (internal)',
    roles: ['Product Engineer'],
    context:
      'CESA consolidated service-level outcomes from multiple business entities into one board-level reporting workflow.',
    problem:
      'Leadership lacked a single source of truth for SLA health and regional risk exposure.',
    solution:
      'Implemented modular scorecards, regional comparison views, and narrative-ready export cards for monthly business reviews.',
    outcomes: [
      'Improved visibility into SLA risk by region.',
      'Reduced manual reporting effort for PMO teams.',
      'Aligned escalation thresholds across entities.'
    ],
    metrics: ['-35% reporting effort', '+18% SLA compliance trend', '100% monthly report adoption'],
    highlights: [
      'Entity-level scorecards with trend context.',
      'Risk chips surfaced deviations early.',
      'Export cards reduced slide prep time.'
    ],
    tools: ['React', 'TypeScript', 'Figma'],
    methods: ['Stakeholder mapping', 'Information architecture', 'Iterative user testing'],
    links: [{ label: 'Case study', href: '/projects/cesa-dashboard' }],
    prototype: {
      figmaEmbedUrl:
        'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/CESAExecutivePrototype',
      figmaFileUrl: 'https://www.figma.com/file/CESAExecutivePrototype',
      hints: ['Toggle between region and entity views', 'Try the monthly summary export']
    },
    tags: ['executive', 'sla', 'enterprise']
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
      { label: 'Live demo', href: 'https://example.com/tracklistify' },
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
    highlights: [
      'Kanban-like board simplified prioritization.',
      'Photo timeline improved trust in completion status.',
      'Notification digest reduced noisy reminders.'
    ],
    tools: ['TypeScript', 'Supabase', 'React'],
    methods: ['Problem interviews', 'Usability walkthroughs', 'Iterative releases'],
    links: [{ label: 'GitHub', href: 'https://github.com/example/fixundfertig' }],
    prototype: {
      hints: ['Prototype available on request']
    },
    tags: ['side-project', 'ops', 'engineering']
  }),
  new EnterpriseProject({
    id: '6',
    slug: 'automation',
    title: 'Automation & Ops',
    oneLiner:
      'Process automation, AI/LLM consulting, and ops tooling for enterprise and product teams.',
    year: '2023',
    client: 'Internal & 8020',
    roles: ['Automation Consultant', 'Product Engineer'],
    context:
      'Automation and ops work spanned workflow automation, LLM/AI integration, and tooling to reduce manual effort and improve delivery predictability.',
    problem:
      'Teams spent too much time on repetitive tasks, ad-hoc reporting, and handoffs between systems without clear audit trails.',
    solution:
      'Designed and delivered automation pipelines, AI-assisted workflows, and ops dashboards that cut manual effort and improved traceability.',
    outcomes: [
      'Reduced manual effort for recurring reporting and handoffs.',
      'Improved delivery predictability with clearer status and SLA visibility.',
      'Enabled self-service ops for teams via dashboards and automation.'
    ],
    metrics: ['-40% manual ops effort', '+50% delivery predictability', '3 teams onboarded'],
    highlights: [
      'Workflow automation and LLM integration for triage and summarization.',
      'Before/after ops visibility with shared dashboards.',
      'Design systems and patterns reused across automation projects.'
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
    oneLiner: 'Internal dashboard app for diagnosis and problem management in the automotive sector.',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX & UI Designer'],
    teamSize: '2–3',
    customerAbout: 'Konzern. Product development, automotive.',
    context:
      'In the existing Fingerprint Dashboard, a lot of information was packed into a single view. Users had to click through long tables and many columns and open each fingerprint to understand a case. Multiple data sources fed in—diagnosis data, unordered errors from the DISS environment, and internally created fingerprints—yet it was unclear what was relevant at which step.',
    problem:
      'Shadowing showed that information overload made it hard to get started; users had to open each case to see content, relevance, and status; similar cases were tagged differently with no clear support for merging; processing status and ownership per case were hard to see. There was no clear structure along the tasks of tagging, diagnosis, and reporting, although roles and process steps were already established in the organisation.',
    workflow:
      '1) Understand context via UX shadowing: how staff work with returns, diagnosis data, and fingerprints; which systems they use; document roles, process steps, and where dashboards helped or hindered. 2) Align tasks and role model with functionality: who assesses incoming cases and tags, who merges similar cases and maintains fingerprints, who prepares information for problem management; compare with existing dashboard features to find gaps and redundancy. 3) Prioritize and structure dashboards with the department so each role has a clear entry point, key fields are visible on overview, and tagging/merging/reporting are supported by filters and states—resulting in specialized dashboards (e.g. Diagnosis, DISS, split FFP views). 4) Screen concepts and modular building blocks in Figma: variants for tables, filters, status, detail views; reuse consistent table headers, status areas, and detail blocks. 5) Navigation concept and handover: process from tagging via diagnosis to reporting; overview-to-detail flow; Figma package to development.',
    solution:
      'A structure with role-specific entry points, key fields visible on overview pages, and tagging, merging, and reporting supported by filters and states. Multiple specialized dashboards (e.g. Diagnosis dashboard, DISS dashboard, split FFP dashboards for different task areas). Modular UI building blocks. Seven central dashboard screens plus an exemplary Failure Fingerprinting detail screen (case data and reproduction steps above; market and stock impact below for problem management).',
    outcomes: [
      'Clearer information hierarchy and focus on the most important fields per role.',
      'Users found their way around the new structure; they could see which cases were relevant, current status, and how items related.',
      'Qualitative feedback from the department was positive and led to further commissions for the team.'
    ],
    metrics: [],
    highlights: [
      'Diagnosis dashboard with focus on assessing and grouping cases.',
      'DISS dashboard as source for untagged errors to be classified.',
      'Split FFP dashboards making case status, tags, and merges transparent; detail screen combining diagnosis and market impact.'
    ],
    tools: ['Figma', 'Miro', 'PowerPoint', 'Jira', 'Confluence'],
    methods: ['UX shadowing', 'Task and role model', 'Screen variants and reviews', 'Modular design system', 'Handover to development'],
    links: [{ label: 'Live demo', href: '/prototypes/ffp' }],
    prototype: {
      prototypeType: 'in-app',
      inAppPrototypeHref: '/prototypes/ffp',
      hints: [
        'Diagnosis dashboard: assess and group cases',
        'DISS: untagged errors to be classified',
        'FFP dashboards: case status, tags, merges',
        'Detail screen: case data and market impact'
      ]
    },
    prototypeButtonLabel: 'Live demo',
    tags: ['enterprise', 'automotive', 'diagnostics', 'problem-management']
  }),
  new EnterpriseProject({
    id: '8',
    slug: 'emission-compliance',
    title: 'Car Emission Compliance Dashboard',
    oneLiner: 'Internal web tool for emission data and verification planning in the automotive sector.',
    year: '2024',
    client: 'Automotive (Konzern)',
    roles: ['UX & UI Designer'],
    teamSize: '2–3',
    customerAbout: 'Konzern. Internal tool, automotive.',
    context:
      'Emission data, verification status, and model year information were mainly maintained in extensive Excel master tables. These tables supported Model Year Planning, Dauerlaufgruppierung, Deterioration Factors, Verified Parts, and OBD evaluations. The new interface had to stay within a narrow technical and design frame and remain strongly table-oriented and easy to implement.',
    problem:
      'Users had to open multiple tables, filter, and compare manually to see which engine variants, drivetrains, and transmissions were relevant in a model year, which configurations met emission limits, and how far individual verifications and tests had progressed. Limits and normal ranges were in the tables but not visually emphasized—it was not immediately clear which values were uncritical or critical, where approvals were missing, or what overall progress looked like across configurations.',
    workflow:
      '1) Capture workflows with the department (no direct shadowing): for model year planning, Verified Parts, emission assessment, and data management, describe typical flows, happy paths, and important exceptions so it was clear which information was needed at which step and where Excel fell short. 2) Translate tasks, data fields, and states into UI views: tables remained central but gained clearer hierarchy—e.g. visible limits and normal ranges in the table, consistent status for tests and approvals, better grouping and filtering. 3) Full screen designs in Figma for main tables and detail views; clickable prototypes for flows such as checking and rating emission data, adjusting a configuration, uploading and assigning approvals. 4) Reviews, refinement, and handover: check-ins with stakeholders, iterative refinement of modals, accordions, filters, toasts; stable screen sets and flows handed over as a Figma package.',
    solution:
      'An interface concept that turns the existing Excel master tables into structured web interfaces. In tables and detail views, users see which configurations were tested, which emission values occur in which drive cycles, and whether values are within limits or critical. Limits, normal ranges, and exceedances are visually highlighted. Status displays and modals support daily assessment of configurations. The concept stays close to the familiar table logic but reduces cognitive load by sorting and marking important information clearly.',
    outcomes: [
      'Clearer view on emission and verification data; critical values and missing approvals are easier to spot.',
      'Better support for daily evaluation of configurations; users can see test and approval status and progress per configuration.',
      'Feedback from the department was very positive; the project ended when budget limits led to a search for follow-up projects.'
    ],
    metrics: [],
    highlights: [
      'Visible limits and normal ranges in tables; consistent status for tests and approvals.',
      'Clickable Figma prototypes for checking emission data, adjusting configurations, uploading approvals.',
      'Modals, accordions, filters, and toasts refined iteratively with stakeholders.'
    ],
    tools: ['Figma'],
    methods: ['Structured workflow capture', 'Task and data translation to UI', 'Screen designs and prototypes', 'Reviews and handover'],
    links: [{ label: 'Case study', href: '/projects/emission-compliance' }],
    tags: ['enterprise', 'automotive', 'emission', 'compliance', 'verification']
  })
];

export const findProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

/** Home page: main enterprise product cards (KoVoN, CESA). */
export const enterpriseProjectSlugs = ['kovon', 'cesa-dashboard'] as const;

export function getEnterpriseProjects(): Project[] {
  return enterpriseProjectSlugs
    .map((slug) => findProjectBySlug(slug))
    .filter((p): p is Project => p != null);
}
