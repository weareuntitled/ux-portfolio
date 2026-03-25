/**
 * Scan src/app/images/kontrast and write src/content/kontrast-manifest.json
 * (filenames only — images are served via /api/kontrast/post?f=...)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dir = path.join(root, 'src', 'app', 'images', 'kontrast');
const out = path.join(root, 'src', 'content', 'kontrast-manifest.json');

const IMAGE = /\.(webp|jpe?g|png|gif)$/i;

function main() {
  if (!fs.existsSync(dir)) {
    console.warn('⚠️  Kontrast folder missing:', dir);
    fs.writeFileSync(out, JSON.stringify({ files: [] }, null, 2), 'utf8');
    return;
  }

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMAGE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  fs.writeFileSync(out, JSON.stringify({ files }, null, 2), 'utf8');
  console.log(`✅ Kontrast manifest: ${files.length} images → ${path.relative(root, out)}`);
}

main();
