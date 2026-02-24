import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms/getPayloadClient';
import { cmsConfig } from '@/lib/cms/config';
import { seedProjects } from '@/lib/cms/seed-projects';
import { seedFirstUser, resetAdminPassword } from '@/lib/cms/seed-first-user';

/**
 * POST /api/seed?secret=<PREVIEW_SECRET> [&resetPassword=1]
 * Seeds projects and creates first admin user when none exist.
 * Use resetPassword=1 to set the existing admin user's password to ADMIN_PASSWORD from .env
 * (useful when login fails because the DB password doesn't match your .env).
 * After seeding, log in at /admin with ADMIN_EMAIL / ADMIN_PASSWORD.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== cmsConfig.previewSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resetPassword = searchParams.get('resetPassword') === '1' || searchParams.get('resetPassword') === 'true';

  try {
    const payload = await getPayloadClient();
    const [projectResult, userResult, resetResult] = await Promise.all([
      seedProjects(payload),
      seedFirstUser(payload),
      resetPassword ? resetAdminPassword(payload) : Promise.resolve({ updated: false }),
    ]);
    return NextResponse.json({
      ok: true,
      projects: { created: projectResult.created, skipped: projectResult.skipped },
      adminUser: userResult.created
        ? { created: true, email: cmsConfig.adminEmail, hint: 'Log in at /admin with this email and ADMIN_PASSWORD' }
        : { created: false },
      passwordReset: resetResult.updated
        ? { updated: true, email: cmsConfig.adminEmail, hint: 'Log in at /admin with ADMIN_EMAIL and ADMIN_PASSWORD from .env' }
        : resetPassword
          ? { updated: false, reason: 'No user found with ADMIN_EMAIL' }
          : undefined,
    });
  } catch (err) {
    console.error('Seed failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
