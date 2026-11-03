import { spawn } from 'node:child_process';
import path from 'node:path';

const v1 = '/home/zineb/workdir/web-project/photos/12623219_3840_2160_50fps.mp4';
const v2 = '/home/zineb/workdir/web-project/photos/16242404_1920_1080_30fps.mp4';
const out = '/home/zineb/workdir/web-project/public/videos/hero-benidorm-costa-blanca.mp4';

// 3 segments:
// 1. Benidorm skyline & sea: start 8s, duration 7.5s
// 2. Costa Blanca cove & cliffs: start 4s, duration 7.5s
// 3. Benidorm beach curve & towers: start 68s, duration 7.5s
// 1.2s crossfade between segments.
// Total duration: 7.5 + 7.5 - 1.2 + 7.5 - 1.2 = 20.1s.

const filterComplex = [
  '[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,settb=AVTB,setpts=PTS-STARTPTS[v0]',
  '[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,settb=AVTB,setpts=PTS-STARTPTS[v1]',
  '[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,settb=AVTB,setpts=PTS-STARTPTS[v2]',
  '[v0][v1]xfade=transition=fade:duration=1.2:offset=6.3[xf1]',
  '[xf1][v2]xfade=transition=fade:duration=1.2:offset=12.6[outv]'
].join(';');

const args = [
  '-y',
  '-ss', '8', '-t', '7.5', '-i', v1,
  '-ss', '4', '-t', '7.5', '-i', v2,
  '-ss', '68', '-t', '7.5', '-i', v1,
  '-filter_complex', filterComplex,
  '-map', '[outv]',
  '-an',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'slow',
  '-crf', '25',
  '-movflags', '+faststart',
  out
];

console.log('Running ffmpeg...');
const proc = spawn('ffmpeg', args, { stdio: 'inherit' });

proc.on('close', (code) => {
  if (code === 0) {
    console.log('Successfully generated hero video at', out);
    const poster = '/home/zineb/workdir/web-project/public/images/hero-benidorm-poster.jpg';
    const posterProc = spawn('ffmpeg', ['-y', '-ss', '1.5', '-i', out, '-vframes', '1', '-q:v', '2', poster], { stdio: 'inherit' });
    posterProc.on('close', (pCode) => {
      if (pCode === 0) console.log('Successfully generated poster at', poster);
    });
  } else {
    console.error('ffmpeg failed with code', code);
    process.exit(code);
  }
});
