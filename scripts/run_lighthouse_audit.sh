#!/bin/bash
set -e

echo "Starting Lighthouse mobile audit on ES (http://127.0.0.1:4322/)..."
CHROME_PATH=/tmp/chrome-linux.sh npx lighthouse http://127.0.0.1:4322/ \
  --only-categories=performance \
  --form-factor=mobile \
  --screenEmulation.mobile=true \
  --throttling-method=simulate \
  --chrome-flags="--no-sandbox --disable-gpu --headless=new" \
  --output=json \
  --output-path=/tmp/lh-es-optimized.json

echo "Starting Lighthouse mobile audit on EN (http://127.0.0.1:4322/en/)..."
CHROME_PATH=/tmp/chrome-linux.sh npx lighthouse http://127.0.0.1:4322/en/ \
  --only-categories=performance \
  --form-factor=mobile \
  --screenEmulation.mobile=true \
  --throttling-method=simulate \
  --chrome-flags="--no-sandbox --disable-gpu --headless=new" \
  --output=json \
  --output-path=/tmp/lh-en-optimized.json

echo "Lighthouse completed successfully!"
