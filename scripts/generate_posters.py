import subprocess
import os

img_in = "public/images/hero-benidorm-poster.jpg"
out_dir = "public/images"

# 1. Desktop WebP (1920x1080) ~89 KB
subprocess.run([
    "ffmpeg", "-y", "-i", img_in,
    "-vf", "scale=1920:1080",
    "-c:v", "libwebp", "-quality", "20",
    os.path.join(out_dir, "hero-benidorm-poster-desktop.webp")
], check=True)

# 2. Desktop AVIF (1920x1080) ~79 KB
subprocess.run([
    "ffmpeg", "-y", "-i", img_in,
    "-vf", "scale=1920:1080",
    "-c:v", "libaom-av1", "-crf", "40", "-b:v", "0", "-cpu-used", "6",
    os.path.join(out_dir, "hero-benidorm-poster-desktop.avif")
], check=True)

# 3. Mobile WebP (768x432) ~32 KB
subprocess.run([
    "ffmpeg", "-y", "-i", img_in,
    "-vf", "scale=768:432",
    "-c:v", "libwebp", "-quality", "75",
    os.path.join(out_dir, "hero-benidorm-poster-mobile.webp")
], check=True)

# 4. Mobile AVIF (768x432) ~13 KB
subprocess.run([
    "ffmpeg", "-y", "-i", img_in,
    "-vf", "scale=768:432",
    "-c:v", "libaom-av1", "-crf", "38", "-b:v", "0", "-cpu-used", "6",
    os.path.join(out_dir, "hero-benidorm-poster-mobile.avif")
], check=True)

for f in ["hero-benidorm-poster-desktop.avif", "hero-benidorm-poster-desktop.webp", "hero-benidorm-poster-mobile.avif", "hero-benidorm-poster-mobile.webp"]:
    p = os.path.join(out_dir, f)
    sz = os.path.getsize(p)
    print(f"{f}: {sz/1024:.1f} KB ({sz} bytes)")
