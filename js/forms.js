/* =========================================================
   VKOLLAB TECHNOLOGIES — FORMS.JS
   Client-side validation + simulated submission for:
   - Home "Let's have a Conversation" form
   - Contact Us page form
   - Careers application modal form
   ========================================================= */

(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[+]?[0-9()\-.\s]{7,20}$/;

  function showToast(message) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<span class="toast-icon">&#10003;</span><span>' + message + "</span>";
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("show"); });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 400);
    }, 4200);
  }

  function setFieldError(group, message) {
    if (!group) return;
    group.classList.add("invalid");
    var errEl = group.querySelector(".form-error");
    if (errEl) errEl.textContent = message;
  }
  function clearFieldError(group) {
    if (!group) return;
    group.classList.remove("invalid");
  }

  function validateField(field) {
    var group = field.closest(".form-group");
    var value = field.value.trim();
    var type = field.getAttribute("data-validate") || field.type;

    if (field.hasAttribute("required") && !value) {
      setFieldError(group, "This field is required.");
      return false;
    }
    if (type === "email" && value && !EMAIL_RE.test(value)) {
      setFieldError(group, "Please enter a valid email address.");
      return false;
    }
    if (type === "phone" && value && !PHONE_RE.test(value)) {
      setFieldError(group, "Please enter a valid phone number.");
      return false;
    }
    if (type === "url" && value) {
      try {
        new URL(value.startsWith("http") ? value : "https://" + value);
      } catch (e) {
        setFieldError(group, "Please enter a valid website URL.");
        return false;
      }
    }
    clearFieldError(group);
    return true;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll("input[required], textarea[required], input[data-validate], textarea[data-validate], select[required]");
    var valid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  function attachLiveValidation(form) {
    var fields = form.querySelectorAll("input, textarea, select");
    fields.forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
      field.addEventListener("input", function () {
        var group = field.closest(".form-group");
        if (group && group.classList.contains("invalid")) validateField(field);
      });
    });
  }

  function simulateSubmit(form, successMessage) {
    var btn = form.querySelector('button[type="submit"]');
    var successEl = form.querySelector(".form-success");
    var originalText = btn ? btn.innerHTML : "";

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
    }

    setTimeout(function () {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
      if (successEl) {
        successEl.textContent = successMessage;
        successEl.classList.add("show");
        setTimeout(function () { successEl.classList.remove("show"); }, 6000);
      }
      showToast(successMessage);
      form.reset();
    }, 1200);
  }

  function initForm(formId, successMessage) {
    var form = document.getElementById(formId);
    if (!form) return;
    attachLiveValidation(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        simulateSubmit(form, successMessage || "Thank you. Your request has been submitted successfully.");
      } else {
        var firstInvalid = form.querySelector(".form-group.invalid input, .form-group.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ---------------- Careers Application Modal ---------------- */
  function initCareersModal() {
    var applyButtons = document.querySelectorAll(".apply-now-btn");
    var modal = document.getElementById("applicationModal");
    if (!applyButtons.length || !modal) return;

    var closeBtn = modal.querySelector(".modal-close");
    var jobTitleField = document.getElementById("appJobTitle");
    var modalSub = modal.querySelector(".modal-sub");

    function openModal(jobTitle) {
      if (jobTitleField) jobTitleField.value = jobTitle;
      if (modalSub) modalSub.textContent = "Applying for: " + jobTitle;
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }

    applyButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn.getAttribute("data-job") || "General Application");
      });
    });
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    });

    initForm("applicationForm", "Thank you for applying! Our HR team will review your application and get back to you soon.");
  }

  function boot() {
    initForm("homeContactForm", "Thank you. Your request has been submitted successfully.");
    initForm("contactPageForm", "Thank you for reaching out! We'll get back to you within 24 hours.");
    initCareersModal();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
