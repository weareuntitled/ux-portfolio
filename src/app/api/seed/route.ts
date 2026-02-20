import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms/payload';
import { cmsConfig } from '@/lib/cms/config';
import { seedProjects } from '@/lib/cms/seed-projects';
import { seedFirstUser } from '@/lib/cms/seed-first-user';

/**
 * POST /api/seed?secret=<PREVIEW_SECRET>
 * Seeds projects and creates first admin user when none exist.
 * After seeding, log in at /admin with ADMIN_EMAIL / ADMIN_PASSWORD (default: admin@localhost / admin).
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== cmsConfig.previewSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayloadClient();
    const [projectResult, userResult] = await Promise.all([
      seedProjects(payload),
      seedFirstUser(payload),
    ]);
    return NextResponse.json({
      ok: true,
      projects: { created: projectResult.created, skipped: projectResult.skipped },
      adminUser: userResult.created
        ? { created: true, email: cmsConfig.adminEmail, hint: 'Log in at /admin with this email and ADMIN_PASSWORD' }
        : { created: false },
    });
  } catch (err) {
    console.error('Seed failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
