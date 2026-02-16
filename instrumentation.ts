export async function register() {
  // #region agent log
  const host = process.env.DEBUG_LOG_HOST || '127.0.0.1';
  const url = `http://${host}:7242/ingest/9b6844da-ffd2-40ff-ba1b-c7e5afce02c1`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'instrumentation.ts:5',
      message: 'Next.js server registered/started',
      data: { nodeEnv: process.env.NODE_ENV },
      timestamp: Date.now(),
      hypothesisId: 'H1',
    }),
  }).catch(() => {});
  // #endregion
}
