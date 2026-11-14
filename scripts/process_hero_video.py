import subprocess
import json
import os

video_in = "../originales-plb/hero-benidorm-costa-blanca.mp4"

# Probe video
probe_cmd = [
    "ffprobe", "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    video_in
]
dur = float(subprocess.check_output(probe_cmd).decode().strip())
print(f"Original duration: {dur}s")

# Let's inspect scene changes or test trimming to 14 seconds
# The user wants: "de 12-15 s como máximo si se puede recortar sin que se note el salto"
# Let's create desktop and mobile versions:
# a) Escritorio: 1280x720, mp4 (H.264, CRF 28-30) y webm (VP9), max 3.5 MB
# b) Móvil (hasta 768px): 720x406, mp4 y webm, max 1.5 MB

# Let's test a 14s cut (0s to 14s)
# First check what is in 0-14s
out_dir = "public/video"
os.makedirs(out_dir, exist_ok=True)

# 1. Desktop MP4 (1280x720, H.264, CRF 28, faststart, no audio)
cmd_d_mp4 = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
    "-c:v", "libx264", "-crf", "28", "-preset", "slow",
    "-an", "-movflags", "+faststart",
    os.path.join(out_dir, "hero-desktop.mp4")
]
print("Encoding Desktop MP4...")
subprocess.run(cmd_d_mp4, check=True)

# 2. Desktop WebM (1280x720, VP9, CRF 32, no audio)
cmd_d_webm = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
    "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0",
    "-an",
    os.path.join(out_dir, "hero-desktop.webm")
]
print("Encoding Desktop WebM...")
subprocess.run(cmd_d_webm, check=True)

# 3. Mobile MP4 (720x406, H.264, CRF 30, faststart, no audio)
cmd_m_mp4 = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=720:406:force_original_aspect_ratio=decrease,pad=720:406:(ow-iw)/2:(oh-ih)/2",
    "-c:v", "libx264", "-crf", "30", "-preset", "slow",
    "-an", "-movflags", "+faststart",
    os.path.join(out_dir, "hero-mobile.mp4")
]
print("Encoding Mobile MP4...")
subprocess.run(cmd_m_mp4, check=True)

# 4. Mobile WebM (720x406, VP9, CRF 35, no audio)
cmd_m_webm = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=720:406:force_original_aspect_ratio=decrease,pad=720:406:(ow-iw)/2:(oh-ih)/2",
    "-c:v", "libvpx-vp9", "-crf", "35", "-b:v", "0",
    "-an",
    os.path.join(out_dir, "hero-mobile.webm")
]
print("Encoding Mobile WebM...")
subprocess.run(cmd_m_webm, check=True)

for f in ["hero-desktop.mp4", "hero-desktop.webm", "hero-mobile.mp4", "hero-mobile.webm"]:
    p = os.path.join(out_dir, f)
    sz = os.path.getsize(p)
    print(f"{f}: {sz / (1024*1024):.2f} MB ({sz} bytes)")
