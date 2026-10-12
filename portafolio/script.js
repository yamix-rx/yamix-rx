// Interacciones del portafolio. Puedes editar textos y enlaces en index.html.
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeStored = localStorage.getItem('rx-portfolio-theme');
if (themeStored === 'light' || themeStored === 'dark') root.dataset.theme = themeStored;
function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('rx-portfolio-theme', theme);
  themeButton?.setAttribute('aria-label', theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro');
}
themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

const menuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = () => { mobileNav.hidden = true; menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', 'Abrir menú'); };
menuButton?.addEventListener('click', () => {
  const opening = !mobileNav.hidden;
  mobileNav.hidden = opening;
  menuButton.setAttribute('aria-expanded', String(!opening));
  menuButton.setAttribute('aria-label', opening ? 'Abrir menú' : 'Cerrar menú');
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  const choice = button.dataset.filter;
  filters.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  cards.forEach(card => { card.hidden = !(choice === 'all' || card.dataset.category === choice); });
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .10 });
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
} else document.querySelectorAll('.reveal').forEach(node => node.classList.add('visible'));
document.getElementById('year').textContent = String(new Date().getFullYear());