/**
 * Shared identity + contact + experience copy for Dashboard, landing, and contact.
 * Landing marketing copy: `landing-copy.json`. CV page: `cv-copy.json`.
 */

import type { BrandLogoId } from '@/lib/brand-logos';

export const identityName = 'Daniel Peters';
export const identityRolePrimary = 'UX & Product Design Consultant';
export const identityRoleSecondary =
  'Product Design · Agile Delivery · Design Strategy | Certified Scrum Master';
export const identityRole = identityRolePrimary;
export const identitySubtitle = 'Product Design · Agile Delivery · Design Strategy';

export const contact = {
  name: 'Daniel Peters',
  email: 'djdanep@gmail.com',
  phone: '+173 523 1109',
  tagline:
    'UX & Product Design Consultant. Certified Scrum Master. I bridge Design and Engineering to turn complex requirements into shippable product.',
  profileImage: '/profile.jpg',
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

/** Landing Experience section — row layout with optional /logos/*.png assets */
export const experienceTimelineDetailed: readonly ExperienceEntry[] = [
  {
    id: '8020-eco',
    company: '8020.eco',
    headline: 'Product Design Consultant & Agile Lead',
    subline: '8020.eco · Management Consulting',
    period: 'Jul 2022 – Oct 2025',
    location: 'Ingolstadt · Hybrid',
    logoId: 'eco8020',
    logoAlt: '8020.eco logo',
    summary:
      'Embedded across multiple parallel project tracks. Primary role as Scrum-driven Product Designer on a long-running enterprise engagement, plus Motion Design Lead and web delivery on two further tracks.',
    bullets: [
      'Led product design and sprint ceremonies across multiple parallel projects',
      'Mapped and restructured complex client-facing and internal processes into lean, buildable workflows',
      'Served as Motion Design Lead on a second project track. Owned the full motion output end to end',
      'Designed and built web presences including HTML embeds across a third project stream',
    ],
  },
  {
    id: 'untitled-ux',
    company: 'Untitled-ux',
    headline: 'Senior UX/UI Product Designer',
    subline: 'Untitled-ux · Independent Practice',
    period: 'Feb 2020 – Present',
    location: 'Augsburg / Munich',
    logoId: 'untitledUx',
    logoAlt: 'Untitled-ux logo',
    summary:
      'Independent practice focused on performance marketing, motion design, brand identities, and end-to-end UX work for founders and early-stage clients.',
    bullets: [
      'Design performance marketing assets, motion design, and brand identities for early-stage clients',
      'Run end-to-end UX work: user testing, feature design, prototyping, and iteration cycles',
      'Developed an outreach concept and designed infographic content for a UK market campaign',
    ],
  },
  {
    id: 'kontrast-festival',
    company: 'Kontrast Festival',
    headline: 'Co-Founder & Operations Lead',
    subline: 'Leadership & Operations',
    period: '2021 – 2024',
    location: 'Augsburg',
    logoId: 'kontrastFestival',
    logoAlt: 'Kontrast Festival logo',
    summary:
      'Co-founded and scaled a regional cultural festival from zero to 3,000+ attendees. Responsible for all operations, team management, and digital and physical experience design.',
    bullets: [
      'Managed logistics, vendors, and a full ops team across three editions',
      'Owned every digital and physical touchpoint from first ticket to last act',
    ],
  },
  {
    id: 'smartpatient',
    company: 'smartpatient',
    headline: 'UX Design Associate',
    subline: 'smartpatient (Digital Health)',
    period: 'Aug 2016 – Jan 2017',
    location: 'Munich',
    logoId: 'smartpatient',
    logoAlt: 'smartpatient logo',
    summary: 'Early practical experience in user-centered product development for a sensitive health application.',
    bullets: [
      'Turned qualitative user research into concrete UX requirements and screen concepts',
      'App iteration by translating support tickets into actionable design changes',
      'Content strategy and UI design, including infographics',
    ],
  },
];
