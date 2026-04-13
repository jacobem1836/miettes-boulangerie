// Header scroll state
(function() {
  var header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle
(function() {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Menu category filter
function filterMenu(category) {
  var cards = document.querySelectorAll('.menu-card');
  var tabs = document.querySelectorAll('.menu-tab');

  cards.forEach(function(card) {
    if (card.dataset.cat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  tabs.forEach(function(tab) {
    var isActive = tab.getAttribute('onclick') === "filterMenu('" + category + "')";
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
    var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});
