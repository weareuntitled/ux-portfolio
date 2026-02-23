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

/**
 * Resets the password of the admin user matching ADMIN_EMAIL to ADMIN_PASSWORD.
 * Use when you know the user exists but the password in DB doesn't match .env (e.g. after env change).
 */
export async function resetAdminPassword(payload: Payload): Promise<{ updated: boolean }> {
  const result = await payload.find({
    collection: 'users',
    where: { email: { equals: cmsConfig.adminEmail } },
    limit: 1,
    overrideAccess: true,
  });

  if (result.docs.length === 0) {
    return { updated: false };
  }

  await payload.update({
    collection: 'users',
    id: result.docs[0].id,
    data: { password: cmsConfig.adminPassword },
    overrideAccess: true,
  });

  return { updated: true };
}
