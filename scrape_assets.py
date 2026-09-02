import urllib.request
import re
import os
import json

base_url = 'https://pleasurein.my.id/handdrawing-id/'

req = urllib.request.Request(base_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')

with open('index_source.html', 'w', encoding='utf-8') as f:
    f.write(html)

css_files = re.findall(r'href=["\']([^"\']+\.css)["\']', html)
js_files = re.findall(r'src=["\']([^"\']+\.js)["\']', html)
preload_js = re.findall(r'href=["\']([^"\']+\.js)["\']', html)
images = re.findall(r'["\'](_assets/images/[^"\']+)["\']', html)

print('Found CSS:', css_files)
print('Found Images in HTML:', images)
print('Found JS:', list(set(js_files + preload_js)))
