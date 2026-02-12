/**
 * Single source of truth for Home and CV.
 * Safe, defensible wording. Use ~, approx., "based on stakeholder estimates" where needed.
 */

export const roleHeadline =
  'Product Designer (UX/UI). Enterprise workflow tools. Data-heavy interfaces. Design systems.';

export const proofLine =
  'Shipped 3 enterprise tools used by ~500–1000 users. Reduced recurring ops effort from ~2–4h/week to near zero. POC ~6 weeks → MVP ~12 months → production-ready +~6 months.';

export const experienceLine =
  '3+ years in tech consulting (since Oct 2022). 8–9+ years designing digital products (incl. academic and freelance work).';

export const proofStrip = [
  { label: 'Enterprise tools shipped', value: '3' },
  { label: 'Users', value: '500–1000' },
  { label: 'Ops effort', value: '2–4h/week → ~0' },
  { label: 'Delivery', value: 'POC 6 weeks' },
  { label: 'Tenure', value: '3+ years consulting (since Oct 2022)' },
] as const;

export const ctaPrimary = { label: 'Try prototype', href: '/prototypes/kovon' };
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
  'Centus',
  'Ensinger',
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
  name: 'Daniel P.',
  email: 'djdanep@gmail.com',
  phone: '+173 523 1109',
  tagline: 'holla at me',
} as const;

export const additionalDelivery = {
  label: 'Additional delivery',
  items: ['Centus app (as supporting project)'],
} as const;

export const productCardBadges = ['Research', 'Design System', 'Enterprise workflows'] as const;
