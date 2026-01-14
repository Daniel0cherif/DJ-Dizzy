document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Options for the observer (trigger when 10% of the element is visible)
  const observerOptions = {
    threshold: 0.1,
  };

  const contentObserver = new IntersectionObserver((entries, observer) => {
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
    contentObserver.observe(el);
  });

  // 3. Background Music Control
  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-toggle");
  const muteIcon = muteBtn.querySelector("i");

  // Web Audio API setup for visualization
  let audioCtx, analyser, dataArray;

  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        const source = audioCtx.createMediaElementSource(bgMusic);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      } catch (e) {
        console.error("Web Audio API setup failed:", e);
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Attempt to play on load
  bgMusic.play().catch(() => {
    console.log("Autoplay blocked - waiting for user interaction");
  });

  muteBtn.addEventListener("click", () => {
    initAudio(); // Initialize audio context on interaction
    // Browsers block autoplay, so we play on first click if paused
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          bgMusic.muted = false;
          updateIcon(false);
        })
        .catch((e) => console.log("Audio play failed:", e));
    } else {
      bgMusic.muted = !bgMusic.muted;
      updateIcon(bgMusic.muted);
    }
  });

  function updateIcon(isMuted) {
    if (isMuted) {
      muteIcon.className = "fas fa-volume-mute";
    } else {
      muteIcon.className = "fas fa-volume-up";
    }
  }
});
