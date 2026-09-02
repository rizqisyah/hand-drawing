import urllib.request
import re

url = 'http://localhost:3000/index.html'
try:
    with urllib.request.urlopen(url) as resp:
        content = resp.read().decode('utf-8')
        print(f'index.html loaded successfully! (Status: {resp.status}, Length: {len(content)})')
        
        imgs = re.findall(r'src=["\']([^"\']+)["\']', content)
        links = re.findall(r'href=["\']([^"\']+\.css)["\']', content)
        
        for item in imgs + links:
            if item.startswith('http'):
                continue
            item_url = f'http://localhost:3000/{item}'
            try:
                with urllib.request.urlopen(item_url) as r:
                    print(f'  [OK] {item} -> {r.status} ({len(r.read())} bytes)')
            except Exception as e:
                print(f'  [FAIL] {item} -> {e}')
except Exception as e:
    print('Failed to load:', e)
