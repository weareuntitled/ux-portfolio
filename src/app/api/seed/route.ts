import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms/payload';
import { cmsConfig } from '@/lib/cms/config';
import { seedProjects } from '@/lib/cms/seed-projects';

/**
 * POST /api/seed?secret=<PREVIEW_SECRET>
 * Seeds the Payload projects collection from static content.
 * Run inside Next.js so Payload env loading works. Use PREVIEW_SECRET to authorize.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== cmsConfig.previewSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayloadClient();
    const result = await seedProjects(payload);
    return NextResponse.json({
      ok: true,
      created: result.created,
      skipped: result.skipped,
    });
  } catch (err) {
    console.error('Seed failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
