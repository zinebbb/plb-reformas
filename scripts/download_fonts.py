import urllib.request
import re
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

fonts_dir = "public/fonts"
os.makedirs(fonts_dir, exist_ok=True)

def fetch_css(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode('utf-8')

# 1. Fraunces
fraunces_css = fetch_css("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,200&display=swap")
# Extract latin subset font url
print("Fraunces CSS:")
# print(fraunces_css)

# Parse font-face blocks
def parse_and_download(css, family_prefix):
    # Split by @font-face
    blocks = css.split('@font-face')
    for b in blocks:
        if 'latin' in b and 'url(' in b:
            # check subset comment or unicode-range
            # Usually latin is unicode-range: U+0000-00FF...
            url_match = re.search(r'url\((https://[^)]+)\)', b)
            weight_match = re.search(r'font-weight:\s*([^;]+);', b)
            style_match = re.search(r'font-style:\s*([^;]+);', b)
            subset_match = re.search(r'/\*\s*([^*]+)\s*\*/', b)
            
            subset = subset_match.group(1).strip() if subset_match else 'all'
            weight = weight_match.group(1).strip() if weight_match else 'normal'
            
            if subset == 'latin' and url_match:
                font_url = url_match.group(1)
                filename = f"{family_prefix}-{weight}.woff2"
                out_path = os.path.join(fonts_dir, filename)
                print(f"Downloading {filename} from {font_url}...")
                urllib.request.urlretrieve(font_url, out_path)
                print(f"Saved {out_path} ({os.path.getsize(out_path)} bytes)")

print("Processing Fraunces...")
parse_and_download(fraunces_css, "fraunces-200")

print("Processing Outfit...")
outfit_css = fetch_css("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap")
# Parse Outfit weights
blocks = outfit_css.split('@font-face')
for b in blocks:
    if 'latin' in b and 'url(' in b:
        url_match = re.search(r'url\((https://[^)]+)\)', b)
        weight_match = re.search(r'font-weight:\s*([^;]+);', b)
        subset_match = re.search(r'/\*\s*([^*]+)\s*\*/', b)
        
        subset = subset_match.group(1).strip() if subset_match else 'all'
        weight = weight_match.group(1).strip() if weight_match else 'normal'
        
        if subset == 'latin' and url_match and weight in ['300', '400', '500']:
            font_url = url_match.group(1)
            filename = f"outfit-{weight}.woff2"
            out_path = os.path.join(fonts_dir, filename)
            print(f"Downloading {filename} from {font_url}...")
            urllib.request.urlretrieve(font_url, out_path)
            print(f"Saved {out_path} ({os.path.getsize(out_path)} bytes)")
