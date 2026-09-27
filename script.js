/* ==========================================================================
   Stock Management System — Developer Website
   Shared behaviour: mobile nav, active link, footer year, contact form
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Mobile nav toggle -------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Highlight the current page in the nav ------------------------- */
  var currentFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var linkFile = link.getAttribute("href").toLowerCase();
    if (linkFile === currentFile || (currentFile === "" && linkFile === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---- Footer year ----------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Contact form (client-side only, opens a pre-filled email) ------ */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var contactEmail = form.getAttribute("data-contact-email") || "youremail@example.com";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("cf-name");
      var email = document.getElementById("cf-email");
      var message = document.getElementById("cf-message");
      var valid = true;

      [name, email, message].forEach(function (field) {
        field.closest(".form-field").classList.remove("invalid");
      });

      if (!name.value.trim()) {
        name.closest(".form-field").classList.add("invalid");
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.closest(".form-field").classList.add("invalid");
        valid = false;
      }

      if (!message.value.trim()) {
        message.closest(".form-field").classList.add("invalid");
        valid = false;
      }

      if (!valid) {
        if (status) {
          status.textContent = "Please fix the highlighted fields.";
          status.classList.add("visible");
        }
        return;
      }

      var subject = "Contact from " + name.value.trim();
      var body =
        "Name: " + name.value.trim() +
        "\nEmail: " + email.value.trim() +
        "\n\n" + message.value.trim();

      var mailtoUrl =
        "mailto:" + contactEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = "Opening your email app…";
        status.classList.add("visible");
      }

      window.location.href = mailtoUrl;
    });
  }
})();
