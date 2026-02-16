// Centralized CMS-related environment configuration.
// Keeps Payload + Next.js env access in one place and avoids sprinkling process.env usage.

const booleanFromEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value == null) return defaultValue;
  return value === 'true' || value === '1';
};

const stringFromEnv = (value: string | undefined, defaultValue: string): string =>
  value && value.length > 0 ? value : defaultValue;

export const cmsConfig = {
  /**
   * Secret used by Payload for JWTs, CSRF, etc.
   * In production this MUST be a long, random string.
   */
  payloadSecret: process.env.PAYLOAD_SECRET ?? 'dev-change-me',

  /**
   * Public URL of the app, used by Payload in links/emails.
   */
  publicUrl: stringFromEnv(process.env.PAYLOAD_PUBLIC_URL, 'http://localhost:3000'),

  /**
   * Absolute or relative path to the SQLite DB file.
   * In Docker this should resolve inside the container, e.g. /data/payload.db.
   */
  sqlitePath: stringFromEnv(process.env.PAYLOAD_DB_SQLITE_PATH, './data/payload.db'),

  /**
   * Directory where Payload will store uploaded media files.
   * In Docker this should be a mounted volume, e.g. /uploads.
   */
  uploadsDir: stringFromEnv(process.env.PAYLOAD_UPLOADS_DIR, './uploads'),

  /**
   * Draft mode / preview secret shared between Next.js and Payload preview links.
   */
  previewSecret: process.env.PREVIEW_SECRET ?? 'dev-preview-secret',

  /**
   * Whether edit/admin features should be exposed.
   * In production you typically want this false except during maintenance windows.
   */
  editMode: booleanFromEnv(process.env.EDIT_MODE, process.env.NODE_ENV !== 'production'),
} as const;

export type CmsConfig = typeof cmsConfig;

