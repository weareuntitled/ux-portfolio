/**
 * Remove .next and node_modules/.cache — fixes ENOENT chunk / manifest / webpack pack errors
 * after interrupted dev, antivirus, or sync tools touching the build output.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

for (const rel of ['.next', path.join('node_modules', '.cache')]) {
  const target = path.join(root, rel);
  if (fs.existsSync(target)) {
    try {
      fs.rmSync(target, { recursive: true, force: true });
      console.log(`✅ Removed ${rel}`);
    } catch (e) {
      const code = e && typeof e === 'object' && 'code' in e ? e.code : '';
      if (code === 'EBUSY' || code === 'EPERM') {
        console.warn(
          `⚠️ Could not remove ${rel} (${code}: file in use). Stop \`npm run start\` / dev server and retry, or delete .next manually.`,
        );
      } else {
        throw e;
      }
    }
  } else {
    console.log(`— Skip (missing): ${rel}`);
  }
}
console.log('Clean done. Run: npm run dev');
