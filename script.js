/* =========================================================
   00) GLOBAL BOOTSTRAP
   - Keep JS minimal, predictable, and review-friendly
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeroGridMotion();
  initSection35Reveal();
  initSection4Reveal();
});

/* =========================================================
   01) GLOBAL — NAVIGATION (DESKTOP + MOBILE)
========================================================= */

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const header = document.querySelector(".site-header");

  if (!toggle || !mobileNav) return;

  const OPEN_DISPLAY = "flex";

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    mobileNav.style.display = OPEN_DISPLAY;
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.style.display = "none";
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  // Toggle click
  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Close when clicking a link
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Close when clicking outside menu + toggle + header
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;

    const clickedInsideMenu = mobileNav.contains(e.target);
    const clickedToggle = toggle.contains(e.target);
    const clickedHeader = header ? header.contains(e.target) : false;

    if (!clickedInsideMenu && !clickedToggle && !clickedHeader) {
      closeMenu();
    }
  });

  // Close when resizing up to desktop breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && isOpen()) closeMenu();
  });
}
/* =========================================================
   NAV ACTIVE STATE ON SCROLL
========================================================= */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => io.observe(section));
}

document.addEventListener("DOMContentLoaded", initActiveNav);


/* =========================================================
   02) SECTION 1 — HERO (SUBTLE GRID MOTION)
   - Skips touch devices
   - Respects reduced-motion preference
========================================================= */

function initHeroGridMotion() {
  const grid = document.querySelector(".grid-overlay");
  if (!grid) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (prefersReducedMotion || isTouchDevice) return;

  let x = 0;
  let y = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      x = px * 10;
      y = py * 10;
    },
    { passive: true }
  );

  const tick = () => {
    grid.style.backgroundPosition = `${x}px ${y}px, ${x}px ${y}px`;
    requestAnimationFrame(tick);
  };

  tick();
}

/* =========================================================
   03) SECTION 2 — THE CATEGORY REALITY (START)
   - Keep it minimal: a gentle "reveal" on scroll
========================================================= */

function initSection2Reveal() {
  const cards = document.querySelectorAll("#section-2 .truth-card");
  const implication = document.querySelector("#section-2 .implication");

  if (!cards.length) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const items = [...cards, implication].filter(Boolean);

  items.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 420ms ease, transform 420ms ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
}

/* =========================================================
   03) SECTION 2 — THE CATEGORY REALITY (END)
========================================================= */

/* =========================================================
   04) SECTION 3 — STORYTELLING & BRAND STEWARDSHIP (START)
   - Minimal: stagger reveal for panels + pillars
========================================================= */

function initSection3Reveal() {
  const section = document.getElementById("section-3");
  if (!section) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const revealTargets = section.querySelectorAll(
    ".mandate-card, .guardrails-card, .pillar-card, .philosophy"
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 460ms ease, transform 460ms ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger within this section for a premium feel
        const nodes = Array.from(revealTargets);
        const baseDelay = 60;

        nodes.forEach((node, idx) => {
          if (node === entry.target) {
            node.style.transitionDelay = `${idx * baseDelay}ms`;
            node.style.opacity = "1";
            node.style.transform = "translateY(0)";
          }
        });

        io.unobserve(entry.target);
      });
    },
    { threshold: 0.10 }
  );

  revealTargets.forEach((el) => io.observe(el));
}

/* =========================================================
   04) SECTION 3 — STORYTELLING & BRAND STEWARDSHIP (END)
========================================================= */

/* =========================================================
   05) SECTION 3.5 — LEADING INSIDE STRUCTURE (START)
   - Gentle reveal, compassionate pacing (no flashy motion)
========================================================= */

function initSection35Reveal() {
  const section = document.getElementById("section-3-5");
  if (!section) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const targets = section.querySelectorAll(
    ".section35__header, .motif-card, .section35__anchor, .story-card"
  );

  if (!targets.length) return;

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 520ms ease, transform 520ms ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger in reading order
        const nodes = Array.from(targets);
        const idx = nodes.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.max(0, idx) * 70}ms`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
}

/* =========================================================
   05) SECTION 3.5 — LEADING INSIDE STRUCTURE (END)
========================================================= */

/* =========================================================
   06) SECTION 4 — POSITIONING & MESSAGING ARCHITECTURE (START)
   Gentle reveal (executive-safe, not flashy)
========================================================= */

function initSection4Reveal() {
  const section = document.getElementById("section-4");
  if (!section) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const targets = section.querySelectorAll(
    ".s4__header, .s4__frame, .s4__blockHead, .card, .spine"
  );

  if (!targets.length) return;

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 520ms ease, transform 520ms ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const nodes = Array.from(targets);
        const idx = nodes.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.max(0, idx) * 55}ms`;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
}

/* =========================================================
   06) SECTION 4 — POSITIONING & MESSAGING ARCHITECTURE (END)
========================================================= */

/* =========================================================
   SECTION 5 — SUPPLY GTM REVEAL (START)
========================================================= */
function initSection5Reveal() {
  const section = document.getElementById('section-5');
  if (!section) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const items = section.querySelectorAll('.card, .insight');
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 420ms ease, transform 420ms ease';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
}

/* Call this inside your global DOMContentLoaded */
initSection5Reveal();


/* ============================= */
/* SECTION 6: DEMAND GTMs */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {
  // Reserved for future:
  // - GTM expansion
  // - metric overlays
  // - demand signal instrumentation

  console.log('Section 6 (Demand GTMs) initialised');
});

// =========================
// SECTION 8 — Case Studies
// =========================

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.framework-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });
});
/* ===============================
   GTM ROADMAP INTERACTION
   (Intentionally restrained)
================================ */

document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.gtm-pill');

  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'translateY(-1px)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = 'translateY(0)';
    });
  });
});
/* =========================================================
SECTION 9 JS — Reveal on scroll (re-usable)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach(el => io.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.reveal-on-scroll');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
});
