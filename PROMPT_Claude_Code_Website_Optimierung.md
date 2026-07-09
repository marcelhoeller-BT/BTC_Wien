# Prompt für Claude Code — BTC Wien Landingpage-Optimierung

> Diesen Text komplett in Claude Code einfügen, ausgeführt im Projekt-Root des Ordners „BTC Wien".

---

Du arbeitest im aktuellen Ordner — dem Repository der **BeerTasting Digital Challenge Wien (BTC Wien)**, einer B2B-Akquise-Landingpage (HTML + Tailwind, gehostet auf Vercel). Lies dich zuerst vollständig ein, bevor du irgendetwas änderst.

## Phase 0 — Einlesen (nichts ändern)
1. Lies `Claude/PROJEKT_BeerTasting_Challenge_Wien.md` — das ist die maßgebliche Projektdoku (Konzept, Mechanik, Pricing, Zielgruppen, Assets, To-dos).
2. Lies `index.html`, `impressum.html`, `datenschutz.html`, `danke-gastronomie.html`, `danke-brauerei.html`, `styles.css`, `tailwind.config.js`, `robots.txt`, `sitemap.xml`.
3. Verschaffe dir einen Überblick über die Assets (Logo, Header-Banner, `Hero.png`, Badge-PNGs, Info-Sheet-PDF).
4. Fasse in 5–10 Sätzen zusammen, was die Seite aktuell tut, wo sie Conversion-Schwächen hat und welche Struktur- und Design-Probleme du siehst. **Erst danach weiterarbeiten.**

## Kontext, den du kennen musst
- **Zweck der Seite:** B2B-Leadgenerierung — zahlende Gastronomien und Brauereien für den Wien-Piloten 2026 gewinnen. Conversion-Ziel sind Formular-Anfragen.
- **Zwei sehr unterschiedliche Zielgruppen** mit unterschiedlichen Motiven:
  - **Gastronomien** — wollen Laufkundschaft, null Aufwand, kein Personal/Material/Schulung. Pricing: 100 €/Monat, monatlich kündbar.
  - **Brauereien** — wollen Portfolio-Sichtbarkeit, Analyse-Back-End, bündeln ihre eigenen Partnerlokale. Pricing: Bundle S 300 €/Monat (bis 3 Lokale), Bundle L ab 450 €/Monat (ab 5 Lokale).
- Alle Preise zzgl. USt. Impressum: KALEA GmbH, Salzburg.

## Phase 1 — Zielgruppen auf zwei eigene Seiten trennen
Aktuell teilen sich Gastronomien und Brauereien eine Seite. Trenne sie in **zwei fokussierte Landingpages**, damit jede Zielgruppe eine maßgeschneiderte, ablenkungsfreie Ansprache bekommt:
- `gastronomie.html` — komplett aus Gastro-Sicht: Nutzen, Ablauf, „null Aufwand", Pricing 100 €, ein klarer CTA (Gastro-Formular).
- `brauerei.html` — komplett aus Brauerei-Sicht: Portfolio-Sichtbarkeit, Back-End/Analytics, Bundle-Logik, Bundle-Pricing, ein klarer CTA (Brauerei-Formular).
- `index.html` — schlanke Einstiegs-/Verteilerseite: erklärt die Challenge kurz und leitet mit zwei klaren Wegen („Ich bin Gastronom" / „Ich bin Brauerei") auf die jeweilige Unterseite. Alternativ als starke Hero mit Zielgruppen-Weiche.

Jede Seite braucht eigene Meta-Tags (Title, Description, OG), eigenes Formular bzw. korrektes Formspree-Ziel und einen eigenen Danke-Seiten-Redirect. Vorhandene Formspree-Endpoints, Impressum, Datenschutz und Footer wiederverwenden. `sitemap.xml`, `robots.txt` und interne Verlinkung entsprechend aktualisieren.

## Phase 2 — Marketing & Conversion-Optimierung
Wende Best Practices für B2B-Landingpages an, mit dem Ziel **hoher Lead-Conversion**:
- Klare Value Proposition „above the fold", zielgruppenspezifisch und nutzenorientiert (nicht feature-lastig).
- Ein dominanter, wiederkehrender CTA pro Seite; Formular-Reibung minimieren (nur nötige Felder).
- Vertrauenselemente: konkrete Zahlen/Traction (App-Reichweite, Community, bisherige Challenge-Städte), Risikoumkehr („monatlich kündbar", „kein Aufwand"), FAQ gegen Einwände.
- Überzeugende, präzise Copy statt Marketing-Floskeln; Scannbarkeit (Zwischenüberschriften, kurze Blöcke).
- Logischer Seitenfluss: Aufmerksamkeit → Nutzen → Funktionsweise → Beweis → Preis → Handlung.
- Mach konkrete Copy-Vorschläge für Headlines, Sublines und CTA-Buttons je Zielgruppe.

## Phase 3 — Design & Struktur
- Bestehendes Design-System beibehalten: Akzentfarbe `#fadb6b`, Schrift Brandon Text, Off-White `#F3F3F4`, Text `#1A1C1C`. Konsistenz über alle Seiten.
- Visuelle Hierarchie, Weißraum, Button-Kontrast und Lesbarkeit verbessern.
- Voll responsive (Mobile-First; ein Großteil des Gastro-Publikums kommt mobil).
- Assets sinnvoll einsetzen (App-Screenshot, Badges, Header-Banner); Ladezeit im Blick behalten.
- Barrierefreiheit-Basics (Kontraste, Alt-Texte, Fokus-States).

## Arbeitsweise & Regeln
- **Zuerst einen Plan präsentieren**, dann umsetzen. Nach der Einlese-Zusammenfassung: konkrete, priorisierte Vorschlagsliste (Quick Wins vs. größere Umbauten), erst nach meiner Freigabe umsetzen.
- Änderungen in sauberen, nachvollziehbaren Schritten; jede geänderte Datei kurz erklären.
- **Keine Domain-Arbeit:** Die eigene Domain kommt später und wird von mir verknüpft. Verwende weiter relative Pfade bzw. die bestehende Vercel-URL; hardcode keine neue Domain. Weise mich nur auf die Stellen hin, die ich beim Domain-Wechsel anpassen muss (`_next`-Redirects, `robots.txt`, `sitemap.xml`, canonical/OG-URLs).
- Formspree-Endpoints, Impressum und Datenschutz nicht inhaltlich verändern (nur Verlinkung/Struktur), außer ich bitte darum.
- Vercel/Linux ist case-sensitive — Dateinamen exakt referenzieren.
- Deutsch, Ton wie in der bestehenden Seite.

Leg mit Phase 0 los und zeig mir zuerst deine Einlese-Zusammenfassung plus die priorisierte Vorschlagsliste.
