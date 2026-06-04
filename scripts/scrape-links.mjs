import fetch from 'node-fetch';

async function run() {
  console.log('Fetching index HTML...');
  const res = await fetch('https://mattahrens.design/');
  const html = await res.text();

  console.log('HTML Head length:', html.length);
  
  // Print script tags
  const scriptRegex = /<script[^>]*src="([^"]+)"/g;
  let match;
  console.log('\nScript tags found:');
  while ((match = scriptRegex.exec(html)) !== null) {
    console.log(match[1]);
  }

  // Print link tags
  const linkRegex = /<link[^>]*href="([^"]+)"/g;
  console.log('\nLink tags found:');
  while ((match = linkRegex.exec(html)) !== null) {
    console.log(match[1]);
  }
}

run().catch(console.error);
