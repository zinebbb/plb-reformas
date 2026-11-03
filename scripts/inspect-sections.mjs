import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');

// Find sections in order
const sectionMatches = [...html.matchAll(/<section[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/gi)];
console.log(`Found ${sectionMatches.length} sections`);

// Let's inspect the first 3 sections (Header/Hero/Pillars/Qué hacemos)
for (let i = 0; i < Math.min(sectionMatches.length, 6); i++) {
  const [full, cls, content] = sectionMatches[i];
  console.log(`\n================ SECTION ${i+1} [${cls}] ================`);
  const text = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                      .replace(/<script[\s\S]*?<\/script>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim();
  console.log('TEXT:', text.slice(0, 500));
}
