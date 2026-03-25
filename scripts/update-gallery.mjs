// scripts/update-gallery.mjs
import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = './public/projects';
const OUTPUT_FILE = './src/content/gallery-map.json';
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const SLUG_MAPPING = {
  // existing
  'ceasar': 'emission-compliance',
  '8020': '8020-portfolio',
  'sap': 'automation',
  'arbeitsprobe': 'arbeitsprobe2022',
  'ffp': 'ffp-dashboard',
  'fixundfertig': 'fixundfertig',
  'architektur': 'architektur-ai',

  // add based on your actual filenames
  'emission': 'emission-compliance',
  'kontrast': 'kontrast-festival',
  'samani': 'samani-rebranding',
};

if (!fs.existsSync(PROJECTS_DIR)) {
  console.error(`❌ Ordner nicht gefunden: ${PROJECTS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(PROJECTS_DIR);
const galleryMap = {};

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!ALLOWED_EXTS.includes(ext)) return;

  // remove extension first (fixes 8020.png -> 8020)
  const nameNoExt = path.basename(file, ext);

  // IMPORTANT: do NOT split on '-', only on '_' and spaces
  const firstToken = nameNoExt.split(/[_\s]/)[0].toLowerCase();

  // If you renamed files to "<full-slug>_hero.jpg", firstToken will already be the full slug.
  // But if you still have older names like "Kontrast_01.png", mapping translates it.
  let slug = SLUG_MAPPING[firstToken] || firstToken;

  // Consulting process diagram lives under architektur-ai_* filenames but belongs to the enterprise AI strategy case.
  if (slug === 'architektur-ai' && nameNoExt.toLowerCase().includes('gallery_08_process')) {
    slug = 'strategic-ai-consulting';
  }

  if (!galleryMap[slug]) galleryMap[slug] = [];
  galleryMap[slug].push(`/projects/${file}`);
});

// sort
Object.keys(galleryMap).forEach((slug) => {
  galleryMap[slug].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryMap, null, 2));
console.log('✅ Gallery-Map aktualisiert!');