/**
 * Shared identity + contact + experience copy for Dashboard, landing, and contact.
 * Landing marketing copy: `landing-copy.json`. CV page: `cv-copy.json`.
 */

import type { BrandLogoId } from '@/lib/brand-logos';

export const identityName = 'Daniel Peters';
export const identityRolePrimary = 'UX & Product Design Consultant';
export const identityRoleSecondary =
  'Enterprise SaaS · Workflow Automation · SAP | M.Sc. UX Design';
export const identityRole = identityRolePrimary;
export const identitySubtitle = 'Enterprise SaaS · Workflow Automation · SAP';

export const contact = {
  name: 'Daniel Peters',
  email: 'djdanep@gmail.com',
  phone: '+173 523 1109',
  tagline:
    'UX & Product Design Consultant — enterprise SaaS, automation & SAP. M.Sc. UX Design. Selected works 2019–2025.',
  profileImage: '/profile.jpg',
} as const;

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
      'With untitled-ux, I help founders and SMEs translate their ideas into user-tested, ready-to-launch digital products — from initial strategy to go-live.',
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
    headline: 'Interaction Designer',
    subline: '8020.eco · Management Consultant',
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
