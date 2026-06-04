import fetch from 'node-fetch';

async function run() {
  console.log('Fetching index HTML...');
  const res = await fetch('https://mattahrens.design/');
  const html = await res.text();

  // Find all .mjs URLs
  const urls = [];
  const regex = /https:\/\/[^"]+\.mjs/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[0]);
  }

  console.log(`Found ${urls.length} .mjs URLs.`);

  for (const url of urls) {
    console.log(`Checking: ${url}`);
    try {
      const scriptRes = await fetch(url);
      const code = await scriptRes.text();

      if (code.includes('vjqe97') || code.includes('n0d1ct') || code.includes('contrast(')) {
        console.log(`\n%cMATCH FOUND IN: ${url}`, 'color: #22c55e; font-weight: bold;');
        
        // Find positions
        const matches = ['vjqe97', 'n0d1ct', 'contrast('];
        for (const m of matches) {
          let pos = 0;
          while ((pos = code.indexOf(m, pos)) !== -1) {
            console.log(`\nMatch for "${m}" at pos ${pos}:`);
            console.log(code.slice(Math.max(0, pos - 150), pos + 350));
            pos += m.length;
          }
        }
      }
    } catch (e) {
      console.error(`Failed to fetch ${url}`);
    }
  }
}

run().catch(console.error);
