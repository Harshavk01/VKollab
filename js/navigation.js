/* =========================================================
   VKOLLAB TECHNOLOGIES — NAVIGATION.JS
   Builds the global header & footer (single source of truth)
   and wires up all navigation interactions.
   ========================================================= */

(function () {
  "use strict";

  var SERVICES = [
    { name: "SAP Application Development", href: "sap-development.html" },
    { name: "SAP Migration &amp; Upgrades", href: "sap-upgrade.html" },
    { name: "SAP Application Management", href: "sap-management.html" },
    { name: "SAP UI5/FIORI", href: "sap-ui5.html" },
    { name: "SAP S/4 HANA", href: "sap-s4-hana.html" },
    { name: "Advanced Track &amp; Trace", href: "track-trace.html" },
    { name: "SAP IBP", href: "sap-ibp.html" },
    { name: "SAP ePPDS", href: "sap-eppds.html" },
    { name: "ComplianceWire", href: "compliancewire.html" },
    { name: "Workday", href: "workday.html" },
    { name: "SuccessFactors", href: "successfactors.html" }
  ];

  var currentPage = (location.pathname.split("/").pop() || "index.html");
  var isServicePage = SERVICES.some(function (s) { return s.href === currentPage; });

  function serviceLinks(cssClass) {
    return SERVICES.map(function (s) {
      return '<a href="' + s.href + '" class="' + (cssClass || "") + '">' + s.name + "</a>";
    }).join("");
  }
  function serviceListItems() {
    return SERVICES.map(function (s) {
      return "<li><a href=\"" + s.href + "\">" + s.name + "</a></li>";
    }).join("");
  }

  function navActive(href) {
    return currentPage === href ? " active" : "";
  }

  function buildHeader() {
    var html =
      '<div class="topbar">' +
      '  <div class="container">' +
      '    <div class="topbar-left">' +
      '      <a href="tel:+19083001548"><span class="icon">&#9742;</span> +1 9083001548</a>' +
      '      <a href="mailto:info@vkollab.com"><span class="icon">&#9993;</span> info@vkollab.com</a>' +
      "    </div>" +
      '    <div class="topbar-right">' +
      '      <span>8 Campus Dr Suite 105, Parsippany, NJ 07054</span>' +
      "    </div>" +
      "  </div>" +
      "</div>" +
      '<div class="navbar">' +
      '  <a href="index.html" class="logo" aria-label="VKOLLAB Technologies home">' +
      '    <span class="logo-mark">VK</span>' +
      '    <span>VKOLLAB<span class="logo-sub">TECHNOLOGIES</span></span>' +
      "  </a>" +
      '  <ul class="nav-menu" role="menubar">' +
      '    <li role="none"><a role="menuitem" href="index.html" class="nav-link' + navActive("index.html") + '">Home</a></li>' +
      '    <li role="none"><a role="menuitem" href="about-us.html" class="nav-link' + navActive("about-us.html") + '">About Us</a></li>' +
      '    <li role="none" class="has-dropdown' + (isServicePage ? " open" : "") + '">' +
      '      <a role="menuitem" href="sap-development.html" class="nav-link' + (isServicePage ? " active" : "") + '" aria-haspopup="true" aria-expanded="false" tabindex="0">Services <span class="caret">&#9660;</span></a>' +
      '      <div class="dropdown" role="menu">' + serviceLinks("") + "</div>" +
      "    </li>" +
      '    <li role="none"><a role="menuitem" href="careers.html" class="nav-link' + navActive("careers.html") + '">Careers</a></li>' +
      '    <li role="none"><a role="menuitem" href="contactus.html" class="nav-link' + navActive("contactus.html") + '">Contact Us</a></li>' +
      "  </ul>" +
      '  <div class="header-actions">' +
      '    <div class="header-phone">' +
      '      <span class="icon-circle">&#9742;</span>' +
      '      <span><span class="phone-label">Call us 24/7</span><span class="phone-number">+1 9083001548</span></span>' +
      "    </div>" +
      '    <a href="contactus.html" class="btn btn-primary">Get In Touch</a>' +
      '    <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">' +
      "      <span></span><span></span><span></span>" +
      "    </button>" +
      "  </div>" +
      "</div>" +
      '<div class="nav-overlay" id="navOverlay"></div>' +
      '<div class="mobile-nav" id="mobileNav">' +
      '  <div class="mobile-nav-head">' +
      '    <a href="index.html" class="logo"><span class="logo-mark">VK</span><span>VKOLLAB</span></a>' +
      '    <button class="mobile-nav-close" aria-label="Close menu">&times;</button>' +
      "  </div>" +
      '  <div class="mobile-nav-body">' +
      "    <ul>" +
      '      <li><a class="mobile-nav-link" href="index.html">Home</a></li>' +
      '      <li><a class="mobile-nav-link" href="about-us.html">About Us</a></li>' +
      "      <li>" +
      '        <button class="mobile-nav-link" id="mobileServicesToggle" aria-expanded="false">Services <span class="caret">&#9660;</span></button>' +
      '        <ul class="mobile-submenu" id="mobileSubmenu">' + serviceListItems() + "</ul>" +
      "      </li>" +
      '      <li><a class="mobile-nav-link" href="careers.html">Careers</a></li>' +
      '      <li><a class="mobile-nav-link" href="contactus.html">Contact Us</a></li>' +
      "    </ul>" +
      "  </div>" +
      '  <div class="mobile-nav-foot">' +
      '    <div class="header-phone"><span class="icon-circle">&#9742;</span><span><span class="phone-label">Call us 24/7</span><span class="phone-number">+1 9083001548</span></span></div>' +
      '    <a href="contactus.html" class="btn btn-primary btn-block">Get In Touch</a>' +
      "  </div>" +
      "</div>";
    return html;
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    var html =
      '<div class="footer-cta">' +
      '  <div class="container">' +
      "    <div>" +
      "      <h3>Ready to start your SAP transformation?</h3>" +
      "      <p>Get a free, no-obligation quote from our SAP experts today.</p>" +
      "    </div>" +
      '    <a href="contactus.html" class="btn btn-secondary">Get a Quote</a>' +
      "  </div>" +
      "</div>" +
      '<div class="footer-main">' +
      '  <div class="container footer-grid">' +
      "    <div>" +
      '      <div class="footer-logo"><span class="logo-mark">VK</span><span>VKOLLAB</span></div>' +
      "      <p>VKOLLAB Technologies is an end-to-end, reliable, innovative, value-driven and affordable SAP business solutions provider. Our full-scale SAP solutions help firms streamline and simplify business processes.</p>" +
      '      <div class="social-links">' +
      '        <a href="#" aria-label="LinkedIn">in</a>' +
      '        <a href="#" aria-label="Twitter">tw</a>' +
      '        <a href="#" aria-label="Facebook">fb</a>' +
      "      </div>" +
      "    </div>" +
      '    <div class="footer-col">' +
      "      <h4>Our Services</h4>" +
      "      <ul>" + serviceListItems() + "</ul>" +
      "    </div>" +
      '    <div class="footer-col">' +
      "      <h4>Company</h4>" +
      "      <ul>" +
      '        <li><a href="index.html">Home</a></li>' +
      '        <li><a href="about-us.html">About Us</a></li>' +
      '        <li><a href="careers.html">Careers</a></li>' +
      '        <li><a href="contactus.html">Contact Us</a></li>' +
      "      </ul>" +
      "    </div>" +
      '    <div class="footer-col">' +
      "      <h4>Contact</h4>" +
      '      <ul class="footer-contact">' +
      '        <li><span class="icon">&#9742;</span><span>+1 9083001548</span></li>' +
      '        <li><span class="icon">&#9993;</span><span>info@vkollab.com</span></li>' +
      '        <li><span class="icon">&#9679;</span><span>8 Campus Dr Suite 105,<br>Parsippany, NJ 07054, United States</span></li>' +
      "      </ul>" +
      "    </div>" +
      "  </div>" +
      "</div>" +
      '<div class="container footer-bottom">' +
      "  <span>&copy; " + year + " VKOLLAB Technologies. All Rights Reserved.</span>" +
      '  <span><a href="contactus.html">Contact Us</a></span>' +
      "</div>";
    return html;
  }

  function injectLayout() {
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (headerMount) {
      headerMount.className = "site-header";
      headerMount.innerHTML = buildHeader();
    }
    if (footerMount) {
      footerMount.className = "site-footer";
      footerMount.innerHTML = buildFooter();
    }
  }

  function wireHeaderEvents() {
    var header = document.getElementById("site-header");
    if (!header) return;

    // Sticky header shadow on scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });

    // Desktop dropdown keyboard support + click toggle for touch devices
    var dropdownParent = header.querySelector(".has-dropdown");
    if (dropdownParent) {
      var trigger = dropdownParent.querySelector(".nav-link");
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) return; // mobile handled separately
        // allow normal navigation but also toggle via keyboard
      });
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dropdownParent.classList.toggle("open");
          trigger.setAttribute("aria-expanded", dropdownParent.classList.contains("open"));
        }
        if (e.key === "Escape") {
          dropdownParent.classList.remove("open");
        }
      });
      document.addEventListener("click", function (e) {
        if (!dropdownParent.contains(e.target)) {
          dropdownParent.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Mobile hamburger
    var hamburger = header.querySelector(".hamburger");
    var mobileNav = document.getElementById("mobileNav");
    var overlay = document.getElementById("navOverlay");
    var closeBtn = mobileNav.querySelector(".mobile-nav-close");

    function openMobile() {
      mobileNav.classList.add("open");
      overlay.classList.add("show");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMobile() {
      mobileNav.classList.remove("open");
      overlay.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    hamburger.addEventListener("click", openMobile);
    closeBtn.addEventListener("click", closeMobile);
    overlay.addEventListener("click", closeMobile);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobile();
    });

    // Mobile services accordion
    var mobileToggle = document.getElementById("mobileServicesToggle");
    var mobileSubmenu = document.getElementById("mobileSubmenu");
    mobileToggle.addEventListener("click", function () {
      var isOpen = mobileSubmenu.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    // highlight active link within mobile submenu
    Array.prototype.forEach.call(mobileSubmenu.querySelectorAll("a"), function (a) {
      if (a.getAttribute("href") === currentPage) {
        a.style.color = "var(--primary-color)";
        a.style.fontWeight = "800";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectLayout();
    wireHeaderEvents();
    document.dispatchEvent(new CustomEvent("layoutReady"));
  });
})();
