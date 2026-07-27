import re

def fix_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for o, n in replacements:
        c = c.replace(o, n)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

fix_file(r"c:\Programming\TEDx\tedxpvgcoetFrontend\src\sections\Speaker.jsx", [(".webp", ".png")])
fix_file(r"c:\Programming\TEDx\tedxpvgcoetFrontend\src\sections\DrishthiHero.jsx", [(".webp", ".png")])
fix_file(r"c:\Programming\TEDx\tedxpvgcoetFrontend\src\sections\Booknow.jsx", [(".webp", ".jpg")])
