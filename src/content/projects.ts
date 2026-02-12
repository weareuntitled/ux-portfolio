export type ProjectLink = {
  label: 'Live demo' | 'Case study' | 'GitHub';
  href: string;
};

export type ProjectPrototype = {
  figmaEmbedUrl?: string;
  figmaFileUrl?: string;
  hints: string[];
};

export type ProjectMedia = {
  type: 'image' | 'video';
  title: string;
  description: string;
  src: string;
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
  tags: string[];
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'kovon',
    title: 'KoVoN',
    oneLiner:
      'Enterprise service operations cockpit used by cross-functional quality and logistics teams.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (internal)',
    roles: ['Product Engineer', 'UX Lead'],
    context:
      'KoVoN replaced fragmented tools with one internal product for warranty triage and supplier escalation.',
    problem:
      'Operators switched between disconnected spreadsheets and legacy portals, causing delayed decisions and duplicate updates.',
    solution:
      'Built a role-aware dashboard flow with alert prioritization, inline audit trails, and guided issue handoff between plants and quality engineering.',
    outcomes: [
      'Reduced time-to-resolution for high priority incidents.',
      'Improved traceability for escalation ownership.',
      'Increased confidence in daily operations reporting.'
    ],
    metrics: ['-29% incident resolution time', '+34% weekly active users', '96% handoff completeness'],
    highlights: [
      'Rule-based alert scoring surfaced top-risk cases first.',
      'Bulk actions reduced repetitive triage work.',
      'Audit timeline simplified compliance reviews.'
    ],
    tools: ['TypeScript', 'React', 'Figma', 'SQL'],
    methods: ['Workflow mapping', 'Shadowing sessions', 'Usability tests'],
    links: [
      { label: 'Live demo', href: '/prototypes/kovon/queues' },
      { label: 'Case study', href: '/projects/kovon' }
    ],
    prototype: {
      figmaEmbedUrl:
        'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/KoVoNEnterprisePrototype',
      figmaFileUrl: 'https://www.figma.com/file/KoVoNEnterprisePrototype',
      hints: ['Use left nav to switch queues', 'Open any row for escalation details']
    },
    tags: ['operations', 'enterprise', 'quality'],
    media: [
      {
        type: 'image',
        title: 'KoVoN Operations Dashboard',
        description: 'Queue health and SLA status by plant.',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80'
      }
    ]
  },
  {
    id: '2',
    slug: 'failure-fingerprint-dashboard-ffp',
    title: 'Failure Fingerprint Dashboard (FFP)',
    oneLiner: 'Enterprise analytics workspace for root-cause clustering across production failures.',
    category: 'Enterprise',
    year: '2023',
    client: 'Manufacturing Analytics (internal)',
    roles: ['Frontend Engineer', 'Data UX'],
    context:
      'FFP translated machine telemetry and incident logs into an investigation view shared by engineering and leadership.',
    problem:
      'Root-cause meetings relied on static reports; analysts spent more time preparing data than investigating patterns.',
    solution:
      'Created interactive clustering and comparative trend panels with saved investigation presets and shareable snapshots.',
    outcomes: [
      'Shortened preparation time for review meetings.',
      'Enabled recurring pattern detection before line-level incidents scaled.',
      'Standardized decision narratives across teams.'
    ],
    metrics: ['-41% prep time per review', '+22% early pattern detection', '4 teams onboarded in 6 weeks'],
    highlights: [
      'Linked cluster map to event timeline drill-down.',
      'Snapshot links improved async collaboration.',
      'Accessible color scale handled dense heatmaps.'
    ],
    tools: ['Next.js', 'D3', 'Figma', 'Python'],
    methods: ['Data interviews', 'Dashboard prototyping', 'A/B chart evaluations'],
    links: [
      { label: 'Live demo', href: '/prototypes/ffp' },
      { label: 'Case study', href: '/projects/failure-fingerprint-dashboard-ffp' }
    ],
    prototype: {
      hints: ['Prototype available on request']
    },
    tags: ['analytics', 'dashboard', 'enterprise'],
    media: [
      {
        type: 'image',
        title: 'FFP Cluster Explorer',
        description: 'Failure clusters with severity overlay.',
        src: 'https://images.unsplash.com/photo-1551281044-8b9226f22a55?auto=format&fit=crop&w=1400&q=80'
      }
    ]
  },
  {
    id: '3',
    slug: 'cesa-dashboard',
    title: 'CESA Dashboard',
    oneLiner: 'Enterprise executive cockpit for cross-entity service agreement performance.',
    category: 'Enterprise',
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
    tags: ['executive', 'sla', 'enterprise'],
    media: [
      {
        type: 'image',
        title: 'CESA Regional Scorecards',
        description: 'SLA trends by region and service domain.',
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80'
      }
    ]
  },
  {
    id: '4',
    slug: 'tracklistify',
    title: 'Tracklistify',
    oneLiner: 'Engineering-focused side project that converts playlist metadata into printable set planning cards.',
    category: 'Side',
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
    tags: ['side-project', 'audio', 'engineering'],
    media: [
      {
        type: 'image',
        title: 'Tracklistify Analyzer',
        description: 'Track grouping and transition recommendations.',
        src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80'
      }
    ]
  },
  {
    id: '5',
    slug: 'fixundfertig',
    title: 'FixundFertig',
    oneLiner: 'Engineering side project for tracking household repairs with lightweight issue management.',
    category: 'Side',
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
    tags: ['side-project', 'ops', 'engineering'],
    media: [
      {
        type: 'image',
        title: 'FixundFertig Task Board',
        description: 'Repair ticket lanes with ownership and due dates.',
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80'
      }
    ]
  }
];

export const findProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

/** Home page: main 3 enterprise product cards (KoVoN, FFP, CESA). Centus is "additional delivery" chip only. */
export const enterpriseProjectSlugs = ['kovon', 'failure-fingerprint-dashboard-ffp', 'cesa-dashboard'] as const;

export function getEnterpriseProjects(): Project[] {
  return enterpriseProjectSlugs
    .map((slug) => findProjectBySlug(slug))
    .filter((p): p is Project => p != null);
}
