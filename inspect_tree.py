import json
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

with open('extracted_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

page_root = data['page']['A']
sections = page_root.get("A", [])

def print_element(el, prefix="    "):
    txts = []
    if "a" in el and isinstance(el["a"], dict) and isinstance(el["a"].get("A"), list):
        for item in el["a"]["A"]:
            if isinstance(item, dict) and "A" in item and isinstance(item["A"], str):
                txts.append(item["A"].strip())
    t = " \n ".join([x for x in txts if x])
    if t:
        print(f"{prefix}[Text]\n{t}")
    if "a" in el and isinstance(el["a"], str) and el["a"].startswith("http"):
        print(f"{prefix}[URL/Embed] {el['a']}")
    if "y" in el:
        print(f"{prefix}[Widget/Codelet] {el.get('y')} | Config: {el.get('c')}")
    if "G" in el:
        print(f"{prefix}[Link URL] {el['G']}")

for i, sec in enumerate(sections):
    print(f"\n================ SECTION {i} ================")
    print(f"Type: {sec.get('A?')}, Name/Title: {sec.get('B')}")
    if "t" in sec and isinstance(sec["t"], list):
        print(f"Has subpages: {len(sec['t'])}")
        for j, subsec in enumerate(sec["t"]):
            print(f"\n  --- Subpage {j} ---")
            for el in subsec.get("E", []):
                print_element(el, "    ")
    else:
        for el in sec.get("E", []):
            print_element(el, "  ")
