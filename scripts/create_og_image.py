import subprocess
import os

out_og = "public/images/og-plb-reformas.jpg"

# 1200x630 Open Graph Image
# Base: crop hero poster to 1200x630, dark overlay, high contrast
# ffmpeg filter_complex:
# scale 1920:1080 -> 1200x675 -> crop 1200:630 -> drawbox dark overlay -> text or logo overlay

filter_str = (
    "scale=1200:675,"
    "crop=1200:630:0:22,"
    "drawbox=y=0:color=black@0.45:width=iw:height=ih:t=fill"
)

cmd = [
    "ffmpeg", "-y",
    "-i", "public/images/hero-benidorm-poster.jpg",
    "-vf", filter_str,
    "-q:v", "4",
    out_og
]

subprocess.run(cmd, check=True)
sz = os.path.getsize(out_og)
print(f"OG Image generated: {sz/1024:.1f} KB ({sz} bytes)")
