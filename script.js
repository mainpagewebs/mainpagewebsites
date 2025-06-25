// Reset scroll to top on hash reload
if (location.hash) {
  history.replaceState(null, '', location.pathname + location.search);
  scrollTo(0, 0);
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const divider = entry.target.previousElementSibling?.querySelector('.divider-line');
      if (divider) divider.classList.add('active');
    } else {
      entry.target.classList.remove('visible');
      const divider = entry.target.previousElementSibling?.querySelector('.divider-line');
      if (divider) divider.classList.remove('active');
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Smooth scroll to section (centered on desktop, top on mobile)
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const isDesktop = window.innerWidth >= 769;
    const destY = isDesktop
      ? target.offsetTop - (window.innerHeight / 2 - target.offsetHeight / 2)
      : target.offsetTop;

    window.scrollTo({ top: destY, behavior: 'smooth' });

    // Close menu on mobile
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
