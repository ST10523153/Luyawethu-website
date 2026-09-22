// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('nav.links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Enquiry form validation and submit feedback
(function () {
  var form = document.querySelector('form.enquiry');
  if (!form) return;

  var note = document.createElement('div');
  note.className = 'form-note';
  note.setAttribute('role', 'status');
  form.appendChild(note);

  function setError(field, message) {
    var wrapper = field.closest('.field');
    var errorEl = wrapper.querySelector('.error-text');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-text';
      wrapper.appendChild(errorEl);
    }
    errorEl.textContent = message;
    wrapper.classList.add('invalid');
  }

  function clearError(field) {
    var wrapper = field.closest('.field');
    wrapper.classList.remove('invalid');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    note.classList.remove('success');
    note.textContent = '';

    var valid = true;
    var name = form.querySelector('#full-name');
    var email = form.querySelector('#email');

    if (!name.value.trim()) {
      setError(name, 'Enter your full name');
      valid = false;
    } else {
      clearError(name);
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      setError(email, 'Enter a valid email address');
      valid = false;
    } else {
      clearError(email);
    }

    if (!valid) {
      var firstInvalid = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    note.textContent = 'Thanks — your enquiry has been sent. Our housing team will reply within two working days.';
    note.classList.add('success');
    form.reset();
  });

  ['input', 'change'].forEach(function (evt) {
    form.addEventListener(evt, function (e) {
      if (e.target.closest('.field.invalid')) {
        clearError(e.target);
      }
    });
  });
})();
