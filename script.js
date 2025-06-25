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

// Background bubbles
const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");
let bubbles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function createBubbles() {
  bubbles = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 6 + Math.random() * 14,
      speed: 0.2 + Math.random() * 0.4,
      opacity: 0.08 + Math.random() * 0.1
    });
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${b.opacity})`;
    ctx.fill();
    b.y -= b.speed;
    if (b.y + b.r < 0) b.y = canvas.height + b.r;
  });
  requestAnimationFrame(animate);
}
resizeCanvas();
createBubbles();
animate();
window.addEventListener("resize", () => {
  resizeCanvas();
  createBubbles();
});
