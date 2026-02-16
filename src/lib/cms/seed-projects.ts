import type { Payload } from 'payload';
import type { Project } from '@/content/projects';
import { projects as staticProjects } from '@/content/projects';

function toPayloadData(p: Project) {
  return {
    title: p.title,
    slug: p.slug,
    oneLiner: p.oneLiner,
    category: p.category,
    year: p.year,
    client: p.client ?? undefined,
    roles: (p.roles ?? []).map((role) => ({ role })),
    context: p.context ?? '',
    problem: p.problem ?? '',
    solution: p.solution ?? '',
    outcomes: (p.outcomes ?? []).map((item) => ({ item })),
    metrics: (p.metrics ?? []).map((item) => ({ item })),
    highlights: (p.highlights ?? []).map((item) => ({ item })),
    tools: (p.tools ?? []).map((item) => ({ item })),
    methods: (p.methods ?? []).map((item) => ({ item })),
    tags: (p.tags ?? []).map((item) => ({ item })),
    links:
      p.links?.map((l) => ({
        label: l.label,
        href: l.href,
      })) ?? [],
    prototype: p.prototype
      ? {
          prototypeType: p.prototype.prototypeType ?? undefined,
          inAppPrototypeHref: p.prototype.inAppPrototypeHref ?? undefined,
          figmaEmbedUrl: p.prototype.figmaEmbedUrl ?? undefined,
          figmaFileUrl: p.prototype.figmaFileUrl ?? undefined,
          hints: (p.prototype.hints ?? []).map((hint) => ({ hint })),
        }
      : undefined,
    prototypeButtonLabel: p.prototypeButtonLabel ?? undefined,
    teamSize: p.teamSize ?? undefined,
    customerAbout: p.customerAbout ?? undefined,
    workflow: p.workflow ?? undefined,
    notes: p.notes ?? undefined,
    impact:
      p.impact?.map((item) => ({ label: item.label, value: item.value })) ?? undefined,
    _status: 'published' as const,
  };
}

export type SeedResult = { created: number; skipped: number };

/**
 * Seeds the projects collection from static content. Idempotent (skips existing slugs).
 * Call from Next.js server (e.g. API route) so Payload env loading works.
 */
export async function seedProjects(payload: Payload): Promise<SeedResult> {
  let created = 0;
  let skipped = 0;

  for (const p of staticProjects) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: p.slug } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      skipped++;
      continue;
    }

    await payload.create({
      collection: 'projects',
      data: toPayloadData(p) as Parameters<Payload['create']>[0]['data'],
      overrideAccess: true,
    });
    created++;
  }

  return { created, skipped };
}
