/**
 * Side / creative / branding / web / motion projects — src/content/portfolio-creative.ts
 * Phase 3 refactoring: extracted from portfolio.ts
 * Projects: 8020-portfolio, 3dprojects, architektur-ai, tracklistify, fixundfertig,
 *   job-hunter, samani-rebranding, kontrast-festival, deinespanndecke, aidelsburger, arbeitsprobe2022
 *
 * Taxonomy (plan §2.1, handoff 2026-06-04):
 *   8020-portfolio                                  → 'Strategy & Process'
 *   3dprojects                                      → 'Motion & 3D'
 *   architektur-ai, tracklistify, fixundfertig,
 *     job-hunter                                    → 'Product Design'
 *   samani-rebranding, kontrast-festival,
 *     aidelsburger                                  → 'Visual & Branding'
 *   deinespanndecke                                 → 'Web & CMS'
 *   arbeitsprobe2022                                → 'Archive'
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

const caseStudyJobHunter = {
  summary:
    'Built a fully autonomous AI agent that scrapes job postings, scores them by fit, and generates personalized application packages — all controlled via Telegram.',
  contextWhyMattered:
    'Job hunting is notoriously time-intensive. Modern application portals (ATS) rarely expose end-to-end automation via email or API. Customizing CVs, writing cover letters, and manually uploading documents for each role creates a repetitive administrative bottleneck that drains energy better spent on actual work.',
  realProblem:
    'Before this system, every application required 2+ hours of manual work: scanning job boards, copy-pasting requirements into a terminal script to patch LaTeX templates, adjusting bullet points, rewriting cover letters, and rendering PDFs. The process was fragile, error-prone, and fundamentally unscalable — applying to more than a handful of positions per week was impractical.',
  constraints:
    'Corporate ATS platforms (Stepstone, LinkedIn Easy Apply, company career portals) do not offer open APIs for submitting applications. 100% end-to-end automation is blocked by design. The system had to operate within this reality: automate everything upstream of the final manual upload.',
  myRole:
    'Sole architect and developer across the entire stack: Python bot framework (aiogram), LLM integration (OpenAI / Anthropic), job scraping pipeline (Jobspy), LaTeX rendering (Tectonic), SQLite persistence, Telegram UX.',
  approach:
    '1) Built a Telegram bot as the control plane — no heavy web app, just inline keyboards and 1-click approvals for speed. 2) Integrated Jobspy to scrape Stepstone, LinkedIn, and other boards. 3) Created a two-stage scoring pipeline: keyword match filter (score 0–10) followed by LLM-based semantic evaluation. 4) Maintained a pool of 43 competence bullets covering every conceivable project/tech/domain; the system dynamically selects the 8–12 most relevant ones per role. 5) An LLM writes the cover letter, auto-detecting the posting language (DE/EN) and matching tone. 6) A Tectonic LaTeX pipeline renders the final personalized CV + cover letter as a single polished PDF.',
  solutionConcept:
    'A Python-based autonomous agent, controlled via Telegram messenger. The user issues a single command (/apply) and receives curated, scored opportunities. One tap triggers the full generation pipeline. Within minutes, a perfectly tailored PDF lands back in the Telegram chat — ready for manual upload.',
  outcome:
    'Time-to-Apply dropped from 2 hours to under 20 minutes per position. Average weekly savings: 8 hours of repetitive work. At full throughput, the system generates 4+ highly personalized applications per week. Quality benchmarks at 90–95% of a painstakingly manual application, delivered in a fraction of the time.',
  whatILearned:
    'Chasing 100% automation is a trap when the platform layer doesn\'t cooperate. The real leverage is at the boundary: automate the hard parts (search, evaluation, generation), and accept the last mile of manual upload as a tax you happily pay. The product mindset — optimize for throughput and quality per unit effort — beats perfectionism every time.',
  insightAuthor: 'Daniel Peters',
  whatToShowVisually:
    'System architecture diagram; Telegram chat screenshots showing the /apply flow; a comparison of old vs. new time-to-apply.',
};

const TOKEN = 'eyJtb2RlIjoicmVhZF9vbmx5IiwiY3JlYXRlZF9ieV91c2VyX2lkIjoiNWRjZGUxYzQtMzNiZC00MDUwLTljN2QtZTM5ZTllYmZiZjllIn0.acKavQ.jMiw-NeJlLSYQ3qts2fMWL7DDoo';

export const portfolioCreative: PortfolioSource = {
  '8020-portfolio': {
    id: '16',
    slug: '8020-portfolio',
    title: '8020 Showreel 2025',
    subtitle: 'The 60/40 Hybrid Design Workflow.',
    oneLiner: 'Three years of hybrid design leadership at an automotive management consultancy — UX/UI delivery, motion output, sprint ceremonies.',
    category: 'Strategy & Process',
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
    subtitle: '3D and AI animation for music events and labels.',
    oneLiner: 'Kontrast Festival stages, label visuals, music campaigns — animated in 3D and AI pipelines.',
    category: 'Motion & 3D',
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
    subtitle: 'AI-Accelerated Architectural Visualization.',
    oneLiner:
      'Local ComfyUI + 3D pipeline: cut arch-viz variant turnaround from 3 days to 3 hours per variant.',
    category: 'Product Design',
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
    subtitle: 'AI tracklist extraction for DJ sets.',
    oneLiner: 'Indie tool: AI audio analysis turns raw DJ sets from SoundCloud and YouTube into structured tracklists.',
    category: 'Product Design',
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
    accountRequestEndpoint: '/api/request-access/tracklistify',
    caseStudy: { summary: 'AI DJ set analysis.' },
  },

  fixundfertig: {
    id: '5',
    slug: 'fixundfertig',
    title: 'Fix und Fertig Invoicing',
    subtitle: 'Personal admin tool: local OCR for receipts and invoices.',
    oneLiner: 'Local OCR pipeline that replaced ~2 hours/week of manual receipt copying with a single review queue.',
    category: 'Product Design',
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

  'job-hunter': {
    id: '23',
    slug: 'job-hunter',
    title: 'Job Hunter',
    subtitle: 'Autonomous Application Agent.',
    oneLiner: 'Built a fully autonomous AI agent that scrapes job postings, scores them by fit, and generates personalized application packages — all controlled via Telegram.',
    category: 'Product Design',
    year: '2026',
    moodImageUrl: getPreviewImage('job-hunter'),
    galleryUrls: getGallery('job-hunter'),
    roles: ['AI Workflow Architect', 'Solo Developer'],
    teamSize: 'Solo',
    ribbonLabel: 'AI Automation',
    problem:
      'Job hunting is notoriously time-intensive. Modern ATS portals rarely expose APIs for end-to-end automation. Customizing CVs, rewriting cover letters, and manually rendering LaTeX PDFs for each application creates a repetitive bottleneck that makes scaling beyond a handful of applications per week impractical.',
    solution:
      'Built an autonomous Telegram-controlled agent that scrapes jobs (Jobspy), scores them by keyword fit (0–10), dynamically selects 8–12 of 43 competence bullets, and uses an LLM to write a language-aware cover letter. A Tectonic LaTeX pipeline renders the final personalized PDF. User reviews and approves via 1-click Telegram interactions.',
    description:
      'A Python-based autonomous application agent that eliminates the terminal-CDE grind of manual job applications. The bot handles the entire heavy-lifting pipeline — scraping, scoring, bullet selection, cover letter generation, and PDF rendering — while the user retains a lightweight manual upload step where ATS platforms close the loop. The result: time-to-apply dropped from 2 hours to under 20 minutes.',
    outcomes: [
      'Time-to-apply collapsed from ~2 hours to ≤20 minutes per position.',
      'Average 8 hours of repetitive work saved per week.',
      'Throughput of 4+ highly personalized applications per week.',
      'Quality at 90–95% of a fully manual application — at a fraction of the time cost.',
    ],
    tags: ['ai', 'automation', 'python', 'telegram', 'llm', 'latex', 'job-hunting'],
    processDiagramUrl: '/projects/job-hunter_architecture.jpg',
    processDiagramLabel: 'System Architecture',
    impactCards: [
      { label: 'Time-to-Apply', value: '≤20 min' },
      { label: 'Saved / Week', value: '8 h' },
      { label: 'Output / Week', value: '4+' },
    ],
    outcomeHighlight: {
      value: '≤20 min',
      label: 'Per Application',
      description: 'From 2 hours of manual terminal-CDE work to a Telegram 1-click approval flow.',
      icon: 'Zap',
    },
    caseStudy: caseStudyJobHunter,
    portfolioKit: {
      technicalSpecs: [
        { title: 'Bot Framework', body: 'aiogram (Python) — lightweight async Telegram bot with inline keyboard UX for 1-click approvals.' },
        { title: 'Job Scraping', body: 'Jobspy — unified scraping layer for Stepstone, LinkedIn, and other boards.' },
        { title: 'LLM Integration', body: 'OpenAI / Anthropic API — two-stage scoring (keyword + semantic) and language-aware cover letter generation.' },
        { title: 'Competence Pool', body: '43 curated bullet points covering projects, technologies, and domain expertise; dynamic 8–12 selection per role.' },
        { title: 'PDF Rendering', body: 'Tectonic (modern LaTeX engine) — fully automated CV + cover letter generation as polished PDF.' },
        { title: 'Persistence', body: 'SQLite — lightweight session state, scoring history, and generation cache.' },
        { title: 'Control Plane', body: 'Telegram Messenger — no web app, no dashboard; just inline keyboards and direct message commands.' },
      ],
      processSteps: [
        { number: '1', title: 'Scrape', desc: 'Jobspy searches Stepstone, LinkedIn, and career portals for matching roles.', icon: 'ClipboardList' },
        { number: '2', title: 'Score', desc: 'Two-stage pipeline: keyword filter (0–10) followed by LLM semantic evaluation.', icon: 'Zap' },
        { number: '3', title: 'Select', desc: 'System picks 8–12 of 43 competence bullets most relevant to the role.', icon: 'Sparkles' },
        { number: '4', title: 'Generate', desc: 'LLM writes cover letter with auto-detected language (DE/EN) and tone match.', icon: 'Workflow' },
        { number: '5', title: 'Render', desc: 'Tectonic LaTeX pipeline produces a polished, personalized PDF.', icon: 'Layout' },
        { number: '6', title: 'Approve', desc: 'User receives PDF in Telegram, reviews, and manually uploads to ATS portal.', icon: 'Server' },
      ],
      insightAuthor: 'Daniel Peters',
    },
  },

  'samani-rebranding': {
    id: '19',
    slug: 'samani-rebranding',
    title: 'Samani Rebranding',
    subtitle: 'AE/Figma template system for a music label.',
    oneLiner: 'After Effects + Figma template system that let non-designers produce on-brand releases for three years without me in the loop.',
    category: 'Visual & Branding',
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
    subtitle: 'Co-Founder & Design Lead for three years — identity, stage, ops.',
    oneLiner: 'Co-founded a regional cultural festival, scaled it to 3,000 attendees and ~200k EUR annual revenue, owned the full visual identity and ops.',
    category: 'Visual & Branding',
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
    subtitle: 'WordPress rebuild, local SEO, Google Ads — Rank 2 for \'Spanndecken Augsburg\'.',
    oneLiner:
      'End-to-end: refined logo and visual line, new WordPress marketing site with SEO-focused structure and copy, then Google Search and landing pages—hero Augsburg URL ~3.6% CTR, ~€1.37 campaign CPC, ~€570 spend in a measured window; qualified leads ~€100 vs. multi-thousand-euro jobs.',
    category: 'Web & CMS',
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
    subtitle: 'Industrial identity refresh: metaphor over typo.',
    oneLiner: 'Industrial brand identity: turned a typo into a metaphor, with guidelines for web and print.',
    category: 'Visual & Branding',
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
    subtitle: 'Foundational Design Archive.',
    oneLiner: 'Written portfolio documenting four years (2018–2022) of multidisciplinary design work — study projects, branding, and logos.',
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