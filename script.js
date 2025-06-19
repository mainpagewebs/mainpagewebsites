// Scroll-based animation observer
const options = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, options);

document.querySelectorAll('.section, .divider').forEach((el) => {
  observer.observe(el);
});

// Scroll-to-top on load if URL has hash
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Shrink navbar on scroll down, expand on scroll up
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScrollTop) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
  lastScrollTop = currentScroll;
});

// Toggle and close mobile menu
function toggleMenu() {
  document.querySelector('.hamburger').classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('active');
}

function closeMenu() {
  document.querySelector('.hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('active');
}
