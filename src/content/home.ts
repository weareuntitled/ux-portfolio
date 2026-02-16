/**
 * Single source of truth for Home and CV.
 * Daniel Peters — Design Strategist, UX/UI & Motion.
 */

export const roleHeadline =
  'Daniel Peters. product design - UX/UI - AI - Automation';

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

export const ctaPrimary = { label: 'Try prototype', href: '/prototypes/ffp' };
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
  name: 'SAFe 6.0 Scrum Master',
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

/** KoVoN only: usability findings reduction (index, not absolute counts) */
export const kovonUsabilityWaterfall = [
  { stage: 'POC baseline', value: 100 },
  { stage: 'MVP', value: 20 },
  { stage: 'Later testing', value: 8 },
] as const;

/** Career transition area chart: focus shift from graphic design to now (relative % per phase) */
export const careerAreaData = [
  { phase: '2016', graphicDesign: 70, motionWeb: 20, productUx: 5, aiSystems: 0 },
  { phase: '2018', graphicDesign: 50, motionWeb: 40, productUx: 8, aiSystems: 0 },
  { phase: '2020', graphicDesign: 30, motionWeb: 45, productUx: 20, aiSystems: 5 },
  { phase: '2022', graphicDesign: 15, motionWeb: 35, productUx: 40, aiSystems: 10 },
  { phase: '2024', graphicDesign: 5, motionWeb: 25, productUx: 45, aiSystems: 25 },
  { phase: 'Now', graphicDesign: 0, motionWeb: 20, productUx: 50, aiSystems: 30 },
] as const;
