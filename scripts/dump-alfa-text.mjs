import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');

// Find all text nodes or headings in order
const lines = [];
const tagRegex = /<(h[1-6]|p|a|span|button)[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while ((m = tagRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 3 && !text.includes('{') && !text.includes('function') && !text.includes('var ')) {
    lines.push(`[${m[1].toUpperCase()}] ${text}`);
  }
}

console.log('Total text elements:', lines.length);
// print first 60 unique non-empty elements
const seen = new Set();
for (const l of lines) {
  if (!seen.has(l)) {
    seen.add(l);
    console.log(l);
  }
}
