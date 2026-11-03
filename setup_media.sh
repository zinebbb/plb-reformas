#!/bin/bash
set -e
cd /home/zineb/workdir/web-project

mkdir -p public/images/thumbnails public/videos src/assets
cp photos/logo.jpeg public/images/logo.jpeg
cp photos/logo.jpeg src/assets/logo.jpeg

i=1
for f in photos/*.mp4; do
  [ -f  ] || continue
  clean_name=video-.mp4
  thumb_name=thumb-.jpg
  cp  public/videos/
  ffmpeg -y -ss 00:00:01 -i  -frames:v 1 -q:v 2 public/images/thumbnails/ -loglevel error
  echo Processed:
