/* ===================================
   LANGUAGES FOR CATHOLICS
   Mobile Hamburger Menu Toggle
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.nav-overlay');

  if (!burger || !nav || !overlay) return;

  function closeMenu() {
    burger.classList.remove('is-open');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  // Tap burger to open/close
  burger.addEventListener('click', toggleMenu);

  // Tap overlay to close
  overlay.addEventListener('click', closeMenu);

  // Tap a nav link to close (so the menu closes as the page navigates)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });
});
