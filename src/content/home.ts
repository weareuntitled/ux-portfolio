/**
 * Single source of truth for Home and CV.
 * Daniel Peters — UX & Product Design Consultant (enterprise SaaS, automation, SAP).
 */

import type { BrandLogoId } from '@/lib/brand-logos';

/** Left-side identity block: one sentence + two lines (rest in About accordion) */
export const identityName = 'Daniel Peters';
/** Line 1 — hero / sidebar headline */
export const identityRolePrimary = 'UX & Product Design Consultant';
/** Line 2 — focus areas, credentials, availability (German tail intentional) */
export const identityRoleSecondary =
  'Enterprise SaaS · Workflow Automation · SAP | M.Sc. UX Design | Offen für Product Designer / UX Manager Positionen';
/** Compact sidebar: same as primary (detail below in Dashboard) */
export const identityRole = identityRolePrimary;
export const identitySubtitle = 'Enterprise SaaS · Workflow Automation · SAP';
export const identityOneSentence =
  'UX & Product Design Consultant for enterprise SaaS, workflow automation, and SAP. M.Sc. UX Design. Open to Product Designer and UX Manager roles.';
export const identityTwoLines =
  'Compliance workflows, enterprise dashboards, and automation systems.';
/** Dense intro for About accordion */
export const identitySupportLine =
  'Enterprise product design for compliance, verification, dashboards, and automation.';
export const identityContext =
  'Built in automotive and enterprise consulting contexts across UX, Scrum, and process automation.';

export const roleHeadline =
  'Daniel Peters · UX & Product Design Consultant · Enterprise SaaS · SAP · Automation';

/** Hero: H1 / H2 / Sub / Body (plan §3) */
export const heroHeadline = 'Daniel Peters';
export const heroH2 = identityRolePrimary;
export const heroSub = identitySubtitle;
export const heroBody =
  'I design enterprise products for regulated environments, reducing cognitive load and improving delivery speed.';
/** Micro line below hero CTAs */
export const heroCtaMicroLine = 'Scroll for projects and case studies.';

/** At a glance: compact experience for hero (company, role, date) */
export const heroExperienceCompact = [
  { company: 'Achtzig20 (8020)', role: 'Management Consultant', date: 'Since Feb 2024', prior: 'Junior Consultant Jul 2022 – Jan 2024' },
  { company: 'smartpatient', role: 'UX internship', date: 'Aug 2016 – Jan 2017' },
] as const;

/** At a glance: compact education for hero */
export const heroEducationCompact = [
  { degree: 'MSc UX Design', school: 'TH Ingolstadt', grade: '1.3', period: 'Mar 2022 – Mar 2024' },
  { degree: 'BSc UX Design', school: 'TH Ingolstadt', period: 'Oct 2014 – Mar 2019' },
] as const;

/** Specialization bullets for hero accordion (short, no long paragraphs) */
export const specializationBullets = [
  'Enterprise tools in regulated environments',
  'Automotive systems, compliance, verification',
  'Dashboards and data-heavy workflows',
  'Process automation and SAP integration',
] as const;

/** Hero: legacy sub-headline (kept for any remaining refs) */
export const heroSubheadline = 'I build systems that scale.';

/** Proof chips row — max 4 chips, evidence-backed claims */
export const proofChips = [
  { label: '3 shipped enterprise tools', icon: 'package' },
  { label: '500+ users', icon: 'users' },
  { label: '80 hours saved weekly', icon: 'clock' },
  { label: 'Reduced audit prep time', icon: 'shield' },
] as const;

/** Featured project slugs for home grid: KoVoN, FFP, CAESAR (emission compliance), SAP */
export const featuredProjectSlugs = ['kovon', 'ffp-dashboard', 'emission-compliance', 'automation'] as const;

/** Display titles for featured projects (slug → title) */
export const projectDisplayTitles: Record<string, string> = {
  kovon: 'KoVoN',
  'ffp-dashboard': 'FFP',
  'emission-compliance': 'Emission Compliance',
  automation: 'SAP Bot',
};

export function getFeaturedProjectSlugs(): string[] {
  return [...featuredProjectSlugs];
}

export function getProjectDisplayTitle(slug: string): string {
  return projectDisplayTitles[slug] ?? slug;
}

export const proofLine =
  'Selected work across enterprise product design, automation, and multidisciplinary execution.';

export const experienceLine =
  'UX & Product Design Consultant for enterprise SaaS and workflow automation—including SAP. M.Sc. UX Design. I reduce cognitive load, speed up delivery, and turn complex architecture into clear product decisions. Offen für Product Designer- und UX-Manager-Rollen.';

export const proofStrip = [
  { label: 'Projects done', value: '45+' },
  { label: 'Years of experience', value: '9+' },
  { label: 'Scientific recognitions', value: '1' },
  { label: 'Selected works', value: '2019–2025' },
  { label: 'Available for work', value: 'Yes' },
] as const;

export const visionStatement =
  'My product design principles:';

export const principles = [
  {
    number: '01',
    title: 'Empathy',
    body: 'Finding the root of problems and why people hire you is not easy! I dive deep into understanding the people and the context before jumping into the process. By getting to know the users, their working context and their needs, we can team up with them to find the best spectrum of solutions together. Empathy is key.',
  },
  {
    number: '02',
    title: 'Quality with focus',
    body: 'High quality overall is easy to recognize. As a Design Strategist, I use data to gather insights and transform it into a clear, actionable proposal that not only explores a range of possibilities but also keeps KPIs and metrics in center. It\'s about balancing creativity with strategic thinking—understanding what\'s truly important and identifying the ultimate goal to align on.',
  },
  {
    number: '03',
    title: 'Test often, fail fast!',
    body: 'Clear communication to keep the team on track and with me is my base. I guide everyone through the process, help them to understand, plan ahead, anticipate obstacles, and navigate the ship when they appear. I always embrace a "fail fast, test early" mentality. Thinking pragmatic and asking the right questions. We all don\'t want to waste our time in endless feedback iterations.',
  },
] as const;

export const whatIDo = [
  {
    number: '01',
    title: 'Management',
    body: 'Certified SAFe 6.0 SCRUM Master: Led Scrum teams up to 4 persons. Held several Jira & Confluence trainings for agile projects. I never worked not agile.',
  },
  {
    number: '02',
    title: 'UX design',
    body: 'Design Management, Product Management; Strategic design, User Journeys, Workshops—and many more. I implemented lots of websites, conceptualized several app ideas, processes and workshops.',
  },
  {
    number: '03',
    title: '3D Design / VR AR',
    body: 'Art Renderings, Product Renderings, Animation & Sound Design, Virtual Reality / Augmented Reality Studies & Games. I\'m completely hooked on 3D and the combination of motion and AI (Comfy UI).',
  },
  {
    number: '04',
    title: 'Motion Design',
    body: 'Educational Videos, Content, Ad Creatives, Storyboards, Pitch Videos, Cutter. You need creatives—I can help you!',
  },
  {
    number: '05',
    title: 'Automation Consultant',
    body: 'LLM/ML AI Concepts, Big Data analysis, Bot Automation Consulting. I have a broad knowledge on AI concepts and how to setup custom LLM and automation concepts.',
  },
] as const;

export const ctaPrimary = { label: 'Try prototype', href: '/prototypes/ffp/fingerprints' };
export const ctaSecondary = [
  { label: 'Case studies', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const;

export const experienceChips = ['Design systems', 'Research', 'Agile delivery'] as const;

export const clients = ['Enterprise automotive', 'Sentus'] as const;

/** Section 2: Trust Ticker — tools mastered (grayscale logos) or domain tags */
export const trustTickerItems = [
  'Figma',
  'React',
  'Jira',
  'Confluence',
  'Adobe',
  'Enterprise SaaS',
  'SAP',
  'Automation',
] as const;

export const leadershipCard = {
  title: 'Leadership — Kontrast Festival',
  metrics: [
    { label: 'Visitors', value: '4,000' },
    { label: 'Revenue', value: '€250k' },
    { label: 'Team', value: '5–7' },
    { label: 'Margin', value: '-€5k year 1 → ~€40k within 3 years' },
  ],
  shortCopy:
    'Co-Founder & Design Lead. Built established culture brand; responsible for design, communication, and creative team.',
} as const;

export const publication = { title: 'ICNLSP 2021', venue: 'ICNLSP 2021 publication' } as const;

export const certification = {
  name: 'Certified SAFe 6 Scrum Master',
  validUntil: '03 Jun 2026',
  validFrom: 2025,
  validTo: 2026,
} as const;

export const aiAutomationCard = {
  title: 'AI & Automation',
  oneLiner: 'From GPT Agent UX to bot-led process optimization.',
  badge: '2–4h/week → ~0 ops effort (stakeholder estimate)',
  chips: ['Automation', 'AI workflows', 'Prototyping'] as const,
  highlights: [
    'GPT Agent MVP: AI Use Cases, maturity levels, conversation flows; AI experience for medical documentation (Arztbriefgenerierung).',
    'Bot automation consulting: one use case in production saves ~2–4h/week per specialist (based on stakeholder estimates).',
    'Strategic AI consulting: POC → hybrid RAG architecture, Power Automate ingestion, ROI validation, Copilot-first handover (500+ processes).',
    'Personal Architecture + AI: local rough 3D + AI-driven style generation for arch-viz (~24× faster variants vs. manual texture rework). Generative AI (ComfyUI, Lovable, ChatGPT) for ideation and rapid prototyping.',
  ],
} as const;

export const skillsGroups = {
  productDesign: ['Figma', 'Design Systems', 'UX research', 'Enterprise UI patterns'],
  tools: ['Jira', 'Confluence'],
  techBasics: ['React basics', 'Web fundamentals'],
  aiWorkflows: ['ComfyUI', 'Lovable', 'ChatGPT', 'AI workflows'],
} as const;

/** Product focus chips for landing accordion (2–3 categories, 6–8 chips) */
export const productFocusGroups = [
  { label: 'Design', chips: ['Figma', 'Design Systems', 'UX research', 'Enterprise UI'] },
  { label: 'Process', chips: ['Jira', 'Confluence', 'Scrum'] },
  { label: 'Tech & AI', chips: ['React basics', 'AI workflows'] },
] as const;

/** Card 2: What I do most chips under Skills chart */
export const whatIDoMostChips = [
  'Enterprise systems',
  'Automotive compliance',
  'Data visualization',
  'AI automation',
] as const;

/** Card 2: Credentials timeline (role, company, dates, proof, tags, isNow) */
export const credentialsTimeline = [
  {
    role: 'Management Consultant, Product Designer UX UI',
    company: '8020 GmbH',
    dates: 'Jul 2022 to Present',
    proof: 'Enterprise and automotive tools shipped, scale up to 500 to 1000 users, automation outcomes.',
    tags: ['Enterprise UX', 'Automotive', 'Compliance', 'AI workflows'],
    isNow: true,
  },
  {
    role: 'Freelance UX Designer',
    company: 'untitled-ux',
    dates: 'Feb 2020 to Present',
    proof: 'UX, motion, branding, web delivery, client-facing ownership.',
    tags: ['UX', 'Motion', 'Web', 'Branding'],
    isNow: false,
  },
  {
    role: 'UX internship',
    company: 'smartpatient',
    dates: 'Aug 2016 to Jan 2017',
    proof: 'Product and marketing team, Munich.',
    tags: ['UX', 'Product'],
    isNow: false,
  },
] as const;

/** Card 2: Education for credentials panel */
export const credentialsEducation: Array<{
  degree: string;
  school: string;
  period: string;
  thesis?: string;
}> = [
  { degree: 'MSc User Experience Design', school: 'THI', period: 'Mar 2022 to Mar 2024', thesis: 'Environment Design, Attention & Learning in VR' },
  { degree: 'BSc User Experience Design', school: 'THI', period: 'Oct 2014 to Mar 2019' },
];

/** Card 2: Specialization chips with icons */
export const specializationChipsWithIcons = [
  { label: 'Enterprise systems', icon: 'building' },
  { label: 'Automotive compliance and diagnostics', icon: 'shield' },
  { label: 'Data visualization and dashboards', icon: 'bar-chart' },
  { label: 'AI assisted process automation', icon: 'zap' },
  { label: 'Motion design for product storytelling', icon: 'film' },
] as const;

/** Card 2: Growth chart data (Scope, Responsibility, Impact 0–100 over time) */
export const growthChartData = [
  { year: '2016', scope: 15, responsibility: 10, impact: 5 },
  { year: '2018', scope: 25, responsibility: 25, impact: 15 },
  { year: '2020', scope: 50, responsibility: 55, impact: 40 },
  { year: '2022', scope: 75, responsibility: 75, impact: 70 },
  { year: 'Now', scope: 95, responsibility: 90, impact: 90 },
] as const;

export const practical = {
  location: 'Augsburg, Munich commute, hybrid',
  languages: 'German native, English C1',
  workModel: '32h preference (if public)',
} as const;

export const contact = {
  name: 'Daniel Peters',
  email: 'djdanep@gmail.com',
  phone: '+173 523 1109',
  tagline:
    'UX & Product Design Consultant — enterprise SaaS, automation & SAP. M.Sc. UX Design. Selected works 2019–2025.',
  /** Profile photo path (place your image in public/, e.g. profile.jpg) */
  profileImage: '/profile.jpg',
} as const;

/** Section 3: About & Stats — concrete numbers (not vague) */
export const aboutStats = [
  { label: 'Projects Launched', value: '45+' },
  { label: 'Years Experience', value: '9+' },
  { label: 'Scientific Recognitions', value: '1' },
] as const;

/** Section 3: About heading */
export const aboutHeading = 'Designing clarity in complex systems.';

/** Education snapshot: 2 lines for main page */
export const educationSnapshot = [
  'Master of Science, User Experience Design (Grade: 1.3) | TH Ingolstadt | 2020–2024',
  'Bachelor of Science, User Experience Design | TH Ingolstadt | 2014–2019',
] as const;

/** Master / bachelor theses — full copy for Education section accordion */
export const educationAcademicTheses = [
  {
    label: 'Master Thesis',
    grade: '1.0',
    title:
      'The Influence of Environment Design on Attention & Learning: A Comparison of Abstract and Biophilic VR Environments',
    body:
      'Evaluated the impact of nature-inspired (biophilic) vs. abstract Virtual Reality environments on cognitive load and learning performance. Supervised by Prof. Dr. Andreas Riener and Veronika Ritzer, the research demonstrated that biophilic design significantly improves focus and stress reduction in immersive systems.',
  },
  {
    label: 'Bachelor Thesis',
    title:
      'Talking Cars: Evaluation of an Auditory Concept for Communication between Pedestrians and Autonomous Vehicles',
    body:
      'Developed and evaluated an auditory external Human-Machine Interface (eHMI) to bridge the communication gap between autonomous vehicles and pedestrians. Used a user-centered design process and empirical study to analyze the intuitiveness of natural speech versus abstract sounds.',
  },
] as const;

/** Module highlights & projects — bullet list for Education section */
export const educationModuleProjects = [
  {
    lead: 'Master Project (Grade: 1.0)',
    detail:
      'Conducted an industry-level study project for BSH, achieving high academic recognition and subsequent feature at the ICC.',
    emphasize: ['BSH', 'ICC'] as const,
  },
  {
    lead: 'Design Strategy and Management (Grade: 1.3)',
    detail:
      'Taught by Veronika Ritzer, focusing on the strategic alignment of design processes with corporate enterprise goals.',
  },
  {
    lead: 'HCI & Interactive Systems',
    detail:
      'Core focus on complex interaction architecture under Prof. Riener, including Natural User Interfaces (Grade: 1.0) and Interaction Design (Grade: 1.7).',
  },
] as const;

/** SAFe body line for Education accordion (title spelled out in UI) */
export const educationCertificationBody =
  `Scaled Agile Framework, valid until ${certification.validUntil}.` as const;

/** Section 4: Services grid — 4 offerings, one is featured (inverted) */
export const servicesGrid = [
  { title: 'UI/UX Design', href: '/projects', featured: true },
  { title: 'Brand Strategy', href: '/projects' },
  { title: 'Web & Prototyping', href: '/projects' },
  { title: 'Content & Motion', href: '/projects' },
] as const;

/** Experience snapshot: 3 company cards (verified dates). Main page only. */
export const experienceSnapshot = [
  {
    company: 'Untitled-ux',
    titleOrProgression: 'User Experience Designer | Self-employed',
    dates: 'Mar 2020 – Present',
    scopeOneLine: 'From Zero to One product delivery for founders and SMEs across web, brand, and cross-media touchpoints.',
  },
  {
    company: '8020.eco',
    titleOrProgression: 'Management Consultant (since Feb 2024), previously Junior',
    dates: 'Jul 2022 – Nov 2025',
    scopeOneLine: 'Strategic design and implementation of digital enterprise products in agile SAFe environments.',
  },
  {
    company: 'smartpatient',
    titleOrProgression: 'UX Design Intern',
    dates: 'Aug 2016 – Jan 2017',
    scopeOneLine: 'Early user-centered product development across research, app iteration, and content strategy.',
  },
] as const;

/** Landing Experience section — row layout with optional /logos/*.png assets */
export const experienceTimelineDetailed = [
  {
    id: 'untitled-ux',
    company: 'Untitled-ux',
    headline: 'User Experience Designer',
    subline: 'Untitled-ux · Self-employed',
    period: 'Mar 2020 – Present',
    location: 'Aichach-Friedberg',
    logoId: 'untitledUx' satisfies BrandLogoId,
    logoAlt: 'Untitled-ux logo',
    summary:
      'With untitled-ux, I help founders and SMEs translate their visions into tangible, market-ready products. I guide projects holistically from Zero to One, from initial strategic consulting to final go-live.',
    bullets: [
      'End-to-end web solutions (e.g., kathis-candybar.de, deinespanndecke.de)',
      'Brand identity systems',
      'Cross-media touchpoints across print and trade fairs',
      'Lean consulting for constrained budgets',
    ],
  },
  {
    id: '8020-eco',
    company: '8020.eco',
    headline: 'Management Consultant',
    subline: '8020.eco',
    period: 'Jul 2022 – Nov 2025',
    location: 'Ingolstadt · Hybrid',
    logoId: 'eco8020' satisfies BrandLogoId,
    logoAlt: '8020.eco logo',
    summary:
      'Supporting automotive clients in the strategic design and implementation of digital enterprise products within an agile SAFe environment. (Promoted from Junior to Management Consultant in Feb 2024).',
    bullets: [
      'Predictable delivery: doubled accepted story points through developer-ready UI specifications',
      'Quality focus: systematic user testing reduced critical usability bugs by 80% up to MVP',
      'Process optimization: reduced cognitive load to minimize troubleshooting in complex SAP workflows',
      'Junior phase: web design, product management, and AR/VR prototyping',
    ],
  },
  {
    id: 'smartpatient',
    company: 'smartpatient',
    headline: 'UX Design Intern',
    subline: 'smartpatient',
    period: 'Aug 2016 – Jan 2017',
    location: 'Munich',
    logoId: 'smartpatient' satisfies BrandLogoId,
    logoAlt: 'smartpatient logo',
    summary: 'Early practical experience in user-centered product development.',
    bullets: [
      'User research and testing, including in-person guerrilla testing',
      'App iteration by translating support tickets into UX requirements',
      'Content strategy and UI design, including infographics',
    ],
  },
] as const;

export const educationTimelineDetailed = [
  {
    degree: 'Master of Science, User Experience Design',
    school: 'TH Ingolstadt',
    period: '2020–2024',
    grade: '1.3',
  },
  {
    degree: 'Bachelor of Science, User Experience Design',
    school: 'TH Ingolstadt',
    period: '2014–2019',
  },
] as const;

/** Legacy: flat role | company | date (used on CV or fallback) */
export const experienceTimeline = [
  { role: 'Management Consultant', company: 'Achtzig20 GmbH (8020)', date: 'Since 01 Feb 2024' },
  { role: 'Junior Consultant', company: 'Achtzig20 GmbH (8020)', date: '04 Jul 2022 – 31 Jan 2024' },
  { role: 'Freelance', company: 'untitled-ux', date: 'Since Feb 2020' },
  { role: 'UX internship', company: 'smartpatient', date: 'Aug 2016 – Jan 2017' },
] as const;

/** Section 7: Testimonial — result-focused quote */
export const testimonialQuote =
  'We saw a clearer information hierarchy and focus on the most important fields per role after the redesign.';

export const testimonialAttribution = '— Internal stakeholder, FFP Dashboard';

export const additionalDelivery = {
  label: 'Additional delivery',
  items: ['Centus app (as supporting project)'],
} as const;

export const productCardBadges = ['Research', 'Design System', 'Enterprise workflows'] as const;

// ——— Chart data (proof strip micro charts, range bar, stepper, leadership trend, radar) ———

/** Spark bars: 3 filled = 3 enterprise tools shipped */
export const proofToolsBars = [1, 1, 1] as const;

/** Users range: track 0–1000, filled 500–1000 */
export const usersRange = { min: 500, max: 1000, trackMax: 1000 } as const;

/** Ops effort before/after (hours per week, stakeholder estimate) */
export const opsBeforeAfter = { before: 3, after: 0, unit: 'h/week' } as const;

/** Delivery stepper: POC → MVP → Production */
export const deliveryStepperSteps = [
  { label: 'POC', value: '~6 weeks' },
  { label: 'MVP', value: '~12 months' },
  { label: 'Production', value: '+~6 months' },
] as const;

/** Tenure: 3+ years consulting since Oct 2022 — progress 0–100 (e.g. ~75 for “3+”) */
export const tenureProgress = 75;

/** Leadership margin trend (Kontrast): year → k€ */
export const marginTrendPoints = [
  { year: 'Y1', margin: -5 },
  { year: 'Y2', margin: 15 },
  { year: 'Y3', margin: 40 },
] as const;

/** Skills radar: 5 axes, honest labels (index 0–100) */
export const skillsRadarData = [
  { subject: 'Product Design', value: 85, fullMark: 100 },
  { subject: 'Enterprise UX', value: 80, fullMark: 100 },
  { subject: 'Research & Testing', value: 75, fullMark: 100 },
  { subject: 'Design Systems', value: 82, fullMark: 100 },
  { subject: 'AI workflows', value: 70, fullMark: 100 },
] as const;

/** Product-focused skills radar: 5 axes for home breakout */
export const skillsRadarProductData = [
  { subject: 'Product Design', value: 88, fullMark: 100 },
  { subject: 'UX UI', value: 90, fullMark: 100 },
  { subject: 'Scrum', value: 82, fullMark: 100 },
  { subject: 'Automation', value: 78, fullMark: 100 },
  { subject: 'Process Management', value: 85, fullMark: 100 },
] as const;

/** "What this means" line under radar */
export const skillsRadarWhatItMeans =
  'Strongest in product UX, enterprise workflows, and automation oriented design.';

/** KoVoN only: usability findings reduction (index, not absolute counts) */
export const kovonUsabilityWaterfall = [
  { stage: 'POC baseline', value: 100 },
  { stage: 'MVP', value: 20 },
  { stage: 'Later testing', value: 8 },
] as const;

/** Career transition: 4 phases (recruiter-friendly) */
export const careerAreaData = [
  { phase: '2016', graphicDesign: 70, motionWeb: 20, productUx: 8, aiSystems: 0 },
  { phase: '2020', graphicDesign: 30, motionWeb: 45, productUx: 20, aiSystems: 0 },
  { phase: '2022', graphicDesign: 10, motionWeb: 30, productUx: 50, aiSystems: 10 },
  { phase: 'Now', graphicDesign: 0, motionWeb: 20, productUx: 50, aiSystems: 30 },
] as const;

/** Segmented timeline bar (alternative): recruiter-friendly labels */
export const careerTimelineSegments = [
  { period: '2016–2020', label: 'Design and motion heavy' },
  { period: '2020–2022', label: 'Freelance and UX' },
  { period: '2022–now', label: 'Enterprise product UX, Scrum, automation' },
] as const;
