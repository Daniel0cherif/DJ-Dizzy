document.addEventListener("DOMContentLoaded", () => {
  // Options for the observer (trigger when 10% of the element is visible)
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // 1. Navbar Animation (Left to Right sequence)
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.add("nav-anim-init");
    // Trigger animation shortly after load
    setTimeout(() => {
      navbar.classList.add("appear");
    }, 100);
  }

  // 2. Content Animation (Randomized)
  const elementsToAnimate = document.querySelectorAll(
    ".hero-content, section, footer"
  );
  const animClasses = [
    "anim-up",
    "anim-down",
    "anim-left",
    "anim-right",
    "anim-scale",
  ];

  elementsToAnimate.forEach((el) => {
    const randomClass =
      animClasses[Math.floor(Math.random() * animClasses.length)];
    el.classList.add("anim-element", randomClass);
    observer.observe(el);
  });
});
