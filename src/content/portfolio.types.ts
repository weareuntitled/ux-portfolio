/**
 * Single source of truth types for portfolio data.
 * Used by portfolio.ts and consumers (payload, pages, components).
 */

export type ProjectLink = {
  label: 'Live demo' | 'Case study' | 'GitHub' | 'Live prototype';
  href: string;
};

export type ProjectPrototype = {
  prototypeType?: 'in-app' | 'figma';
  inAppPrototypeHref?: string;
  figmaEmbedUrl?: string;
  figmaFileUrl?: string;
  hints: string[];
};

export type ProjectImpactItem = {
  label: string;
  value: string;
  trend?: 'up' | 'down';
};

export type ProjectMetaCard = {
  label: string;
  value: string;
  hint?: string;
  icon?: 'users' | 'timeline' | 'stages' | 'role' | 'stack' | 'deliverable' | 'impact';
};

/** Core project fields */
export type Project = {
  id: string;
  slug: string;
  title: string;
  navTitle?: string;
  subtitle?: string;
  roleLine?: string;
  oneLiner: string;
  category: 'Enterprise' | 'Side' | 'Branding' | 'Motion' | 'Web' | 'Archive';
  year: string;
  client?: string;
  roles?: string[];
  teamSize?: string;
  customerAbout?: string;
  context?: string;
  problem?: string;
  solution?: string;
  outcomes?: string[];
  metrics?: string[];
  highlights?: string[];
  tools?: string[];
  methods?: string[];
  links?: ProjectLink[];
  prototype?: ProjectPrototype;
  prototypeButtonLabel?: string;
  moodImageUrl?: string | null;
  /** Optional architecture / process diagram (shown full-width on case study) */
  processDiagramUrl?: string | null;
  processDiagramLabel?: string;
  workflow?: string;
  notes?: string;
  description?: string;
  prototypeIframeUrl?: string;
  impact?: ProjectImpactItem[];
  galleryUrls?: string[];
  cardCoverUrl?: string;
  coverUrl?: string;
  cover?: string;
  coverFallback?: 'gradient' | 'initials' | 'icon';
  metaCards?: ProjectMetaCard[];
  deliveryImpact?: {
    delivery: string[];
    impact: string[];
    learned?: string[];
    document?: { label: string; href: string };
  };
  tags?: string[];
  
  // NEU: YouTube Support für Motion Design
  youtubeUrl?: string;

  // NEU: Modulares Highlight für die Outcome-Sektion
  outcomeHighlight?: {
    value: string;
    label: string;
    description: string;
    icon: string;
  };
};

export type ImpactCardItem = { label: string; value: string };

export type CaseStudySections = {
  summary?: string;
  contextWhyMattered?: string;
  realProblem?: string;
  constraints?: string;
  myRole?: string;
  approach?: string;
  solutionConcept?: string;
  outcome?: string;
  whatILearned?: string;
  whatToShowVisually?: string;
  insightAuthor?: string;
};

export type BentoCardVisual = 'switcher' | 'metric' | 'bars' | 'chips';

export type BentoCardItem = {
  title: string;
  subtitle: string;
  icon?: string;
  visual?: BentoCardVisual;
  colSpan?: 2;
  value?: string;
  items?: string[];
};

export type TechnicalSpecItem = { title: string; body: string };

export type ProcessStepItem = {
  number: string;
  title: string;
  desc: string;
  icon?: string;
  output?: string;
};

export type FeatureItemData = {
  icon: string;
  title: string;
  desc: string;
  problem?: string;
  solution?: string;
  impact?: string;
};

export type BeforeAfterMedia = { oldImg: string; newImg: string };

export type PortfolioKitData = {
  bentoCards?: BentoCardItem[];
  technicalSpecs?: TechnicalSpecItem[];
  processSteps?: ProcessStepItem[];
  featureItems?: FeatureItemData[];
  insightAuthor?: string;
  videoSrc?: string;
  beforeAfter?: BeforeAfterMedia;
};

export type ContentTabItem = {
  id: string;
  label: string;
  icon: string;
  title: string;
  body: string;
  outcomeBullets: string[];
};

export type KovonConfig = {
  contentTabs: ContentTabItem[];
  whereItLandedBullets: string[];
  whyRolloutStoppedBullets: string[];
  featuredCase: {
    glossary: Record<string, { label: string; short: string; detail: string; icon: string }>;
    featuredVisuals: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: string;
      bullets: string[];
      diagram: { type: 'chaos' | 'orgVsVehicle' | 'regTree' | 'granularity' };
    }>;
    raciMini: {
      legend: Array<{ key: string; label: string; hint: string }>;
      roles: Array<{ id: string; label: string; icon: string }>;
      tasks: Array<{ id: string; label: string; cells: Record<string, string> }>;
    };
  };
};

export type PortfolioProject = Project & {
  impactCards?: ImpactCardItem[];
  caseStudy?: CaseStudySections;
  portfolioKit?: PortfolioKitData;
  kovon?: KovonConfig;
};

export type PortfolioSource = Record<string, PortfolioProject>;