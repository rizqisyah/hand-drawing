with open('index_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <base href="/handdrawing-id/"> with <base href="./">
html = html.replace('<base href="/handdrawing-id/">', '<base href="./">')

with open('canva_export.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved canva_export.html")
