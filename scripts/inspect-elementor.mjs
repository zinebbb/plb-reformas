import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');

// Find all elements with class containing 'elementor-top-section'
const topSections = [...html.matchAll(/<div[^>]*class="[^"]*elementor-top-section[^"]*"[^>]*>([\s\S]*?)<\/div>(?=\s*<div[^>]*class="[^"]*elementor-top-section|$)/gi)];
console.log(`Found ${topSections.length} top sections`);

topSections.forEach((s, idx) => {
  const content = s[1];
  const text = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                      .replace(/<script[\s\S]*?<\/script>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim();
  if (text.length > 5) {
    console.log(`\n--- ELEMENTOR TOP SECTION ${idx+1} ---`);
    console.log(text.slice(0, 400));
  }
});
