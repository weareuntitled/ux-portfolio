import type {
  PortfolioSource,
  Project,
  CaseStudySections,
  PortfolioKitData,
  BentoCardItem,
  TechnicalSpecItem,
  KovonConfig,
} from './portfolio.types';
import { resolveProjectAssetUrl } from '@/lib/project-assets';

// 1. IMPORT DER GALLERY-MAP (Generated via scripts/update-gallery.mjs)
import galleryMapRaw from './gallery-map.json';

// ✅ strict type (no any)
type GalleryMap = Record<string, string[]>;

const galleryMap: GalleryMap = galleryMapRaw as unknown as GalleryMap;

// 2. HELPERS: Automated Image Management
export const getGallery = (slug: string): string[] =>
  (galleryMap[slug.toLowerCase()] ?? []).map((path) => resolveProjectAssetUrl(path));

export const getPreviewImage = (slug: string): string | null => {
  const images = getGallery(slug);
  return (
    images.find((img) => img.toLowerCase().includes('hero')) ??
    images.find((img) => img.toLowerCase().includes('gallery_01')) ??
    images[0] ??
    null
  );
};

/** Same cover as project detail hero: preview image, else first gallery asset. */
export function getProjectCoverImage(project: {
  moodImageUrl?: string | null;
  galleryUrls?: string[];
}): string | null {
  return project.moodImageUrl ?? project.galleryUrls?.[0] ?? null;
}

const caseStudyKovon: CaseStudySections = {
  summary: 'Ending audit-panic through digitized compliance tracking.',
  realProblem: "Data was split across isolated Excels; the team didn't know what was done as a critical audit deadline approached.",
  approach: 'I moved the team from "Task Force Mode" into an agile workflow that prioritized transparency over manual file-hunting.',
  solutionConcept: 'A central hub that maps regulations to work packages, ensuring audit-readiness at all times.',
};

const caseStudyAutomation: CaseStudySections = {
  summary: 'Stopping "Malicious Overwrites" in enterprise SAP environments.',
  realProblem:
    'Platform-wide updates were falsely overwriting locally validated data, forcing experts into weeks of manual rework.',
  approach: 'Mapped failure patterns and defined a safe SAP routine to block inheritance for irrelevant parts.',
  solutionConcept: 'A click-by-click PDD that ensures implementation stays safe and permanent for SAP administrators.',
};

const caseStudyCaesar: CaseStudySections = {
  summary: 'Readable outliers and adjustable thresholds for emission experts.',
  realProblem: 'Table clutter buried anomalies. Threshold logic was not adjustable, making interpretation slow and unreliable.',
  approach: 'Analyzed table patterns and tested visual encodings for breaches to design high-speed scanning.',
  solutionConcept: 'A strict table hierarchy paired with a flexible settings concept for measurement values.',
};

const caseStudyStrategicAi: CaseStudySections = {
  summary: 'Strategic AI advisory: POC to hybrid RAG, automation, and ROI-validated handover.',
  realProblem:
    'Consulted on transforming an isolated AI Proof of Concept into a production-ready direction for 500+ processes. Ran the full consulting cycle: use-case identification, prioritization, strategic conceptualization, and ROI validation.',
  approach:
    'Prioritized high-impact AI use cases across 500+ departments—moving from experimental pilots to business-critical automation. Designed the pivot from a fragile “Master Excel” to a Hybrid RAG stack: semantic vector search plus a structured metadata/taxonomy layer for dependable logic (e.g. process successors and responsibilities). Conceptualized an automated ETL via Power Automate to ingest and vectorize new PDFs weekly so the knowledge hub stays current without manual upkeep. Calculated strategic ROI (development vs. schooling hours) and delivered the blueprint for internal implementation.',
  solutionConcept:
    'A validated, scalable architecture with MS Copilot as the primary interface—avoiding custom UI spend and supporting high adoption.',
};

const caseStudyArchViz: CaseStudySections = {
  summary: 'Local AI workflow cutting architectural visualization variant time from days to hours.',
  realProblem:
    'Manual texture rework in architectural visualization traditionally takes days per variant, blocking fast iteration on look-and-feel.',
  approach:
    'Designed and implemented a local pipeline that pairs rough 3D modeling with AI-driven style generation so variants can be explored without full manual repaint.',
  solutionConcept:
    'Reduced processing time from about 3 days to about 3 hours per variant—roughly a 24× speed increase—while keeping the workflow on local tooling.',
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
    client: 'Automotive (Group)',
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
    client: 'Automotive (Group)',
    moodImageUrl: getPreviewImage('automation'),
    galleryUrls: getGallery('automation'),
    roles: ['Automation Manager', 'Process Analyst'],
    problem:
      '"Malicious Overwrites". Over-secure, legacy SAP automations from the 2000s were destroying validated local data during OEM platform updates. Fixing these errors forced 10 experts to spend 2 hours each per week (eating up 60-70% of their workweek just fixing bugs).',
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
    outcomeHighlight: {
      value: 'PDD',
      label: 'Safe',
      description: 'Stopped data destruction in the OEM platform inheritance tree.',
      icon: 'Zap',
    },
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
    outcomes: ['Faster anomaly detection in dense regulatory tables.', 'Adjustable thresholds returned interpretive control to experts.'],
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
    outcomes: ['Consolidated six months of fragmented input into one coherent flow.', 'Reusable modular patterns for holidays, overtime, and diagnostic workflows.'],
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
    oneLiner: 'Leading teams to deliver digital products for enterprise OEM stakeholders with a hybrid design workflow.',
    category: 'Motion',
    year: '2025',
    client: '8020 Consulting',
    moodImageUrl: getPreviewImage('8020-portfolio'),
    galleryUrls: getGallery('8020-portfolio'),
    youtubeUrl: 'https://www.youtube.com/embed/7U_PO2WGqFw',
    roles: ['Lead UX/UI Designer', 'Scrum Master'],
    problem: 'Corporate design often lacks soul; creative work often lacks process.',
    solution: 'Balanced a 60% logic and 40% creative workflow to ship homologation MVPs.',
    description:
      "A showcase of hybrid design leadership for a major automotive group. This showreel highlights how we led teams to deliver polished digital products and homologation MVPs for enterprise OEM stakeholders, proving that corporate design doesn't have to lack soul, and creative work doesn't have to lack process (a balanced 60% logic / 40% creative workflow).",
    outcomes: [
      'Delivered homologation-ready MVPs with OEM group stakeholders.',
      'Scaled a repeatable 60/40 logic–creative workflow across product teams.',
    ],
    tags: ['motion', 'leadership', 'automotive'],
    outcomeHighlight: { value: 'MVP', label: 'Shipped', description: 'Balanced strict process with premium visual standards.', icon: 'Layout' },
    caseStudy: { summary: 'Hybrid design leadership for a major automotive group.' },
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
    youtubeUrl: 'https://www.youtube.com/embed/K7JhmqWGiZw',
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
    navTitle: 'Architecture + AI',
    subtitle: 'Local AI–accelerated arch-viz workflow.',
    oneLiner:
      'Rough 3D plus AI-driven style generation in a local pipeline—cutting variant turnaround from days to hours.',
    category: 'Enterprise',
    year: '2025',
    moodImageUrl: getPreviewImage('architektur-ai'),
    galleryUrls: getGallery('architektur-ai'),
    roles: ['Designer', '3D Generalist'],
    problem:
      'Manual texture rework in architectural visualization traditionally takes days per variant, which slows exploration of different moods and client directions.',
    solution:
      'Designed and implemented a local AI workflow that combines rough 3D modeling with AI-driven style generation so variants can be produced without full manual rework each time.',
    description:
      'Manual texture rework in architectural visualization traditionally takes days per variant. I designed and implemented a local AI workflow combining rough 3D modeling with AI-driven style generation. This innovative approach reduced processing time from 3 days to just 3 hours, achieving a massive 24x speed increase.',
    outcomes: [
      'Cut typical variant turnaround from about 3 days to about 3 hours (~24× faster).',
      'Established a repeatable local pipeline for 3D bases plus generative style passes.',
    ],
    tags: ['ai', '3d', 'arch-viz', 'workflow', 'automation'],
    outcomeHighlight: {
      value: '24×',
      label: 'Faster',
      description: 'From three days of manual texture work to about three hours with the local AI-assisted workflow.',
      icon: 'Zap',
    },
    caseStudy: caseStudyArchViz,
  },

  'strategic-ai-consulting': {
    id: '21',
    slug: 'strategic-ai-consulting',
    title: 'Strategic AI Advisory',
    navTitle: 'Strategic AI',
    subtitle: 'From POC to Automated Architecture & ROI.',
    oneLiner:
      'End-to-end AI strategy consulting for 500+ processes: prioritization, hybrid RAG architecture, Power Automate ingestion, ROI validation, and Copilot as the primary interface.',
    category: 'Enterprise',
    year: '2025',
    moodImageUrl: resolveProjectAssetUrl('/projects/architektur-ai_hero.jpg'),
    galleryUrls: getGallery('strategic-ai-consulting'),
    processDiagramUrl: resolveProjectAssetUrl('/projects/architektur-ai_gallery_08_process.png'),
    processDiagramLabel: 'AI-assisted knowledge assistant — process architecture (summary)',
    roles: ['AI Strategy Consultant'],
    problem:
      'An isolated AI Proof of Concept had to become a production-ready direction for 500+ processes. The mission was to run the full consulting arc—use-case identification, prioritization, strategic conceptualization, and ROI validation—so the program could scale beyond experiments without betting on costly custom UI.',
    solution:
      'Evaluated and prioritized high-impact AI use cases across 500+ departments, shifting the narrative from “experimental” AI to business-critical automation. Designed the technical pivot from a fragile “Master Excel” to a Hybrid RAG architecture: semantic vector search combined with a structured metadata/taxonomy layer so logic stays accurate (e.g. process successors and responsibilities). Conceptualized an automated ETL pipeline via Power Automate to ingest and vectorize new PDFs weekly, keeping the knowledge hub current without manual intervention. Calculated strategic ROI (development vs. schooling hours) and handed over a final blueprint to internal teams for implementation.',
    description:
      'Delivered strategic AI advisory from POC to a validated, scalable architecture. MS Copilot serves as the primary user interface—eliminating custom UI costs while targeting high adoption. The hybrid RAG and automation design address accuracy, freshness, and operability at enterprise scale; ROI framing and handover positioned internal owners to execute.',
    outcomes: [
      'Prioritized AI use cases across 500+ departments toward business-critical automation.',
      'Hybrid RAG: vectors plus metadata/taxonomy for dependable process logic.',
      'Weekly PDF ingestion and vectorization via Power Automate—minimal manual upkeep.',
      'ROI validated (development vs. schooling); blueprint delivered for internal build-out.',
      'Copilot-first interface: scalable adoption without a custom UI program.',
    ],
    tags: ['ai', 'rag', 'enterprise', 'consulting', 'microsoft', 'copilot', 'power-automate'],
    outcomeHighlight: {
      value: 'Hybrid RAG',
      label: 'Architecture',
      description: 'Semantic search plus taxonomy for accurate logic; automated pipeline to keep knowledge current.',
      icon: 'Sparkles',
    },
    caseStudy: caseStudyStrategicAi,
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
    problem:
      'DJs and curators often work from long recordings where track IDs are unclear; manual tracklisting is slow and error-prone.',
    solution:
      'Built an AI-assisted pipeline that ingests raw sets and proposes structured track lists editors can verify and export.',
    description:
      'An indie developer side-project focused on AI-driven DJ set analysis. Tracklistify Studio turns raw audio sets into actionable, accurate tracklists through advanced AI extraction, streamlining the workflow for music professionals.',
    outcomes: ['Reduced manual listening loops for set documentation.', 'Prototype validates extraction quality on real-world recordings.'],
    tags: ['ai', 'audio', 'side-project'],
    links: [
      {
        label: 'Live demo',
        href: 'https://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.acKavQ.jMiw-NeJlLSYQ3qts2fMWL7DDoo',
      },
    ],
    prototypeIframeUrl:
      'https://tracklistify.untitled-ux.de/?ro=eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.acKavQ.jMiw-NeJlLSYQ3qts2fMWL7DDoo',
    prototypeButtonLabel: 'Open Tracklistify',
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
    problem:
      'Receipts and invoices lived across email, scans, and folders, forcing repetitive manual copying into bookkeeping tools.',
    solution:
      'Shipped a local-first intake flow with OCR so documents normalize into one structured pipeline before export.',
    description:
      'A personal admin automation tool developed to solve the headache of scattered receipts and invoices. By utilizing local OCR (Optical Character Recognition) extraction, the app unifies document intake and dramatically reduces manual data entry.',
    outcomes: ['Unified scattered document sources into one review queue.', 'Cut repetitive typing for recurring invoice fields.'],
    tags: ['automation', 'ocr', 'side-project'],
    links: [{ label: 'Live demo', href: 'https://app.untitled-ux.de/share/read/eadba98795f9470d9c83faa722d4e72a' }],
    prototypeIframeUrl: 'https://app.untitled-ux.de/share/read/eadba98795f9470d9c83faa722d4e72a',
    prototypeButtonLabel: 'Open Fix und Fertig',
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
    roles: ['Brand Designer', 'Motion Designer'],
    problem:
      'A growing label needed release visuals and motion without hiring a designer for every drop.',
    solution:
      'Packaged typography, layout, and motion into After Effects and Figma templates non-designers could follow with guardrails.',
    description:
      'A foolproof design system and self-sustaining label identity. I created a comprehensive After Effects and Figma template system that empowers non-designers to produce high-quality, on-brand content consistently over three years.',
    outcomes: ['Enabled consistent release packaging for three years.', 'Reduced dependency on ad-hoc design firefighting.'],
    tags: ['branding', 'design-system', 'motion'],
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
    roles: ['Co-Founder', 'Design Lead'],
    problem:
      'A multi-day festival needs coherent identity, signage, and digital surfaces while schedules and artists shift in real time.',
    solution:
      'Built a flexible visual system and coordination rituals so the team could swap assets and partners without breaking the brand.',
    description:
      'As Co-Founder and Design Lead, I spearheaded the visual identity and logistics for the Kontrast Festival over three years. I art-directed the chaos, managing a creative team and external partners to ensure consistent, 360-degree brand execution across all digital and physical touchpoints.',
    outcomes: ['Scaled creative output across digital, print, and stage.', 'Kept brand continuity through three editions under live ops pressure.'],
    tags: ['branding', 'events', 'leadership'],
    outcomeHighlight: { value: '360°', label: 'Directed', description: 'Led 5 core creatives under real-time festival conditions.', icon: 'Users' },
    caseStudy: { summary: 'Creative leadership under pressure.' },
  },

  deinespanndecke: {
    id: '20',
    slug: 'deinespanndecke',
    title: 'DeineSpanndecke',
    navTitle: 'DeineSpanndecke',
    subtitle: 'Performance marketing plus rebrand, WordPress & local SEO.',
    oneLiner:
      'End-to-end: refined logo and visual line, new WordPress marketing site with SEO-focused structure and copy, then Google Search and landing pages—hero Augsburg URL ~3.6% CTR, ~€1.37 campaign CPC, ~€570 spend in a measured window; qualified leads ~€100 vs. multi-thousand-euro jobs.',
    category: 'Performance marketing',
    year: '2024 – 2025',
    client: 'Akustik Licht und Spanndecken GmbH (DeineSpanndecke), Augsburg',
    moodImageUrl: getPreviewImage('deinespanndecke'),
    galleryUrls: getGallery('deinespanndecke'),
    roles: ['UX/UI Designer', 'Brand Designer', 'Performance marketing'],
    context:
      'Delivered end-to-end as untitled-ux freelance: identity touch-up, WordPress build, on-site SEO, conversational funneling, and paid acquisition—brand and growth in one engagement.',
    problem:
      'A long-standing TÜV-certified stretch-ceiling specialist needed a credible digital presence that matched in-person quality—better discovery in Augsburg, clearer positioning for private and commercial clients, and a reliable path from interest to qualified contact.',
    solution:
      'Refined the wordmark and brand applications for a cohesive line across web and print, rebuilt the site on WordPress with clearer IA and conversion paths, tightened on-page SEO and local landing pages for high-intent queries, added a Typebot-led qualification step, and ran structured Google Search campaigns with dedicated LPs.',
    description:
      'This project combined brand and performance: a refreshed logo and consistent visual language so digital and physical touchpoints read as one premium trade brand; a full WordPress relaunch with responsive layouts, service- and city-focused pages, and faster routes to contact; and deliberate SEO work—titles, headings, internal linking, and content aimed at “Spanndecken Augsburg” and related services—lifting the site to page one (peak around #2). On top of that foundation, Google Search ads and tailored landing URLs (#pricing, room services, contact) drove measurable demand: in a tracked window, about 414 clicks on ~6.9k impressions (~6% campaign CTR, ~€1.37 average CPC, ~€567 cost), with the primary /spanndecken-fachbetrieb-augsburg/ URL carrying most volume (~328 clicks, ~3.59% CTR, ~€447 cost). Qualified installation leads land around ~€100 acquisition cost in practice—still a strong ratio to typical project quotes in the roughly €2,000–€5,000+ range. Typebot helps structure inquiries before handoff to the team.',
    outcomes: [
      'Logo and brand line aligned for web, ads, and on-site materials.',
      'WordPress relaunch: clearer structure, service pages, and conversion-focused UX.',
      'Local SEO: page-one visibility for core “Spanndecken Augsburg” queries (peak ~#2).',
      'Google Ads (~€567 spend, sample period): ~€1.37 avg CPC; hero Augsburg LP ~3.59% CTR from ~9.1k impressions.',
      'Economics: ~€100 cost per qualified lead vs. multi-thousand-euro average job value.',
      'Typebot funnel to qualify and route leads before human follow-up.',
    ],
    tags: [
      'performance marketing',
      'google ads',
      'seo',
      'wordpress',
      'rebranding',
      'branding',
      'typebot',
      'local seo',
    ],
    impactCards: [
      { label: 'Local SEO peak', value: '~#2' },
      { label: 'Hero LP CTR', value: '~3.6%' },
      { label: 'Avg. CPC', value: '~€1.37' },
    ],
    links: [{ label: 'Live demo', href: 'https://www.deinespanndecke.de/' }],
    prototypeButtonLabel: 'Visit live site',
    outcomeHighlight: {
      value: '~3.6%',
      label: 'Hero LP CTR',
      description: 'Augsburg specialist landing page in Google Ads; campaign ~€1.37 CPC and ~€570 spend in the same reporting window.',
      icon: 'BarChart3',
    },
    caseStudy: {
      summary:
        'Performance marketing case built on a logo refresh, WordPress site, SEO, and Google Ads—with strong Augsburg LP metrics and workable CPL vs. job size.',
    },
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
    roles: ['Brand Designer'],
    problem:
      'Industrial buyers saw the legacy wordmark as generic; the story behind the company name was invisible.',
    solution:
      'Reframed a known typo into a deliberate metaphor and built guidelines so the mark scales from digital to physical applications.',
    description:
      'A scalable brand metaphor for the industrial sector. This project transformed basic corporate typography into a high-impact, memorable identity metaphor, injecting modern branding practices into a traditional industry.',
    outcomes: ['Gave sales and marketing a memorable narrative beyond the old logotype.', 'Documented usage so partners could apply the system consistently.'],
    tags: ['branding', 'identity', 'industrial'],
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
