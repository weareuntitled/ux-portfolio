/**
 * Production server for `output: 'standalone'` builds.
 * Do not use `next start` — it breaks chunk resolution (e.g. vendor-chunks/motion-dom.js).
 * Usage: `node scripts/start-standalone.mjs` or `node scripts/start-standalone.mjs 3001`
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverJs = path.join(root, '.next', 'standalone', 'server.js');

if (!fs.existsSync(serverJs)) {
  console.error('Missing .next/standalone/server.js — run `npm run build` first.');
  process.exit(1);
}

const standalonePublic = path.join(root, '.next', 'standalone', 'public');
if (!fs.existsSync(standalonePublic)) {
  console.error(
    '\n[standalone] Missing .next/standalone/public — images will break.\n' +
      'Run: npm run sync:standalone   (or npm run build, which runs sync automatically)\n',
  );
  process.exit(1);
}

const portArg = process.argv[2];
const port = portArg && /^\d+$/.test(portArg) ? portArg : process.env.PORT || '3000';

const child = spawn(process.execPath, [serverJs], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(port) },
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
