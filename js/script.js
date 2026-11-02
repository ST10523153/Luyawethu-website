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
/* ============================================================
   PART 3: JAVASCRIPT FUNCTIONALITY
   ============================================================ */

// --- 1. LIGHTBOX GALLERY ---
// Get the lightbox elements from the HTML
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

// Function to open the lightbox (called from HTML onclick)
function openLightbox(imageSrc) {
    if (lightbox) {
        lightbox.style.display = 'flex'; // Show the overlay
        lightboxImg.src = imageSrc;      // Set the large image source
    }
}

// Function to close the lightbox
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
}

// Also close if the user clicks anywhere on the dark background
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}
// --- 2. DYNAMIC CONTENT: ROOM SEARCH FILTER ---
// Get the search input and all room cards
const searchInput = document.getElementById('roomSearch');
const roomDetails = document.querySelectorAll('.room-detail');

if (searchInput && roomDetails.length > 0) {
    searchInput.addEventListener('keyup', function(e) {
        // Get the text the user typed, make it lowercase for easy matching
        const searchText = e.target.value.toLowerCase();

        // Loop through all 4 rooms
        roomDetails.forEach(function(room) {
            // Get the text inside this specific room card
            const roomText = room.textContent.toLowerCase();

            // If the room text includes the search text, show it. Otherwise, hide it.
            if (roomText.includes(searchText)) {
                room.style.display = 'grid'; // Show
            } else {
                room.style.display = 'none'; // Hide
            }
        });
    });
}
// --- 3. FORM VALIDATION & AJAX SIMULATION ---

// === A. ENQUIRY FORM ===
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from reloading

        // Get the values
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const room = document.getElementById('room').value;
        const message = document.getElementById('message').value.trim();
        const msgBox = document.getElementById('enquiryMessage');

        // Validation checks
        if (name === "" || email === "" || room === "" || message === "") {
            msgBox.style.color = "red";
            msgBox.textContent = "Error: Please fill in all required fields (*).";
            return; // Stop here
        }

        // Simple email check
        if (!email.includes("@") || !email.includes(".")) {
            msgBox.style.color = "red";
            msgBox.textContent = "Error: Please enter a valid email address.";
            return;
        }

        // If everything is correct, simulate AJAX success
        msgBox.style.color = "green";
        msgBox.textContent = "Success! Your enquiry has been sent. We will reply within 2 days.";
        
        // Clear the form
        enquiryForm.reset();
    });
}

// === B. CONTACT FORM ===
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from reloading

        // Get the values using the new IDs we just added
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const msgBox = document.getElementById('contactMessageStatus');

        // Validation checks
        if (name === "" || email === "" || message === "") {
            msgBox.style.color = "red";
            msgBox.textContent = "Error: Please fill in all required fields.";
            return; 
        }

        // Simple email check
        if (!email.includes("@") || !email.includes(".")) {
            msgBox.style.color = "red";
            msgBox.textContent = "Error: Please enter a valid email address.";
            return;
        }

        // Simulate AJAX success
        msgBox.style.color = "green";
        msgBox.textContent = "Success! Your message has been sent. We will be in touch shortly.";
        
        // Clear the form
        contactForm.reset();
    });
}