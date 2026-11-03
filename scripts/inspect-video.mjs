import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');

// Find all classes used on containers
const classMatches = [...html.matchAll(/class="([^"]*)"/g)].map(m => m[1]);
console.log('Sample classes:');
const uniqueClasses = [...new Set(classMatches.flatMap(c => c.split(/\s+/)))];
console.log(uniqueClasses.filter(c => c.includes('elementor') || c.includes('hero') || c.includes('header') || c.includes('video')).slice(0, 30));

// Find where video or hero appears
const videoIdx = html.indexOf('Web-video-cropped-1.mov');
console.log('\nVideo context:');
if (videoIdx !== -1) {
  console.log(html.slice(Math.max(0, videoIdx - 500), Math.min(html.length, videoIdx + 800)));
}
