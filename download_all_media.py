import re
import os
import urllib.request

base_url = 'https://pleasurein.my.id/handdrawing-id/'

all_assets = set()

for root, dirs, files in os.walk('_assets'):
    for file in files:
        filepath = os.path.join(root, file)
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # find references to images, fonts, svgs, etc.
                matches = re.findall(r'(_assets/[a-zA-Z0-9_\-\.\/]+?\.(?:png|jpg|jpeg|gif|svg|woff2|woff|ttf|eot|webp))', content)
                for m in matches:
                    all_assets.add(m)
                
                # find relative urls like url(...)
                url_matches = re.findall(r'url\(["\']?([^"\'\)]+?\.(?:png|jpg|jpeg|gif|svg|woff2|woff|ttf|eot|webp))["\']?\)', content)
                for u in url_matches:
                    if not u.startswith('http') and not u.startswith('data:'):
                        if not u.startswith('_assets/'):
                            u = '_assets/' + u.lstrip('./')
                        all_assets.add(u)
        except Exception as e:
            print(f"Error reading {filepath}: {e}")

print(f"Found {len(all_assets)} asset references:")
for a in sorted(all_assets):
    print(a)

for a in sorted(all_assets):
    url = base_url + a
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            os.makedirs(os.path.dirname(a), exist_ok=True)
            with open(a, 'wb') as out:
                out.write(data)
            print(f"Successfully downloaded {a} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {a}: {e}")
