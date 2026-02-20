/**
 * Seed is run via the Next.js API route so Payload's env loader works.
 *
 * 1. Start the app: npm run dev
 * 2. Run: npm run seed
 *    (or: curl -X POST "http://localhost:3000/api/seed?secret=YOUR_PREVIEW_SECRET")
 *
 * Do not run this file with tsx/node; Payload expects the Next.js context.
 */

console.log('Run the seed via the API while the app is running:');
console.log('  npm run dev');
console.log('  npm run seed');
console.log('Or: curl -X POST "http://localhost:3000/api/seed?secret=YOUR_PREVIEW_SECRET"');
process.exit(0);
