import subprocess
import os

video_in = "../originales-plb/hero-benidorm-costa-blanca.mp4"
out_dir = "public/video"
os.makedirs(out_dir, exist_ok=True)

print("1. Encoding Desktop 1080p MP4 (H.264 CRF 26)...")
cmd_d_mp4 = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=1920:1080",
    "-c:v", "libx264", "-crf", "26", "-preset", "slow",
    "-an", "-movflags", "+faststart",
    os.path.join(out_dir, "hero-desktop.mp4")
]
subprocess.run(cmd_d_mp4, check=True)

print("2. Encoding Desktop 1080p WebM (VP9 CRF 32)...")
cmd_d_webm = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=1920:1080",
    "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-cpu-used", "4", "-row-mt", "1",
    "-an",
    os.path.join(out_dir, "hero-desktop.webm")
]
subprocess.run(cmd_d_webm, check=True)

print("3. Encoding Mobile 960x540 MP4 (H.264 CRF 25)...")
cmd_m_mp4 = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=960:540",
    "-c:v", "libx264", "-crf", "25", "-preset", "slow",
    "-an", "-movflags", "+faststart",
    os.path.join(out_dir, "hero-mobile.mp4")
]
subprocess.run(cmd_m_mp4, check=True)

print("4. Encoding Mobile 960x540 WebM (VP9 CRF 30)...")
cmd_m_webm = [
    "ffmpeg", "-y", "-ss", "0", "-t", "14",
    "-i", video_in,
    "-vf", "scale=960:540",
    "-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-cpu-used", "4", "-row-mt", "1",
    "-an",
    os.path.join(out_dir, "hero-mobile.webm")
]
subprocess.run(cmd_m_webm, check=True)

print("\n=== FINAL CRISP VIDEO ASSETS ===")
for f in ["hero-desktop.mp4", "hero-desktop.webm", "hero-mobile.mp4", "hero-mobile.webm"]:
    p = os.path.join(out_dir, f)
    sz = os.path.getsize(p)
    print(f"{f}: {sz / (1024*1024):.2f} MB ({sz} bytes)")
