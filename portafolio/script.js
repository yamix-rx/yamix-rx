// Interacciones ligeras, accesibles y sin dependencias para el portafolio RX.
(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  const progressBar = document.querySelector('.scroll-progress');
  const cards = [...document.querySelectorAll('.project-card')];
  const filters = [...document.querySelectorAll('.filter')];
  const filterStatus = document.querySelector('.filter-status');

  // El sitio es funcional incluso si el navegador bloquea localStorage.
  const readTheme = () => {
    try { return localStorage.getItem('rx-portfolio-theme'); }
    catch { return null; }
  };
  const writeTheme = value => {
    try { localStorage.setItem('rx-portfolio-theme', value); }
    catch { /* modo privado o almacenamiento bloqueado */ }
  };
  function setTheme(value, save = true) {
    const theme = value === 'light' ? 'light' : 'dark';
    root.dataset.theme = theme;
    if (save) writeTheme(theme);
    if (themeButton) {
      const label = theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro';
      themeButton.setAttribute('aria-label', label);
      themeButton.setAttribute('title', label);
    }
  }
  setTheme(readTheme() === 'light' ? 'light' : 'dark', false);
  themeButton?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });

  const closeMenu = () => {
    if (!mobileNav || !menuButton) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  if (mobileNav && menuButton) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeMenu(); menuButton.focus(); }
    });
    document.addEventListener('click', event => {
      if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) closeMenu();
    }, { passive: true });
  }

  // Una tarjeta puede pertenecer a varias categorías: "escritorio sistemas".
  function showCategory(category) {
    const current = category || 'all';
    filters.forEach(button => {
      const selected = button.dataset.filter === current;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
      const show = current === 'all' || categories.includes(current);
      card.hidden = !show;
      if (show) {
        visible++;
        card.classList.add('visible');
      }
    });
    if (filterStatus) filterStatus.textContent = `Mostrando ${visible} de ${cards.length} proyectos`;
  }
  filters.forEach(button => button.addEventListener('click', () => showCategory(button.dataset.filter)));
  showCategory('all');

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px 32px 0px' });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Barra de lectura del sitio, sin bloqueos en scroll.
  let scrollQueued = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = max > 0 ? `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%` : '0%';
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Sección actual del menú en escritorio.
  if ('IntersectionObserver' in window) {
    const navItems = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navItems.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-current', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    navItems.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
