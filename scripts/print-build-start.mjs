/**
 * npm runs `prebuild` before `build`. Next.js often prints the version banner then goes
 * quiet for several minutes while webpack compiles (especially on Windows + Payload).
 */
console.log(`
>>> Production build
>>> After the Next.js version lines, webpack may show no output for 2–6 minutes — that is normal.
>>> Progress lines like [build] 10% … will appear if compilation is running.
>>> Tip: stop other heavy apps; exclude the project folder from real-time antivirus if builds hang.
>>> Prebuild wipes .next/ — avoids Windows ENOENT rename errors (e.g. export/500.html) from stale output.
`);
