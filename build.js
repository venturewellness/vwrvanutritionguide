// Netlify build step: injects the Firebase API key from an environment variable
// into index.html at build time, so the real key is never committed to GitHub.
// Set FIREBASE_API_KEY in Netlify: Site configuration → Environment variables.
// VW_FB_KEY is supported for the existing Netlify site configuration.

const fs = require('fs');
const path = require('path');

const apiKey = process.env.FIREBASE_API_KEY || process.env.VW_FB_KEY;
if (!apiKey) {
  console.error('ERROR: FIREBASE_API_KEY or VW_FB_KEY environment variable is not set in Netlify.');
  console.error('Add FIREBASE_API_KEY under Site configuration → Environment variables, or keep VW_FB_KEY configured, then redeploy.');
  process.exit(1);
}

const srcPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const outPath = path.join(outDir, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');
html = html.replace('__FIREBASE_API_KEY__', apiKey);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);

console.log('Build complete: injected FIREBASE_API_KEY into dist/index.html');
