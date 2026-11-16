/* ==========================================================================
   Vladislak Ulmokina — Vanilla JS Controller
   Handles Srcery/Ayu Theme Persistence, Accessible Hamburger Drawer & Lore Filter
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'vladislak-theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* Ignore storage errors in restricted private/file contexts */
    }
  }

  function syncThemeUI(theme) {
    var btn = document.getElementById('themeBtn');
    var drawerThemeInfo = document.getElementById('drawerThemeStatus');
    if (btn) {
      if (theme === 'dark') {
        btn.innerHTML =
          '<span aria-hidden="true">☀️</span>' +
          '';
        btn.setAttribute('aria-label', 'Přepnout na světlé téma Ayu Light');
        btn.setAttribute('title', 'Aktivní: Srcery Dark — kliknutím přepneš na Ayu Light');
      } else {
        btn.innerHTML =
          '<span aria-hidden="true">🌙</span>' +
          '<span>Srcery<span class="theme-label-full"> Dark</span></span>';
        btn.setAttribute('aria-label', 'Přepnout na tmavé téma Srcery Dark');
        btn.setAttribute('title', 'Aktivní: Ayu Light — kliknutím přepneš na Srcery Dark');
      }
    }
    if (drawerThemeInfo) {
      drawerThemeInfo.textContent =
        theme === 'dark' ? 'Aktivní paleta: Srcery Dark' : 'Aktivní paleta: Ayu Light';
    }
  }

  function applyTheme(theme) {
    var validTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', validTheme);
    setStoredTheme(validTheme);
    syncThemeUI(validTheme);
  }

  function initTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getStoredTheme() || 'dark';
    document.documentElement.setAttribute('data-theme', current);
    syncThemeUI(current);

    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function initDrawer() {
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var closeBtn = document.getElementById('drawerCloseBtn');
    var drawer = document.getElementById('mobileDrawer');
    var backdrop = document.getElementById('drawerBackdrop');

    if (!hamburgerBtn || !drawer || !backdrop) {
      return;
    }

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    function closeDrawer(restoreFocus) {
      if (!drawer.classList.contains('open')) {
        return;
      }
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
      if (restoreFocus) {
        hamburgerBtn.focus();
      }
    }

    hamburgerBtn.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer(false);
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeDrawer(true);
      });
    }

    backdrop.addEventListener('click', function () {
      closeDrawer(true);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer(true);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && drawer.classList.contains('open')) {
        closeDrawer(false);
      }
    });
  }

  function normalizeText(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function initLoreSection(container) {
    var searchInput = container.querySelector('[data-lore-search], #loreSearch');
    var chips = container.querySelectorAll('.chip[data-filter]');
    var subChips = container.querySelectorAll('.chip[data-subfilter]');
    var cards = container.querySelectorAll('.lore-card[data-category]');
    var countEl = container.querySelector('[data-lore-count], #loreCount');
    var emptyEl = container.querySelector('[data-lore-empty], #loreEmpty');
    var noun = container.getAttribute('data-count-noun') || 'záznamů';

    if (!cards.length) {
      return;
    }

    var activeCategory = 'all';
    var activeSubfilter = 'all';

    function updateLoreView() {
      var query = searchInput ? normalizeText(searchInput.value.trim()) : '';
      var visibleCount = 0;

      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-category') || '').split(/\s+/);
        var categoryMatch = activeCategory === 'all' || cats.indexOf(activeCategory) !== -1;
        var subMatch = activeSubfilter === 'all' || cats.indexOf(activeSubfilter) !== -1;
        var textMatch = !query || normalizeText(card.textContent).indexOf(query) !== -1;

        if (categoryMatch && subMatch && textMatch) {
          card.removeAttribute('hidden');
          visibleCount += 1;
        } else {
          card.setAttribute('hidden', 'hidden');
        }
      });

      if (countEl) {
        countEl.textContent = 'Zobrazeno ' + visibleCount + ' z ' + cards.length + ' ' + noun;
      }

      if (emptyEl) {
        if (visibleCount === 0) {
          emptyEl.removeAttribute('hidden');
        } else {
          emptyEl.setAttribute('hidden', 'hidden');
        }
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        activeCategory = chip.getAttribute('data-filter') || 'all';
        updateLoreView();
      });
    });

    subChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        subChips.forEach(function (c) {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        activeSubfilter = chip.getAttribute('data-subfilter') || 'all';
        updateLoreView();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', updateLoreView);
    }

    updateLoreView();
  }

  function initLoreFilter() {
    var sections = document.querySelectorAll('[data-lore-section]');
    if (sections.length) {
      sections.forEach(initLoreSection);
      return;
    }
    var fallback = document.getElementById('bozstva-databaze');
    if (fallback) {
      initLoreSection(fallback);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initDrawer();
    initLoreFilter();
  });
})();
