import type { Payload } from 'payload';
import { cmsConfig } from './config';

/**
 * Creates the first admin user when none exist (for local editing).
 * Call from seed API so you can log in to /admin with ADMIN_EMAIL / ADMIN_PASSWORD.
 */
export async function seedFirstUser(payload: Payload): Promise<{ created: boolean }> {
  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    return { created: false };
  }

  await payload.create({
    collection: 'users',
    data: {
      email: cmsConfig.adminEmail,
      password: cmsConfig.adminPassword,
      name: 'Admin',
    },
    overrideAccess: true,
  });

  return { created: true };
}
