/**
 * Non-Enterprise projects — src/content/portfolio-creative.ts
 * Phase 3 refactoring: extracted from portfolio.ts
 * Projects: 8020-portfolio, 3dprojects, architektur-ai, tracklistify, fixundfertig,
 *   samani-rebranding, kontrast-festival, deinespanndecke, aidelsburger, arbeitsprobe2022
 * #schema:
 * {
 *   type: "data",
 *   module: "portfolio-creative.ts"
 * }
 */
import type { PortfolioSource } from './portfolio.types';
import { getGallery, getPreviewImage } from './portfolio-utils';

const caseStudyArchViz = {
  summary: 'Local AI workflow cutting architectural visualization variant time from days to hours.',
  realProblem:
    'Manual texture rework in architectural visualization traditionally takes days per variant, blocking fast iteration on look-and-feel.',
  approach:
    'Designed and implemented a local pipeline that pairs rough 3D modeling with AI-driven style generation so variants can be explored without full manual repaint.',
  solutionConcept:
    'Reduced processing time from about 3 days to about 3 hours per variant—roughly a 24× speed increase—while keeping the workflow on local tooling.',
};

const TOKEN = 'eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.acKavQ.jMiw-NeJlLSYQ3qts2fMWL7DDoo';

export const portfolioCreative: PortfolioSource = {
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
    category: 'Side',
    year: '2025',
    moodImageUrl: getGallery('architektur-ai')[0],
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
    links: [{ label: 'Live demo', href: `https://tracklistify.untitled-ux.de/?ro=${TOKEN}` }],
    prototypeIframeUrl: `https://tracklistify.untitled-ux.de/?ro=${TOKEN}`,
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

  'deinespanndecke': {
    id: '20',
    slug: 'deinespanndecke',
    title: 'DeineSpanndecke',
    navTitle: 'DeineSpanndecke',
    subtitle: 'Web plus rebrand, WordPress & local SEO.',
    oneLiner:
      'End-to-end: refined logo and visual line, new WordPress marketing site with SEO-focused structure and copy, then Google Search and landing pages—hero Augsburg URL ~3.6% CTR, ~€1.37 campaign CPC, ~€570 spend in a measured window; qualified leads ~€100 vs. multi-thousand-euro jobs.',
    category: 'Web',
    year: '2024 – 2025',
    client: 'Akustik Licht und Spanndecken GmbH (DeineSpanndecke), Augsburg',
    moodImageUrl: getPreviewImage('deinespanndecke'),
    galleryUrls: getGallery('deinespanndecke'),
    roles: ['UX/UI Designer', 'Brand Designer', 'Web'],
    context:
      'Delivered end-to-end as untitled-ux freelance: identity touch-up, WordPress build, on-site SEO, conversational funneling, and paid acquisition—brand and growth in one engagement.',
    problem:
      'A long-standing TÜV-certified stretch-ceiling specialist needed a credible digital presence that matched in-person quality—better discovery in Augsburg, clearer positioning for private and commercial clients, and a reliable path from interest to qualified contact.',
    solution:
      'Refined the wordmark and brand applications for a cohesive line across web and print, rebuilt the site on WordPress with clearer IA and conversion paths, tightened on-page SEO and local landing pages for high-intent queries, added a Typebot-led qualification step, and ran structured Google Search campaigns with dedicated LPs.',
    description:
      'This project combined brand and performance: a refreshed logo and consistent visual language so digital and physical touchpoints read as one premium trade brand; a full WordPress relaunch with responsive layouts, service- and city-focused pages, and faster routes to contact; and deliberate SEO work—titles, headings, internal linking, and content aimed at "Spanndecken Augsburg" and related services—lifting the site to page one (peak around #2). On top of that foundation, Google Search ads and tailored landing URLs (#pricing, room services, contact) drove measurable demand: in a tracked window, about 414 clicks on ~6.9k impressions (~6% campaign CTR, ~€1.37 average CPC, ~€567 cost), with the primary /spanndecken-fachbetrieb-augsburg/ URL carrying most volume (~328 clicks, ~3.59% CTR, ~€447 cost). Qualified installation leads land around ~€100 acquisition cost in practice—still a strong ratio to typical project quotes in the roughly €2,000–€5,000+ range. Typebot helps structure inquiries before handoff to the team.',
    outcomes: [
      'Logo and brand line aligned for web, ads, and on-site materials.',
      'WordPress relaunch: clearer structure, service pages, and conversion-focused UX.',
      'Local SEO: page-one visibility for core "Spanndecken Augsburg" queries (peak ~#2).',
      'Google Ads (~€567 spend, sample period): ~€1.37 avg CPC; hero Augsburg LP ~3.59% CTR from ~9.1k impressions.',
      'Economics: ~€100 cost per qualified lead vs. multi-thousand-euro average job value.',
      'Typebot funnel to qualify and route leads before human follow-up.',
    ],
    tags: ['web', 'google ads', 'seo', 'wordpress', 'rebranding', 'branding', 'typebot', 'local seo'],
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
      summary: 'Web case built on a logo refresh, WordPress site, SEO, and Google Ads—with strong Augsburg LP metrics and workable CPL vs. job size.',
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

  'arbeitsprobe2022': {
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