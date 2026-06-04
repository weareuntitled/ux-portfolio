import fetch from 'node-fetch';

async function run() {
  console.log('Fetching HTML...');
  const res = await fetch('https://mattahrens.design/');
  const html = await res.text();

  // Find all CSS links
  const cssUrls = [];
  const regex = /href="([^"]+\.css)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let url = match[1];
    if (url.startsWith('/')) {
      url = 'https://mattahrens.design' + url;
    }
    cssUrls.push(url);
  }

  console.log('Found CSS files:', cssUrls);

  for (const url of cssUrls) {
    console.log(`\nFetching stylesheet: ${url}`);
    const cssRes = await fetch(url);
    const css = await cssRes.text();

    // Grep for vjqe97
    const lines = css.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('vjqe97') || line.includes('wmij49') || line.includes('1dy0vfa') || line.includes('n6domq') || line.includes('contrast(')) {
        console.log(`Line ${idx + 1}: ${line.slice(0, 300)}...`);
      }
    });
  }
}

run().catch(console.error);
