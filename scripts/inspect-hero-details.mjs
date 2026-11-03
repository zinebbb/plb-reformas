import fs from 'node:fs';

const html = fs.readFileSync('/tmp/alfa_full.html', 'utf8');
const videoIdx = html.indexOf('Web-video-cropped-1.mov');
console.log('--- POST-VIDEO CONTENT (next 6000 chars) ---');
console.log(html.slice(videoIdx, videoIdx + 6000));
