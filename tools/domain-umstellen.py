#!/usr/bin/env python3
"""Stellt alle absoluten URLs auf die neue Domain um.

Erst ausfuehren, wenn die Domain in Vercel verknuepft ist und auch
tatsaechlich ausliefert - vorher zeigen Canonical-Tags ins Leere.

Aufruf:  python3 tools/domain-umstellen.py https://challenge.beertasting.com
"""
import sys, glob, os, re

ALT = "https://btc-wien.vercel.app"

def main():
    if len(sys.argv) != 2:
        sys.exit("Aufruf: python3 tools/domain-umstellen.py https://neue-domain.tld")
    neu = sys.argv[1].rstrip("/")
    if not re.match(r"^https://[a-z0-9.-]+$", neu):
        sys.exit(f"Sieht nicht nach einer gueltigen Basis-URL aus: {neu}")

    wurzel = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dateien = sorted(glob.glob(os.path.join(wurzel, "*.html")) +
                     [os.path.join(wurzel, n) for n in ("sitemap.xml", "robots.txt")])
    gesamt = 0
    for pfad in dateien:
        if not os.path.exists(pfad):
            continue
        inhalt = open(pfad, encoding="utf-8").read()
        treffer = inhalt.count(ALT)
        if treffer:
            open(pfad, "w", encoding="utf-8").write(inhalt.replace(ALT, neu))
            print(f"{os.path.basename(pfad):24} {treffer} URL(s)")
            gesamt += treffer
    print(f"\n{gesamt} URLs umgestellt auf {neu}")
    print("Nicht vergessen: Formspree-Weiterleitungen (_next) sind mit umgestellt -")
    print("die neue Domain muss ausliefern, bevor das erste Formular abgeschickt wird.")

if __name__ == "__main__":
    main()
