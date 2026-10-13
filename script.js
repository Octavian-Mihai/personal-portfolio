(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  var yearEl = document.getElementById('year');
  var STORAGE_KEY = 'theme';

  /* ---------- Footer year ---------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Dark mode toggle ---------- */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      var isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist */
    }
  }

  var stored = getStoredTheme();
  if (stored === 'dark' || stored === 'light') {
    applyTheme(stored);
  } else if (themeToggle) {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeToggle.setAttribute('aria-pressed', String(prefersDark));
    themeToggle.setAttribute('aria-label', prefersDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ---------- Project profile tabs ---------- */
  var profileTabs = Array.prototype.slice.call(document.querySelectorAll('.profile-tab'));
  var projectCards = document.querySelectorAll('#projectGrid .card');

  function selectProfile(tab, focus) {
    var profile = tab.getAttribute('data-profile');
    profileTabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    projectCards.forEach(function (card) {
      var profiles = (card.getAttribute('data-profiles') || '').split(' ');
      var show = profile === 'all' || profiles.indexOf(profile) !== -1;
      card.hidden = !show;
      if (show) card.classList.add('is-visible');
    });
    if (focus) tab.focus();
  }

  profileTabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectProfile(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = profileTabs[(i + 1) % profileTabs.length];
      else if (e.key === 'ArrowLeft') next = profileTabs[(i - 1 + profileTabs.length) % profileTabs.length];
      else if (e.key === 'Home') next = profileTabs[0];
      else if (e.key === 'End') next = profileTabs[profileTabs.length - 1];
      if (next) { e.preventDefault(); selectProfile(next, true); }
    });
  });

  /* ---------- Scroll-reveal animations ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealTargets = document.querySelectorAll('.card, .skill-group, .contact-link');
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-list a');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = document.querySelector('.nav-list a[href="#' + entry.target.id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
