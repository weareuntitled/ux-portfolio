/**
 * Single source of truth for Home and CV.
 * Daniel Peters — Product Designer, UX UI for Automotive & Enterprises.
 */

/** Left-side identity block: one sentence + two lines (rest in About accordion) */
export const identityName = 'Daniel Peters';
export const identityRole = 'Product Designer, UX UI';
export const identitySubtitle = 'for Automotive Systems & Enterprise';
export const identityOneSentence = 'Product Designer, UX UI for Automotive Systems and Enterprise tools.';
export const identityTwoLines =
  'Compliance workflows, dashboards, automation. Built in 8020 Consulting context.';
/** Dense intro for About accordion */
export const identitySupportLine =
  'Enterprise tools for compliance, verification, dashboards, and automation. Built in the context of 8020 Consulting.';
export const identityContext =
  'Context: 8020 Consulting. Product work across UX, Scrum, and process automation.';

export const roleHeadline =
  'Daniel Peters. product design - UX/UI - AI - Automation';

/** Hero: H1 / H2 / Sub / Body (plan §3) */
export const heroHeadline = 'Daniel Peters';
export const heroH2 = 'Product Designer, UX UI';
export const heroSub = 'for Automotive Systems & Enterprise';
export const heroBody =
  'I design complex enterprise tools in regulated environments. Built in 8020 Consulting context.';
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
  'ffp-dashboard': 'FFP Dashboard',
  'emission-compliance': 'CAESAR', // Interaction & design exploration—reduce clutter, spot anomalies before reporting
  automation: 'SAP Bot',
};

export function getFeaturedProjectSlugs(): string[] {
  return [...featuredProjectSlugs];
}

export function getProjectDisplayTitle(slug: string): string {
  return projectDisplayTitles[slug] ?? slug;
}

export const proofLine =
  'Welcome to my sneak peek online portfolio. I work with awesome people for a greater vision of design aesthetics & art. Selected works 2019–2025. Available for work.';

export const experienceLine =
  '9+ years of experience. Certified SAFe 6.0 Scrum Master. Design Management, Product Management, Strategic design, User Journeys, Workshops.';

export const proofStrip = [
  { label: 'Projects done', value: '45+' },
  { label: 'Years of experience', value: '9+' },
  { label: 'Scientific recognitions', value: '1' },
  { label: 'Selected works', value: '2019–2025' },
  { label: 'Available for work', value: 'Yes' },
] as const;

export const visionStatement =
  'I work with awesome people for a greater vision of design aesthetics & art. My 3 key principles are:';

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

export const clients = [
  'Audi',
  'Porsche',
  'Volkswagen',
  'MAN',
  'Sentus',
] as const;

/** Section 2: Trust Ticker — tools mastered (grayscale logos) or client names */
export const trustTickerItems = ['Figma', 'React', 'Jira', 'Confluence', 'Adobe', 'Audi', 'Porsche', 'VW', 'MAN'] as const;

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
    'ROI and technical feasibility for cross-domain AI concepts; handover to Audi AI Hub. Generative AI (ComfyUI, Lovable, ChatGPT) for ideation and rapid prototyping.',
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
  tagline: 'Hi There — Selected works 2019–2025. Available for work.',
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
export const aboutHeading = "More than just a job—it's a craft.";

/** Education snapshot: 2 lines for main page */
export const educationSnapshot = [
  'MSc User Experience Design, Technische Hochschule Ingolstadt, grade 1.3, Mar 2022 – Mar 2024',
  'BSc User Experience Design, Technische Hochschule Ingolstadt, Oct 2014 – Mar 2019',
] as const;

/** Education accordion: thesis, module highlights, certs */
export const educationDetail = {
  thesisTitle: 'Master thesis: The Influence of Environment Design on Attention & Learning. A Comparison of Abstract and Biophilic VR Environments.',
  moduleHighlights: 'UX research, design systems, human-computer interaction, VR/AR studies.',
  certification: `Certified SAFe 6 Scrum Master, valid until ${certification.validUntil}.`,
} as const;

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
    company: 'Achtzig20 GmbH (8020)',
    titleOrProgression: 'Junior Consultant (04 Jul 2022 – 31 Jan 2024), Management Consultant (since 01 Feb 2024)',
    dates: 'Since 04 Jul 2022',
    scopeOneLine: 'Enterprise product UX, Scrum, compliance and automation tools.',
  },
  {
    company: 'untitled-ux',
    titleOrProgression: 'Freelance (UX, Motion, Branding)',
    dates: 'Since Feb 2020',
    scopeOneLine: 'UX, motion design, and branding for clients.',
  },
  {
    company: 'smartpatient',
    titleOrProgression: 'UX internship (Product and Marketing team)',
    dates: 'Aug 2016 – Jan 2017',
    scopeOneLine: 'Product and marketing team, Munich.',
  },
] as const;

/** 8020 accordion: Selected enterprise projects, Responsibilities, Methods */
export const experience8020Accordion = {
  selectedProjects: 'KoVoN, FFP Dashboard, CAESAR (emission compliance), SAP automation and part verification. Delivered UX research, design systems, and workflow redesign for automotive and enterprise clients.',
  responsibilities: 'Lead design and research for enterprise tools; stakeholder workshops; Jira & Confluence trainings; Scrum facilitation for teams up to 4.',
  methods: 'User research (shadowing, interviews), Figma design systems, clickable prototypes, iterative refinement with stakeholders.',
} as const;

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
