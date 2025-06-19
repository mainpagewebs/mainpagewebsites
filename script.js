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
  
  // Pause carousel on button hover (only the button stops it)
  document.querySelectorAll(".project-btn").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      document.querySelector(".carousel-track").style.animationPlayState = "paused";
    });
    button.addEventListener("mouseleave", () => {
      document.querySelector(".carousel-track").style.animationPlayState = "running";
    });
  });
  
  // On load, if there's a hash (like /#services), scroll to top smoothly
  window.addEventListener("load", () => {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  