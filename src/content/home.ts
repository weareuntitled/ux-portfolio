/**
 * Shared identity + contact + experience copy for Dashboard, landing, and contact.
 */

import type { BrandLogoId } from '@/lib/brand-logos';

export const identityName = 'Daniel Peters';
export const identityRolePrimary = 'AI-Native Product Designer';
export const identityRoleSecondary =
  'M.Sc. UX Design (1.3) · Certified Scrum Master · 9+ yrs';
export const identityRole = identityRolePrimary;
export const identitySubtitle = 'Product Design · UX/UI · Strategy';

export const contact = {
  name: 'Daniel Peters',
  email: 'hi@untitled-ux.de',
  phone: '+49 173 5231109',
  linkedin: 'https://www.linkedin.com/in/daniel-peters-055296203/',
  tagline:
    'AI-Native Product Designer & UX/UI Strategist. I work across design, engineering, and AI — shipping in days, not months.',
  profileImage: '/profile.jpg',
  status: 'Available for select projects',
} as const;

export interface ExperienceEntry {
  id: string;
  company: string;
  headline: string;
  subline: string;
  period: string;
  location: string;
  logoId: BrandLogoId;
  logoAlt: string;
  summary: string;
  bullets: readonly string[];
}

/** Landing Experience section — row layout with optional /logos/*.png assets.
 *  Order: 8020 (recent staff) → untitled-ux (ongoing freelance, primary identity) → Kontrast → smartpatient
 *  Less-is-more: minimal summary, 1-2 bullets. Roles match master_profile.md exactly. */
export const experienceTimelineDetailed: readonly ExperienceEntry[] = [
  {
    id: '8020-eco',
    company: '8020 GmbH',
    headline: 'Management Consultant — UX/UI, Product, Scrum, Process Automation, Deputy Lead Motion Design',
    subline: '8020 GmbH · Management Consulting',
    period: 'Oct 2022 – Nov 2025',
    location: 'Ingolstadt · Hybrid',
    logoId: 'eco8020',
    logoAlt: '8020 GmbH logo',
    summary: 'Embedded across automotive and industry clients.',
    bullets: [
      'Led product design, sprint ceremonies, and process automation for enterprise web and mobile apps',
    ],
  },
  {
    id: 'untitled-ux',
    company: 'Untitled-ux',
    headline: 'Freelance UX/UI Designer · AI Creative Pipelines',
    subline: 'Independent Practice since 2020',
    period: 'Feb 2020 – Present',
    location: 'Augsburg / Munich',
    logoId: 'untitledUx',
    logoAlt: 'Untitled-ux logo',
    summary: 'AI-native product design. Built a fully autonomous job-hunting agent with my own AI pipelines.',
    bullets: [
      'Shipped 3 AI-native products in 12 months (DIGGR music platform, legacy DB modernization, invoice automation)',
      'ComfyUI pipelines, local LLM deployments, AI voice control — accelerated prototyping from months to days',
    ],
  },
  {
    id: 'kontrast-festival',
    company: 'Kontrast Festival',
    headline: 'Co-Founder & Design Lead',
    subline: 'Visual Identity & Creative Direction',
    period: '2021 – 2024',
    location: 'Augsburg',
    logoId: 'kontrastFestival',
    logoAlt: 'Kontrast Festival logo',
    summary: 'Co-founded and scaled a regional cultural festival.',
    bullets: [
      'Owned full visual identity across digital, print, stage, and merchandise',
    ],
  },
  {
    id: 'smartpatient',
    company: 'smartpatient',
    headline: 'UX Design & Research Intern',
    subline: 'smartpatient (Digital Health)',
    period: '2016 – 2019',
    location: 'Munich',
    logoId: 'smartpatient',
    logoAlt: 'smartpatient logo',
    summary: 'User-centered product development for a health app.',
    bullets: [
      'Co-planned and conducted usability tests for iOS/Android health app',
    ],
  },
];
