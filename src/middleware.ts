import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // #region agent log
  const host = process.env.DEBUG_LOG_HOST || '127.0.0.1';
  const url = `http://${host}:7242/ingest/9b6844da-ffd2-40ff-ba1b-c7e5afce02c1`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'middleware.ts:7',
      message: 'Request received',
      data: { path: request.nextUrl.pathname, method: request.method },
      timestamp: Date.now(),
      hypothesisId: 'H3',
      runId: 'post-fix',
    }),
  }).catch(() => {});
  // #endregion

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
