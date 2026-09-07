/* =========================================================
   VKOLLAB TECHNOLOGIES — ANIMATIONS.JS
   Scroll-reveal engine using IntersectionObserver.
   Add data-animate="fade-up|slide-left|slide-right|scale-in|fade-in"
   to any element. Optional data-delay="120" (ms) for stagger.
   ========================================================= */

(function () {
  "use strict";

  function autoTagCards() {
    // Auto-assign reveal animation + stagger delay to common repeated card groups
    // that don't already have explicit data-animate attributes.
    var groups = document.querySelectorAll(
      ".grid-4, .grid-3, .grid-2, .feature-list, .process-track, .stage-track, .industry-tabs"
    );
    groups.forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, idx) {
        if (!child.hasAttribute("data-animate")) {
          child.setAttribute("data-animate", "fade-up");
          child.style.setProperty("--d", (idx * 90) + "ms");
        }
      });
    });

    // Section heads
    document.querySelectorAll(".section-head").forEach(function (el) {
      if (!el.hasAttribute("data-animate")) el.setAttribute("data-animate", "fade-up");
    });
  }

  function initObserver() {
    var targets = document.querySelectorAll("[data-animate]");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  function boot() {
    autoTagCards();
    initObserver();
  }

  if (document.getElementById("site-header")) {
    document.addEventListener("layoutReady", function () {
      // slight delay to ensure any JS-rendered content (e.g., industry tabs) exists
      setTimeout(boot, 30);
    });
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();
