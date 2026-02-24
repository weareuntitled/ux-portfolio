import type { Project } from '@/content/projects';

// Types representing the shapes stored in Payload.
// They intentionally stay loose (lots of optionals) so rendering never breaks.

export type CmsProject = {
  id: string;
  slug?: string | null;
  title?: string | null;
  navTitle?: string | null;
  subtitle?: string | null;
  roleLine?: string | null;
  oneLiner?: string | null;
  category?: 'Enterprise' | 'Side' | null;
  year?: string | null;
  client?: string | null;
  roles?: { role: string }[];
  context?: string | null;
  problem?: string | null;
  solution?: string | null;
  outcomes?: { item: string }[];
  metrics?: { item: string }[];
  highlights?: { item: string }[];
  tools?: { item: string }[];
  methods?: { item: string }[];
  tags?: { item: string }[];
  links?: {
    label: 'Live demo' | 'Case study' | 'GitHub' | 'Live table';
    href: string;
  }[];
  prototype?: {
    prototypeType?: 'in-app' | 'figma' | null;
    inAppPrototypeHref?: string | null;
    figmaEmbedUrl?: string | null;
    figmaFileUrl?: string | null;
    hints?: { hint: string }[];
  } | null;
  prototypeButtonLabel?: string | null;
  moodImage?: string | null;
  cardCover?: string | { id: string; url?: string } | null;
  cover?: string | null;
  coverFallback?: 'gradient' | 'initials' | 'icon' | null;
  teamSize?: string | null;
  customerAbout?: string | null;
  workflow?: string | null;
  notes?: string | null;
  impact?: { label: string; value: string }[];
  gallery?: { image: string | { id: string; url?: string } }[];
  heroImage?: string | null;
  thumbnail?: string | null;
  metaCards?: { label: string; value: string }[] | null;
  deliveryImpact?: {
    delivery?: string[];
    impact?: string[];
    learned?: string[];
    document?: { label: string; href: string };
  } | null;
  /** Unified impact cards (4 items); set when using portfolio fallback. */
  impactCards?: { label: string; value: string }[] | null;
};

export type CmsProjectDefaults = {
  projectsSectionTitle?: string | null;
  projectsSectionIntro?: string | null;
  heroBackground?: string | null;
  defaultTags?: { tag: string }[];
  defaultMethods?: { method: string }[];
  defaultTools?: { tool: string }[];
  defaultPrimaryCtaLabel?: string | null;
  defaultLiveTableLabel?: string | null;
};

// Resolved project is what the UI consumes. It mirrors the existing Project type,
// but fields can be safely derived from defaults + overrides.
// impactCards: unified 4-card metric block from single source (portfolio) or CMS.
export type ResolvedProject = Project & {
  impactCards?: { label: string; value: string }[];
};
