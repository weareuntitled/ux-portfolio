import fetch from 'node-fetch';

async function run() {
  const chunks = [
    'https://framerusercontent.com/sites/212KYI58qqC6Q51vP4xkqA/script_main.Dj0yusPo.mjs',
    'https://framerusercontent.com/sites/212KYI58qqC6Q51vP4xkqA/iCTnPTfpO.Bl1_7D0W.mjs',
    'https://framerusercontent.com/sites/212KYI58qqC6Q51vP4xkqA/zdbWz5Tgh.DKAf_ih-.mjs'
  ];

  for (const url of chunks) {
    console.log(`\nScanning chunk: ${url}`);
    const res = await fetch(url);
    const code = await res.text();

    // Look for vjqe97 or contrast or CSS injection
    if (code.includes('vjqe97') || code.includes('contrast(')) {
      console.log('Found match!');
      const index = code.indexOf('vjqe97') || code.indexOf('contrast(');
      console.log(code.slice(Math.max(0, index - 200), index + 500));
    }

    // Look for styles
    const stylesRegex = /css:\s*"([^"]+)"/g;
    let match;
    while ((match = stylesRegex.exec(code)) !== null) {
      const css = match[1];
      if (css.includes('vjqe97') || css.includes('contrast(')) {
        console.log('Found CSS match inside JS!');
        console.log(css.slice(0, 500));
      }
    }
  }
}

run().catch(console.error);
