import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { NextResponse } from 'next/server';

const KONTRAST_DIR = path.join(process.cwd(), 'src', 'app', 'images', 'kontrast');

function contentType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  return 'application/octet-stream';
}

/** Single-file read; `f` must be a plain basename (no path segments). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get('f');
  if (!raw) {
    return NextResponse.json({ error: 'Missing f parameter' }, { status: 400 });
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid encoding' }, { status: 400 });
  }

  const base = path.basename(decoded);
  if (base !== decoded || base.includes('..') || base === '.' || base === '..') {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  if (!/\.(webp|jpe?g|png|gif)$/i.test(base)) {
    return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
  }

  const full = path.join(KONTRAST_DIR, base);
  const resolved = path.resolve(full);
  const rootResolved = path.resolve(KONTRAST_DIR);
  const rel = path.relative(rootResolved, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  try {
    const buf = await readFile(resolved);
    return new NextResponse(buf, {
      headers: {
        'Content-Type': contentType(base),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
