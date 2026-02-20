/**
 * KoVoN case study page: content tabs, outcomes, proof strip, and "why rollout stopped".
 * Used by KovonContentTabs, ProofStrip (optional override), OutcomeBlock, WhyRolloutStopped.
 */

export type ContentTabItem = {
  id: string;
  label: string;
  icon: string;
  title: string;
  body: string;
  outcomeBullets: string[];
};

export const kovonContentTabs: ContentTabItem[] = [
  {
    id: 'solution',
    label: 'Solution',
    icon: 'Layout',
    title: 'What the tool delivered',
    body:
      'KoVoN delivered a consolidated COP overview ("Gesamtzusammenschau") so teams had one place to document and prove Conformity of Production. Integrated role, task and regulation concept enabled audit-proof evidence and scalable documentation.',
    outcomeBullets: [
      'Pilot validated workflow, roles, and regulation concept.',
      'Scalable COP compliance documentation tool with governance model.',
    ],
  },
  {
    id: 'regulation',
    label: 'Regulation updates',
    icon: 'FileText',
    title: 'How updates are handled',
    body:
      'Regulation content is structured and kept up to date with clear ownership. Who needs clarification and how amendments flow into the tool is defined so that audit trails stay consistent when regulations change.',
    outcomeBullets: [
      'Clear process for regulation updates and responsibility.',
      'Audit-proof evidence chain when regulations change.',
    ],
  },
  {
    id: 'adaptability',
    label: 'Adaptability',
    icon: 'Layers',
    title: 'Task packages and compliance',
    body:
      'Miscellaneous task packages and compliance scope are handled through a flexible structure. Teams can adapt the tool to different vehicle programs and component domains while keeping documentation consistent.',
    outcomeBullets: [
      'Maintainable concept for different programs and domains.',
      'Foundation for holistic compliance documentation.',
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'Users',
    title: 'Responsibilities and approvals',
    body:
      'Responsibilities, approvals, and bottlenecks are explicitly modeled. Roles and handoffs are clear so that coordination and sign-off scale without creating duplicate work or unclear ownership.',
    outcomeBullets: [
      'Integrated role and task concept reduced coordination overhead.',
      'Bottlenecks (responsibility, update cycles, matching) identified for future iteration.',
    ],
  },
];

export const kovonWhereItLandedBullets: string[] = [
  'Working tool delivered for 1 vehicle (pilot scale).',
  '~80% documentation filled; audit prep faster.',
  'End-to-end visibility and scale learnings.',
  'Bottlenecks identified: responsibility, update cycles, matching, complexity.',
  'Foundation for holistic COP documentation and governance model.',
];

export const kovonWhyRolloutStoppedBullets: string[] = [
  'Rollout started; client made a drastic strategy change.',
  'Audit-related projects paused; rollout stopped.',
];
