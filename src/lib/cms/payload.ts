import { cache } from 'react';
import type { Where } from 'payload';
import type { CmsProject, CmsProjectDefaults, ResolvedProject } from './types';
import type { PortfolioProject } from '@/content/portfolio.types';
import { getAllProjects, getProjectBySlug as getPortfolioProjectBySlug } from '@/content/portfolio';

/** Map portfolio project (single source) to CmsProject for fallback when CMS has no data. */
function portfolioProjectToCmsProject(p: PortfolioProject): CmsProject {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    navTitle: p.navTitle ?? null,
    subtitle: p.subtitle ?? null,
    roleLine: p.roleLine ?? null,
    oneLiner: p.oneLiner,
    category: p.category,
    year: p.year,
    client: p.client ?? null,
    roles: (p.roles ?? []).map((role) => ({ role })),
    context: p.context ?? null,
    problem: p.problem ?? null,
    solution: p.solution ?? null,
    outcomes: (p.outcomes ?? []).map((item) => ({ item })),
    metrics: (p.metrics ?? []).map((item) => ({ item })),
    highlights: (p.highlights ?? []).map((item) => ({ item })),
    tools: (p.tools ?? []).map((item) => ({ item })),
    methods: (p.methods ?? []).map((item) => ({ item })),
    tags: (p.tags ?? []).map((item) => ({ item })),
    links: p.links?.map((l) => ({ label: l.label, href: l.href })) ?? undefined,
    prototype: p.prototype
      ? {
          prototypeType: p.prototype.prototypeType ?? null,
          inAppPrototypeHref: p.prototype.inAppPrototypeHref ?? null,
          figmaEmbedUrl: p.prototype.figmaEmbedUrl ?? null,
          figmaFileUrl: p.prototype.figmaFileUrl ?? null,
          hints: (p.prototype.hints ?? []).map((hint) => ({ hint })),
        }
      : null,
    prototypeButtonLabel: p.prototypeButtonLabel ?? null,
    moodImage: p.moodImageUrl ?? null,
    cover: p.cover ?? null,
    coverFallback: p.coverFallback ?? null,
    teamSize: p.teamSize ?? null,
    customerAbout: p.customerAbout ?? null,
    workflow: p.workflow ?? null,
    notes: p.notes ?? null,
    impact: p.impact ?? undefined,
    gallery:
      p.galleryUrls?.map((url) => ({
        image: url,
      })) ?? undefined,
    metaCards: p.metaCards ?? null,
    deliveryImpact: p.deliveryImpact ?? null,
    impactCards: p.impactCards ?? null,
  };
}

// Local Payload API helper.
// Cached per request so we only init Payload once per request.
export const getPayloadClient = cache(async function getPayloadClient() {
  const [{ getPayload }, config] = await Promise.all([
    import('payload'),
    import('../../../payload.config'),
  ]);

  return getPayload({ config: config.default });
});

type DraftModeFlag = {
  draftMode: boolean;
};

export async function getProjectDefaults({ draftMode }: DraftModeFlag): Promise<CmsProjectDefaults> {
  const payload = await getPayloadClient();

  const global = await payload.findGlobal({
    slug: 'project-defaults',
    depth: 1,
    draft: draftMode,
    overrideAccess: true,
  });

  return global as unknown as CmsProjectDefaults;
}

export async function getProjects({ draftMode }: DraftModeFlag): Promise<CmsProject[]> {
  const payload = await getPayloadClient();

  const where: Where = draftMode
    ? {}
    : {
        _status: {
          equals: 'published',
        },
      };

  const result = await payload.find({
    collection: 'projects',
    where,
    depth: 1,
    draft: draftMode,
    limit: 100,
    sort: '-updatedAt',
    overrideAccess: true,
  });

  const docs = result.docs as unknown as CmsProject[];
  if (docs.length === 0) {
    const portfolioProjects = getAllProjects();
    return portfolioProjects.map(portfolioProjectToCmsProject);
  }
  return docs;
}

export async function getProjectBySlug(
  slug: string,
  { draftMode }: DraftModeFlag,
): Promise<CmsProject | null> {
  const payload = await getPayloadClient();

  const where: Where = {
    slug: {
      equals: slug,
    },
    ...(draftMode
      ? {}
      : {
          _status: {
            equals: 'published',
          },
        }),
  };

  const result = await payload.find({
    collection: 'projects',
    where,
    depth: 1,
    draft: draftMode,
    limit: 1,
    overrideAccess: true,
  });

  const [project] = result.docs as unknown as CmsProject[];
  if (project) return project;
  const portfolioProject = getPortfolioProjectBySlug(slug);
  return portfolioProject ? portfolioProjectToCmsProject(portfolioProject) : null;
}

export function resolveProject(
  defaults: CmsProjectDefaults | null | undefined,
  project: CmsProject,
): ResolvedProject {
  const slug = project.slug ?? project.id;

  // Map array-of-objects to simple string arrays, applying defaults when needed.
  const mapArray = <T extends { [key: string]: string }>(
    value: T[] | undefined,
    key: keyof T,
    fallback: string[] = [],
  ): string[] => {
    if (value && value.length > 0) {
      return value.map((v) => String(v[key]));
    }
    return fallback;
  };

  const defaultTags = mapArray(defaults?.defaultTags ?? [], 'tag');
  const defaultMethods = mapArray(defaults?.defaultMethods ?? [], 'method');
  const defaultTools = mapArray(defaults?.defaultTools ?? [], 'tool');

  const roles = mapArray(project.roles ?? [], 'role');
  const tags = mapArray(project.tags ?? [], 'item', defaultTags);
  const methods = mapArray(project.methods ?? [], 'item', defaultMethods);
  const tools = mapArray(project.tools ?? [], 'item', defaultTools);
  const outcomes = mapArray(project.outcomes ?? [], 'item');
  const metrics = mapArray(project.metrics ?? [], 'item');
  const highlights = mapArray(project.highlights ?? [], 'item');

  const protoHints = mapArray(project.prototype?.hints ?? [], 'hint');

  const links =
    project.links?.map((link) => ({
      label:
        link.label === 'Live table'
          ? 'Live demo'
          : (link.label as 'Live demo' | 'Case study' | 'GitHub'),
      href: link.href,
    })) ?? [];

  let moodImage: string | undefined;
  if (project.moodImage != null && typeof project.moodImage === 'object' && 'url' in project.moodImage) {
    moodImage = (project.moodImage as { url?: string }).url;
  } else if (typeof project.moodImage === 'string' && project.moodImage) {
    moodImage = project.moodImage;
  } else {
    // Fallback: static project images from public/projects/
    const slugToImage: Record<string, string> = {
      kovon: '/projects/kovon_hero.jpg',
      'ffp-dashboard': '/projects/ffp_dashboard_hero.jpg',
      'emission-compliance': '/projects/emission_compliance_hero.jpg',
      automation: '/projects/sap_automation_bot_hero.png',
      fixundfertig: '/projects/fixundfertig_preview.jpg',
    };
    moodImage = slugToImage[slug] ?? undefined;
  }
  let galleryUrls =
    project.gallery?.map((g) => {
      const img = g.image;
      return typeof img === 'object' && img != null && 'url' in img ? (img as { url?: string }).url : undefined;
    }).filter((u): u is string => Boolean(u)) ?? [];

  if (galleryUrls.length === 0) {
    const slugToGallery: Record<string, string[]> = {
      kovon: [
        '/projects/kovon_gallery_01.jpg',
        '/projects/kovon_gallery_03.jpg',
        '/projects/kovon_gallery_04.jpg',
        '/projects/kovon_gallery_05.jpg',
        '/projects/kovon_gallery_06.jpg',
        '/projects/kovon_gallery_07.jpg',
      ],
      'ffp-dashboard': [
        '/projects/ffp_gallery_01.png',
        '/projects/ffp_gallery_02.png',
        '/projects/ffp_gallery_03.png',
        '/projects/ffp_gallery_04.png',
        '/projects/ffp_gallery_05.png',
        '/projects/ffp_gallery_06.png',
        '/projects/ffp_gallery_07.png',
        '/projects/ffp_gallery_08.png',
        '/projects/ffp_gallery_09.png',
        '/projects/ffp_gallery_10.png',
        '/projects/ffp_gallery_11.png',
        '/projects/ffp_gallery_12.png',
      ],
      'emission-compliance': [
        '/projects/ceasar_gallery_01.png',
        '/projects/ceasar_gallery_02.png',
        '/projects/ceasar_gallery_03.png',
        '/projects/ceasar_gallery_04.png',
        '/projects/ceasar_gallery_05.png',
        '/projects/ceasar_gallery_06.png',
        '/projects/ceasar_gallery_07.png',
        '/projects/ceasar_gallery_08.png',
        '/projects/ceasar_gallery_09.png',
        '/projects/ceasar_gallery_10.png',
        '/projects/ceasar_gallery_11.png',
      ],
    };
    galleryUrls = slugToGallery[slug] ?? [];
  }

  const impact = project.impact?.map((i) => ({ label: i.label, value: i.value })) ?? [];

  // Unified cover: prefer explicit cover, then mood image, else null
  const coverUrl = project.cover && project.cover.length > 0 ? project.cover : moodImage ?? undefined;

  const deliveryImpact = {
    delivery: project.deliveryImpact?.delivery ?? [],
    impact: project.deliveryImpact?.impact ?? [],
    learned: project.deliveryImpact?.learned ?? [],
  };
  const hasDeliveryImpact =
    (deliveryImpact.delivery && deliveryImpact.delivery.length > 0) ||
    (deliveryImpact.impact && deliveryImpact.impact.length > 0) ||
    (deliveryImpact.learned && deliveryImpact.learned.length > 0);

  const base: Partial<ResolvedProject> = {
    id: slug,
    slug,
    title: project.title ?? slug,
    navTitle: project.navTitle ?? project.title ?? slug,
    subtitle: project.subtitle ?? undefined,
    roleLine: project.roleLine ?? undefined,
    oneLiner: project.oneLiner ?? '',
    category: (project.category as ResolvedProject['category']) ?? 'Enterprise',
    year: project.year ?? '',
    client: project.client ?? undefined,
    roles,
    context: project.context ?? '',
    problem: project.problem ?? '',
    solution: project.solution ?? '',
    outcomes,
    metrics,
    highlights,
    tools,
    methods,
    tags,
    links,
    prototype: project.prototype
      ? {
          prototypeType: project.prototype.prototypeType ?? undefined,
          inAppPrototypeHref: project.prototype.inAppPrototypeHref ?? undefined,
          figmaEmbedUrl: project.prototype.figmaEmbedUrl ?? undefined,
          figmaFileUrl: project.prototype.figmaFileUrl ?? undefined,
          hints: protoHints,
        }
      : undefined,
    prototypeButtonLabel: project.prototypeButtonLabel ?? undefined,
    moodImageUrl: moodImage,
    teamSize: project.teamSize ?? undefined,
    customerAbout: project.customerAbout ?? undefined,
    workflow: project.workflow ?? undefined,
    notes: project.notes ?? undefined,
    impact: impact.length > 0 ? impact : undefined,
    galleryUrls: galleryUrls.length > 0 ? galleryUrls : undefined,
    cover: project.cover ?? undefined,
    coverFallback: project.coverFallback ?? undefined,
    metaCards: project.metaCards ?? [],
    deliveryImpact: hasDeliveryImpact ? deliveryImpact : { delivery: [], impact: [] },
    // Unified cover URL for all components to consume
    // Prefer explicit cover, then mood image; guarded by resolver.
    coverUrl,
    impactCards: project.impactCards ?? undefined,
  };

  return base as ResolvedProject;
}

