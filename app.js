/*
 * Le Chateau Pet Resort – Global Script
 *
 * Handles mobile navigation toggling, dropdown behaviour, testimonial slider,
 * accordion state, lightbox gallery and reveals content on scroll. Written
 * with vanilla JavaScript for maximum compatibility.
 */

(function () {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !expanded);
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Dropdowns: allow click on parent to show/hide in mobile
  const dropdownParents = document.querySelectorAll('.nav > li');
  dropdownParents.forEach(parent => {
    const button = parent.querySelector('a');
    const submenu = parent.querySelector('.dropdown');
    if (submenu) {
      button.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isOpen = submenu.style.display === 'block';
          submenu.style.display = isOpen ? 'none' : 'block';
        }
      });
    }
  });

  // Testimonial slider (auto rotate)
  const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
  let testimonialIndex = 0;
  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? 'block' : 'none';
    });
  }
  if (testimonials.length > 0) {
    showTestimonial(testimonialIndex);
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 7000);
  }

  // Accordion toggle
  const accordionButtons = document.querySelectorAll('.accordion button');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      accordionButtons.forEach(otherBtn => {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.nextElementSibling.hidden = true;
      });
      btn.setAttribute('aria-expanded', !expanded);
      btn.nextElementSibling.hidden = expanded;
    });
  });

  // Gallery lightbox
  const galleryLinks = document.querySelectorAll('.gallery-grid a');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (lightbox && lightboxImg && lightboxClose) {
    galleryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        lightboxImg.src = href;
        lightbox.style.display = 'flex';
      });
    });
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    });
  }

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  reveals.forEach(el => observer.observe(el));
})();
