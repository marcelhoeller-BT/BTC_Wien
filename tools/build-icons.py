#!/usr/bin/env python3
"""Baut die selbst gehostete Icon-Font.

Liest alle in den HTML-Dateien verwendeten Material-Symbols-Icons aus,
friert die Variable Font auf die genutzte Achsen-Kombination ein und
schneidet sie auf exakt diese Icons zu.

Voraussetzungen:  npm install     (liefert material-symbols)
                  pip install fonttools brotli
Aufruf:           npm run build:icons
"""
import glob, re, sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.subset import main as pyftsubset

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/material-symbols/material-symbols-outlined.woff2"
OUT = ROOT / "fonts/material-symbols-outlined.subset.woff2"
# Muss zu den Angaben in tailwind-input.css passen
AXES = {"FILL": 0, "wght": 400, "GRAD": 0, "opsz": 24}

icons = set()
for f in sorted(ROOT.glob("*.html")):
    icons |= set(re.findall(r'material-symbols-outlined[^>]*>\s*([a-z0-9_]+)\s*<',
                            f.read_text(encoding="utf-8")))
if not icons:
    sys.exit("Keine Icons in den HTML-Dateien gefunden - Abbruch.")

if not SRC.exists():
    sys.exit(f"{SRC} fehlt. Zuerst 'npm install' ausfuehren.")

font = TTFont(SRC)
missing = sorted(i for i in icons if i not in set(font.getGlyphOrder()))
if missing:
    sys.exit("Diese Icons gibt es in Material Symbols nicht: " + ", ".join(missing))

instancer.instantiateVariableFont(font, AXES, inplace=True).save("/tmp/_ms_static.ttf")

OUT.parent.mkdir(exist_ok=True)
chars = "".join(sorted(set("".join(icons))))
pyftsubset([
    "/tmp/_ms_static.ttf",
    "--glyphs=" + ",".join(sorted(icons)),
    "--text=" + chars,
    "--layout-features+=liga",
    "--no-layout-closure",
    "--flavor=woff2",
    "--output-file=" + str(OUT),
])
print(f"{len(icons)} Icons -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} Bytes)")
print("   " + ", ".join(sorted(icons)))
