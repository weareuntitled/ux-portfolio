import type {
  PortfolioSource,
  Project,
  CaseStudySections,
  PortfolioKitData,
  BentoCardItem,
  TechnicalSpecItem,
  KovonConfig,
} from './portfolio.types';

// 1. IMPORT DER GALLERY-MAP (Generated via scripts/update-gallery.mjs)
import galleryMapRaw from './gallery-map.json';

// ✅ strict type (no any)
type GalleryMap = Record<string, string[]>;

const galleryMap: GalleryMap = galleryMapRaw as unknown as GalleryMap;

// 2. HELPERS: Automated Image Management
export const getGallery = (slug: string): string[] =>
  galleryMap[slug.toLowerCase()] ?? [];

export const getPreviewImage = (slug: string): string | null => {
  const images = getGallery(slug);
  return (
    images.find((img) => img.toLowerCase().includes('hero')) ??
    images.find((img) => img.toLowerCase().includes('gallery_01')) ??
    images[0] ??
    null
  );
};

const caseStudyKovon: CaseStudySections = {
  summary: 'Ending audit-panic through digitized compliance tracking.',
  realProblem: "Data was split across isolated Excels; the team didn't know what was done as a critical audit deadline approached.",
  approach: 'I moved the team from "Task Force Mode" into an agile workflow that prioritized transparency over manual file-hunting.',
  solutionConcept: 'A central hub that maps regulations to work packages, ensuring audit-readiness at all times.',
};

const caseStudyAutomation: CaseStudySections = {
  summary: 'Stopping "Malicious Overwrites" in enterprise SAP environments.',
  realProblem: "Platform updates from VW were falsely overwriting Audi's validated data, forcing experts into weeks of manual rework.",
  approach: 'Mapped failure patterns and defined a safe SAP routine to block inheritance for irrelevant parts.',
  solutionConcept: 'A click-by-click PDD that ensures implementation stays safe and permanent for SAP administrators.',
};

const caseStudyCaesar: CaseStudySections = {
  summary: 'Readable outliers and adjustable thresholds for emission experts.',
  realProblem: 'Table clutter buried anomalies. Threshold logic was not adjustable, making interpretation slow and unreliable.',
  approach: 'Analyzed table patterns and tested visual encodings for breaches to design high-speed scanning.',
  solutionConcept: 'A strict table hierarchy paired with a flexible settings concept for measurement values.',
};

const caseStudyArch: CaseStudySections = {
  summary: 'Achieving a 24x speed increase in architectural visualization.',
  realProblem: 'Traditional rendering cycles for different styles take over 3 days, blocking rapid client feedback.',
  approach: 'Fusing rough 3D foundations in Blender with advanced local ComfyUI workflows.',
  solutionConcept: 'A hybrid 3D + AI pipeline that produces high-end stylistic variants in 3 hours instead of 3 days.',
};

const ffpKit: PortfolioKitData = {
  bentoCards: [
    { title: 'Symptom-first', subtitle: 'Start from the failure.', visual: 'switcher', colSpan: 2 },
    { title: 'Correlation', subtitle: 'One unified fingerprint.', visual: 'metric', value: '1 View' },
  ],
  technicalSpecs: [{ title: 'Workflow', body: 'Restructured the flow around root cause intent instead of part numbers.' }],
};

const kovonConfig: KovonConfig = {
  contentTabs: [
    {
      id: 'solution',
      label: 'Solution',
      icon: 'Layout',
      title: 'Audit-ready Hub',
      body: 'Replaced fragmented Excel tracking with a unified Angular pilot.',
      outcomeBullets: ['Eliminated blind spots.', 'Real-time tracking.'],
    },
  ],
  whereItLandedBullets: ['Working beta pilot delivered.', '80% data coverage achieved.'],
  whyRolloutStoppedBullets: ['Strategy shift during scale-up.'],
  featuredCase: {
    glossary: { OE: { label: 'OE', short: 'Org Unit', detail: 'Internal organizational grouping.', icon: 'Building2' } },
    featuredVisuals: [
      { id: 'v1', title: 'The Chaos', subtitle: 'Excel silos.', icon: 'FileStack', bullets: ['No transparency.'], diagram: { type: 'chaos' } },
    ],
    raciMini: {
      legend: [{ key: 'R', label: 'Resp', hint: 'Worker' }],
      roles: [{ id: 'tl', label: 'Lead', icon: 'Wrench' }],
      tasks: [{ id: 't1', label: 'Doc', cells: { tl: 'R' } }],
    },
  },
};

export const portfolio: PortfolioSource = {
  kovon: {
    id: '1',
    slug: 'kovon',
    title: 'KoVoN COP Pilot',
    navTitle: 'KoVoN COP pilot',
    subtitle: 'Ending Audit-Panic through Conformity of Production.',
    oneLiner: 'Angular pilot that replaced fragmented Excel silos with a transparent compliance hub.',
    category: 'Enterprise',
    year: '2022 - 2024',
    client: 'Automotive (Konzern)',
    moodImageUrl: getPreviewImage('kovon'),
    galleryUrls: getGallery('kovon'),
    roles: ['Product Designer', 'Scrum Master'],
    problem:
      'Conformity of Production (COP) regulations require rigorous documentation of every vehicle part to meet strict UN standards. If an audit fails, vehicle production halts. The team was flying blind because the mapping of evolving regulations to tasks, and tracking the responsible external persons (outside IT) to verify parts, was buried in fragmented Excel silos.',
    solution:
      'I designed an enterprise-grade compliance hub that provides a highly maintainable framework to organize COP workflows. It enables seamless updates to both vehicle project structures and regulatory task requirements, assigns clear ownership to stakeholders, and streamlines reporting via secure read-only links.',
    description:
      'Replaced Excel tracking chaos with a centralized Angular platform. By structuring complex task hierarchies and providing read-only reporting links, the tool ensures 100% data confidence, clear accountability, and complete audit readiness for over 200 active users.',
    outcomes: ['Eliminated Excel tracking chaos.', '100% visibility for audits.', '200 active users.'],
    tags: ['compliance', 'enterprise', 'automotive'],
    impactCards: [{ label: 'Active Users', value: '200+' }, { label: 'Audit Risk', value: 'Eliminated' }],
    outcomeHighlight: { value: 'Audit', label: 'Ready', description: 'Ensured 100% data confidence for regulatory reviews.', icon: 'ShieldCheck' },
    caseStudy: caseStudyKovon,
    kovon: kovonConfig,
  },

  automation: {
    id: '6',
    slug: 'automation',
    title: 'SAP Automation',
    navTitle: 'SAP automation',
    subtitle: 'Stopping "Malicious Overwrites".',
    oneLiner: 'Restored data integrity by blocking faulty platform overwrites via automated routines.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Konzern)',
    moodImageUrl: getPreviewImage('automation'),
    galleryUrls: getGallery('automation'),
    roles: ['Automation Manager', 'Process Analyst'],
    problem:
      '"Malicious Overwrites". Over-secure, legacy SAP automations from the 2000s were destroying validated Audi data during VW platform updates. Fixing these errors forced 10 experts to spend 2 hours each per week (eating up 60-70% of their workweek just fixing bugs).',
    solution:
      'We analyzed 18 processes and abstracted 5 core use cases, prioritizing the "low-hanging fruit" to save budget. We fully automated the primary workflow and designed an AI-assisted flow for the second to detect overrides and escalate only complex cases for human review.',
    description:
      'Successfully pitched and delivered an automated routine to protect local data. I created a highly detailed Process Design Document (PDD)—documenting every single click and step a bot must take—so responsible stakeholders could safely review and approve the routines. This ended manual rework cycles and restored data integrity across the inheritance tree.',
    outcomes: ['Ended manual rework cycles.', 'Integrity restored across the tree.'],
    tags: ['automation', 'sap'],
    impactCards: [
      { label: 'PDD', value: '37 pages' },
      { label: 'Weekly time saved', value: '4h / expert' },
      { label: 'Experts impacted', value: '10' },
    ],
    outcomeHighlight: { value: 'PDD', label: 'Safe', description: 'Stopped data destruction in the VW/Audi inheritance tree.', icon: 'Zap' },
    caseStudy: caseStudyAutomation,
  },

  'emission-compliance': {
    id: '8',
    slug: 'emission-compliance',
    title: 'Emission Dashboard',
    subtitle: 'Scan Speed for critical breaches.',
    oneLiner: 'High-speed reporting dashboard using visual encoding to surface breaches in cluttered data.',
    category: 'Enterprise',
    year: '2024',
    moodImageUrl: getPreviewImage('emission-compliance'),
    galleryUrls: getGallery('emission-compliance'),
    roles: ['UX Designer', 'UI Designer'],
    problem:
      'Critical compliance, contract, and physiological data was buried within cluttered tables, creating a high regulatory risk of overlooking anomalies.',
    solution:
      'Created an easy-to-scan visualization dashboard using hierarchy-first design, visual encoding, and adjustable thresholds.',
    description:
      'A high-speed reporting dashboard designed to surface critical breaches instantly. By translating complex data into a clear visual hierarchy, we drastically optimized scan speed and restored 100% control for the users, avoiding overlooked regulatory breaches.',
    tags: ['compliance', 'enterprise'],
    outcomeHighlight: { value: '100%', label: 'Control', description: 'Optimized scan speed to ensure zero overlooked breaches.', icon: 'BarChart3' },
    caseStudy: caseStudyCaesar,
  },

  'ffp-dashboard': {
    id: '7',
    slug: 'ffp-dashboard',
    title: 'FFP Dashboard',
    subtitle: 'Expert Diagnostic Workflow.',
    oneLiner: 'Reshaping diagnostics from symptom-first triage to root cause synthesis.',
    category: 'Enterprise',
    year: '2024',
    moodImageUrl: getPreviewImage('ffp-dashboard'),
    galleryUrls: getGallery('ffp-dashboard'),
    roles: ['UX/UI Designer'],
    problem:
      'Experts were forced to context-hop between isolated data silos, hindering automotive diagnostics. I was brought in after six months of fragmented meetings to untangle the messy information architecture and user flows.',
    solution:
      'I gathered all ideas and structured them into a cohesive architectural flow. I abstracted elements into reusable modular components and mapped out complex workflows (e.g., holiday entry, overtime exit).',
    description:
      "Reshaped automotive diagnostics from symptom-first triage to root-cause synthesis. I created a unified high-fidelity prototype that perfectly aligns the UI with the experts' mental model, providing a true investigative story for the users.",
    tags: ['enterprise', 'diagnostics'],
    outcomeHighlight: { value: '1', label: 'Story', description: "Aligned the diagnostic UI with the expert's mental model.", icon: 'MousePointerClick' },
    portfolioKit: ffpKit,
    caseStudy: { summary: 'Investigative UI for automotive diagnostics.' },
  },

  '8020-portfolio': {
    id: '16',
    slug: '8020-portfolio',
    title: '8020 Showreel 2025',
    subtitle: '60/40 Logic vs. Creative.',
    oneLiner: 'Leading teams to deliver digital products for AUDI and VW with a hybrid design workflow.',
    category: 'Motion',
    year: '2025',
    client: '8020 Consulting',
    moodImageUrl: getPreviewImage('8020-portfolio'),
    galleryUrls: getGallery('8020-portfolio'),
    youtubeUrl: 'https://www.youtube.com/embed/K7JhmqWGiZw',
    roles: ['Lead UX/UI Designer', 'Scrum Master'],
    problem: 'Corporate design often lacks soul; creative work often lacks process.',
    solution: 'Balanced a 60% logic and 40% creative workflow to ship homologation MVPs.',
    description:
      "A showcase of hybrid design leadership for the VW Group. This showreel highlights how we led teams to deliver polished digital products and homologation MVPs for AUDI and VW, proving that corporate design doesn't have to lack soul, and creative work doesn't have to lack process (a balanced 60% logic / 40% creative workflow).",
    outcomeHighlight: { value: 'MVP', label: 'Shipped', description: 'Balanced strict process with premium visual standards.', icon: 'Layout' },
    caseStudy: { summary: 'Hybrid design leadership for the VW Group.' },
  },

  '3dprojects': {
    id: '13',
    slug: '3dprojects',
    title: '3D Portfolio',
    subtitle: 'Recent 3D projects and event animations.',
    oneLiner: 'An excerpt of recent 3D and AI animations for events and music labels like Kontrast Festival.',
    category: 'Motion',
    year: '2021 - 2025',
    moodImageUrl: getPreviewImage('3dprojects'),
    galleryUrls: getGallery('3dprojects'),
    youtubeUrl: 'https://www.youtube.com/embed/7U_PO2WGqFw',
    roles: ['3D Artist', 'Motion Designer'],
    roleLine: '3D Animations and AI animations.',
    context: 'Immersive visual storytelling for the electronic music scene and festivals.',
    problem: 'Standing out in the high-energy environment of music festivals requires bold, abstract, and rhythmic visual loops.',
    solution: 'Combined traditional 3D modeling with AI-driven animation workflows to create distinct visual identities for artists and stages.',
    description:
      'An immersive collection of recent 3D projects, event animations, and AI-driven workflows. This portfolio spans pictures, tutorials, campaigns, marketing assets, and Instagram edits tailored for the electronic music scene and festivals. By combining 3D modeling with AI, I created bold, rhythmic visual loops that stand out in a competitive industry.',
    outcomes: ['Delivered 3D and AI animations for music labels.', 'Created core visual assets for Kontrast Festival stages.'],
    tags: ['3d', 'motion', 'ai', 'events'],
    impactCards: [{ label: 'Deliverables', value: '3D & AI' }, { label: 'Span', value: '2021-2025' }],
    outcomeHighlight: { value: '3D', label: 'Visuals', description: 'Crafted high-impact looping animations and AI-assisted visuals for major music events and labels.', icon: 'Sparkles' },
    caseStudy: { summary: '3D and AI motion design for the music industry.' },
  },

  'architektur-ai': {
    id: '17',
    slug: 'architektur-ai',
    title: 'Architecture + AI',
    subtitle: '3 Days down to 3 Hours.',
    oneLiner: 'Local AI workflow achieving a 24x speed increase in variant exploration.',
    category: 'Side',
    year: '2025',
    moodImageUrl: getPreviewImage('architektur-ai'),
    galleryUrls: getGallery('architektur-ai'),
    roles: ['3D Artist', 'AI Architect'],
    problem: 'Manual rework for textures takes days per variant, stalling exploration.',
    solution: 'Fusing rough 3D modeling with local AI style generation.',
    description:
      'Manual texture rework in architectural visualization traditionally takes days per variant. I designed and implemented a local AI workflow combining rough 3D modeling with AI-driven style generation. This innovative approach reduced processing time from 3 days to just 3 hours, achieving a massive 24x speed increase.',
    outcomeHighlight: { value: '24x', label: 'Speedup', description: 'Generated style variants in 3 hours that usually take 3 days.', icon: 'Zap' },
    caseStudy: caseStudyArch,
  },

  tracklistify: {
    id: '4',
    slug: 'tracklistify',
    title: 'Tracklistify Studio',
    subtitle: 'AI Set Analysis.',
    oneLiner: 'Turning raw audio sets into actionable track lists via AI extraction.',
    category: 'Side',
    year: '2026',
    moodImageUrl: getPreviewImage('tracklistify'),
    galleryUrls: getGallery('tracklistify'),
    roles: ['Indie Developer'],
    description:
      'An indie developer side-project focused on AI-driven DJ set analysis. Tracklistify Studio turns raw audio sets into actionable, accurate tracklists through advanced AI extraction, streamlining the workflow for music professionals.',
    prototypeIframeUrl:
      'http://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.acKavQ.jMiw-NeJlLSYQ3qts2fMWL7DDoo',
    outcomeHighlight: { value: 'AI', label: 'Analysis', description: 'Automated identification to streamline curation.', icon: 'Sparkles' },
    caseStudy: { summary: 'AI DJ set analysis.' },
  },

  fixundfertig: {
    id: '5',
    slug: 'fixundfertig',
    title: 'Fix und Fertig Invoicing',
    subtitle: 'Admin Automation.',
    oneLiner: 'Unifying receipts and invoices through local OCR extraction.',
    category: 'Side',
    year: '2026',
    moodImageUrl: getPreviewImage('fixundfertig'),
    galleryUrls: getGallery('fixundfertig'),
    roles: ['Developer'],
    description:
      'A personal admin automation tool developed to solve the headache of scattered receipts and invoices. By utilizing local OCR (Optical Character Recognition) extraction, the app unifies document intake and dramatically reduces manual data entry.',
    prototypeIframeUrl:
      'https://app.untitled-ux.de/share/read/eadba98795f9470d9c83faa722d4e72a',
    outcomeHighlight: { value: 'OCR', label: 'Intake', description: 'Ended manual receipt copying via custom engine.', icon: 'Scan' },
    caseStudy: { summary: 'Personal admin automation.' },
  },

  'samani-rebranding': {
    id: '19',
    slug: 'samani-rebranding',
    title: 'Samani Rebranding',
    subtitle: 'Foolproof Design Systems.',
    oneLiner: 'AE/Figma template system enabling non-designers to create professional content.',
    category: 'Branding',
    year: '2020',
    moodImageUrl: getPreviewImage('samani-rebranding'),
    galleryUrls: getGallery('samani-rebranding'),
    youtubeUrl: 'https://www.youtube.com/embed/vw8GUemVEH8',
    description:
      'A foolproof design system and self-sustaining label identity. I created a comprehensive After Effects and Figma template system that empowers non-designers to produce high-quality, on-brand content consistently over three years.',
    outcomeHighlight: { value: '3yrs', label: 'Content', description: 'Enabled a beginner to produce professional release videos for years.', icon: 'Box' },
    caseStudy: { summary: 'Self-sustaining label identity.' },
  },

  'kontrast-festival': {
    id: '18',
    slug: 'kontrast-festival',
    title: 'Kontrast Festival',
    subtitle: 'Art Directing Chaos.',
    oneLiner: 'Led art and logistics for 3 years, managing real-time media shifts.',
    category: 'Branding',
    year: '2021 - 2024',
    moodImageUrl: getPreviewImage('kontrast-festival'),
    galleryUrls: getGallery('kontrast-festival'),
    youtubeUrl: 'https://www.youtube.com/embed/Ufrnt73JJDU',
    description:
      'As Co-Founder and Design Lead, I spearheaded the visual identity and logistics for the Kontrast Festival over three years. I art-directed the chaos, managing a creative team and external partners to ensure consistent, 360-degree brand execution across all digital and physical touchpoints.',
    outcomeHighlight: { value: '360°', label: 'Directed', description: 'Led 5 core creatives under real-time festival conditions.', icon: 'Users' },
    caseStudy: { summary: 'Creative leadership under pressure.' },
  },

  aidelsburger: {
    id: '15',
    slug: 'aidelsburger',
    title: 'Aidelsburger',
    subtitle: 'Scalable Brand Metaphor.',
    oneLiner: 'Transforming corporate typos into high-impact identity metaphors.',
    category: 'Branding',
    year: '2024',
    moodImageUrl: getPreviewImage('aidelsburger'),
    galleryUrls: getGallery('aidelsburger'),
    description:
      'A scalable brand metaphor for the industrial sector. This project transformed basic corporate typography into a high-impact, memorable identity metaphor, injecting modern branding practices into a traditional industry.',
    outcomeHighlight: { value: 'Meta', label: 'Phor', description: 'Replaced typographically limited logos with a soulful metaphor.', icon: 'Layout' },
    caseStudy: { summary: 'Industrial branding injection.' },
  },

  arbeitsprobe2022: {
    id: '14',
    slug: 'arbeitsprobe2022',
    title: 'Arbeitsprobe 2022',
    navTitle: 'Portfolio 2022',
    subtitle: 'Written Portfolio Archive.',
    oneLiner: 'A foundational written portfolio showcasing work from 2018 to 2022 across various design disciplines.',
    category: 'Archive',
    year: '2022',
    moodImageUrl: getPreviewImage('arbeitsprobe2022'),
    galleryUrls: getGallery('arbeitsprobe2022'),
    roles: ['Digital Designer'],
    context: 'A comprehensive collection of early work, including study projects, branding, and logos.',
    problem: 'Organizing diverse foundational work into a single written format to document early multidisciplinary growth.',
    solution: 'Built a structured written showcase highlighting versatility across web design and branding.',
    description:
      'A foundational written portfolio documenting four years (2018-2022) of multidisciplinary design studies, early branding projects, and logos. It structured diverse, early-career work into a cohesive narrative showcasing versatility.',
    outcomes: ['Successfully documented 4 years of multidisciplinary projects.'],
    tags: ['archive', 'design', 'written'],
    impactCards: [{ label: 'Format', value: 'Written' }, { label: 'Span', value: '2018-2022' }],
    outcomeHighlight: { value: '4yr', label: 'Archive', description: 'A deep-dive into the written documentation of projects that established my multidisciplinary design foundation.', icon: 'FolderKanban' },
    caseStudy: { summary: 'Written documentation of foundational design studies.' },
  },
};

export type PortfolioProject = (Project & {
  impactCards?: { label: string; value: string }[];
  caseStudy?: CaseStudySections;
  portfolioKit?: PortfolioKitData;
  kovon?: KovonConfig;
  youtubeUrl?: string;
});

type PortfolioIndex = Record<string, PortfolioProject>;

const portfolioIndex: PortfolioIndex = portfolio as unknown as PortfolioIndex;

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return portfolioIndex[slug] ?? null;
}

export function getAllProjects(): PortfolioProject[] {
  return Object.values(portfolioIndex);
}

export function getCaseStudySections(slug: string): CaseStudySections | null {
  return portfolioIndex[slug]?.caseStudy ?? null;
}

export function getPortfolioKit(slug: string): PortfolioKitData | null {
  return portfolioIndex[slug]?.portfolioKit ?? null;
}

export function getKovonConfig(): KovonConfig | null {
  return portfolioIndex['kovon']?.kovon ?? null;
}

export function getTechnicalSpecs(slug: string): TechnicalSpecItem[] {
  return portfolioIndex[slug]?.portfolioKit?.technicalSpecs ?? [];
}

/** Added back for existing components */
export function getBentoCards(slug: string): BentoCardItem[] {
  return getPortfolioKit(slug)?.bentoCards ?? [];
}

/** Added back for existing components */
export function getKovonFeaturedCaseConfig() {
  return getKovonConfig()?.featuredCase ?? null;
}
