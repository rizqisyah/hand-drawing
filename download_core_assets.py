import json
import urllib.request
import re
import os

with open('extracted_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# In Canva exported websites, images and SVGs are identified by IDs like MAG..., MAH..., etc.
# Or hashed files in _assets/images/ or svg/
# Let's inspect CSS and JS files to see how assets are mapped!

base_url = 'https://pleasurein.my.id/handdrawing-id/'

def fetch_file(path):
    url = base_url + path
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'wb') as out:
                out.write(content)
            print(f"Downloaded {path} ({len(content)} bytes)")
            return content
    except Exception as e:
        print(f"Error fetching {path}: {e}")
        return None

# Download css and js
css_list = ['_assets/58e9202471a99cbb.ltr.css', '_assets/static_font_4.ltr.css']
js_list = ['_assets/83aa2bf2e19d4b6c.runtime.js', '_assets/fb765918bdc2d19b.s4le6a.vendor.js', '_assets/0fb5f701f46ae649.vendor.js', '_assets/a2f65ccb4fd71d8c.strings.js', '_assets/f57349a15bc5e41a.en-GB.js', '_assets/127526832514a2d5.js']

for c in css_list + js_list:
    fetch_file(c)

