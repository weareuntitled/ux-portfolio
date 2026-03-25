/**
 * After `next build` with output: 'standalone', copy static assets the server expects
 * while cwd is `.next/standalone`. Without this, next/image returns "isn't a valid image … received null"
 * for /profile.jpg, /projects/*, etc.
 *
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/output#cicd-build-copies
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const standalone = path.join(root, '.next', 'standalone');

function cpDir(src, dest, label) {
  if (!fs.existsSync(src)) {
    console.warn(`sync-standalone-assets: skip (missing): ${path.relative(root, src)} (${label})`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
  console.log(`✅ ${label}: → ${path.relative(root, dest)}`);
}

if (!fs.existsSync(path.join(standalone, 'server.js'))) {
  console.error('sync-standalone-assets: run `next build` first (.next/standalone/server.js missing).');
  process.exit(1);
}

cpDir(path.join(root, 'public'), path.join(standalone, 'public'), 'public');
cpDir(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), '.next/static');

// Safety net: copy `image-optimizer.js` if a trace still omits it (fast — one file).
// Primary fix: `outputFileTracingIncludes['**/*']` + `serverExternalPackages: ['sharp']` in next.config.ts
// (Payload merges into the same `**/*` key). Keep `sharp` in package.json dependencies.
const nextServerDir = path.join(root, 'node_modules', 'next', 'dist', 'server');
const standaloneNextServerDir = path.join(standalone, 'node_modules', 'next', 'dist', 'server');
const optimizerSrc = path.join(nextServerDir, 'image-optimizer.js');
if (fs.existsSync(optimizerSrc)) {
  if (!fs.existsSync(standaloneNextServerDir)) {
    fs.mkdirSync(standaloneNextServerDir, { recursive: true });
  }
  fs.copyFileSync(optimizerSrc, path.join(standaloneNextServerDir, 'image-optimizer.js'));
  console.log('✅ image-optimizer.js → standalone (quick copy)');
}

console.log('Standalone static assets synced.');
