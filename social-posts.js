/* ============================================================================
   BeerTasting Gastro Challenge Wien 2026 – Social Wall
   ============================================================================

   PFLEGE — so fügst du einen Beitrag hinzu:

   1. Screenshot/Bild des Instagram-Beitrags speichern, quadratisch zuschneiden
      und als WebP (ca. 600 x 600 px) in den Ordner  social/  legen.
   2. Unten in BTC_SOCIAL einen Eintrag ergänzen. Reihenfolge = Anzeigereihenfolge.
   3. Committen und pushen — die Wall erscheint automatisch auf allen drei Seiten.

   Format eines Eintrags:

     {
       img:    "social/dateiname.webp",                      // lokales Bild
       handle: "@nutzername",                                // wird über dem Bild angezeigt
       url:    "https://www.instagram.com/p/ABC123/",        // Link zum Original-Beitrag
       alt:    "Kurze Beschreibung des Bildes"               // für Screenreader
     }

   WICHTIG: Nur Beiträge aufnehmen, für die eine Freigabe der Urheberin oder
   des Urhebers vorliegt. Fremde Fotos sind urheberrechtlich geschützt, und
   abgebildete Personen haben ein Recht am eigenen Bild. Eine kurze schriftliche
   Zusage per DM genügt in der Regel — bitte aufbewahren.

   Solange die Liste leer ist, zeigt die Sektion automatisch einen Hinweis
   statt einer leeren Fläche.
   ========================================================================== */

window.BTC_SOCIAL = [

  // Beispiel (auskommentiert — echte Beiträge hier eintragen):
  // {
  //   img:    "social/beispiel.webp",
  //   handle: "@bierfreundin.wien",
  //   url:    "https://www.instagram.com/p/ABC123/",
  //   alt:    "Glas Bier vor einem Wiener Lokal"
  // },

];

/* --- Ab hier nichts ändern -------------------------------------------------- */
(function () {
  function init() {
    var wall = document.getElementById('social-wall');
    var empty = document.getElementById('social-wall-empty');
    if (!wall) return;

    var posts = Array.isArray(window.BTC_SOCIAL) ? window.BTC_SOCIAL : [];

    if (!posts.length) {
      wall.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    wall.hidden = false;

    posts.forEach(function (p) {
      if (!p || !p.img) return;

      var a = document.createElement('a');
      a.href = p.url || 'https://www.instagram.com/explore/tags/beertastingchallenge/';
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'group relative block aspect-square overflow-hidden rounded-[8px] ' +
                    'border border-border-muted bg-surface-container-lowest ' +
                    'focus-visible:ring-2 focus-visible:ring-[#E8A838]';

      var img = document.createElement('img');
      img.src = p.img;
      img.alt = p.alt || 'Beitrag aus der BeerTasting Community';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 600;
      img.height = 600;
      img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';
      a.appendChild(img);

      if (p.handle) {
        var bar = document.createElement('span');
        bar.className = 'absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-3 py-2 ' +
                        'bg-gradient-to-t from-[#0E1330]/90 to-[#0E1330]/0 ' +
                        'font-body-sm text-body-sm text-white';
        bar.textContent = p.handle;
        a.appendChild(bar);
      }

      wall.appendChild(a);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
