/* ============================================================================
   Kopfnavigation – Scrollspy
   ----------------------------------------------------------------------------
   Markiert den Sektions-Link des Abschnitts, in dem man sich gerade befindet.
   Betrifft alle Links mit  data-navlink  und einem Ziel der Form  href="#id".
   Der Seitenumschalter (Startseite / Gastronomie / Brauerei) ist davon nicht
   betroffen, der wird serverseitig über aria-current="page" markiert.
   ========================================================================== */
(function () {
  var HEADER_OFFSET = 120; // Sticky-Header plus etwas Luft

  function init() {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-navlink]'));
    if (!links.length) return;

    // Ziel-Abschnitte einsammeln (nur solche, die es auf der Seite wirklich gibt)
    var byId = {};
    var targets = [];
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) return;
      var id = href.slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      if (!byId[id]) { byId[id] = []; targets.push(el); }
      byId[id].push(a);
    });
    if (!targets.length) return;

    function top(el) {
      return el.getBoundingClientRect().top + window.pageYOffset;
    }

    var current = null;
    function setCurrent(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) {
        a.classList.remove('is-current');
        a.removeAttribute('aria-current');
      });
      (byId[id] || []).forEach(function (a) {
        a.classList.add('is-current');
        a.setAttribute('aria-current', 'true');
      });
    }

    function update() {
      // Nach Position sortieren – Abschnitte können umgehängt worden sein
      targets.sort(function (a, b) { return top(a) - top(b); });

      var y = window.pageYOffset + HEADER_OFFSET;
      var id = null;
      for (var i = 0; i < targets.length; i++) {
        if (top(targets[i]) <= y) id = targets[i].id;
      }
      // Ganz unten angekommen: letzten Abschnitt markieren
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
        id = targets[targets.length - 1].id;
      }
      setCurrent(id);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; update(); });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* --- Dropdown schliessen: Klick daneben oder Escape ------------------------ */
(function () {
  function zu() {
    var btn = document.getElementById('mobile-menu-btn');
    if (!btn || btn.getAttribute('aria-expanded') !== 'true') return;
    if (typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
  }
  document.addEventListener('click', function (e) {
    var menu = document.getElementById('mobile-menu');
    var btn = document.getElementById('mobile-menu-btn');
    if (!menu || !btn) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    zu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      zu();
      var btn = document.getElementById('mobile-menu-btn');
      if (btn) btn.focus();
    }
  });
})();
