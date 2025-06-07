gsap.registerPlugin(ScrollTrigger);

// Typewriter function
function typeWriter(element, speed = 40) {
  const fullText = element.textContent;
  element.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    element.textContent += fullText.charAt(index);
    index++;
    if (index >= fullText.length) clearInterval(interval);
  }, speed);
}

// Page Load Animation Sequence
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // 1. Animate Logo In
  tl.to(".preloader-logo", {
    opacity: 1,
    scale: 1.3,
    duration: 1.2,
    ease: "power4.out"
  });

  // 2. Fade Out Preloader
  tl.to("#preloader", {
    delay: 1,
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
    }
  });

  // 3. Animate Logo, Title, Tagline
  tl.from(".profile-logo", {
    opacity: 0,
    scale: 0.3,
    rotation: 360,
    duration: 1.2,
    ease: "power4.out"
  });

  tl.from("h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.5");

  tl.from(".tagline", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.3");

  // 4. Typewriter
  const tagline = document.querySelector(".tagline");
  typeWriter(tagline, 35);

  // 5. Show carousel AFTER everything else
  tl.from(".carousel-3d", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power2.out"
  }, "+=0.3");
});

// Scroll-based entrance for each feature section
gsap.utils.toArray(".section-highlight").forEach((section, i) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: i % 2 === 0 ? 100 : -100,
    rotationX: i % 2 === 0 ? 15 : -15,
    scale: 0.9,
    duration: 1.4,
    ease: "power3.out"
  });
});

// Contact section glow
gsap.to(".contact", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top center"
  },
  boxShadow: "0 0 20px #00d9ff, 0 0 40px #00d9ff",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
