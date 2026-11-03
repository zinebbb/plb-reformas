import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');

// 1. Google fonts
const gfonts = [...html.matchAll(/fonts\.googleapis\.com\/css2?[^"']+/gi)].map(m => m[0]);
console.log('=== GOOGLE FONTS ===');
console.log([...new Set(gfonts)]);

// 2. Headings and structure
const headings = [];
const regex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  headings.push({ tag: match[1], text });
}
console.log('\n=== HEADINGS ===');
headings.forEach(h => console.log(`${h.tag.toUpperCase()}: ${h.text}`));

// 3. Text content / paragraphs
const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
const paragraphs = [];
while ((match = pRegex.exec(html)) !== null) {
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 10) paragraphs.push(text);
}
console.log('\n=== PARAGRAPHS (' + paragraphs.length + ') ===');
paragraphs.forEach((p, i) => console.log(`[${i+1}] ${p}`));

// 4. Color codes in CSS / style attributes
const colors = [...html.matchAll(/#(?:[0-9a-fA-F]{3,8})\b|rgb\([^)]+\)|rgba\([^)]+\)/g)].map(m => m[0]);
const colorCounts = {};
colors.forEach(c => { colorCounts[c] = (colorCounts[c] || 0) + 1; });
const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
console.log('\n=== TOP COLORS ===');
sortedColors.slice(0, 15).forEach(([c, count]) => console.log(`${c}: ${count}`));
