// Scroll-based animation observer
const options = {
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, options);

// Observe all animated elements
document.querySelectorAll('.section, .divider').forEach(el => {
  observer.observe(el);
});

// Scroll-to-top on load if URL has hash
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
